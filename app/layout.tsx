import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "TripSathi - One Platform, Every Indian Journey",
  description:
    "TripSathi unifies trains, buses, hotels, and itinerary planning into one seamless platform built for every Indian traveler.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}