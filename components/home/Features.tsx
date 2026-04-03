const features = [
  {
    title: "Unified Search",
    description: "Trains, buses, and hotels in a single search. No more switching between 4 different apps.",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Price Comparison",
    description: "Side-by-side pricing across all providers. Find the cheapest route instantly.",
    icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Save & Share",
    description: "Save your complete trip plan and share it with family via a simple link.",
    icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Hindi Support",
    description: "Full Hindi language interface, built for Tier-2/3 city travelers.",
    icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
    color: "from-orange-500 to-amber-600",
  },
]

export default function Features() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-surface-900 mb-4">
            Why <span className="gradient-text">TripSathi</span>?
          </h2>
          <p className="text-surface-500 text-lg max-w-2xl mx-auto">
            Everything you need for planning a trip across India, unified into one intelligent platform.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card group hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-surface-900 mb-2">{f.title}</h3>
              <p className="text-surface-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
