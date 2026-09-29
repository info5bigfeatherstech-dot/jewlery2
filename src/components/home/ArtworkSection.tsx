import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, ChevronLeft, ChevronRight, Palette, CheckCircle } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { artworksData } from '@/data/products'

export const ArtworkSection: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    slidesToScroll: 1
  })

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
    <section id="artwork-section" className="py-16 sm:py-24 bg-[#FAF6EE] relative overflow-hidden border-t border-[#EADBCE]">
      {/* Decorative paint streak background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#EC4899]/10 via-[#8B5CF6]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#D49B24]/10 via-[#FF6B4A]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/10 to-violet-500/10 text-[#163B7A] text-xs font-semibold uppercase tracking-wider mb-2 border border-pink-200">
              <Palette className="w-3.5 h-3.5 text-[#EC4899]" />
              <span>Original Canvas Art by Artist Richa</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#06142E] tracking-tight">
              Tactile Textures & Sacred Gold Canvases
            </h2>
            
            <p className="text-sm sm:text-base text-[#7A584A] mt-2">
              Rich, sculptural mixed-media paintings created with heavy impasto paste, natural mineral pigments, and hand-applied 24K gold leaf. Each piece is an original signed collectible.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 text-xs font-medium text-[#0A1C42]">
              <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-[#EADBCE]">
                <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Signed by Richa
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-[#EADBCE]">
                <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Certificate of Authenticity
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-[#EADBCE]">
                <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Insured Wooden Box Shipping
              </span>
            </div>
          </div>

          {/* Action Row: Left / Right Scroll Arrows + Custom Commissions CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Scroll Navigation Arrow Buttons (Desktop & Mobile) */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="w-10 h-10 rounded-full border border-[#D5C2B4] bg-white text-[#0A1C42] hover:bg-[#0A1C42] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#0A1C42] transition-colors shadow-sm flex items-center justify-center cursor-pointer group"
                aria-label="Scroll left to previous artworks"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              </button>
              
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="w-10 h-10 rounded-full border border-[#D5C2B4] bg-white text-[#0A1C42] hover:bg-[#0A1C42] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#0A1C42] transition-colors shadow-sm flex items-center justify-center cursor-pointer group"
                aria-label="Scroll right to next artworks"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            <a
              href="#craft-your-style"
              className="inline-flex items-center gap-2 bg-[#0A1C42] hover:bg-[#06122B] text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all group"
            >
              <span>Custom Art Commissions</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D49B24] transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Carousel Slider Container with Side Floating Arrows */}
        <div className="relative group/carousel">
          
          {/* Floating Left Arrow (Desktop convenience) */}
          {canScrollPrev && (
            <button
              onClick={scrollPrev}
              className="hidden xl:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-[#0A1C42] hover:bg-[#0A1C42] hover:text-white border border-[#D5C2B4] shadow-festive items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100"
              aria-label="Previous artwork slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Floating Right Arrow (Desktop convenience) */}
          {canScrollNext && (
            <button
              onClick={scrollNext}
              className="hidden xl:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-[#0A1C42] hover:bg-[#0A1C42] hover:text-white border border-[#D5C2B4] shadow-festive items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100"
              aria-label="Next artwork slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Embla Viewport */}
          <div className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0" ref={emblaRef}>
            <div className="flex gap-6 sm:gap-7">
              {artworksData.map((art) => (
                <div
                  key={art.id}
                  className="flex-[0_0_85%] sm:flex-[0_0_calc(50%-14px)] lg:flex-[0_0_calc(33.333%-19px)] min-w-0"
                >
                  <ProductCard product={art} isArtworkCard={true} />
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
                aria-label={`Go to artwork slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
