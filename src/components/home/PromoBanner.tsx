import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'

interface PromoBannerProps {
  id?: string
  tag: string
  title: string
  subtitle: string
  description: string
  ctaText: string
  ctaLink: string
  image: string
  badgeText?: string
  reverse?: boolean
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  id,
  tag,
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  image,
  badgeText,
  reverse = false
}) => {
  const bannerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start']
  })

  // Subtle smooth parallax transform
  const yParallax = useTransform(scrollYProgress, [0, 1], [-25, 25])

  return (
    <section id={id} ref={bannerRef} className="py-12 sm:py-16 bg-[#FAF7F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative rounded-3xl overflow-hidden shadow-festive border border-[#EADBCE] bg-[#051126] text-white flex flex-col ${
            reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
          } items-center min-h-[460px] group shine-sweep`}
        >
          {/* Visual Background / Image Container with Parallax Effect */}
          <div className="relative w-full lg:w-1/2 h-72 sm:h-96 lg:h-[480px] overflow-hidden">
            <motion.img
              style={{ y: yParallax }}
              src={image}
              alt={title}
              className="w-full h-[120%] object-cover object-center filter brightness-[0.88] transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#051126] via-transparent to-transparent opacity-80" />
            
            {badgeText && (
              <div className="absolute top-6 left-6 z-10 bg-[#FAF7F0]/90 text-[#0A1C42] backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 border border-[#D49B24]/40">
                <ShieldCheck className="w-4 h-4 text-[#D49B24]" />
                <span>{badgeText}</span>
              </div>
            )}
          </div>

          {/* Copy & CTA Side */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-14 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D49B24] text-xs font-semibold uppercase tracking-wider w-fit mb-3 border border-[#D49B24]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tag}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2">
              {title}
            </h3>

            <p className="text-[#D49B24] font-medium text-sm sm:text-base mb-3 font-serif italic">
              {subtitle}
            </p>

            <p className="text-white/80 text-sm leading-relaxed mb-6 font-light max-w-lg">
              {description}
            </p>

            <div className="flex items-center gap-4">
              <a
                href={ctaLink}
                className="inline-flex items-center gap-2 bg-[#D49B24] hover:bg-[#b58017] text-[#06142E] px-6 py-3.5 rounded-full font-bold text-sm shadow-festive transition-all transform hover:-translate-y-0.5 group/btn"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
