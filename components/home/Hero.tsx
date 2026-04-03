import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            India&apos;s first unified travel platform
          </div>

          <h1 className="text-surface-900 mb-6 animate-slide-up">
            Plan your entire trip{" "}
            <span className="gradient-text">in one place</span>
          </h1>

          <p className="text-lg sm:text-xl text-surface-500 mb-10 max-w-2xl mx-auto animate-slide-up">
            Search trains, buses, and hotels together. Compare prices across
            providers. Save and share your complete itinerary.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link href="/search" className="btn-primary text-lg px-8 py-4">
              Start Planning →
            </Link>
            <Link href="#features" className="btn-secondary text-lg px-8 py-4">
              See How It Works
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">500+</div>
              <div className="text-sm text-surface-500 mt-1">Routes</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">10K+</div>
              <div className="text-sm text-surface-500 mt-1">Hotels</div>
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
