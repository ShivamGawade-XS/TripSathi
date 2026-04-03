"use client"
import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">TS</span>
            </div>
            <span className="font-display text-xl font-bold gradient-text">TripSathi</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-surface-600 hover:text-primary-600 font-medium transition-colors">Home</Link>
            <Link href="/search" className="text-surface-600 hover:text-primary-600 font-medium transition-colors">Search</Link>
            <Link href="/dashboard" className="text-surface-600 hover:text-primary-600 font-medium transition-colors">Saved Trips</Link>
            <Link href="/login" className="btn-secondary text-sm py-2 px-4">Login</Link>
            <Link href="/register" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors" aria-label="Toggle menu">
            <svg className="w-6 h-6 text-surface-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            <nav className="flex flex-col gap-2">
              <Link href="/" className="px-4 py-2 rounded-lg text-surface-600 hover:bg-surface-100" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="/search" className="px-4 py-2 rounded-lg text-surface-600 hover:bg-surface-100" onClick={() => setMenuOpen(false)}>Search</Link>
              <Link href="/dashboard" className="px-4 py-2 rounded-lg text-surface-600 hover:bg-surface-100" onClick={() => setMenuOpen(false)}>Saved Trips</Link>
              <div className="flex gap-2 mt-2">
                <Link href="/login" className="btn-secondary text-sm py-2 px-4 flex-1 text-center">Login</Link>
                <Link href="/register" className="btn-primary text-sm py-2 px-4 flex-1 text-center">Sign Up</Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
