"use client"

import { useState } from "react"

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(String(value))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="break-all text-lg font-semibold text-slate-900">{value}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  )
}

export default function OrderSuccessModal({ order, onClose }) {
  if (!order) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-600">
              Order Created
            </p>
 We
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
          >
            Close
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <CopyField label="Order ID" value={order.orderId} />
          <CopyField label="Total Bill" value={`Rs. ${order.totalAmount}`} />
        </div>
      </div>
    </div>
  )
}
