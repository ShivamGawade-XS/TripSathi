"use client"
import Link from "next/link"

export default function CareersPage() {
  const jobs = [
    { title: "Senior Frontend Engineer", dept: "Engineering", loc: "Bengaluru / Remote", type: "Full-time" },
    { title: "Product Manager - Travel", dept: "Product", loc: "Gurgaon", type: "Full-time" },
    { title: "Customer Success Exec", dept: "Support", loc: "Mumbai", type: "Full-time" },
    { title: "Travel Content Writer", dept: "Marketing", loc: "Remote", type: "Contract" },
  ]

  return (
    <div className="min-h-screen bg-surface-50 pb-16">
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-20 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold">Join the TripSathi Team</h1>
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">We are building the infrastructure for Indian travel. Help us make journeys unforgettable.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-surface-800 mb-6">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <div key={idx} className="border border-surface-200 rounded-xl p-5 hover:border-primary-500 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-surface-800">{job.title}</h3>
                  <div className="flex gap-3 text-sm text-surface-500 mt-2">
                    <span className="bg-surface-100 px-2 py-1 rounded-md">{job.dept}</span>
                    <span className="flex items-center">📍 {job.loc}</span>
                    <span className="flex items-center">⏱️ {job.type}</span>
                  </div>
                </div>
                <button className="btn-primary py-2 px-6">Apply Now</button>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-primary-50 rounded-xl text-center">
            <h3 className="font-bold text-primary-800 text-lg">Don&apos;t see a perfect fit?</h3>
            <p className="text-primary-600 mt-2">Send us your resume at <strong>careers@tripsathi.com</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}
