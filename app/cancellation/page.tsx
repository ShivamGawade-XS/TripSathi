export default function CancellationPage() {
  return (
    <div className="min-h-screen bg-surface-50 py-16">
      <div className="max-w-4xl mx-auto px-4 bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="font-display text-4xl font-bold text-surface-800 mb-2">Cancellation Policy</h1>
        <p className="text-surface-500 mb-8 pb-4 border-b">Last updated: April 4, 2026</p>

        <div className="prose prose-surface max-w-none text-surface-600 space-y-6">
          <p>
            At TripSathi, we understand that travel plans change. We enforce a transparent cancellation policy dictated by our partner networks.
          </p>

          <h2 className="text-xl font-bold text-surface-800 pt-4">1. Tour Packages</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>48+ Hours Before Departure:</strong> Free Cancellation (100% Refund minus transaction fees).</li>
            <li><strong>24 to 48 Hours Before Departure:</strong> 50% Penalty.</li>
            <li><strong>Less than 24 Hours:</strong> No Show / No Refund.</li>
          </ul>

          <h2 className="text-xl font-bold text-surface-800 pt-4">2. Hotel Bookings</h2>
          <p>
            Hotel cancellation policies vary drastically depending on the specific property and room rate chosen (e.g., "Non-Refundable" vs "Flexible"). Please review the exact hotel terms displayed on the booking details page. Generally, a 24-hour notice is required to avoid a one-night charge penalty.
          </p>

          <h2 className="text-xl font-bold text-surface-800 pt-4">3. IRCTC Train Tickets</h2>
          <p>
            Train cancellations adhere strictly to Indian Railways rules. E-tickets can be cancelled online through your TripSathi dashboard up until chart preparation (usually 4 hours before departure). Standard IRCTC deduction charges apply (ranging from ₹60 to ₹240 depending on your AC class). Waitlisted (WL) e-tickets that do not confirm are auto-cancelled.
          </p>

          <h2 className="text-xl font-bold text-surface-800 pt-4">4. How to Cancel</h2>
          <p>
            To initiate a cancellation, log in to your account, navigate to <strong>My Trips</strong>, select your booking, and click the red "Cancel Booking" button.
          </p>
        </div>
      </div>
    </div>
  )
}
