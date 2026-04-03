export default function RefundPage() {
  return (
    <div className="min-h-screen bg-surface-50 py-16">
      <div className="max-w-4xl mx-auto px-4 bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="font-display text-4xl font-bold text-surface-800 mb-2">Refund Policy</h1>
        <p className="text-surface-500 mb-8 pb-4 border-b">Last updated: April 4, 2026</p>

        <div className="prose prose-surface max-w-none text-surface-600 space-y-6">
          <p>
            This Refund Policy outlines how financial returns are processed when a booking is modified, cancelled, or fails during the payment gateway process.
          </p>

          <h2 className="text-xl font-bold text-surface-800 pt-4">1. Payment Gateway Failures</h2>
          <p>
            If your booking fails but money was deducted from your bank account or UPI wallet, please do not panic. The money is held securely by Razorpay and will be auto-refunded to your original payment method within <strong>3 to 5 business days</strong>.
          </p>

          <h2 className="text-xl font-bold text-surface-800 pt-4">2. Successful Cancellations</h2>
          <p>
            If you proactively cancel an active booking through our Dashboard platform within the allowable cancellation window, your refund will be securely deposited to your original payment method within <strong>5 to 7 business days</strong>.
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>Any applicable convenience fees or payment gateway charges are non-refundable.</li>
            <li>Refunds for Tour Packages are subject to the specific Tour Operator&apos;s contractual penalties.</li>
          </ul>

          <h2 className="text-xl font-bold text-surface-800 pt-4">3. Operator-Initiated Cancellations</h2>
          <p>
            In the event that an airline, bus operator, or train (IRCTC) cancels your journey entirely due to weather, strikes, or operational faults, you are entitled to a <strong>100% full refund</strong> including convenience fees. This requires no action on your part and will be processed immediately upon official confirmation.
          </p>
        </div>
      </div>
    </div>
  )
}
