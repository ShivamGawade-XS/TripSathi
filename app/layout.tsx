import type { Metadata } from "next"
import "./globals.css"
import Layout from "@/components/layout/Layout"

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
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}