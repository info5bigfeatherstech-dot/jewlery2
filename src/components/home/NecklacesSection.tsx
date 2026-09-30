import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { chokersData } from '@/data/products'

export const NecklacesSection: React.FC = () => {
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
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
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

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  return (
    <section id="necklaces-section" className="py-16 sm:py-24 bg-[#FAF6EE] relative overflow-hidden border-t border-[#EADBCE]">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#D49B24]/10 via-[#0A1C42]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#D49B24]/10 via-[#FF6B4A]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1C42]/10 text-[#0A1C42] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#D49B24]/30">
              <span>Royal Indian Heritage</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-3xl lg:text-4xl font-bold text-[#06142E] tracking-tight">
              Imperial Chokers & Royal Kundan Haar
            </h2>
            
            <p className="text-sm text-[#7A584A] mt-2 capitalize">
              Mastercrafted bridal chokers, uncut Polki necklaces, and Rajasthani Meenakari sets. Finished with 22K micron gold polish and anti-tarnish protective sealing.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 text-xs font-medium text-[#0A1C42]">
              <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-[#EADBCE]">
                <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> 22K Micro Gold Polish
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-[#EADBCE]">
                <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Anti-Tarnish Lifetime Seal
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-[#EADBCE]">
                <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free Insured Gift Packaging
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Slider Container with Side Floating Arrows */}
        <div className="relative group/carousel">
          
          {/* Floating Left Arrow (Desktop convenience) */}
          {canScrollPrev && (
            <button
              onClick={scrollPrev}
              className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-[#0A1C42] hover:bg-[#0A1C42] hover:text-white border border-[#D5C2B4] shadow-festive items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
              aria-label="Previous necklace slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Floating Right Arrow (Desktop convenience) */}
          {canScrollNext && (
            <button
              onClick={scrollNext}
              className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-[#0A1C42] hover:bg-[#0A1C42] hover:text-white border border-[#D5C2B4] shadow-festive items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
              aria-label="Next necklace slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Embla Viewport */}
          <div className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0" ref={emblaRef}>
            <div className="flex gap-4 sm:gap-5 py-2">
              {chokersData.map((item) => (
                <div
                  key={item.id}
                  className="flex-[0_0_82%] sm:flex-[0_0_calc(50%-10px)] md:flex-[0_0_calc(33.333%-14px)] lg:flex-[0_0_calc(25%-15px)] min-w-0"
                >
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        {scrollSnaps.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === selectedIndex
                    ? 'w-7 h-2 bg-[#0A1C42]'
                    : 'w-2 h-2 bg-[#D5C2B4] hover:bg-[#0A1C42]/50'
                }`}
                aria-label={`Go to necklace slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export const ArtworkSection = NecklacesSection
