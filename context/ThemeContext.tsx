"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type ThemeMode = "light" | "dark"
type ThemeFlavor = "default" | "stranger"

interface ThemeContextType {
  mode: ThemeMode
  flavor: ThemeFlavor
  toggleMode: () => void
  toggleFlavor: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  flavor: "default",
  toggleMode: () => {},
  toggleFlavor: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light")
  const [flavor, setFlavor] = useState<ThemeFlavor>("default")

  useEffect(() => {
    const savedMode = localStorage.getItem("tripsathi_theme_mode") as ThemeMode | null
    const savedFlavor = localStorage.getItem("tripsathi_theme_flavor") as ThemeFlavor | null
    if (savedMode) setMode(savedMode)
    if (savedFlavor) setFlavor(savedFlavor)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme-mode", mode)
    root.setAttribute("data-theme-flavor", flavor)
    localStorage.setItem("tripsathi_theme_mode", mode)
    localStorage.setItem("tripsathi_theme_flavor", flavor)
  }, [mode, flavor])

  const toggleMode = () => setMode(prev => prev === "light" ? "dark" : "light")
  const toggleFlavor = () => setFlavor(prev => prev === "default" ? "stranger" : "default")

  return (
    <ThemeContext.Provider value={{ mode, flavor, toggleMode, toggleFlavor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
