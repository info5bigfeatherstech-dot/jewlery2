import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Check, Copy } from 'lucide-react'
import { useToastStore } from '@/store/useToast'
import confetti from 'canvas-confetti'

export const HeroSlider: React.FC = () => {
  const [copied, setCopied] = useState(false)
  const { addToast } = useToastStore()

  const handleCopyCoupon = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText('Rang10')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.6, x: 0.7 },
      colors: ['#D49B24', '#FBBF24', '#FFFFFF', '#EC4899']
    })

    addToast({
      title: 'Coupon Rang10 Copied!',
      description: '10% discount applied for orders of Rs. 499 & above at checkout.',
      type: 'success'
    })
  }

  const handleShopNow = () => {
    document.getElementById('jhumkas-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative w-full bg-[#051126] overflow-hidden select-none"
      aria-label="Festive Jewellery Hero Banner"
    >
      {/* Golden Sparkle Lighting Particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FBBF24]"
            style={{
              width: i % 2 === 0 ? '4px' : '3px',
              height: i % 2 === 0 ? '4px' : '3px',
              left: `${(i * 12 + 8) % 92}%`,
              top: `${(i * 14 + 10) % 85}%`,
              boxShadow: '0 0 8px #FBBF24',
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.4, 0.8],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3 + (i % 3) * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main Full-Width Hero Banner Image */}
      <div className="relative max-w-[1920px] mx-auto w-full">
        <a
          href="#jhumkas-section"
          onClick={handleShopNow}
          className="block relative w-full cursor-pointer group"
          aria-label="Shop Timeless Elegance Jewellery Collection"
        >
          <img
            src="/images/hero-banner.png"
            alt="Timeless Elegance Jewellery That Defines You - Bracelets, Necklaces, Earrings, Rings - Use Coupon Code Rang10"
            className="w-full h-auto block object-cover filter brightness-[1.02] contrast-[1.02]"
            loading="eager"
          />

          {/* Interactive Clickable Hotspot for Coupon Code 'Rang10' on the right side */}
          <div
            onClick={handleCopyCoupon}
            className="absolute top-[48%] right-[5%] sm:right-[7%] lg:right-[8%] -translate-y-1/2 w-[28%] sm:w-[22%] lg:w-[18%] h-[20%] sm:h-[18%] rounded-xl z-20 cursor-pointer flex items-center justify-center transition-all group/coupon"
            title="Click to copy coupon code Rang10"
          >
            {/* Subtle glow hint on hover */}
            <span className="absolute inset-0 rounded-xl bg-yellow-400/0 group-hover/coupon:bg-yellow-400/10 transition-colors border border-transparent group-hover/coupon:border-yellow-400/40" />

            {copied && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-10 bg-[#0A1C42] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg border border-[#D49B24] flex items-center gap-1 whitespace-nowrap z-30 pointer-events-none"
              >
                <Check className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Code Copied!</span>
              </motion.div>
            )}
          </div>

          {/* Interactive Clickable Hotspot for 'SHOP NOW' button */}
          <div
            onClick={handleShopNow}
            className="absolute bottom-[22%] right-[16%] sm:right-[18%] lg:right-[20%] w-[26%] sm:w-[20%] lg:w-[17%] h-[14%] sm:h-[12%] rounded-full z-20 cursor-pointer transition-all group/btn"
            title="Shop Now"
          >
            <span className="absolute inset-0 rounded-full bg-white/0 group-hover/btn:bg-white/10 transition-colors" />
          </div>
        </a>
      </div>
    </section>
  )
}
