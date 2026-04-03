export default function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 400 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Icon: Modern Travel Swoosh / Train Element */}
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
        {/* Dynamic sweeping train track curve */}
        <path 
          d="M5 80C25 80 45 85 75 85" 
          stroke="url(#paint1_linear)" 
          strokeWidth="8" 
          strokeLinecap="round" 
        />
      </g>
      
      {/* Beautiful Extralarge Text */}
      <text 
        x="100" 
        y="68" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="800" 
        fontSize="56" 
        fill="#1E293B" 
        letterSpacing="-1.5"
      >
        Trip<tspan fill="#4F46E5">Sathi</tspan>
      </text>

      {/* Gradients */}
      <defs>
        <linearGradient id="paint0_linear" x1="5" y1="0" x2="75" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
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
