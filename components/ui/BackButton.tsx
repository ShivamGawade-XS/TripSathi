"use client"
import { useRouter, usePathname } from "next/navigation"

export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === "/") return null

  return (
    <button
      onClick={() => router.back()}
      className="fixed bottom-6 left-6 z-40 bg-surface-900/80 hover:bg-surface-900 border border-white/20 text-white shadow-xl backdrop-blur-md px-4 py-2.5 rounded-full flex items-center justify-center gap-2 font-medium transition-all hover:-translate-x-1"
    >
      <span className="text-xl leading-none">←</span> Back
    </button>
  )
}
