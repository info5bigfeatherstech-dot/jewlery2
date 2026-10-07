import React, { useId } from 'react'

export interface AureliaLogoProps {
  /**
   * Layout variant:
   * - 'horizontal': Emblem on left, Brand Name + jewels beside it (best for Navbar/Header)
   * - 'stacked': Emblem centered on top, Brand Name + subtitle below (best for Hero, About, Invoices)
   * - 'mark': Just the royal emblem mark (best for Favicon, Avatar, compact button)
   * - 'badge': Royal medallion crest with circular decorative border
   * - 'full': Horizontal layout with Jaipur artisan subtitle
   */
  variant?: 'horizontal' | 'stacked' | 'mark' | 'badge' | 'full'
  /**
   * Color theme:
   * - 'light': Dark royal navy text (#0A1C42) + 24k gold insignia (for light cream background #FAF7F0)
   * - 'dark': Ivory pearl text (#FAF7F0) + glowing 24k gold insignia (for dark navy background #051025 in Footer)
   * - 'gold': Pure monochrome metallic gold tones
   */
  theme?: 'light' | 'dark' | 'gold'
  /**
   * Standard sizing presets
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Show "Handcrafted Luxury • Jaipur" tagline
   */
  showTagline?: boolean
  /**
   * Additional className
   */
  className?: string
  /**
   * Whether to add a gentle hover shimmer to the gemstone
   */
  animated?: boolean
}

export const AureliaLogoMark: React.FC<{
  size?: number | string
  className?: string
  animated?: boolean
  idPrefix?: string
}> = ({ size = 40, className = '', animated = true, idPrefix }) => {
  const generatedId = useId().replace(/:/g, '')
  const prefix = idPrefix || generatedId

  const goldGradId = `gold-grad-${prefix}`
  const goldLightGradId = `gold-light-${prefix}`
  const goldDarkGradId = `gold-dark-${prefix}`
  const gemGradId = `gem-grad-${prefix}`
  const glowFilterId = `glow-${prefix}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none overflow-visible ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Metallic 24K Royal Gold Gradient */}
        <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D1" />
          <stop offset="25%" stopColor="#F5CF64" />
          <stop offset="50%" stopColor="#D49B24" />
          <stop offset="78%" stopColor="#B37C12" />
          <stop offset="100%" stopColor="#FEE699" />
        </linearGradient>

        {/* Highlight / Shimmer Gold */}
        <linearGradient id={goldLightGradId} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FDE68A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D49B24" stopOpacity="0.5" />
        </linearGradient>

        {/* Deep Gold Shadow */}
        <linearGradient id={goldDarkGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8C5C0B" />
          <stop offset="100%" stopColor="#543707" />
        </linearGradient>

        {/* Brilliant Solitaire Diamond Facet Gradient */}
        <linearGradient id={gemGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#E0F2FE" />
          <stop offset="70%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </linearGradient>

        {/* Subtle Ambient Glow */}
        <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Arch Filigree Halo (Royal Rajputana & Kundan inspired) */}
      <g filter={`url(#${glowFilterId})`}>
        {/* Subtle circular bead halo points */}
        <circle cx="100" cy="18" r="2.2" fill={`url(#${goldGradId})`} />
        <circle cx="78" cy="22" r="1.8" fill={`url(#${goldGradId})`} opacity="0.85" />
        <circle cx="122" cy="22" r="1.8" fill={`url(#${goldGradId})`} opacity="0.85" />
        <circle cx="58" cy="33" r="1.7" fill={`url(#${goldGradId})`} opacity="0.75" />
        <circle cx="142" cy="33" r="1.7" fill={`url(#${goldGradId})`} opacity="0.75" />
        <circle cx="42" cy="50" r="1.6" fill={`url(#${goldGradId})`} opacity="0.7" />
        <circle cx="158" cy="50" r="1.6" fill={`url(#${goldGradId})`} opacity="0.7" />
        <circle cx="30" cy="72" r="1.6" fill={`url(#${goldGradId})`} opacity="0.65" />
        <circle cx="170" cy="72" r="1.6" fill={`url(#${goldGradId})`} opacity="0.65" />
        <circle cx="24" cy="98" r="1.6" fill={`url(#${goldGradId})`} opacity="0.6" />
        <circle cx="176" cy="98" r="1.6" fill={`url(#${goldGradId})`} opacity="0.6" />
        <circle cx="24" cy="124" r="1.5" fill={`url(#${goldGradId})`} opacity="0.5" />
        <circle cx="176" cy="124" r="1.5" fill={`url(#${goldGradId})`} opacity="0.5" />
      </g>

      {/* Decorative Royal Arch Scrollwork Frame */}
      <path
        d="M 32 138 C 22 108, 28 66, 60 40 C 72 30, 85 24, 100 24 C 115 24, 128 30, 140 40 C 172 66, 178 108, 168 138"
        stroke={`url(#${goldGradId})`}
        strokeWidth="1.75"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="none"
        opacity="0.9"
      />

      <path
        d="M 40 132 C 32 106, 38 72, 65 50 C 75 42, 87 36, 100 36 C 113 36, 125 42, 135 50 C 162 72, 168 106, 160 132"
        stroke={`url(#${goldGradId})`}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />

      {/* Crown Apex 4-Point Brilliant Star (North Star / Celestial Sparkle) */}
      <g transform="translate(100, 14)">
        {/* Vertical Spike */}
        <path
          d="M 0 -11 Q 0.6 -2 5 0 Q 0.6 2 0 11 Q -0.6 2 -5 0 Q -0.6 -2 0 -11 Z"
          fill={`url(#${goldGradId})`}
        />
        {/* Core Star Highlight */}
        <circle cx="0" cy="0" r="1.6" fill="#FFFFFF" />
      </g>

      {/* Left Filigree Paisley / Foliage flourish */}
      <path
        d="M 52 48 C 45 42, 38 46, 42 54 C 45 60, 53 58, 56 52 C 54 48, 50 46, 46 47"
        stroke={`url(#${goldGradId})`}
        strokeWidth="1.25"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right Filigree Paisley flourish */}
      <path
        d="M 148 48 C 155 42, 162 46, 158 54 C 155 60, 147 58, 144 52 C 146 48, 150 46, 154 47"
        stroke={`url(#${goldGradId})`}
        strokeWidth="1.25"
        fill="none"
        strokeLinecap="round"
      />

      {/* Solitaire Faceted Diamond (Set at Apex of 'A') */}
      <g id="apex-gem" className={animated ? 'transition-transform duration-500 hover:scale-110 origin-center' : ''}>
        {/* Diamond Outer Silhouette */}
        <polygon
          points="100,52 118,66 100,82 82,66"
          fill={`url(#${gemGradId})`}
          stroke={`url(#${goldGradId})`}
          strokeWidth="1.2"
        />
        {/* Diamond Table & Kite Facets */}
        <polygon
          points="100,52 110,61 100,66 90,61"
          fill="#FFFFFF"
          opacity="0.9"
        />
        <polygon
          points="100,66 118,66 100,82"
          fill="#BAE6FD"
          opacity="0.65"
        />
        <polygon
          points="100,66 82,66 100,82"
          fill="#7DD3FC"
          opacity="0.8"
        />
        {/* Gem Sparkle Cross */}
        <line x1="100" y1="56" x2="100" y2="78" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />
        <line x1="86" y1="66" x2="114" y2="66" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />
        <circle cx="100" cy="66" r="1.4" fill="#FFFFFF" />
      </g>

      {/* Regal Serif Monogram 'A' Structure */}
      {/* Left Pillar Stem of 'A' */}
      <path
        d="M 94 77 L 54 156 L 68 156 L 86 120 L 98 94 Z"
        fill={`url(#${goldGradId})`}
      />
      {/* Left Stem Inner Bevel / Highlight */}
      <path
        d="M 94 77 L 86 120 L 68 156 L 62 156 L 91 80 Z"
        fill={`url(#${goldLightGradId})`}
        opacity="0.75"
      />

      {/* Right Pillar Stem of 'A' (with golden depth) */}
      <path
        d="M 106 77 L 146 156 L 132 156 L 114 120 L 102 94 Z"
        fill={`url(#${goldGradId})`}
      />
      {/* Right Stem Shadow Accent */}
      <path
        d="M 106 77 L 114 120 L 132 156 L 138 156 L 109 80 Z"
        fill={`url(#${goldDarkGradId})`}
        opacity="0.45"
      />

      {/* Base Footing Serif Left */}
      <path
        d="M 46 156 L 76 156 C 76 156, 73 153, 67 153 L 53 153 C 48 153, 46 156, 46 156 Z"
        fill={`url(#${goldGradId})`}
      />
      {/* Base Footing Serif Right */}
      <path
        d="M 124 156 L 154 156 C 154 156, 151 153, 147 153 L 133 153 C 127 153, 124 156, 124 156 Z"
        fill={`url(#${goldGradId})`}
      />

      {/* Ornate Flowing Ribbon / Sash Crossbar (The signature royal loop) */}
      <path
        d="M 44 116 C 58 108, 76 112, 92 122 C 100 127, 108 136, 104 145 C 100 152, 91 150, 89 142 C 86 132, 102 118, 122 114 C 138 111, 152 118, 158 126 C 160 130, 156 135, 150 134 C 142 133, 134 124, 120 122 C 108 120, 96 128, 88 138 C 82 147, 84 156, 94 158 C 106 160, 114 149, 118 138"
        stroke={`url(#${goldGradId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Ribbon Fine Highlight */}
      <path
        d="M 46 116 C 60 109, 78 113, 94 123 C 101 128, 107 135, 105 142"
        stroke={`url(#${goldLightGradId})`}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Tiny lower accent diamond below crossbar */}
      <polygon
        points="100,166 103,171 100,176 97,171"
        fill={`url(#${goldGradId})`}
      />
      <circle cx="90" cy="171" r="1.2" fill={`url(#${goldGradId})`} opacity="0.75" />
      <circle cx="110" cy="171" r="1.2" fill={`url(#${goldGradId})`} opacity="0.75" />
    </svg>
  )
}

export const AureliaLogo: React.FC<AureliaLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  showTagline = true,
  className = '',
  animated = true,
}) => {
  // Size mappings
  const markSizeMap = {
    sm: 32,
    md: 40,
    lg: 52,
    xl: 68,
  }
  const markPx = markSizeMap[size]

  // Color mappings based on theme
  const brandTextColor =
    theme === 'dark'
      ? 'text-[#FAF7F0]'
      : theme === 'gold'
      ? 'text-[#D49B24]'
      : 'text-[#0A1C42]'

  const jewelsColor =
    theme === 'dark'
      ? 'text-[#D49B24]'
      : theme === 'gold'
      ? 'text-[#F5CF64]'
      : 'text-[#D49B24]'

  const taglineColor =
    theme === 'dark'
      ? 'text-[#EADBCE]/80'
      : theme === 'gold'
      ? 'text-[#D49B24]/80'
      : 'text-[#7A584A]'

  const diamondStarColor =
    theme === 'dark' ? 'text-[#D49B24]' : 'text-[#D49B24]'

  // If mark-only variant
  if (variant === 'mark') {
    return (
      <AureliaLogoMark
        size={markPx}
        className={className}
        animated={animated}
      />
    )
  }

  // If stacked variant (Emblem centered on top, wordmark below)
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <AureliaLogoMark
          size={markPx * 1.3}
          className="mb-2.5 transition-transform duration-300 hover:scale-105"
          animated={animated}
        />
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-2">
            <span
              className={`font-serif tracking-tight font-bold ${brandTextColor} ${
                size === 'sm'
                  ? 'text-lg'
                  : size === 'md'
                  ? 'text-2xl'
                  : size === 'lg'
                  ? 'text-3xl'
                  : 'text-4xl'
              }`}
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
            >
              Aurelia
            </span>
            <span
              className={`font-serif font-normal uppercase tracking-[0.22em] ${jewelsColor} ${
                size === 'sm'
                  ? 'text-xs'
                  : size === 'md'
                  ? 'text-sm'
                  : size === 'lg'
                  ? 'text-base'
                  : 'text-lg'
              }`}
            >
              Jewels
            </span>
          </div>

          {showTagline && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`text-[7px] ${diamondStarColor}`}>✦</span>
              <span
                className={`text-[9px] uppercase tracking-[0.28em] font-medium ${taglineColor}`}
              >
                Handcrafted Luxury • Jaipur
              </span>
              <span className={`text-[7px] ${diamondStarColor}`}>✦</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // If badge variant (surrounded by luxury circular medallion)
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#D49B24]/40 bg-gradient-to-r ${
          theme === 'dark'
            ? 'from-[#0A1C42]/80 via-[#081734]/90 to-[#0A1C42]/80'
            : 'from-[#FAF7F0] via-[#FFFFFF] to-[#FAF7F0]'
        } shadow-sm backdrop-blur-sm select-none ${className}`}
      >
        <AureliaLogoMark size={markPx * 0.9} animated={animated} />
        <div className="flex flex-col text-left">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-serif font-bold text-base tracking-tight ${brandTextColor}`}
            >
              Aurelia
            </span>
            <span
              className={`font-serif font-normal text-xs uppercase tracking-[0.2em] ${jewelsColor}`}
            >
              Jewels
            </span>
          </div>
          {showTagline && (
            <span
              className={`text-[8px] uppercase tracking-[0.22em] font-medium -mt-0.5 ${taglineColor}`}
            >
              Jaipur Atelier
            </span>
          )}
        </div>
      </div>
    )
  }

  // Default: Horizontal / Full (Navbar / Header layout)
  return (
    <div
      className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none text-left ${className}`}
    >
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Soft background aura on dark theme */}
        {theme === 'dark' && (
          <div className="absolute inset-0 bg-[#D49B24]/10 rounded-full blur-md" />
        )}
        <AureliaLogoMark
          size={markPx}
          className="transition-transform duration-300 group-hover:scale-105"
          animated={animated}
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span
            className={`font-serif tracking-tight font-bold transition-colors ${brandTextColor} ${
              size === 'sm'
                ? 'text-base sm:text-lg'
                : size === 'md'
                ? 'text-lg sm:text-xl xl:text-2xl'
                : size === 'lg'
                ? 'text-2xl sm:text-3xl'
                : 'text-3xl sm:text-4xl'
            }`}
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
          >
            Aurelia
          </span>
          <span
            className={`font-serif font-normal uppercase tracking-[0.22em] ${jewelsColor} ${
              size === 'sm'
                ? 'text-[11px] sm:text-xs'
                : size === 'md'
                ? 'text-xs sm:text-sm xl:text-base'
                : size === 'lg'
                ? 'text-sm sm:text-base'
                : 'text-base sm:text-lg'
            }`}
          >
            Jewels
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 -mt-0.5 hidden sm:flex">
            <span className={`text-[7px] ${diamondStarColor} transition-transform group-hover:rotate-45 duration-300`}>✦</span>
            <span
              className={`text-[9px] sm:text-[10px] uppercase tracking-[0.24em] font-medium ${taglineColor}`}
            >
              Handcrafted Luxury
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default AureliaLogo
