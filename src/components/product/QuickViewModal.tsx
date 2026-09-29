import React, { useState } from 'react'
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

  if (!quickViewProduct) return null

  const isFavorited = isInWishlist(quickViewProduct.id)
  const discountPercent =
    quickViewProduct.compareAtPrice && quickViewProduct.compareAtPrice > quickViewProduct.price
      ? Math.round(((quickViewProduct.compareAtPrice - quickViewProduct.price) / quickViewProduct.compareAtPrice) * 100)
      : null

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity)
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.7, x: 0.5 },
      colors: ['#D49B24', '#0A1C42', '#EC4899', '#10B981']
    })
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-[#FAF7F0] rounded-3xl shadow-2xl border border-[#EADBCE] overflow-hidden z-10 my-auto"
            role="dialog"
            aria-modal="true"
            aria-label={quickViewProduct.title}
          >
            {/* Close Button */}
            <button
              onClick={closeQuickView}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FDFBF7]/90 text-[#0A1C42] hover:bg-[#0A1C42] hover:text-white transition-colors shadow-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
              {/* Product Visual */}
              <div className="relative bg-[#F4EDE0] p-6 flex items-center justify-center min-h-[320px] md:min-h-[440px]">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  className="w-full h-full max-h-[400px] object-cover rounded-2xl shadow-festive"
                />
                {quickViewProduct.badge && (
                  <span className="absolute top-8 left-8 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0A1C42] text-white shadow-md">
                    {quickViewProduct.badge}
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-6 md:p-8 flex flex-col justify-between space-y-5 bg-[#FDFBF7]">
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

                  <h3 className="font-serif text-2xl font-bold text-[#06142E] leading-tight mb-3">
                    {quickViewProduct.title}
                  </h3>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-3 mb-4">
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
                  <p className="text-sm text-[#5C453C] leading-relaxed mb-4">
                    {quickViewProduct.description}
                  </p>

                  {/* Features list */}
                  {quickViewProduct.features && (
                    <div className="space-y-1.5 mb-6">
                      <div className="text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1">
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

                {/* Actions */}
                <div className="space-y-3 pt-3 border-t border-[#EADBCE]">
                  <div className="flex items-center gap-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#D5C2B4] rounded-xl bg-white px-2 py-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1.5 hover:text-[#0A1C42] text-gray-500 font-bold"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm font-semibold text-[#0A1C42]">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-1.5 hover:text-[#0A1C42] text-gray-500 font-bold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Bag Button */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-[#0A1C42] hover:bg-[#06122B] text-white py-3 px-5 rounded-xl font-semibold text-sm shadow-festive flex items-center justify-center gap-2 transition-colors border border-[#D49B24]/30"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#D49B24]" />
                      <span>Add to Bag • {formatPrice(quickViewProduct.price * quantity)}</span>
                    </button>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(quickViewProduct.id)}
                      className={`p-3 rounded-xl border transition-colors ${
                        isFavorited
                          ? 'bg-[#0A1C42] text-pink-400 border-[#0A1C42]'
                          : 'bg-white text-[#0A1C42] border-[#D5C2B4] hover:bg-[#FAF7F0]'
                      }`}
                      aria-label="Save to wishlist"
                    >
                      <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Trust mini-strip */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-center text-[#7A584A]">
                    <div className="flex flex-col items-center gap-0.5">
                      <Truck className="w-3.5 h-3.5 text-[#0A1C42]" />
                      <span>Free Shipping &gt; ₹999</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0A1C42]" />
                      <span>Anti-Tarnish Seal</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <RefreshCw className="w-3.5 h-3.5 text-[#0A1C42]" />
                      <span>Easy 7-Day Exchange</span>
                    </div>
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
