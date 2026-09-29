import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Flame, HeartHandshake, Watch, ShieldCheck, Crown, Gem, Palette } from 'lucide-react'
import { quickCategories } from '@/data/categories'

export const QuickCategoryStrip: React.FC = () => {
  const [activeId, setActiveId] = useState('new-arrivals')

  const iconMap: Record<string, React.ElementType> = {
    Sparkles,
    Flame,
    HeartHandshake,
    Watch,
    ShieldCheck,
    Crown,
    Gem,
    Palette
  }

  const handlePillClick = (id: string) => {
    setActiveId(id)
    if (id === 'artwork') {
      document.getElementById('artwork-section')?.scrollIntoView({ behavior: 'smooth' })
    } else if (id === 'watches' || id === 'new-arrivals') {
      document.getElementById('new-arrivals-section')?.scrollIntoView({ behavior: 'smooth' })
    } else if (id === 'bridal') {
      document.getElementById('craft-your-style')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      document.getElementById('jhumkas-section')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="bg-[#F4EDE0]/60 py-3.5 border-b border-[#EADBCE] sticky top-[65px] z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-serif italic text-[#7A584A] whitespace-nowrap hidden md:inline-block pr-2 border-r border-[#D5C2B4]">
            Quick Discover:
          </span>

          {quickCategories.map((category) => {
            const Icon = iconMap[category.icon] || Sparkles
            const isActive = activeId === category.id

            return (
              <motion.button
                key={category.id}
                onClick={() => handlePillClick(category.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-colors flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-[#0A1C42] bg-[#FAF7F0] hover:bg-white border border-[#EADBCE] shadow-sm'
                }`}
                aria-label={`Category: ${category.name}`}
              >
                {/* Animated active background pill with layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-full bg-[#0A1C42] shadow-festive z-0"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-[#D49B24]' : 'text-[#163B7A]'
                    }`}
                  />
                  <span>{category.name}</span>
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
