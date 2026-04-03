"use client"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

export default function Hero() {
  const { t } = useLanguage()
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            {t("tagline")}
          </div>

          <h1 className="text-surface-900 mb-6 animate-slide-up">
            {t("hero_title")}
          </h1>

          <p className="text-lg sm:text-xl text-surface-500 mb-10 max-w-2xl mx-auto animate-slide-up">
            {t("hero_subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link href="/search" className="btn-primary text-lg px-8 py-4">
              {t("hero_cta")} →
            </Link>
            <Link href="#features" className="btn-secondary text-lg px-8 py-4">
              {t("features_title")}
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">500+</div>
              <div className="text-sm text-surface-500 mt-1">{t("popular_routes")}</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">10K+</div>
              <div className="text-sm text-surface-500 mt-1">{t("results_hotels")}</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">₹0</div>
              <div className="text-sm text-surface-500 mt-1">Platform Fee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
