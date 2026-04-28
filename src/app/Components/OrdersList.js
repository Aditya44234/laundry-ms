"use client"

import { useEffect, useState } from "react"

const STATUS_OPTIONS = ["RECEIVED", "PROCESSING", "READY", "DELIVERED"]

export default function OrdersList() {
  const [orders, setOrders] = useState([])
  const [filters, setFilters] = useState({
    customerName: "",
    phone: "",
    status: ""
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const buildQueryString = (activeFilters) => {
    const params = new URLSearchParams()

    if (activeFilters.customerName.trim()) {
      params.set("customerName", activeFilters.customerName.trim())
    }

    if (activeFilters.phone.trim()) {
      params.set("phone", activeFilters.phone.trim())
    }

    if (activeFilters.status) {
      params.set("status", activeFilters.status)
    }

    const queryString = params.toString()
    return queryString ? `?${queryString}` : ""
  }

  const fetchOrders = async (activeFilters = filters) => {
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch(`/api/orders${buildQueryString(activeFilters)}`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch orders")
      }

      setOrders(data.orders)
    } catch (fetchError) {
      setError(fetchError.message)
      setOrders([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    async function loadOrders() {
      try {
        const res = await fetch("/api/orders")
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch orders")
        }

        if (isMounted) {
          setOrders(data.orders)
          setError("")
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message)
          setOrders([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadOrders()

    return () => {
      isMounted = false
    }
  }, [])

  const handleFilterSubmit = async (e) => {
    e.preventDefault()
    await fetchOrders(filters)
  }

  const handleReset = async () => {
    const emptyFilters = {
      customerName: "",
      phone: "",
      status: ""
    }

    setFilters(emptyFilters)
    await fetchOrders(emptyFilters)
  }

  const updateStatus = async (id, status) => {
    if (!STATUS_OPTIONS.includes(status)) {
      return
    }

    await fetch(`/api/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })

    fetchOrders(filters)
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Orders</h2>
          <p className="mt-1 text-sm text-slate-500">
            Search and filter orders by customer name, phone, or status.
          </p>
        </div>

        <form
          onSubmit={handleFilterSubmit}
          className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-4"
        >
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="Customer Name"
            value={filters.customerName}
            onChange={(e) =>
              setFilters({ ...filters, customerName: e.target.value })
            }
          />

          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="Phone Number"
            value={filters.phone}
            onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
          />

          <select
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="submit"
              className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              Reset
            </button>
          </div>
        </form>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-500">
            Loading orders...
          </div>
        ) : null}

        {!isLoading && !error && orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            No orders found for the selected filters.
          </div>
        ) : null}

        {!isLoading && !error
          ? orders.map((order) => (
              <div
                key={order.orderId}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-medium text-slate-900">
                      {order.customerName} ({order.phone})
                    </p>
                    <p className="mt-2 text-slate-600">
                      {/* Order ID: {order.orderId} */}
                    </p>
                    <p className="mt-1 text-slate-600">
                      Total: Rs. {order.totalAmount}
                    </p>
                    <p className="mt-1 text-slate-600">
                      Status: {order.status}
                    </p>
                  </div>

                  <select
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 sm:w-auto"
                    defaultValue=""
                    onChange={(e) => updateStatus(order.orderId, e.target.value)}
                  >
                    <option value="">Update Status</option>
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
