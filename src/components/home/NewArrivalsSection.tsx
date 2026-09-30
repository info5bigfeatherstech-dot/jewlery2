import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { newArrivalsData } from '@/data/products'

export const NewArrivalsSection: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: false,
      slidesToScroll: 3,
      breakpoints: {
        '(max-width: 639px)': { slidesToScroll: 1 },
        '(min-width: 640px) and (max-width: 1023px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 3 }
      },
      loop: true
    },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true
      })
    ]
  )

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  const handleShopNow = () => {
    document.getElementById('new-arrivals-carousel')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="new-arrivals-section" className="pb-16 sm:pb-20 bg-[#FAF7F0] overflow-hidden">
      
      {/* Full-Width New Arrivals Image Banner */}
      <div className="relative w-full bg-[#E8D9C5] overflow-hidden select-none shadow-sm">
        <div className="relative max-w-[1920px] mx-auto w-full">
          <a
            href="#new-arrivals-carousel"
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

      <div id="new-arrivals-carousel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        
        {/* Section Header: Title */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1c1917] tracking-tight">
            New Arrivals
          </h2>
          <p className="text-xs sm:text-sm text-[#7A584A] mt-1 capitalize">
            Handcrafted in limited batches — anti-tarnish micro gold polish & uncut stones
          </p>
        </div>

        {/* Carousel Slider Container with Side Floating Arrows */}
        <div className="relative group/carousel">
          
          {/* Floating Left Arrow (Desktop) */}
          {canScrollPrev && (
            <button
              onClick={scrollPrev}
              className="hidden xl:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-[#0A1C42] hover:bg-[#0A1C42] hover:text-white border border-[#D5C2B4] shadow-festive items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Floating Right Arrow (Desktop) */}
          {canScrollNext && (
            <button
              onClick={scrollNext}
              className="hidden xl:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-[#0A1C42] hover:bg-[#0A1C42] hover:text-white border border-[#D5C2B4] shadow-festive items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Embla Carousel Viewport */}
          <div className="overflow-hidden -mx-2 px-2" ref={emblaRef}>
            <div className="flex gap-4 sm:gap-5 py-2">
              {newArrivalsData.map((product, idx) => (
                <div
                  key={product.id}
                  className="flex-[0_0_82%] sm:flex-[0_0_calc(50%-10px)] md:flex-[0_0_calc(33.333%-14px)] lg:flex-[0_0_calc(25%-15px)] min-w-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="h-full"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        {scrollSnaps.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === selectedIndex
                    ? 'w-7 h-2.5 bg-[#0A1C42]'
                    : 'w-2.5 h-2.5 bg-[#D5C2B4] hover:bg-[#0A1C42]/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
