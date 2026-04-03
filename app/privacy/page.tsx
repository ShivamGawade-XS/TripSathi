export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-surface-50 py-16">
      <div className="max-w-4xl mx-auto px-4 bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="font-display text-4xl font-bold text-surface-800 mb-2">Privacy Policy</h1>
        <p className="text-surface-500 mb-8 pb-4 border-b">Last updated: April 4, 2026</p>

        <div className="prose prose-surface max-w-none text-surface-600 space-y-6">
          <p>
            At TripSathi, your privacy is our priority. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our platform to book trains, buses, and hotels across India.
          </p>

          <h2 className="text-xl font-bold text-surface-800 pt-4">1. Information We Collect</h2>
          <p>When you register or book a trip, we collect personal data including:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Identity Data:</strong> Full name, age, and gender (required for transport ticketing).</li>
            <li><strong>Contact Data:</strong> Email address and phone numbers.</li>
            <li><strong>Financial Data:</strong> Secure payment tokens (Note: We do not store raw credit card numbers; transactions are processed strictly via Razorpay).</li>
            <li><strong>Device Data:</strong> IP address, browser type, and location data to improve search relevance.</li>
          </ul>

          <h2 className="text-xl font-bold text-surface-800 pt-4">2. How We Use Your Data</h2>
          <p>We primarily use your data to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Process your bookings through third-party operators (IRCTC, airlines, hotels).</li>
            <li>Send ticketing confirmations, delays, and schedule updates.</li>
            <li>Personalize your travel recommendations and Dashboard experience.</li>
          </ul>

          <h2 className="text-xl font-bold text-surface-800 pt-4">3. Data Sharing with Third Parties</h2>
          <p>
            We strictly do not sell your personal data. We share necessary passenger details securely with the specific transport or hospitality provider you book with.
          </p>

          <h2 className="text-xl font-bold text-surface-800 pt-4">4. Your Rights</h2>
          <p>
            Under Indian data privacy regulations, you have the right to request access to your data, or request the permanent deletion of your account and search history.
          </p>
          
          <p className="mt-8 font-medium">To exercise these rights, please email us directly at privacy@tripsathi.com.</p>
        </div>
      </div>
    </div>
  )
}
