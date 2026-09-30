import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { earringCategories } from '@/data/categories'

export const ShopEarringCategory: React.FC = () => {
  return (
    <section id="shop-earrings" className="py-12 sm:py-16 bg-[#FAF7F0] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#1c1917] tracking-tight">
            Shop Earring Category
          </h2>
        </div>

        {/* 8 Rounded Square Tiles Grid */}
        <div className="overflow-x-auto no-scrollbar pb-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 lg:gap-4 min-w-[760px] sm:min-w-0">
            {earringCategories.map((cat, index) => (
              <Link
                key={cat.id}
                to={`/category/jhumkas`}
                className="group flex-1 min-w-[100px] sm:min-w-0 flex flex-col items-center cursor-pointer select-none"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                  whileHover={{ y: -4 }}
                  className="w-full flex flex-col items-center"
                >
                {/* Rounded Square Card Image Container */}
                <div className="w-full aspect-square rounded-[22px] overflow-hidden bg-[#F4EDE0] shadow-sm group-hover:shadow-md transition-all duration-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
                  />
                </div>

                {/* Clean Centered Category Label */}
                <span className="font-serif text-[13px] sm:text-[14px] font-medium text-[#2d2d2d] group-hover:text-[#163B7A] transition-colors mt-2.5 text-center leading-snug">
                  {cat.name}
                </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Subtle bottom curved wave divider echoing reference design */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none opacity-40">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-4 sm:h-6 fill-white"
        >
          <path d="M0,0 C150,50 350,-20 500,40 C650,100 900,10 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  )
}
