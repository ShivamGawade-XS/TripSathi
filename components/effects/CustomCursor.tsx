"use client"
import { useEffect, useRef } from "react"
import { useTheme } from "@/context/ThemeContext"

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  
  let flavor = "default"
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme()
    flavor = theme.flavor
  } catch {}

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return

    let mouseX = 0, mouseY = 0
    let outerX = 0, outerY = 0

    const moveMouse = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      inner.style.left = mouseX + "px"
      inner.style.top = mouseY + "px"
    }

    const animate = () => {
      outerX += (mouseX - outerX) * 0.15
      outerY += (mouseY - outerY) * 0.15
      outer.style.left = outerX + "px"
      outer.style.top = outerY + "px"
      requestAnimationFrame(animate)
    }

    const grow = () => {
      outer.style.width = "50px"
      outer.style.height = "50px"
      inner.style.transform = "translate(-50%,-50%) scale(0.5)"
    }
    const shrink = () => {
      outer.style.width = "32px"
      outer.style.height = "32px"
      inner.style.transform = "translate(-50%,-50%) scale(1)"
    }

    document.addEventListener("mousemove", moveMouse)
    document.querySelectorAll("a, button, [role=button], input, select, textarea").forEach(el => {
      el.addEventListener("mouseenter", grow)
      el.addEventListener("mouseleave", shrink)
    })

    requestAnimationFrame(animate)
    document.body.style.cursor = "none"

    return () => {
      document.removeEventListener("mousemove", moveMouse)
      document.body.style.cursor = ""
    }
  }, [])

  const color = flavor === "stranger" ? "rgba(255,50,50,0.6)" : "rgba(79,70,229,0.5)"
  const dotColor = flavor === "stranger" ? "#ff3333" : "#4F46E5"

  return (
    <>
      <div ref={outerRef}
        className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: 32, height: 32, borderRadius: "50%",
          border: `2px solid ${color}`,
          transform: "translate(-50%,-50%)",
          transition: "width 0.3s ease, height 0.3s ease",
        }} />
      <div ref={innerRef}
        className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 6, height: 6, borderRadius: "50%",
          backgroundColor: dotColor,
          transform: "translate(-50%,-50%)",
          transition: "transform 0.2s ease",
        }} />
    </>
  )
}
