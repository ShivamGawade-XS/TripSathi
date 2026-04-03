"use client"
import Header from "./Header"
import Footer from "./Footer"
import MobileNav from "./MobileNav"
import ChatWidget from "@/components/ui/ChatWidget"
import { LanguageProvider } from "@/context/LanguageContext"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileNav />
        <ChatWidget />
      </div>
    </LanguageProvider>
  )
}
