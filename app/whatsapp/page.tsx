"use client"
import { useState } from "react"

const chatDemo = [
  { from: "user", text: "Delhi to Mumbai train" },
  { from: "bot", text: "🚆 Found 12 trains from Delhi to Mumbai!\n\n1. Rajdhani Express — ₹1,450 (AC 3-Tier)\n   Dep: 16:00 | Arr: 08:35+1\n\n2. Duronto Express — ₹1,280 (Sleeper)\n   Dep: 23:15 | Arr: 15:40+1\n\n3. Mumbai Mail — ₹650 (Sleeper)\n   Dep: 21:30 | Arr: 18:00+1\n\nReply with train number to book! 🎫" },
  { from: "user", text: "Book train 1" },
  { from: "bot", text: "✅ Rajdhani Express selected!\n\nPassenger details needed:\n• Full Name (as on ID)\n• Age & Gender\n• Preferred Berth\n\nReply in format:\nName, Age, Gender, Berth\n\nExample: Raj Kumar, 28, M, Lower" },
]

export default function WhatsAppBotPage() {
  const [phone, setPhone] = useState("")
  const [linked, setLinked] = useState(false)

  const handleLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length >= 10) setLinked(true)
  }

  return (
    <div className="min-h-screen bg-surface-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-surface-800">💬 WhatsApp Bot</h1>
          <p className="text-surface-500 mt-3 text-lg max-w-2xl mx-auto">Search trains, buses & hotels directly from WhatsApp. Zero app downloads. Zero friction.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Phone mockup */}
          <div className="bg-surface-800 rounded-3xl p-3 shadow-2xl max-w-sm mx-auto lg:mx-0">
            <div className="bg-[#075E54] rounded-t-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">TS</div>
              <div>
                <p className="text-white font-bold text-sm">TripSathi Bot</p>
                <p className="text-green-300 text-xs">online</p>
              </div>
            </div>
            <div className="bg-[#ECE5DD] p-4 space-y-3 min-h-[400px] rounded-b-2xl">
              {chatDemo.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm whitespace-pre-line ${
                    msg.from === "user"
                      ? "bg-[#DCF8C6] text-surface-800 rounded-tr-none"
                      : "bg-white text-surface-700 rounded-tl-none shadow-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features + Link */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-surface-800 mb-4">How It Works</h2>
              <div className="space-y-4">
                {[
                  { step: "1", icon: "📱", title: "Save Our Number", desc: "Add +91-XXXXX-XXXXX to your contacts as 'TripSathi'" },
                  { step: "2", icon: "💬", title: "Send a Message", desc: "Type your search like 'Delhi to Goa bus tomorrow'" },
                  { step: "3", icon: "🎫", title: "Book Instantly", desc: "Select, confirm, and receive your e-ticket on WhatsApp" },
                ].map(s => (
                  <div key={s.step} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">{s.step}</div>
                    <div>
                      <h3 className="font-bold text-surface-800">{s.icon} {s.title}</h3>
                      <p className="text-surface-500 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-surface-800 mb-4">Supported Commands</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Delhi to Mumbai train",
                  "Goa hotels under 3000",
                  "Bangalore to Chennai bus",
                  "My bookings",
                  "Cancel booking TS12345",
                  "PNR status 4521367890",
                ].map((cmd, i) => (
                  <code key={i} className="bg-surface-100 px-3 py-2 rounded-lg text-sm text-surface-700 font-mono">{cmd}</code>
                ))}
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-green-800 mb-3">🔗 Link Your Account</h2>
              {linked ? (
                <div className="text-center py-4">
                  <span className="text-4xl block mb-2">✅</span>
                  <p className="font-bold text-green-700">WhatsApp linked successfully!</p>
                  <p className="text-green-600 text-sm mt-1">Send &quot;Hi&quot; to +91-XXXXX-XXXXX to start.</p>
                </div>
              ) : (
                <form onSubmit={handleLink} className="flex gap-3">
                  <input
                    type="tel"
                    required
                    minLength={10}
                    maxLength={10}
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 10-digit mobile number"
                    className="flex-1 px-4 py-2.5 rounded-lg border border-green-300 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-lg transition-colors">
                    Link
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
