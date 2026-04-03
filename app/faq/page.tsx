"use client"
import { useState, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"

interface FAQ { id: string; category: string; question: string; answer: string }

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [openId, setOpenId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const { locale } = useLanguage()

  const faqStrings: Record<string, Record<string, string>> = {
    en: { title: "How can we help?", subtitle: "Find answers to common questions", searchPh: "Search FAQs...", noMatch: "No matching FAQs found", stillQ: "Still have questions?", support: "Our support team is available 24/7", all: "All", booking: "Booking", payment: "Payment", travel: "Travel", supportCat: "Support", account: "Account" },
    hi: { title: "हम कैसे मदद कर सकते हैं?", subtitle: "सामान्य प्रश्नों के उत्तर खोजें", searchPh: "प्रश्न खोजें...", noMatch: "कोई मिलता-जुलता प्रश्न नहीं मिला", stillQ: "अभी भी सवाल हैं?", support: "हमारी सहायता टीम 24/7 उपलब्ध है", all: "सभी", booking: "बुकिंग", payment: "भुगतान", travel: "यात्रा", supportCat: "सहायता", account: "खाता" },
    ta: { title: "நாங்கள் எப்படி உதவலாம்?", subtitle: "பொதுவான கேள்விகளுக்கான பதில்களைக் கண்டறியுங்கள்", searchPh: "கேள்விகளைத் தேடுங்கள்...", noMatch: "பொருத்தமான கேள்விகள் இல்லை", stillQ: "இன்னும் கேள்விகள் உள்ளதா?", support: "எங்கள் ஆதரவு குழு 24/7 கிடைக்கும்", all: "அனைத்தும்", booking: "புக்கிங்", payment: "கட்டணம்", travel: "பயணம்", supportCat: "ஆதரவு", account: "கணக்கு" },
    te: { title: "మేము ఎలా సహాయం చేయగలము?", subtitle: "సాధారణ ప్రశ్నలకు సమాధానాలు కనుగొనండి", searchPh: "ప్రశ్నలు శోధించండి...", noMatch: "సరిపోలే ప్రశ్నలు కనుగొనబడలేదు", stillQ: "ఇంకా ప్రశ్నలు ఉన్నాయా?", support: "మా సపోర్ట్ టీమ్ 24/7 అందుబాటులో ఉంది", all: "అన్నీ", booking: "బుకింగ్", payment: "చెల్లింపు", travel: "ప్రయాణం", supportCat: "సహాయం", account: "ఖాతా" },
    mr: { title: "आम्ही कशी मदत करू शकतो?", subtitle: "सामान्य प्रश्नांची उत्तरे शोधा", searchPh: "प्रश्न शोधा...", noMatch: "जुळणारे प्रश्न सापडले नाहीत", stillQ: "अजून प्रश्न आहेत?", support: "आमची सहाय्य टीम 24/7 उपलब्ध आहे", all: "सर्व", booking: "बुकिंग", payment: "पेमेंट", travel: "प्रवास", supportCat: "सहाय्य", account: "खाते" },
  }
  const s = faqStrings[locale] || faqStrings.en

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/faqs?locale=${locale}`)
      .then(r => r.json())
      .then(d => { setFaqs(d.faqs); setCategories(d.categories) })
      .catch(() => {})
  }, [locale])

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
          <h1 className="font-display text-4xl md:text-5xl font-bold">{s.title}</h1>
          <p className="mt-3 text-white/80 text-lg">{s.subtitle}</p>
          <div className="mt-8 max-w-xl mx-auto relative">
            <input type="text" placeholder={s.searchPh} value={search} onChange={e => setSearch(e.target.value)}
              className="w-full px-6 py-4 pl-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 outline-none text-lg" />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <button onClick={() => setActiveCategory("all")} className={`px-5 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all ${activeCategory === "all" ? "bg-primary-600 text-white" : "bg-white text-surface-600 hover:bg-surface-100"}`}>{s.all}</button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all ${activeCategory === cat ? "bg-primary-600 text-white" : "bg-white text-surface-600 hover:bg-surface-100"}`}>
              {catLabels[cat]?.icon} {catLabels[cat]?.label || cat}
            </button>
          ))}
        </div>
        <div className="mt-8 space-y-3 pb-16">
          {filtered.length === 0 ? <p className="text-center text-surface-400 py-12">{s.noMatch}</p> : filtered.map(faq => (
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
          <h2 className="font-display text-2xl font-bold">{s.stillQ}</h2>
          <p className="mt-2 text-white/80">{s.support}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a href="mailto:support@tripsathi.com" className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-colors">📧 support@tripsathi.com</a>
            <a href="tel:+911800874772" className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-colors">📞 1800-TRIP-SAT</a>
          </div>
        </div>
      </div>
    </div>
  )
}
