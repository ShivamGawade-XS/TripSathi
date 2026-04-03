"use client"
import { useState } from "react"

const quickReplies = [
  "How do I book a package?",
  "I need to cancel my booking",
  "What payment methods are accepted?",
  "I have a complaint about my trip",
]

interface Message { role: "user" | "bot"; text: string }

const botResponses: Record<string, string> = {
  "how do i book": "You can browse our packages at /packages, select one, choose your dates and travelers, and complete the booking form. It's quick and easy! 🎉",
  "cancel": "You can cancel your booking up to 48 hours before travel for a full refund. Go to your Dashboard → My Bookings → Cancel. For help, call 1800-TRIP-SAT.",
  "payment": "We accept UPI, credit/debit cards (Visa, Mastercard, RuPay), net banking, Paytm, and PhonePe. EMI available for bookings above ₹10,000.",
  "complaint": "I'm sorry to hear that. Please email support@tripsathi.com with your booking reference and details. Our team will respond within 2 hours.",
  "hello": "Namaste! 🙏 Welcome to TripSathi. How can I help you today?",
  "hi": "Hello! 👋 How can I assist you with your travel plans?",
  "price": "Our packages start from ₹6,999. Visit /packages to see all options with current discounts!",
  "refund": "Refunds are processed within 5-7 business days. Full refund for cancellations 48+ hours before travel. Contact support for specific cases.",
}

function getBotReply(msg: string): string {
  const lower = msg.toLowerCase()
  for (const [key, val] of Object.entries(botResponses)) {
    if (lower.includes(key)) return val
  }
  return "Thanks for your message! For detailed assistance, please email support@tripsathi.com or call 1800-TRIP-SAT (toll-free). Our team is available 24/7. 🌟"
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Namaste! 🙏 I'm TripSathi's virtual assistant. How can I help you plan your next adventure?" }
  ])
  const [input, setInput] = useState("")

  const send = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { role: "user", text }
    const botMsg: Message = { role: "bot", text: getBotReply(text) }
    setMessages(prev => [...prev, userMsg, botMsg])
    setInput("")
  }

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-500 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform animate-bounce-slow"
          aria-label="Open chat">
          💬
        </button>
      )}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-surface-200" style={{ height: "500px" }}>
          <div className="bg-gradient-to-r from-primary-600 to-accent-500 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">🤖</div>
              <div>
                <h3 className="font-bold text-sm">TripSathi Support</h3>
                <p className="text-xs text-white/70">Online • Replies instantly</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white text-xl">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-primary-600 text-white rounded-br-md" : "bg-white text-surface-700 rounded-bl-md shadow-sm"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 py-2 bg-white border-t border-surface-100">
            <div className="flex flex-wrap gap-1 mb-2">
              {quickReplies.map((qr, i) => (
                <button key={i} onClick={() => send(qr)} className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors">{qr}</button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send(input)}
                placeholder="Type a message..." className="flex-1 px-4 py-3 rounded-xl bg-surface-100 text-sm outline-none focus:ring-2 focus:ring-primary-500" />
              <button onClick={() => send(input)} className="w-11 h-11 bg-primary-600 text-white rounded-xl flex items-center justify-center hover:bg-primary-700 transition-colors text-lg">→</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
