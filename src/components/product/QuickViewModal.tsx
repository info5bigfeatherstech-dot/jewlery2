import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RefreshCw,
  Sparkles,
  Zap,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Gem,
  Award
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { useToastStore } from '@/store/useToast'
import { formatPrice } from '@/lib/utils'
import confetti from 'canvas-confetti'

export const QuickViewModal: React.FC = () => {
  const navigate = useNavigate()
  const { isQuickViewOpen, quickViewProduct, closeQuickView, addToCart, isInWishlist, toggleWishlist } = useStore()
  const { addToast } = useToastStore()

  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [pincode, setPincode] = useState('110001')
  const [pincodeChecked, setPincodeChecked] = useState(true)
  const [isCheckingPincode, setIsCheckingPincode] = useState(false)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  // Body scroll lock and ESC key dismissal
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

  // Reset state when product changes
  useEffect(() => {
    if (quickViewProduct) {
      setQuantity(1)
      setSelectedImageIndex(0)
      setIsZooming(false)
    }
  }, [quickViewProduct?.id])

  if (!quickViewProduct) return null

  // Image list (main image + hover image if available)
  const images = [
    quickViewProduct.image,
    ...(quickViewProduct.hoverImage && quickViewProduct.hoverImage !== quickViewProduct.image
      ? [quickViewProduct.hoverImage]
      : [])
  ]

  const currentImage = images[selectedImageIndex] || quickViewProduct.image
  const isFavorited = isInWishlist(quickViewProduct.id)

  const discountPercent =
    quickViewProduct.compareAtPrice && quickViewProduct.compareAtPrice > quickViewProduct.price
      ? Math.round(((quickViewProduct.compareAtPrice - quickViewProduct.price) / quickViewProduct.compareAtPrice) * 100)
      : null

  const savingsAmount =
    quickViewProduct.compareAtPrice && quickViewProduct.compareAtPrice > quickViewProduct.price
      ? quickViewProduct.compareAtPrice - quickViewProduct.price
      : 0

  // Zoom lens mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    })
  }

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 36,
        spread: 75,
        origin: { y: 0.7, x: 0.5 },
        colors: ['#D49B24', '#0A1C42', '#EC4899', '#10B981', '#F59E0B']
      })
    } catch {
      // Confetti fallback
    }
  }

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity)
    triggerConfetti()
    addToast({
      title: quickViewProduct.title,
      description: `Added ${quantity} item(s) to bag • ${formatPrice(quickViewProduct.price * quantity)}`,
      image: quickViewProduct.image,
      type: 'success'
    })
    closeQuickView()
  }

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity)
    closeQuickView()
    navigate('/checkout')
  }

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pincode || pincode.length < 6) return
    setIsCheckingPincode(true)
    setTimeout(() => {
      setIsCheckingPincode(false)
      setPincodeChecked(true)
    }, 400)
  }

  // Calculate estimated delivery date: 3-4 days from today
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 3)
  const deliveryDateString = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })

  // Determine category link route
  const getCategoryRoute = (cat: string) => {
    const normalized = cat.toLowerCase()
    if (normalized.includes('jhumka') || normalized.includes('earring')) return '/collections'
    if (normalized.includes('necklace') || normalized.includes('choker')) return '/necklaces'
    if (normalized.includes('bangle') || normalized.includes('bracelet')) return '/bangles'
    if (normalized.includes('kid')) return '/kids-jewellery'
    return '/collections'
  }

  return (
    <AnimatePresence>
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
          {/* Backdrop with elegant blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={closeQuickView}
            className="fixed inset-0 bg-[#040D1E]/75 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Elevated Luxury Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#FAF7F0] rounded-3xl shadow-[0_25px_60px_-15px_rgba(10,28,66,0.35)] border border-[#EADBCE] overflow-hidden z-10 my-auto transform-gpu will-change-transform"
            role="dialog"
            aria-modal="true"
            aria-label={quickViewProduct.title}
          >
            {/* Elegant Close Button */}
            <button
              onClick={closeQuickView}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 p-2.5 rounded-full bg-white/90 text-[#0A1C42] hover:bg-[#0A1C42] hover:text-[#D49B24] border border-[#EADBCE]/80 shadow-md backdrop-blur-sm transition-all duration-200 cursor-pointer hover:rotate-90 active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[86vh] overflow-y-auto">
              
              {/* Left Column: Visual Showcase & Interactive Zoom (5 cols on desktop) */}
              <div className="md:col-span-5 bg-gradient-to-b from-[#F4EDE0] to-[#FAF7F0] p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EADBCE]">
                <div>
                  {/* Main Product Image Container with Zoom Lens */}
                  <div
                    ref={imageContainerRef}
                    onMouseEnter={() => setIsZooming(true)}
                    onMouseLeave={() => setIsZooming(false)}
                    onMouseMove={handleMouseMove}
                    className="relative w-full aspect-square bg-white rounded-2xl overflow-hidden shadow-festive border border-[#EADBCE] cursor-crosshair group select-none"
                  >
                    {/* Badge Pill */}
                    {quickViewProduct.badge && (
                      <span className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#0A1C42] to-[#163B7A] text-[#F3E5AB] border border-[#D49B24]/40 shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#D49B24]" />
                        {quickViewProduct.badge}
                      </span>
                    )}

                    {/* Stock Status Pill */}
                    <div className="absolute top-3 right-3 z-20 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-sm flex items-center gap-1.5 backdrop-blur-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      In Stock
                    </div>

                    {/* Zoomable Image */}
                    <img
                      src={currentImage}
                      alt={quickViewProduct.title}
                      className="w-full h-full object-cover transition-transform duration-200 ease-out"
                      style={
                        isZooming
                          ? {
                              transform: 'scale(1.85)',
                              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                            }
                          : {
                              transform: 'scale(1)'
                            }
                      }
                    />

                    {/* Shimmer sweep on initial render */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Zoom hint banner */}
                    <div className="absolute bottom-2.5 inset-x-3 pointer-events-none z-10 flex items-center justify-center">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] tracking-wide font-medium backdrop-blur-sm shadow-sm transition-opacity duration-200 opacity-80 group-hover:opacity-0">
                        Hover to magnify details
                      </span>
                    </div>
                  </div>

                  {/* Image Thumbnails Gallery (if multiple images available) */}
                  {images.length > 1 && (
                    <div className="flex items-center gap-2 mt-3 justify-center">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            selectedImageIndex === idx
                              ? 'border-[#D49B24] ring-2 ring-[#D49B24]/30 scale-105 shadow-sm'
                              : 'border-[#EADBCE] opacity-70 hover:opacity-100 hover:border-[#B87A28]'
                          }`}
                          aria-label={`View photo angle ${idx + 1}`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Artisan Hallmark Mini Footer */}
                <div className="mt-4 pt-3 border-t border-[#EADBCE]/70 hidden sm:flex items-center justify-between text-[11px] text-[#7A584A]">
                  <span className="flex items-center gap-1.5">
                    <Gem className="w-3.5 h-3.5 text-[#D49B24]" />
                    Artisan Handcrafted
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#163B7A]" />
                    Hallmarked Quality
                  </span>
                </div>
              </div>

              {/* Right Column: Luxury Details, Pricing, Specs & Actions (7 cols) */}
              <div className="md:col-span-7 p-5 sm:p-7 md:p-8 flex flex-col justify-between bg-[#FDFBF7]">
                <div className="space-y-4">
                  
                  {/* Category & Rating Row */}
                  <div className="flex items-center justify-between text-xs pr-8">
                    <button
                      onClick={() => {
                        closeQuickView()
                        navigate(getCategoryRoute(quickViewProduct.category))
                      }}
                      className="uppercase tracking-[0.2em] text-[#B87A28] font-bold text-[11px] hover:text-[#0A1C42] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>{quickViewProduct.category}</span>
                    </button>

                    <div className="flex items-center gap-1.5 bg-[#FAF6EE] px-2.5 py-1 rounded-full border border-[#EADBCE] shadow-xs">
                      <Star className="w-3.5 h-3.5 fill-[#D49B24] text-[#D49B24]" />
                      <span className="font-bold text-[#0A1C42] text-xs">
                        {quickViewProduct.rating.toFixed(1)}
                      </span>
                      <span className="text-[#8C7A70] text-[11px]">
                        ({quickViewProduct.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-xl sm:text-2xl lg:text-[26px] font-bold text-[#06142E] leading-snug tracking-tight">
                    {quickViewProduct.title}
                  </h2>

                  {/* Price & Savings Badge */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF6EE]/80 border border-[#EADBCE]/70">
                    <div className="flex flex-wrap items-baseline gap-2.5 sm:gap-3">
                      <span className="text-2xl sm:text-3xl font-serif font-black text-[#0A1C42]">
                        {formatPrice(quickViewProduct.price)}
                      </span>
                      {quickViewProduct.compareAtPrice && (
                        <span className="text-sm sm:text-base text-[#8C7A70] line-through font-medium">
                          {formatPrice(quickViewProduct.compareAtPrice)}
                        </span>
                      )}
                      {discountPercent && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-[#D49B24]/15 text-[#9A670F] rounded-full border border-[#D49B24]/30">
                          {discountPercent}% OFF
                        </span>
                      )}
                      {savingsAmount > 0 && (
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Save {formatPrice(savingsAmount)}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#7A584A] mt-1 flex items-center gap-2">
                      <span>✓ Inclusive of all taxes</span>
                      <span>•</span>
                      <span className="text-[#10B981] font-semibold">Free Express Shipping</span>
                    </div>
                  </div>

                  {/* Product Dimensions & Material Specs if available */}
                  {(quickViewProduct.medium || quickViewProduct.dimensions) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {quickViewProduct.medium && (
                        <div className="p-2.5 rounded-xl bg-white border border-[#EADBCE] text-[#5C453C]">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C7A70] block mb-0.5">
                            Material & Finish
                          </span>
                          <span className="font-medium text-[#0A1C42] text-[11px] line-clamp-2">
                            {quickViewProduct.medium}
                          </span>
                        </div>
                      )}
                      {quickViewProduct.dimensions && (
                        <div className="p-2.5 rounded-xl bg-white border border-[#EADBCE] text-[#5C453C]">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C7A70] block mb-0.5">
                            Sizing & Fit
                          </span>
                          <span className="font-medium text-[#0A1C42] text-[11px] line-clamp-2">
                            {quickViewProduct.dimensions}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  {quickViewProduct.description && (
                    <p className="text-xs sm:text-[13px] text-[#5C453C] leading-relaxed">
                      {quickViewProduct.description}
                    </p>
                  )}

                  {/* Craft & Authenticity Highlights */}
                  {quickViewProduct.features && quickViewProduct.features.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-[#0A1C42] uppercase tracking-[0.15em]">
                        Atelier Craft Highlights:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {quickViewProduct.features.map((feat, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-[#4A3830] bg-white/70 px-2.5 py-1.5 rounded-lg border border-[#EADBCE]/80"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D49B24] flex-shrink-0" />
                            <span className="font-medium text-[11px]">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Express Delivery Check */}
                  <div className="pt-2">
                    <form
                      onSubmit={handlePincodeSubmit}
                      className="flex items-center gap-2 text-xs bg-[#FAF6EE] p-2 rounded-xl border border-[#EADBCE]"
                    >
                      <MapPin className="w-4 h-4 text-[#D49B24] flex-shrink-0 ml-1" />
                      <input
                        type="text"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 6-digit Pincode"
                        className="bg-transparent border-none text-xs text-[#0A1C42] font-semibold focus:outline-none w-28 placeholder:text-gray-400 placeholder:font-normal"
                      />
                      <button
                        type="submit"
                        disabled={isCheckingPincode || pincode.length !== 6}
                        className="text-[11px] font-bold text-[#0A1C42] hover:text-[#D49B24] uppercase tracking-wider ml-auto px-2 py-0.5 rounded transition-colors disabled:opacity-40 cursor-pointer"
                      >
                        {isCheckingPincode ? 'Checking...' : 'Check'}
                      </button>
                    </form>
                    {pincodeChecked && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-[#2F6F4E] pl-1 font-medium">
                        <Zap className="w-3.5 h-3.5 text-[#D49B24]" />
                        <span>
                          Express Delivery to <strong className="text-[#0A1C42]">{pincode}</strong> by{' '}
                          <strong>{deliveryDateString}</strong>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions & Guarantee Box */}
                <div className="space-y-3 pt-4 mt-4 border-t border-[#EADBCE]">
                  
                  {/* Quantity & Action Buttons */}
                  <div className="space-y-2.5">
                    {/* Primary Row: Quantity Picker + Add to Bag + Wishlist */}
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      
                      {/* Quantity Picker */}
                      <div className="flex items-center justify-between border border-[#D5C2B4] rounded-full bg-white px-2 shadow-xs h-11 sm:h-12 shrink-0">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          disabled={quantity <= 1}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-[#0A1C42] hover:bg-[#FAF7F0] disabled:opacity-30 transition-colors cursor-pointer text-sm font-bold"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-7 sm:w-8 text-center text-xs font-bold text-[#0A1C42]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => q + 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-[#0A1C42] hover:bg-[#FAF7F0] transition-colors cursor-pointer text-sm font-bold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Add to Bag CTA (Single line, plenty of room, matching height) */}
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 h-11 sm:h-12 bg-[#0A1C42] hover:bg-[#102B66] text-white px-4 sm:px-6 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-festive hover:shadow-festive-hover transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] whitespace-nowrap"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#D49B24] shrink-0" />
                        <span className="truncate">Add to Bag • {formatPrice(quickViewProduct.price * quantity)}</span>
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
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                          isFavorited
                            ? 'border-[#EC4899] bg-[#EC4899]/10 text-[#EC4899]'
                            : 'border-[#D5C2B4] bg-white text-[#7A584A] hover:text-[#EC4899] hover:border-[#EC4899]'
                        }`}
                        aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#EC4899]' : ''}`} />
                      </button>
                    </div>

                    {/* Secondary Row: Full-Width 1-Click Express Buy Now */}
                    <button
                      onClick={handleBuyNow}
                      className="w-full h-11 sm:h-12 bg-gradient-to-r from-[#D49B24] via-[#DF9F27] to-[#C78E1C] hover:brightness-105 text-[#0A1C42] px-5 rounded-full font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.005] active:scale-[0.99] whitespace-nowrap tracking-wide"
                    >
                      <Zap className="w-4 h-4 fill-[#0A1C42] shrink-0" />
                      <span>Buy Now • Instant Checkout</span>
                    </button>
                  </div>

                  {/* Trust guarantees bar */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-[#7A584A] border-t border-[#EADBCE]/50">
                    <span className="flex items-center justify-center gap-1.5 py-1 text-center font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                      <span>Lifetime Anti-Tarnish</span>
                    </span>
                    <span className="flex items-center justify-center gap-1.5 py-1 text-center font-medium">
                      <Truck className="w-3.5 h-3.5 text-[#D49B24] flex-shrink-0" />
                      <span>Free Insured Delivery</span>
                    </span>
                    <span className="flex items-center justify-center gap-1.5 py-1 text-center font-medium">
                      <RefreshCw className="w-3.5 h-3.5 text-[#163B7A] flex-shrink-0" />
                      <span>7-Day Exchange</span>
                    </span>
                  </div>

                  {/* Explore collection link */}
                  <div className="text-center pt-0.5">
                    <button
                      onClick={() => {
                        closeQuickView()
                        navigate(getCategoryRoute(quickViewProduct.category))
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-[#7A584A] hover:text-[#0A1C42] font-semibold transition-colors cursor-pointer"
                    >
                      <span>Explore all {quickViewProduct.category} designs</span>
                      <ArrowRight className="w-3 h-3 text-[#D49B24]" />
                    </button>
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
