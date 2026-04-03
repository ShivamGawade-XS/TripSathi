import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">TS</span>
              </div>
              <span className="font-display text-xl font-bold text-white">TripSathi</span>
            </div>
            <p className="text-surface-400 max-w-sm leading-relaxed">
              Making travel planning simple for every Indian. Search trains, buses, and hotels — all in one place.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-surface-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/search" className="text-surface-400 hover:text-white transition-colors">Search</Link></li>
              <li><Link href="/dashboard" className="text-surface-400 hover:text-white transition-colors">Saved Trips</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-surface-400">
              <li>support@tripsathi.in</li>
              <li>Goa, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-surface-800 mt-8 pt-8 text-center text-surface-500 text-sm">
          <p>&copy; 2026 TripSathi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
