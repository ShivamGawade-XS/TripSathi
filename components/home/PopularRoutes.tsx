"use client"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

const routes = [
  { from: "Delhi", to: "Mumbai", price: "₹850", emoji: "🏙️" },
  { from: "Bangalore", to: "Goa", price: "₹650", emoji: "🏖️" },
  { from: "Chennai", to: "Hyderabad", price: "₹480", emoji: "🕌" },
  { from: "Kolkata", to: "Varanasi", price: "₹520", emoji: "🛕" },
  { from: "Mumbai", to: "Pune", price: "₹350", emoji: "⛰️" },
  { from: "Delhi", to: "Jaipur", price: "₹420", emoji: "🏰" },
]

const str: Record<string, Record<string, string>> = {
  en: { title: "Popular Routes", subtitle: "Most searched travel routes across India", starting: "Starting from" },
  hi: { title: "लोकप्रिय मार्ग", subtitle: "भारत भर में सबसे अधिक खोजे जाने वाले मार्ग", starting: "शुरू से" },
  ta: { title: "பிரபலமான பாதைகள்", subtitle: "இந்தியா முழுவதும் அதிகம் தேடப்பட்ட பயண பாதைகள்", starting: "தொடக்கம்" },
  te: { title: "ప్రాచుర్యమైన మార్గాలు", subtitle: "భారతదేశం అంతటా అత్యధికంగా శోధించబడిన మార్గాలు", starting: "ప్రారంభం" },
  mr: { title: "लोकप्रिय मार्ग", subtitle: "भारतभर सर्वाधिक शोधले गेलेले प्रवास मार्ग", starting: "सुरुवात" },
}

export default function PopularRoutes() {
  const { locale } = useLanguage()
  const t = str[locale] || str.en
  return (
    <section className="section-padding bg-surface-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-surface-900 mb-4"><span className="gradient-text">{t.title}</span></h2>
          <p className="text-surface-500 text-lg">{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route) => (
            <Link key={`${route.from}-${route.to}`} href={`/search?from=${route.from}&to=${route.to}`} className="card flex items-center gap-4 hover:-translate-y-1 group">
              <div className="text-3xl">{route.emoji}</div>
              <div className="flex-1">
                <div className="font-semibold text-surface-900">{route.from} → {route.to}</div>
                <div className="text-sm text-surface-500">{t.starting}</div>
              </div>
              <div className="text-lg font-bold text-primary-600 group-hover:text-primary-700">{route.price}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
