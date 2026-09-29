import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { jhumkasData } from '@/data/products'

export const JhumkasSection: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section id="jhumkas-section" className="py-16 sm:py-20 bg-[#FAF7F0] border-t border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1C42]/10 text-[#0A1C42] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D49B24]" />
              <span>Festive Bestsellers</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#06142E] tracking-tight">
              Heritage Jhumkas & Chandbalis
            </h2>
            <p className="text-sm text-[#7A584A] mt-1 max-w-xl">
              Featherlight brass bases, real Kundan settings, and anti-tarnish protective sealing. Made for dancing all night.
            </p>
          </div>

          {/* Carousel controls for mobile / tablet */}
          <div className="flex items-center gap-3">
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={scrollPrev}
                className="p-2 rounded-full border border-[#D5C2B4] bg-white text-[#0A1C42] hover:bg-[#FAF7F0]"
                aria-label="Previous jhumkas"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                className="p-2 rounded-full border border-[#D5C2B4] bg-white text-[#0A1C42] hover:bg-[#FAF7F0]"
                aria-label="Next jhumkas"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href="#shop-earrings"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#0A1C42] hover:text-[#163B7A] uppercase tracking-wider group"
            >
              <span>Explore All Jhumkas</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Mobile View: Embla Carousel */}
        <div className="md:hidden overflow-hidden -mx-4 px-4" ref={emblaRef}>
          <div className="flex gap-4">
            {jhumkasData.map((product) => (
              <div key={product.id} className="flex-[0_0_80%] sm:flex-[0_0_55%] min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View: 3-column / 6-card Grid with Scroll Stagger */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {jhumkasData.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Explore All Products Button */}
        <div className="mt-12 text-center">
          <motion.a
            href="#shop-earrings"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#0A1C42] hover:bg-[#06122B] text-white text-sm font-semibold shadow-festive transition-all border border-[#D49B24]/40"
          >
            <span>EXPLORE ALL PRODUCTS</span>
            <ArrowRight className="w-4 h-4 text-[#D49B24]" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}
