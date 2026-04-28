"use client"

import { useState } from "react"
import OrderSuccessModal from "./OrderSuccessModal"

export default function OrderForm() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    garment: "",
    quantity: "",
    price: ""
  })
  const [createdOrder, setCreatedOrder] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          phone: form.phone,
          items: [
            {
              garment: form.garment,
              quantity: Number(form.quantity),
              price: Number(form.price)
            }
          ]
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order")
      }

      setCreatedOrder(data.order)
      setForm({
        customerName: "",
        phone: "",
        garment: "",
        quantity: "",
        price: ""
      })
    } catch (error) {
      alert(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-2xl space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 className="text-xl font-semibold text-slate-900">Create Order</h2>

        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
        />

        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
          placeholder="Garment (e.g. Shirt)"
          value={form.garment}
          onChange={(e) => setForm({ ...form, garment: e.target.value })}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="Quantity"
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-slate-900 py-3 text-white transition duration-200 hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Creating Order..." : "Create Order"}
        </button>
      </form>

      <OrderSuccessModal
        order={createdOrder}
        onClose={() => setCreatedOrder(null)}
      />
    </>
  )
}
