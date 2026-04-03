import Link from "next/link"

const destinations = [
  { name: "Delhi", href: "/packages?search=Delhi" },
  { name: "Mumbai", href: "/packages?search=Mumbai" },
  { name: "Goa", href: "/packages?search=Goa" },
  { name: "Jaipur", href: "/packages?search=Jaipur" },
  { name: "Kerala", href: "/packages?search=Kerala" },
  { name: "Manali", href: "/packages?search=Manali" },
  { name: "Varanasi", href: "/packages?search=Varanasi" },
  { name: "Udaipur", href: "/packages?search=Udaipur" },
]

export default function EnhancedFooter() {
  return (
    <footer className="bg-surface-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="inline-block bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-xl mb-1">
              <img src="/logo.png" alt="TripSathi Logo" className="h-10 w-auto object-contain drop-shadow" />
            </Link>
            <p className="mt-4 text-surface-400 text-sm leading-relaxed">
              India&apos;s unified travel companion. Compare trains, buses, hotels — all in one place. Plan smarter, travel better.
            </p>
            <div className="flex gap-3 mt-6">
              {["𝕏", "📘", "📸", "🔗"].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-surface-800 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-colors text-sm">{icon}</a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-surface-300 mb-4">Company</h3>
            <nav className="space-y-3">
              <Link href="/about" className="block text-sm text-surface-400 hover:text-white transition-colors">About Us</Link>
              <Link href="/careers" className="block text-sm text-surface-400 hover:text-white transition-colors">Careers</Link>
              <Link href="/faq" className="block text-sm text-surface-400 hover:text-white transition-colors">FAQs</Link>
              <Link href="/contact" className="block text-sm text-surface-400 hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-surface-300 mb-4">Destinations</h3>
            <nav className="space-y-3">
              {destinations.slice(0, 6).map(d => (
                <Link key={d.name} href={d.href} className="block text-sm text-surface-400 hover:text-white transition-colors">{d.name}</Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-surface-300 mb-4">Legal</h3>
            <nav className="space-y-3">
              <Link href="/privacy" className="block text-sm text-surface-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-sm text-surface-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/refund" className="block text-sm text-surface-400 hover:text-white transition-colors">Refund Policy</Link>
              <Link href="/cancellation" className="block text-sm text-surface-400 hover:text-white transition-colors">Cancellation Policy</Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-surface-500">© {new Date().getFullYear()} TripSathi. All rights reserved. Made with ❤️ in India.</p>
            <div className="flex items-center gap-4 text-surface-500 text-xs">
              <span>🔒 256-bit SSL Secured</span>
              <span>💳 PCI-DSS Compliant</span>
              <span>🇮🇳 100% Indian</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
