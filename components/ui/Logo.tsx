"use client"
import { useTheme } from "@/context/ThemeContext"

export default function Logo({ className = "h-8" }: { className?: string }) {
  let textColor = "#1E293B"
  let accentColor = "#4F46E5"

  // This is a safe try/catch because Logo can render before ThemeProvider mounts
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { mode, flavor } = useTheme()
    if (flavor === "stranger") {
      textColor = "#ff3333"
      accentColor = "#ff4500"
    } else if (mode === "dark") {
      textColor = "#f1f5f9"
      accentColor = "#59b0ff"
    }
  } catch {
    // ThemeProvider not mounted yet, keep defaults
  }

  return (
    <svg 
      className={className} 
      viewBox="0 0 400 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Icon: Modern Travel Swoosh */}
      <g transform="translate(10, 10)">
        <path 
          d="M40 70C60 70 75 55 75 35C75 15 60 0 40 0C20 0 5 15 5 35C5 55 20 70 40 70Z" 
          fill="url(#paint0_linear)"
        />
        <path 
          d="M20 45L40 25L60 45" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M40 25V65" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        <path 
          d="M5 80C25 80 45 85 75 85" 
          stroke="url(#paint1_linear)" 
          strokeWidth="8" 
          strokeLinecap="round" 
        />
      </g>
      
      {/* Text */}
      <text 
        x="100" 
        y="68" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="800" 
        fontSize="56" 
        fill={textColor}
        letterSpacing="-1.5"
        style={{ transition: "fill 0.4s ease" }}
      >
        Trip<tspan fill={accentColor}>Sathi</tspan>
      </text>

      {/* Gradients */}
      <defs>
        <linearGradient id="paint0_linear" x1="5" y1="0" x2="75" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor={accentColor} />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="5" y1="80" x2="75" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#EF4444" />
        </linearGradient>
      </defs>
    </svg>
  )
}
