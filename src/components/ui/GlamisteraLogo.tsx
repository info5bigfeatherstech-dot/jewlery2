import React from 'react'
import glamisteraLogoImg from '@/assets/glaMIStera LOGO.png'

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
   * - 'light': For light cream background (#FAF7F0) / white
   * - 'dark': For dark navy background (#051025) in Footer
   * - 'gold': Gold accent framing
   */
  theme?: 'light' | 'dark' | 'gold'
  /**
   * Standard sizing presets
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

const sizeMap = {
  sm: 'h-8 sm:h-9',
  md: 'h-11 sm:h-12 md:h-13',
  lg: 'h-16 sm:h-20',
  xl: 'h-20 sm:h-24',
}

const markSizeMap = {
  sm: 36,
  md: 48,
  lg: 64,
  xl: 80,
}

export const GlamisteraLogoMark: React.FC<{
  size?: number | string
  className?: string
  animated?: boolean
}> = ({ size = 48, className = '', animated = true }) => {
  const sizeStyle = typeof size === 'number' ? { width: size, height: size } : { width: size, height: size }

  return (
    <div
      style={sizeStyle}
      className={`relative inline-flex items-center justify-center rounded-2xl bg-[#FAF7F0] p-1 border border-[#D49B24]/40 shadow-sm overflow-hidden shrink-0 select-none ${
        animated ? 'transition-transform duration-300 hover:scale-105' : ''
      } ${className}`}
      aria-label="glaMISTERa Mark"
    >
      <img
        src={glamisteraLogoImg}
        alt="glaMISTERa"
        className="w-full h-full object-contain mix-blend-multiply"
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

  // Dark theme presentation: wrap in luxury ivory capsule so the artwork and typography pop vividly
  if (theme === 'dark') {
    return (
      <div
        className={`inline-flex items-center justify-center bg-[#FAF7F0] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl border border-[#D49B24]/50 shadow-md transition-all duration-300 ${
          animated ? 'hover:border-[#D49B24] hover:shadow-[#D49B24]/20 hover:scale-[1.02]' : ''
        } ${className}`}
      >
        <img
          src={glamisteraLogoImg}
          alt="glaMISTERa - Jewellery for Every You"
          className={`${heightClass} w-auto object-contain mix-blend-multiply select-none`}
          loading="eager"
        />
      </div>
    )
  }

  // Badge variant
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center justify-center bg-[#FAF7F0] px-4 py-2 rounded-full border border-[#D49B24]/40 shadow-sm backdrop-blur-sm select-none transition-all duration-300 ${
          animated ? 'hover:scale-105' : ''
        } ${className}`}
      >
        <img
          src={glamisteraLogoImg}
          alt="glaMISTERa"
          className={`${heightClass} w-auto object-contain mix-blend-multiply`}
          loading="eager"
        />
      </div>
    )
  }

  // Stacked variant (for Hero, About showcase)
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
        <img
          src={glamisteraLogoImg}
          alt="glaMISTERa - Jewellery for Every You"
          className={`${heightClass} w-auto object-contain mix-blend-multiply transition-transform duration-300 ${
            animated ? 'hover:scale-105' : ''
          }`}
          loading="eager"
        />
      </div>
    )
  }

  // Default: Horizontal presentation (Navbar / Header layout)
  return (
    <div
      className={`inline-flex items-center select-none transition-transform duration-300 ${
        animated ? 'hover:scale-[1.02]' : ''
      } ${className}`}
    >
      <img
        src={glamisteraLogoImg}
        alt="glaMISTERa - Jewellery for Every You"
        className={`${heightClass} w-auto object-contain mix-blend-multiply`}
        loading="eager"
      />
    </div>
  )
}

// Backwards-compatible aliases
export const AureliaLogo = GlamisteraLogo
export const AureliaLogoMark = GlamisteraLogoMark

export default GlamisteraLogo
