"use client"
import { useState, useEffect } from "react"

interface FAQ { id: string; category: string; question: string; answer: string }

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [openId, setOpenId] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/faqs")
      .then(r => r.json())
      .then(d => { setFaqs(d.faqs); setCategories(d.categories) })
      .catch(() => {})
  }, [])

  const filtered = faqs.filter(f => {
    const matchCat = activeCategory === "all" || f.category === activeCategory
    const matchSearch = !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const catLabels: Record<string, { icon: string; label: string }> = {
    booking: { icon: "📋", label: "Booking" },
    payment: { icon: "💳", label: "Payment" },
    travel: { icon: "✈️", label: "Travel" },
    support: { icon: "🎧", label: "Support" },
    account: { icon: "👤", label: "Account" },
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold">How can we help?</h1>
          <p className="mt-3 text-white/80 text-lg">Find answers to common questions</p>
          <div className="mt-8 max-w-xl mx-auto relative">
            <input type="text" placeholder="Search FAQs..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full px-6 py-4 pl-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 outline-none text-lg" />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <button onClick={() => setActiveCategory("all")} className={`px-5 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all ${activeCategory === "all" ? "bg-primary-600 text-white" : "bg-white text-surface-600 hover:bg-surface-100"}`}>All</button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all ${activeCategory === cat ? "bg-primary-600 text-white" : "bg-white text-surface-600 hover:bg-surface-100"}`}>
              {catLabels[cat]?.icon} {catLabels[cat]?.label || cat}
            </button>
          ))}
        </div>
        <div className="mt-8 space-y-3 pb-16">
          {filtered.length === 0 ? <p className="text-center text-surface-400 py-12">No matching FAQs found</p> : filtered.map(faq => (
            <div key={faq.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button onClick={() => setOpenId(openId === faq.id ? null : faq.id)} className="w-full px-6 py-5 flex items-center justify-between text-left">
                <span className="font-medium text-surface-800 pr-4">{faq.question}</span>
                <span className={`text-primary-500 text-xl transition-transform ${openId === faq.id ? "rotate-45" : ""}`}>+</span>
              </button>
              {openId === faq.id && <div className="px-6 pb-5 text-surface-600 text-sm leading-relaxed border-t border-surface-100 pt-4">{faq.answer}</div>}
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl p-8 text-center text-white mb-12">
          <h2 className="font-display text-2xl font-bold">Still have questions?</h2>
          <p className="mt-2 text-white/80">Our support team is available 24/7</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a href="mailto:support@tripsathi.com" className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-colors">📧 support@tripsathi.com</a>
            <a href="tel:+911800874772" className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-colors">📞 1800-TRIP-SAT</a>
          </div>
        </div>
      </div>
    </div>
  )
}
