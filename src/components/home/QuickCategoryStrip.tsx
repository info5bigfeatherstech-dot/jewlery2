import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Flame, HeartHandshake, CircleDot, ShieldCheck, Crown, Gem, Palette } from 'lucide-react'
import { quickCategories } from '@/data/categories'

export const QuickCategoryStrip: React.FC = () => {
  const location = useLocation()

  const iconMap: Record<string, React.ElementType> = {
    Sparkles,
    Flame,
    HeartHandshake,
    CircleDot,
    ShieldCheck,
    Crown,
    Gem,
    Palette
  }

  return (
    <section className="bg-[#F4EDE0]/60 py-3.5 border-b border-[#EADBCE] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-serif italic text-[#7A584A] whitespace-nowrap hidden md:inline-block pr-2 border-r border-[#D5C2B4]">
            Quick Discover:
          </span>

          {quickCategories.map((category) => {
            const Icon = iconMap[category.icon] || Sparkles
            const isActive = location.pathname === category.route

            return (
              <Link
                key={category.id}
                to={category.route || '/collections'}
                className="flex-shrink-0"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-white bg-[#0A1C42] shadow-festive'
                      : 'text-[#0A1C42] bg-[#FAF7F0] hover:bg-white border border-[#EADBCE] shadow-sm'
                  }`}
                  aria-label={`Category: ${category.name}`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isActive ? 'text-[#D49B24]' : 'text-[#163B7A]'
                      }`}
                    />
                    <span>{category.name}</span>
                  </span>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
