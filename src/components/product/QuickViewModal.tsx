import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { useToastStore } from '@/store/useToast'
import { formatPrice } from '@/lib/utils'
import confetti from 'canvas-confetti'

export const QuickViewModal: React.FC = () => {
  const { isQuickViewOpen, quickViewProduct, closeQuickView, addToCart, isInWishlist, toggleWishlist } = useStore()
  const { addToast } = useToastStore()
  const [quantity, setQuantity] = useState(1)

  // Body scroll lock and ESC key dismissal for optimal performance
  useEffect(() => {
    if (!isQuickViewOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeQuickView()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isQuickViewOpen, closeQuickView])

  // Reset quantity whenever product changes
  useEffect(() => {
    if (quickViewProduct) {
      setQuantity(1)
    }
  }, [quickViewProduct?.id])

  if (!quickViewProduct) return null

  const isFavorited = isInWishlist(quickViewProduct.id)
  const discountPercent =
    quickViewProduct.compareAtPrice && quickViewProduct.compareAtPrice > quickViewProduct.price
      ? Math.round(((quickViewProduct.compareAtPrice - quickViewProduct.price) / quickViewProduct.compareAtPrice) * 100)
      : null

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity)
    try {
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.7, x: 0.5 },
        colors: ['#D49B24', '#0A1C42', '#EC4899', '#10B981']
      })
    } catch {
      // Confetti fallback
    }
    addToast({
      title: quickViewProduct.title,
      description: `Added ${quantity} item(s) to bag • ${formatPrice(quickViewProduct.price * quantity)}`,
      image: quickViewProduct.image,
      type: 'success'
    })
    closeQuickView()
  }

  return (
    <AnimatePresence>
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Smooth Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={closeQuickView}
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Optimized Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[#FAF7F0] rounded-3xl shadow-2xl border border-[#EADBCE] overflow-hidden z-10 my-auto transform-gpu will-change-transform"
            role="dialog"
            aria-modal="true"
            aria-label={quickViewProduct.title}
          >
            {/* Close Button */}
            <button
              onClick={closeQuickView}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FDFBF7]/90 text-[#0A1C42] hover:bg-[#0A1C42] hover:text-white transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 max-h-[88vh] overflow-y-auto">
              {/* Product Visual */}
              <div className="relative bg-[#F4EDE0] p-6 flex items-center justify-center min-h-[300px] md:min-h-[420px]">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  className="w-full h-full max-h-[380px] object-cover rounded-2xl shadow-festive"
                />
                {quickViewProduct.badge && (
                  <span className="absolute top-8 left-8 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0A1C42] text-white shadow-md">
                    {quickViewProduct.badge}
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-6 md:p-8 flex flex-col justify-between space-y-4 bg-[#FDFBF7]">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#7A584A] mb-2">
                    <span className="uppercase tracking-widest text-[#B87A28] font-bold">
                      {quickViewProduct.category}
                    </span>
                    <div className="flex items-center gap-1 bg-[#FAF6EE] px-2 py-0.5 rounded-full border border-[#EADBCE]">
                      <Star className="w-3.5 h-3.5 fill-[#D49B24] text-[#D49B24]" />
                      <span className="font-bold text-[#0A1C42]">
                        {quickViewProduct.rating.toFixed(1)}
                      </span>
                      <span className="text-gray-400">({quickViewProduct.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#06142E] leading-tight mb-3">
                    {quickViewProduct.title}
                  </h3>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-2xl font-black text-[#0A1C42]">
                      {formatPrice(quickViewProduct.price)}
                    </span>
                    {quickViewProduct.compareAtPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(quickViewProduct.compareAtPrice)}
                      </span>
                    )}
                    {discountPercent && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-[#EEF3F9] text-[#163B7A] rounded-full border border-[#163B7A]/20">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#5C453C] leading-relaxed mb-4">
                    {quickViewProduct.description}
                  </p>

                  {/* Features list */}
                  {quickViewProduct.features && (
                    <div className="space-y-1.5 mb-4">
                      <div className="text-[11px] font-bold text-[#0A1C42] uppercase tracking-wider mb-1">
                        Craft Highlights:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {quickViewProduct.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-[#5C453C]">
                            <Check className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions & Quantity */}
                <div className="space-y-3 pt-3 border-t border-[#EADBCE]">
                  <div className="flex items-center gap-3">
                    {/* Quantity Picker */}
                    <div className="flex items-center border border-[#D5C2B4] rounded-full bg-white px-2 py-1 shadow-sm">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="w-7 h-7 flex items-center justify-center rounded-full text-[#0A1C42] hover:bg-[#FAF7F0] disabled:opacity-30 transition-colors cursor-pointer text-sm font-bold"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#0A1C42]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full text-[#0A1C42] hover:bg-[#FAF7F0] transition-colors cursor-pointer text-sm font-bold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Bag CTA */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-[#0A1C42] hover:bg-[#06122B] text-white py-3 px-5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-festive transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#D49B24]" />
                      <span>Add to Bag • {formatPrice(quickViewProduct.price * quantity)}</span>
                    </button>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => {
                        const added = toggleWishlist(quickViewProduct.id)
                        addToast({
                          title: added ? 'Saved to Wishlist' : 'Removed from Wishlist',
                          description: quickViewProduct.title,
                          image: quickViewProduct.image,
                          type: added ? 'heart' : 'info'
                        })
                      }}
                      className={`p-3 rounded-full border transition-all cursor-pointer ${
                        isFavorited
                          ? 'border-[#EC4899] bg-[#EC4899]/10 text-[#EC4899]'
                          : 'border-[#D5C2B4] bg-white text-[#7A584A] hover:text-[#EC4899] hover:border-[#EC4899]'
                      }`}
                      aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#EC4899]' : ''}`} />
                    </button>
                  </div>

                  {/* Trust guarantees */}
                  <div className="flex items-center justify-between text-[11px] text-[#7A584A] pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> Lifetime Anti-Tarnish
                    </span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#D49B24]" /> Free Insured Delivery
                    </span>
                    <span className="flex items-center gap-1">
                      <RefreshCw className="w-3.5 h-3.5 text-[#163B7A]" /> 7-Day Exchange
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
