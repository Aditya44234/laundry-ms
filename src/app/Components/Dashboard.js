"use client"

import { useEffect, useState } from "react"

export default function DashBoard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadDashboard() {
      const res = await fetch("/api/dashboard")
      const payload = await res.json()

      if (isMounted) {
        setData(payload)
      }
    }

    loadDashboard()

    //  Clean up function for effficent redering of UI compoenents
    return () => {
      isMounted = false
    }
  }, [])

  if (!data) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-6 text-xl font-semibold text-slate-900">Dashboard</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Total Orders</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {data.totalOrders}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-4 text-white">
          <p className="text-sm text-slate-300">Total Revenue</p>
          <p className="mt-2 text-3xl font-semibold">Rs. {data.totalRevenue}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
          Status Breakdown
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(data.statusBreakdown).map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">{key}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
