import React from 'react'
import glamisteraLogoImg from '@/assets/glamistera-logo-transparent.png'

export interface GlamisteraLogoProps {
  /**
   * Layout variant:
   * - 'horizontal': Standard navbar / header presentation
   * - 'stacked': Centered showcase presentation (About, Hero, invoices)
   * - 'mark': Compact avatar / icon mark (Login modal, badges)
   * - 'badge': Luxury bordered medallion card
   * - 'full': High-impact branding banner
   */
  variant?: 'horizontal' | 'stacked' | 'mark' | 'badge' | 'full'
  /**
   * Color theme:
   * - 'light': Transparent on light background (#FAF7F0) / white
   * - 'dark': Transparent with luxury backlight / framing for dark background (#051025) in Footer
   * - 'gold': Gold accent framing
   */
  theme?: 'light' | 'dark' | 'gold'
  /**
   * Standard sizing presets:
   * - 'sm': Mobile / compact
   * - 'md': Default navbar (large & prominent)
   * - 'lg': Featured showcase
   * - 'xl': Extra large hero display
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Show tagline
   */
  showTagline?: boolean
  /**
   * Additional className
   */
  className?: string
  /**
   * Interactive hover effect
   */
  animated?: boolean
}

// Generously sized presets so the inner logo artwork & typography are big and clear
const sizeMap = {
  sm: 'h-11 sm:h-12',
  md: 'h-16 sm:h-18 md:h-20 lg:h-22',
  lg: 'h-22 sm:h-26 md:h-30',
  xl: 'h-30 sm:h-36 md:h-44',
}

const markSizeMap = {
  sm: 44,
  md: 60,
  lg: 80,
  xl: 104,
}

export const GlamisteraLogoMark: React.FC<{
  size?: number | string
  className?: string
  animated?: boolean
}> = ({ size = 60, className = '', animated = true }) => {
  const sizeStyle = typeof size === 'number' ? { width: size, height: size } : { width: size, height: size }

  return (
    <div
      style={sizeStyle}
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${
        animated ? 'transition-transform duration-300 hover:scale-105' : ''
      } ${className}`}
      aria-label="glaMISTERa Mark"
    >
      <img
        src={glamisteraLogoImg}
        alt="glaMISTERa"
        className="w-full h-full object-contain filter drop-shadow-sm"
        loading="eager"
      />
    </div>
  )
}

export const GlamisteraLogo: React.FC<GlamisteraLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  className = '',
  animated = true,
}) => {
  const heightClass = sizeMap[size] || sizeMap.md
  const markPx = markSizeMap[size] || markSizeMap.md

  // Mark-only variant
  if (variant === 'mark') {
    return <GlamisteraLogoMark size={markPx} className={className} animated={animated} />
  }

  // Dark theme presentation (e.g. Footer):
  // Logo has transparent background; on dark navy, an elegant luminous pill or soft backdrop
  // ensures both the pink and deep blue lettering remain crystal-clear
  if (theme === 'dark') {
    return (
      <div
        className={`inline-flex items-center justify-center bg-white/95 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl shadow-lg border border-[#D49B24]/40 transition-all duration-300 ${
          animated ? 'hover:scale-[1.03] hover:shadow-[#D49B24]/30' : ''
        } ${className}`}
      >
        <img
          src={glamisteraLogoImg}
          alt="glaMISTERa - Jewellery for Every You"
          className={`${heightClass} w-auto object-contain select-none`}
          loading="eager"
        />
      </div>
    )
  }

  // Badge variant
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center justify-center bg-white/90 px-5 py-2.5 rounded-full border border-[#D49B24]/40 shadow-sm backdrop-blur-sm select-none transition-all duration-300 ${
          animated ? 'hover:scale-105' : ''
        } ${className}`}
      >
        <img
          src={glamisteraLogoImg}
          alt="glaMISTERa"
          className={`${heightClass} w-auto object-contain`}
          loading="eager"
        />
      </div>
    )
  }

  // Stacked variant (for About page, Hero showcase)
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
        <img
          src={glamisteraLogoImg}
          alt="glaMISTERa - Jewellery for Every You"
          className={`${heightClass} w-auto object-contain transition-transform duration-300 ${
            animated ? 'hover:scale-105' : ''
          }`}
          loading="eager"
        />
      </div>
    )
  }

  // Default: Horizontal presentation (Navbar / Header layout)
  // Completely transparent background - just showing the inner logo artwork & typography
  return (
    <div
      className={`inline-flex items-center select-none transition-transform duration-300 ${
        animated ? 'hover:scale-[1.03]' : ''
      } ${className}`}
    >
      <img
        src={glamisteraLogoImg}
        alt="glaMISTERa - Jewellery for Every You"
        className={`${heightClass} w-auto object-contain drop-shadow-sm`}
        loading="eager"
      />
    </div>
  )
}

// Backwards-compatible aliases
export const AureliaLogo = GlamisteraLogo
export const AureliaLogoMark = GlamisteraLogoMark

export default GlamisteraLogo
