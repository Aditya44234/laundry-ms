"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { MdMenu } from "react-icons/md"

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/create-order", label: "Create Order" },
  { href: "/orders", label: "Orders" }
]

function linkClasses(isActive) {
  return [
    "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
    isActive
      ? "bg-slate-900 text-white"
      : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
  ].join(" ")
}

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-tight text-slate-900">
            Laundry CRM
          </p>
          {/* <p className="text-sm text-slate-500" >Manage orders with clarity</p> */}
        </div>

        <button
          type="button"
          className="inline-flex items-center rounded-full  px-3 py-2 text-sm font-medium text-slate-700 md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {/* Menu */}
          <MdMenu className="text-xl" />
        </button>

        <nav className="hidden items-center justify-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClasses(pathname === item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {isOpen ? (
        <nav className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 pb-4 sm:px-6 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClasses(pathname === item.href)}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
