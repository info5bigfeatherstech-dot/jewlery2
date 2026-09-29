import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, CheckCircle, Quote, Sparkles } from 'lucide-react'
import { customerReviewsRow1, customerReviewsRow2 } from '@/data/reviews'

export const ReviewsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const [ratingVal, setRatingVal] = useState(0)
  const [reviewCountVal, setReviewCountVal] = useState(0)

  // Animated Count Up
  useEffect(() => {
    if (!isInView) return

    // Target values: 4.7 rating and 11,248 reviews
    const targetRating = 4.7
    const targetCount = 11248
    const duration = 2000 // 2 seconds
    const steps = 60
    const intervalTime = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutProgress = 1 - Math.pow(1 - progress, 3) // easeOutCubic

      setRatingVal(Number((easeOutProgress * targetRating).toFixed(1)))
      setReviewCountVal(Math.floor(easeOutProgress * targetCount))

      if (currentStep >= steps) {
        setRatingVal(targetRating)
        setReviewCountVal(targetCount)
        clearInterval(timer)
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [isInView])

  return (
    <section
      id="reviews-section"
      ref={containerRef}
      className="py-16 sm:py-24 bg-[#FAF7F0] overflow-hidden border-t border-[#EADBCE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1C42]/10 text-[#0A1C42] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D49B24]" />
            <span>Real Indian Stories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#06142E] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-sm sm:text-base text-[#7A584A] mt-2">
            Trusted by over 11,000 festive shoppers, brides, and art lovers across India and worldwide.
          </p>
        </div>

        {/* Google-Style Rating Block with Animated Count Up */}
        <div className="max-w-xl mx-auto bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-festive mb-16 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            {/* Big Rating Number */}
            <div className="flex flex-col items-center">
              <span className="font-serif text-5xl sm:text-6xl font-black text-[#0A1C42] tracking-tight">
                {ratingVal.toFixed(1)}
              </span>
              <div className="flex items-center gap-1 mt-2 text-[#D49B24]">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, type: 'spring' }}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </motion.div>
                ))}
              </div>
              <span className="text-xs text-[#7A584A] mt-1 font-medium">Out of 5.0 Stars</span>
            </div>

            <div className="w-px h-16 bg-[#EADBCE] hidden sm:block" />

            {/* Google Badge & Review Count */}
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="font-bold text-[#4285F4] text-lg tracking-tight">G</span>
                <span className="font-bold text-[#EA4335] text-lg tracking-tight">o</span>
                <span className="font-bold text-[#FBBC05] text-lg tracking-tight">o</span>
                <span className="font-bold text-[#4285F4] text-lg tracking-tight">g</span>
                <span className="font-bold text-[#34A853] text-lg tracking-tight">l</span>
                <span className="font-bold text-[#EA4335] text-lg tracking-tight">e</span>
                <span className="text-xs text-gray-500 font-semibold ml-1">Verified Store</span>
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-[#06142E]">
                {reviewCountVal.toLocaleString('en-IN')}+
              </div>
              <p className="text-xs text-[#7A584A] mt-0.5">
                Authentic 5-Star verified customer testimonials
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Two-Row Testimonial Marquee (Opposite Directions, Pause on Hover) */}
      <div className="space-y-4 select-none">
        
        {/* Row 1: Leftward Marquee */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...customerReviewsRow1, ...customerReviewsRow1, ...customerReviewsRow1].map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              className="w-[340px] sm:w-[400px] bg-[#FDFBF7] p-5 rounded-2xl border border-[#EADBCE] shadow-sm hover:shadow-festive transition-shadow mx-3 flex flex-col justify-between flex-shrink-0"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#D49B24]/40"
                    />
                    <div>
                      <div className="text-sm font-bold text-[#06142E] flex items-center gap-1">
                        <span>{review.name}</span>
                        {review.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-[#10B981] fill-[#10B981]/20" />
                        )}
                      </div>
                      <div className="text-[11px] text-[#7A584A]">{review.location}</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400">{review.timeAgo}</span>
                </div>

                <div className="flex items-center gap-1 text-[#D49B24] mb-2">
                  {[...Array(review.rating)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-[#5C453C] leading-relaxed line-clamp-3">
                  "{review.text}"
                </p>
              </div>

              {review.productTitle && (
                <div className="mt-3 pt-2.5 border-t border-[#F0E6D8] text-[10px] text-[#B87A28] font-semibold truncate flex items-center gap-1">
                  <Quote className="w-3 h-3 rotate-180 flex-shrink-0" />
                  <span>Purchased: {review.productTitle}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Row 2: Rightward Reverse Marquee */}
        <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
          {[...customerReviewsRow2, ...customerReviewsRow2, ...customerReviewsRow2].map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              className="w-[340px] sm:w-[400px] bg-[#FDFBF7] p-5 rounded-2xl border border-[#EADBCE] shadow-sm hover:shadow-festive transition-shadow mx-3 flex flex-col justify-between flex-shrink-0"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#D49B24]/40"
                    />
                    <div>
                      <div className="text-sm font-bold text-[#06142E] flex items-center gap-1">
                        <span>{review.name}</span>
                        {review.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-[#10B981] fill-[#10B981]/20" />
                        )}
                      </div>
                      <div className="text-[11px] text-[#7A584A]">{review.location}</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400">{review.timeAgo}</span>
                </div>

                <div className="flex items-center gap-1 text-[#D49B24] mb-2">
                  {[...Array(review.rating)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-[#5C453C] leading-relaxed line-clamp-3">
                  "{review.text}"
                </p>
              </div>

              {review.productTitle && (
                <div className="mt-3 pt-2.5 border-t border-[#F0E6D8] text-[10px] text-[#B87A28] font-semibold truncate flex items-center gap-1">
                  <Quote className="w-3 h-3 rotate-180 flex-shrink-0" />
                  <span>Purchased: {review.productTitle}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
