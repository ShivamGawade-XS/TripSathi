export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-50 py-16">
      <div className="max-w-4xl mx-auto px-4 bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="font-display text-4xl font-bold text-surface-800 mb-2">Terms of Service</h1>
        <p className="text-surface-500 mb-8 pb-4 border-b">Last updated: April 4, 2026</p>

        <div className="prose prose-surface max-w-none text-surface-600 space-y-6">
          <p>
            Welcome to TripSathi! By accessing our website, mobile application, or any associated platform, you agree to be bound by the following Terms and Conditions.
          </p>

          <h2 className="text-xl font-bold text-surface-800 pt-4">1. Acceptance of Terms</h2>
          <p>
            TripSathi is an aggregation service designed to help you plan, search, and book travel. By placing a booking, you enter into a direct, legally binding contract with the respective transport operator, hotel, or touring agency.
          </p>

          <h2 className="text-xl font-bold text-surface-800 pt-4">2. Accuracy of Information</h2>
          <p>
            While we strive to ensure that all information displays (including timings, prices, and amenities) are accurately synced from our partners, TripSathi is not liable for sudden schedule changes, strikes, delays, or localized unavailability enacted by the operators.
          </p>

          <h2 className="text-xl font-bold text-surface-800 pt-4">3. User Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>You must provide accurate Government-verified IDs when booking tickets.</li>
            <li>You must be at least 18 years old to create an account and make a payment.</li>
            <li>Do not engage in ticketing fraud, scalping, or automated bot bookings.</li>
          </ul>

          <h2 className="text-xl font-bold text-surface-800 pt-4">4. Limitation of Liability</h2>
          <p>
            TripSathi acts solely as a booking facilitator. Any compensation for denied boarding, poor hospitality quality, or lost luggage must be routed directly to the underlying service provider.
          </p>
        </div>
      </div>
    </div>
  )
}
