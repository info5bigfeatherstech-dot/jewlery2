import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import { useToastStore } from '@/store/useToast'
import confetti from 'canvas-confetti'

interface ProductCardProps {
  product: Product
  isArtworkCard?: boolean
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isArtworkCard = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [heartPopping, setHeartPopping] = useState(false)

  const { addToCart, toggleWishlist, isInWishlist, openQuickView } = useStore()
  const { addToast } = useToastStore()

  const isFavorited = isInWishlist(product.id)

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product, 1)
    
    // Trigger festive mini confetti burst near bottom right
    confetti({
      particleCount: 28,
      spread: 60,
      origin: { y: 0.85, x: 0.8 },
      colors: ['#D49B24', '#0A1C42', '#EC4899', '#10B981']
    })

    addToast({
      title: product.title,
      description: `Added to your bag • ${formatPrice(product.price)}`,
      image: product.image,
      type: 'success'
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setHeartPopping(true)
    const added = toggleWishlist(product.id)
    setTimeout(() => setHeartPopping(false), 450)

    addToast({
      title: product.title,
      description: added ? 'Saved to your wishlist' : 'Removed from wishlist',
      image: product.image,
      type: 'heart'
    })
  }

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.stopPropagation()
    openQuickView(product)
  }

  return (
    <motion.div
      className="group relative bg-[#FDFBF7] rounded-2xl border border-[#EADBCE]/80 overflow-hidden shadow-sm hover:shadow-festive-hover transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: isArtworkCard ? -6 : -5 }}
      style={{
        transformStyle: isArtworkCard ? 'preserve-3d' : undefined,
      }}
    >
      {/* Image Container with Aspect Ratio */}
      <div
        className={`relative w-full overflow-hidden bg-[#F4EDE0] cursor-pointer ${
          isArtworkCard ? 'aspect-[4/5]' : 'aspect-square'
        }`}
        onClick={handleOpenQuickView}
      >
        {/* Skeleton Shimmer while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4EDE0] via-[#FAF6EE] to-[#F4EDE0] bg-[length:200%_100%] animate-shimmer" />
        )}

        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageLoaded(true)
            ;(e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80'
          }}
          className={`w-full h-full object-cover transition-all duration-500 ${
            product.hoverImage && isHovered
              ? 'opacity-0 scale-105'
              : 'opacity-100 group-hover:scale-105'
          }`}
        />

        {/* Hover Crossfade Image */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Subtle Shine Sweep on Hover */}
        <div className="absolute inset-0 pointer-events-none shine-sweep opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm ${
                product.badge === 'BEST SELLER'
                  ? 'bg-[#0A1C42] text-white border border-[#D49B24]/40'
                  : product.badge === 'TRENDING'
                  ? 'bg-gradient-to-r from-[#D81B60] to-[#8E24AA] text-white'
                  : 'bg-[#D49B24] text-[#4A0E17] font-bold'
              }`}
            >
              {product.badge}
            </span>
          )}

          {discountPercent && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF7F0] text-[#0A1C42] border border-[#0A1C42]/20 shadow-sm w-fit">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart Button with Pop Animation */}
        <motion.button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            isFavorited
              ? 'bg-[#0A1C42] text-pink-300 shadow-md'
              : 'bg-[#FAF7F0]/85 text-[#0A1C42] hover:bg-[#FAF7F0] hover:text-[#D81B60]'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          animate={heartPopping ? { scale: [1, 1.35, 0.9, 1.15, 1] } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          whileTap={{ scale: 0.85 }}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-[#EC4899] text-[#EC4899]' : 'stroke-[2.2]'
            }`}
          />
        </motion.button>

        {/* Sliding Quick Action Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-[#0A1C42] hover:bg-[#06122B] text-white py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-festive transition-colors border border-[#D49B24]/30"
            aria-label={`Quick add ${product.title} to bag`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D49B24]" />
            <span>Quick Add</span>
          </button>

          <button
            onClick={handleOpenQuickView}
            className="w-10 h-10 bg-[#FAF7F0]/95 hover:bg-white text-[#0A1C42] rounded-xl flex items-center justify-center shadow-md transition-colors border border-[#EADBCE]"
            aria-label={`Quick view details of ${product.title}`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-[#FDFBF7]">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs text-[#7A584A] mb-1.5">
            <span className="font-medium text-[#B87A28] tracking-wider uppercase text-[10px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 bg-[#FAF6EE] px-1.5 py-0.5 rounded text-[11px] border border-[#EADBCE]/50">
              <Star className="w-3 h-3 fill-[#D49B24] text-[#D49B24]" />
              <span className="font-semibold text-[#0A1C42]">{product.rating.toFixed(1)}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={handleOpenQuickView}
            className="font-serif text-[15px] font-semibold text-[#06142E] leading-snug line-clamp-2 hover:text-[#163B7A] transition-colors cursor-pointer mb-2"
          >
            {product.title}
          </h3>

          {/* Category Tag */}
          {product.category && (
            <p className="text-[11px] text-[#7A584A] mb-1.5 font-medium tracking-wide">
              {product.category}
            </p>
          )}
        </div>

        {/* Pricing Block & Best Price Label */}
        <div className="pt-2 border-t border-[#F0E6D8] mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#0A1C42] tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Sparkles className="w-3 h-3 text-[#D49B24]" />
            <span className="text-[10px] font-medium text-[#7A584A] tracking-wide">
              Best price guaranteed • Anti-Tarnish
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
