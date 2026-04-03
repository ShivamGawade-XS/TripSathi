"use client"
import { useState } from "react"
import Link from "next/link"
import LanguageToggle from "@/components/ui/LanguageToggle"
import { useLanguage } from "@/context/LanguageContext"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="TripSathi Logo" className="max-h-10 w-auto object-contain drop-shadow-sm" />
          </Link>
          <nav className="hidden md:flex items-center gap-5">
            <Link href="/" className="text-surface-600 hover:text-primary-600 font-medium transition-colors text-sm">{t("nav_home")}</Link>
            <Link href="/search" className="text-surface-600 hover:text-primary-600 font-medium transition-colors text-sm">{t("nav_search")}</Link>
            <Link href="/packages" className="text-surface-600 hover:text-primary-600 font-medium transition-colors text-sm">{t("nav_packages") || "Packages"}</Link>
            <Link href="/dashboard" className="text-surface-600 hover:text-primary-600 font-medium transition-colors text-sm">{t("nav_saved")}</Link>
            <Link href="/faq" className="text-surface-600 hover:text-primary-600 font-medium transition-colors text-sm">{t("nav_help") || "Help"}</Link>
            <LanguageToggle />
            <Link href="/login" className="btn-secondary text-sm py-2 px-4">{t("nav_login")}</Link>
            <Link href="/register" className="btn-primary text-sm py-2 px-4">{t("nav_register")}</Link>
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
              <Link href="/" className="px-4 py-2 rounded-lg text-surface-600 hover:bg-surface-100" onClick={() => setMenuOpen(false)}>{t("nav_home")}</Link>
              <Link href="/search" className="px-4 py-2 rounded-lg text-surface-600 hover:bg-surface-100" onClick={() => setMenuOpen(false)}>{t("nav_search")}</Link>
              <Link href="/packages" className="px-4 py-2 rounded-lg text-surface-600 hover:bg-surface-100" onClick={() => setMenuOpen(false)}>{t("nav_packages") || "Packages"}</Link>
              <Link href="/dashboard" className="px-4 py-2 rounded-lg text-surface-600 hover:bg-surface-100" onClick={() => setMenuOpen(false)}>{t("nav_saved")}</Link>
              <Link href="/faq" className="px-4 py-2 rounded-lg text-surface-600 hover:bg-surface-100" onClick={() => setMenuOpen(false)}>{t("nav_help") || "Help"}</Link>
              <div className="px-4 py-2"><LanguageToggle /></div>
              <div className="flex gap-2 mt-2">
                <Link href="/login" className="btn-secondary text-sm py-2 px-4 flex-1 text-center">{t("nav_login")}</Link>
                <Link href="/register" className="btn-primary text-sm py-2 px-4 flex-1 text-center">{t("nav_register")}</Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
