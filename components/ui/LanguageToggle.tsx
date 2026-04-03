"use client"
import { useState } from "react"
import { Locale, localeNames } from "@/lib/i18n"

interface LanguageToggleProps {
  defaultLocale?: Locale
  onLocaleChange?: (locale: Locale) => void
}

export default function LanguageToggle({ defaultLocale = "en", onLocaleChange }: LanguageToggleProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  const handleToggle = () => {
    const newLocale: Locale = locale === "en" ? "hi" : "en"
    setLocale(newLocale)
    onLocaleChange?.(newLocale)
  }

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-100 hover:bg-surface-200 transition-all duration-200 text-sm font-medium text-surface-700"
      aria-label={`Switch to ${locale === "en" ? "Hindi" : "English"}`}
    >
      <span className="text-base">{locale === "en" ? "🇮🇳" : "🇬🇧"}</span>
      <span>{localeNames[locale]}</span>
    </button>
  )
}
