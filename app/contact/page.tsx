"use client"
import { useState } from "react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-surface-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-surface-800">Contact Us</h1>
          <p className="mt-2 text-surface-500">We&apos;re here to help and answer any questions you might have.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-surface-800 mb-6">Send a Message</h2>
            {submitted ? (
              <div className="bg-green-50 text-green-700 p-6 rounded-xl text-center">
                <span className="text-3xl block mb-2">✅</span>
                <p className="font-bold">Message sent successfully!</p>
                <p className="text-sm mt-1">Our team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1">First Name</label>
                    <input required className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1">Last Name</label>
                    <input required className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">Email Address</label>
                  <input type="email" required className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">Message</label>
                  <textarea required rows={4} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500 outline-none resize-none"></textarea>
                </div>
                <button type="submit" className="btn-primary w-full py-3">Send Message</button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-8 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl">📍</div>
              <div>
                <h3 className="font-bold text-surface-800 text-lg">Headquarters</h3>
                <p className="text-surface-500 mt-1">TripSathi Tower, Cyber City<br />Gurugram, Haryana 122002<br />India</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-8 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl">📞</div>
              <div>
                <h3 className="font-bold text-surface-800 text-lg">Phone Support</h3>
                <p className="text-surface-500 mt-1">Call us toll-free:<br /><strong>1800-TRIP-SAT</strong><br />Available 24/7</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl">✉️</div>
              <div>
                <h3 className="font-bold text-surface-800 text-lg">Email Support</h3>
                <p className="text-surface-500 mt-1">For general queries:<br /><strong>support@tripsathi.com</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
