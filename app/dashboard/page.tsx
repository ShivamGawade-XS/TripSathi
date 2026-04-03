"use client"
import { useState, useEffect } from "react"
import { getMyItineraries } from "@/lib/api"
import TripCard from "@/components/dashboard/TripCard"
import Spinner from "@/components/ui/Spinner"
import EmptyState from "@/components/ui/EmptyState"
import Link from "next/link"

export default function DashboardPage() {
  const [trips, setTrips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("tripsathi_token") : null
    if (!token) {
      setLoading(false)
      setError("login_required")
      return
    }

    getMyItineraries(token)
      .then((data) => setTrips(data))
      .catch(() => setError("Failed to load saved trips"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="py-20"><Spinner size="lg" /></div>
    )
  }

  if (error === "login_required") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-surface-900 mb-3">Sign in to view saved trips</h1>
        <p className="text-surface-500 mb-6">You need an account to save and manage your trip itineraries.</p>
        <div className="flex justify-center gap-3">
          <Link href="/login" className="btn-primary">Login</Link>
          <Link href="/register" className="btn-secondary">Create Account</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-surface-900">Saved Trips</h1>
          <p className="text-surface-500 mt-1">Your saved travel itineraries</p>
        </div>
        <Link href="/search" className="btn-primary text-sm py-2 px-4">
          + New Trip
        </Link>
      </div>

      {trips.length === 0 ? (
        <EmptyState
          title="No saved trips yet"
          description="Search for a route, build your itinerary, and save it here."
          icon="✈️"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trips.map((trip: any) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  )
}
