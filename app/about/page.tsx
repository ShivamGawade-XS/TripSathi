"use client"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

const s: Record<string, Record<string, string>> = {
  en: { title: "About TripSathi", desc: "TripSathi was founded with a single vision: to unify the fragmented landscape of Indian travel into one seamless, powerful, and intuitive platform.", mission: "Our Mission", missionDesc: "To empower every Indian traveler by providing transparent pricing, smart route aggregation, and a frictionless booking experience across buses, trains, flights, and hotels.", story: "Our Story", storyDesc: "Born from the frustration of juggling five different apps just to plan a weekend trip from Delhi to Jaipur, we built TripSathi as the ultimate companion (\"Sathi\") for the modern explorer.", cta: "Ready to start your journey?", ctaDesc: "Join thousands of travelers who have simplified their travel planning with TripSathi.", search: "Search Trips", packages: "View Packages" },
  hi: { title: "ट्रिपसाथी के बारे में", desc: "ट्रिपसाथी की स्थापना एक ही दृष्टिकोण से हुई: भारतीय यात्रा के खंडित परिदृश्य को एक सहज, शक्तिशाली और सहज मंच में एकीकृत करना।", mission: "हमारा मिशन", missionDesc: "हर भारतीय यात्री को पारदर्शी मूल्य, स्मार्ट रूट एग्रीगेशन और बस, ट्रेन, उड़ान और होटल में बुकिंग का सहज अनुभव प्रदान करना।", story: "हमारी कहानी", storyDesc: "दिल्ली से जयपुर की वीकेंड ट्रिप प्लान करने के लिए पांच अलग-अलग ऐप्स के बीच स्विच करने की हताशा से जन्मा, हमने आधुनिक यात्री के लिए ट्रिपसाथी बनाया।", cta: "अपनी यात्रा शुरू करें?", ctaDesc: "हजारों यात्रियों से जुड़ें जिन्होंने ट्रिपसाथी के साथ अपनी यात्रा योजना को सरल बनाया है।", search: "ट्रिप खोजें", packages: "पैकेज देखें" },
  ta: { title: "டிரிப்சாதி பற்றி", desc: "இந்திய பயணத்தின் சிதறிய நிலப்பரப்பை ஒரே தடையற்ற, சக்திவாய்ந்த தளமாக ஒன்றிணைக்கும் ஒரே நோக்கத்துடன் டிரிப்சாதி நிறுவப்பட்டது.", mission: "எங்கள் நோக்கம்", missionDesc: "ஒவ்வொரு இந்திய பயணிக்கும் வெளிப்படையான விலை, புத்திசாலி பாதை ஒருங்கிணைப்பு மற்றும் எளிதான புக்கிங் அனுபவத்தை வழங்குதல்.", story: "எங்கள் கதை", storyDesc: "டெல்லியிலிருந்து ஜெய்ப்பூர் வார இறுதி பயணத்தை திட்டமிட ஐந்து வெவ்வேறு ஆப்ஸ்களை பயன்படுத்தும் விரக்தியிலிருந்து பிறந்தது.", cta: "உங்கள் பயணத்தைத் தொடங்க தயாரா?", ctaDesc: "டிரிப்சாதியுடன் பயணத் திட்டமிடலை எளிதாக்கிய ஆயிரக்கணக்கான பயணிகளுடன் சேருங்கள்.", search: "ட்ரிப்கள் தேடு", packages: "பேக்கேஜ்கள் பார்" },
  te: { title: "ట్రిప్‌సాథీ గురించి", desc: "భారత ప్రయాణ రంగాన్ని ఒకే అద్భుతమైన ప్లాట్‌ఫారమ్‌గా ఏకీకృతం చేయాలనే ఒకే దృష్టితో ట్రిప్‌సాథీ స్థాపించబడింది.", mission: "మా లక్ష్యం", missionDesc: "ప్రతి భారతీయ ప్రయాణికుడికి పారదర్శక ధరలు, స్మార్ట్ రూట్ సమీకరణ మరియు బుకింగ్ అనుభవాన్ని అందించడం.", story: "మా కథ", storyDesc: "ఢిల్లీ నుండి జైపూర్ వీకెండ్ ట్రిప్ ప్లాన్ చేయడానికి ఐదు వేర్వేరు యాప్‌లను వాడడం వల్ల కలిగిన నిరాశ నుండి పుట్టింది.", cta: "మీ ప్రయాణాన్ని ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?", ctaDesc: "ట్రిప్‌సాథీతో ప్రయాణ ప్లానింగ్‌ను సరళం చేసుకున్న వేలాది ప్రయాణికులతో చేరండి.", search: "ట్రిప్‌లు వెతుకు", packages: "ప్యాకేజీలు చూడు" },
  mr: { title: "ट्रिपसाथी बद्दल", desc: "भारतीय प्रवासाचे विखंडित चित्र एका अखंड, शक्तिशाली आणि सहज व्यासपीठात एकत्र करण्याच्या एकमेव दृष्टिकोनातून ट्रिपसाथीची स्थापना झाली.", mission: "आमचे ध्येय", missionDesc: "प्रत्येक भारतीय प्रवाशाला पारदर्शक किमती, स्मार्ट मार्ग एकत्रीकरण आणि बस, ट्रेन, विमान आणि हॉटेलमध्ये सहज बुकिंग अनुभव प्रदान करणे.", story: "आमची कहाणी", storyDesc: "दिल्ली ते जयपूर वीकेंड ट्रिप प्लॅन करण्यासाठी पाच वेगवेगळ्या ॲप्स वापरण्याच्या निराशेतून जन्मले.", cta: "तुमचा प्रवास सुरू करायला तयार?", ctaDesc: "ट्रिपसाथीसोबत प्रवास नियोजन सोपे केलेल्या हजारो प्रवाशांसोबत सामील व्हा.", search: "ट्रिप शोधा", packages: "पॅकेजेस पहा" },
}

export default function AboutPage() {
  const { locale } = useLanguage()
  const t = s[locale] || s.en
  return (
    <div className="min-h-screen bg-surface-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-surface-800 mb-6 text-center">{t.title}</h1>
          <p className="text-xl text-surface-600 text-center leading-relaxed">{t.desc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-sm p-8 border-t-4 border-primary-500">
            <h2 className="text-2xl font-bold text-surface-800 mb-3">{t.mission}</h2>
            <p className="text-surface-600">{t.missionDesc}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 border-t-4 border-accent-500">
            <h2 className="text-2xl font-bold text-surface-800 mb-3">{t.story}</h2>
            <p className="text-surface-600">{t.storyDesc}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="font-display text-3xl font-bold mb-4">{t.cta}</h2>
          <p className="mb-8 text-white/80 max-w-xl mx-auto">{t.ctaDesc}</p>
          <div className="flex justify-center gap-4">
            <Link href="/search" className="btn-secondary px-8 py-3 bg-white text-primary-700 hover:bg-surface-50 border-none font-bold">{t.search}</Link>
            <Link href="/packages" className="border-2 border-white/30 hover:bg-white/10 px-8 py-3 rounded-xl font-bold transition-colors">{t.packages}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
