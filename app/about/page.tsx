import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-surface-800 mb-6 text-center">About TripSathi</h1>
          <p className="text-xl text-surface-600 text-center leading-relaxed">
            TripSathi was founded with a single vision: to unify the fragmented landscape of Indian travel into one seamless, powerful, and intuitive platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-sm p-8 border-t-4 border-primary-500">
            <h2 className="text-2xl font-bold text-surface-800 mb-3">Our Mission</h2>
            <p className="text-surface-600">
              To empower every Indian traveler by providing transparent pricing, smart route aggregation, and a frictionless booking experience across buses, trains, flights, and hotels.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 border-t-4 border-accent-500">
            <h2 className="text-2xl font-bold text-surface-800 mb-3">Our Story</h2>
            <p className="text-surface-600">
              Born from the frustration of juggling five different apps just to plan a weekend trip from Delhi to Jaipur, we built TripSathi as the ultimate companion ("Sathi") for the modern explorer.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to start your journey?</h2>
          <p className="mb-8 text-white/80 max-w-xl mx-auto">Join thousands of travelers who have simplified their travel planning with TripSathi.</p>
          <div className="flex justify-center gap-4">
            <Link href="/search" className="btn-secondary px-8 py-3 bg-white text-primary-700 hover:bg-surface-50 border-none font-bold">Search Trips</Link>
            <Link href="/packages" className="border-2 border-white/30 hover:bg-white/10 px-8 py-3 rounded-xl font-bold transition-colors">View Packages</Link>
          </div>
        </div>

      </div>
    </div>
  )
}
