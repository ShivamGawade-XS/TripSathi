import Link from "next/link"

const routes = [
  { from: "Delhi", to: "Mumbai", price: "₹850", emoji: "🏙️" },
  { from: "Bangalore", to: "Goa", price: "₹650", emoji: "🏖️" },
  { from: "Chennai", to: "Hyderabad", price: "₹480", emoji: "🕌" },
  { from: "Kolkata", to: "Varanasi", price: "₹520", emoji: "🛕" },
  { from: "Mumbai", to: "Pune", price: "₹350", emoji: "⛰️" },
  { from: "Delhi", to: "Jaipur", price: "₹420", emoji: "🏰" },
]

export default function PopularRoutes() {
  return (
    <section className="section-padding bg-surface-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-surface-900 mb-4">
            <span className="gradient-text">Popular Routes</span>
          </h2>
          <p className="text-surface-500 text-lg">Most searched travel routes across India</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route) => (
            <Link
              key={`${route.from}-${route.to}`}
              href={`/search?from=${route.from}&to=${route.to}`}
              className="card flex items-center gap-4 hover:-translate-y-1 group"
            >
              <div className="text-3xl">{route.emoji}</div>
              <div className="flex-1">
                <div className="font-semibold text-surface-900">
                  {route.from} → {route.to}
                </div>
                <div className="text-sm text-surface-500">Starting from</div>
              </div>
              <div className="text-lg font-bold text-primary-600 group-hover:text-primary-700">
                {route.price}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
