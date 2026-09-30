import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { jhumkasData } from '@/data/products'

export const JhumkasSection: React.FC = () => {
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

  return (
    <section id="jhumkas-section" className="py-16 sm:py-20 bg-[#FAF7F0] border-t border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1C42]/10 text-[#0A1C42] text-xs font-semibold uppercase tracking-wider mb-2">
              {/* <Sparkles className="w-3.5 h-3.5 text-[#D49B24]" /> */}
              <span>Festive Bestsellers</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#06142E] tracking-tight">
              Heritage Jhumkas & Chandbalis
            </h2>
            <p className="text-sm text-[#7A584A] mt-1 max-w-xl capitalize">
              Featherlight brass bases, real Kundan settings, and anti-tarnish protective sealing. Made for dancing all night.
            </p>
          </div>
        </div>

        {/* Carousel Slider Container with Side Floating Arrows (4 cards in a row on desktop) */}
        <div className="relative group/carousel">
          
          {/* Floating Left Arrow (Desktop) */}
          {canScrollPrev && (
            <button
              onClick={scrollPrev}
              className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-[#0A1C42] hover:bg-[#0A1C42] hover:text-white border border-[#D5C2B4] shadow-festive items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
              aria-label="Previous jhumka slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Floating Right Arrow (Desktop) */}
          {canScrollNext && (
            <button
              onClick={scrollNext}
              className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-[#0A1C42] hover:bg-[#0A1C42] hover:text-white border border-[#D5C2B4] shadow-festive items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
              aria-label="Next jhumka slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Embla Carousel Viewport */}
          <div className="overflow-hidden -mx-2 px-2" ref={emblaRef}>
            <div className="flex gap-4 sm:gap-5 py-2">
              {jhumkasData.map((product, idx) => (
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
