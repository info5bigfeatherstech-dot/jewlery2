import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { newArrivalsData } from '@/data/products'

export const NewArrivalsSection: React.FC = () => {
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

  const handleShopNow = () => {
    document.getElementById('new-arrivals-grid')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="new-arrivals-section" className="pb-16 sm:pb-20 bg-[#FAF7F0] overflow-hidden">
      
      {/* Full-Width New Arrivals Image Banner */}
      <div className="relative w-full bg-[#E8D9C5] overflow-hidden select-none shadow-sm">
        <div className="relative max-w-[1920px] mx-auto w-full">
          <a
            href="#new-arrivals-grid"
            onClick={handleShopNow}
            className="block relative w-full cursor-pointer group"
            aria-label="Shop New Arrivals Collection"
          >
            <img
              src="/images/new-arrivals-banner.png"
              alt="New Arrivals - Timeless Elegance. Modern You. - Shop Now"
              className="w-full h-auto block object-cover filter brightness-[1.01]"
              loading="lazy"
            />

            {/* Clickable Hotspot for 'SHOP NOW' button in center */}
            <div
              onClick={handleShopNow}
              className="absolute bottom-[23%] left-1/2 -translate-x-1/2 w-[22%] sm:w-[16%] lg:w-[13%] h-[15%] sm:h-[13%] rounded-full z-20 cursor-pointer flex items-center justify-center transition-all group/btn"
              title="Shop New Arrivals"
            >
              <span className="absolute inset-0 rounded-full bg-white/0 group-hover/btn:bg-white/10 transition-colors" />
            </div>
          </a>
        </div>
      </div>

      <div id="new-arrivals-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        
        {/* Centered Heading exactly as in the reference design */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-10 gap-4">
          <div className="text-center sm:text-left mx-auto sm:mx-0">
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#1c1917] tracking-tight">
              New Arrivals
            </h2>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-4">
            {/* Carousel controls for mobile */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={scrollPrev}
                className="p-2 rounded-full border border-[#D5C2B4] bg-white text-[#0A1C42] hover:bg-[#FAF7F0] shadow-sm"
                aria-label="Previous arrivals"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                className="p-2 rounded-full border border-[#D5C2B4] bg-white text-[#0A1C42] hover:bg-[#FAF7F0] shadow-sm"
                aria-label="Next arrivals"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href="#shop-earrings"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#163B7A] hover:text-[#0A1C42] uppercase tracking-wider group"
            >
              <span>View All ({newArrivalsData.length})</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Mobile View: Embla Carousel */}
        <div className="md:hidden overflow-hidden -mx-4 px-4" ref={emblaRef}>
          <div className="flex gap-4">
            {newArrivalsData.map((product) => (
              <div key={product.id} className="flex-[0_0_80%] sm:flex-[0_0_55%] min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View: Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newArrivalsData.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.07, ease: 'easeOut' }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
