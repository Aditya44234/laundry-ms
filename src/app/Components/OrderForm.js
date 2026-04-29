"use client"

import { useState } from "react"
import OrderSuccessModal from "./OrderSuccessModal"

const emptyItem = {
  garment: "",
  quantity: "",
  price: ""
}

export default function OrderForm() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    items: [{ ...emptyItem }]
  })
  const [createdOrder, setCreatedOrder] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateItem = (index, field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      items: currentForm.items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const addItem = () => {
    setForm((currentForm) => ({
      ...currentForm,
      items: [...currentForm.items, { ...emptyItem }]
    }))
  }

  const removeItem = (index) => {
    setForm((currentForm) => ({
      ...currentForm,
      items:
        currentForm.items.length === 1
          ? currentForm.items
          : currentForm.items.filter((_, itemIndex) => itemIndex !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const cleanedItems = form.items
        .filter((item) => item.garment.trim())
        .map((item) => ({
          garment: item.garment.trim(),
          quantity: Number(item.quantity),
          price: Number(item.price)
        }))

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          phone: form.phone,
          items: cleanedItems
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
        items: [{ ...emptyItem }]
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
        className="mx-auto w-full max-w-3xl space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900">Create Order</h2>
          <p className="text-sm text-slate-500">
            Add one or more garments for the same customer order.
          </p>
        </div>

        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={(e) =>
            setForm({ ...form, customerName: e.target.value })
          }
        />

        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                Garments
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Add every clothing item included in this order.
              </p>
            </div>

            <button
              type="button"
              onClick={addItem}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              Add More
            </button>
          </div>

          {form.items.map((item, index) => (
            <div
              key={`item-${index}`}
              className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-700">
                  Garment {index + 1}
                </p>

                {form.items.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="rounded-full border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:border-red-400 hover:text-red-700"
                  >
                    Remove
                  </button>
                ) : null}
              </div>

              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="Garment (e.g. Shirt)"
                value={item.garment}
                onChange={(e) => updateItem(index, "garment", e.target.value)}
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="Quantity"
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", e.target.value)}
                />

                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="Price"
                  type="number"
                  min="0"
                  value={item.price}
                  onChange={(e) => updateItem(index, "price", e.target.value)}
                />
              </div>

              <p className="text-sm text-slate-500">
                Line Total: Rs. {(Number(item.quantity) || 0) * (Number(item.price) || 0)}
              </p>
            </div>
          ))}
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
