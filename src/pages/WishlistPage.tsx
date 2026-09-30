import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Heart,
  ShoppingBag,
  Trash2,
  Sparkles,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Eye,
  CheckCircle2
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { useToastStore } from '@/store/useToast'
import { allProducts } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { formatPrice } from '@/lib/utils'

export const WishlistPage: React.FC = () => {
  const {
    wishlistIds,
    toggleWishlist,
    clearWishlist,
    addToCart,
    openCart,
    openQuickView
  } = useStore()
  const { addToast } = useToastStore()

  // Match wishlist IDs with allProducts
  const wishlistProducts = allProducts.filter((product) =>
    wishlistIds.includes(product.id)
  )

  // Move single item to bag
  const handleMoveToBag = (product: typeof allProducts[0]) => {
    addToCart(product, 1)
    addToast({
      title: 'Added to Shopping Bag',
      description: `${product.title} has been moved to your bag.`,
      type: 'success'
    })
    openCart()
  }

  // Move all in-stock items to bag
  const handleMoveAllToBag = () => {
    if (wishlistProducts.length === 0) return
    wishlistProducts.forEach((product) => {
      addToCart(product, 1)
    })
    addToast({
      title: 'All Pieces Moved to Bag',
      description: `Transferred ${wishlistProducts.length} items to your shopping bag.`,
      type: 'success'
    })
    openCart()
  }

  // Clear all
  const handleClearAll = () => {
    clearWishlist()
    addToast({
      title: 'Wishlist Cleared',
      description: 'All items removed from your wishlist.',
      type: 'info'
    })
  }

  // Top trending recommendation pieces not currently in wishlist
  const recommendations = allProducts
    .filter((p) => !wishlistIds.includes(p.id))
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Luxury Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7A584A] mb-6">
          <Link to="/" className="hover:text-[#0A1C42] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="font-semibold text-[#0A1C42]">Wishlist</span>
        </nav>

        {/* Page Title & Controls Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#EADBCE]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1C42]/10 text-[#0A1C42] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D49B24]" />
              <span>Personal Collection</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#06142E] tracking-tight">
              My Royal Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-[#7A584A] mt-1.5 max-w-xl">
              Curated heirloom jewellery pieces you've saved for your special festive celebrations and wedding trousseau.
            </p>
          </div>

          {wishlistProducts.length > 0 && (
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleClearAll}
                className="px-4 py-2.5 rounded-full border border-[#D5C2B4] text-[#7A584A] hover:text-[#0A1C42] hover:bg-[#F3E8D6] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Remove all items from wishlist"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>

              <button
                onClick={handleMoveAllToBag}
                className="px-6 py-2.5 rounded-full bg-[#0A1C42] hover:bg-[#06122B] text-white text-xs font-bold shadow-festive transition-all flex items-center gap-2 cursor-pointer group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Bag ({wishlistProducts.length})</span>
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items Display */}
        {wishlistProducts.length > 0 ? (
          <div className="space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-[#EADBCE] shadow-sm hover:shadow-festive transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Container with Badges */}
                  <div className="relative aspect-square overflow-hidden bg-[#FDFBF7]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-[#0A1C42] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        {product.badge}
                      </span>
                    )}

                    {/* Quick View Floating Button */}
                    <button
                      onClick={() => openQuickView(product)}
                      className="absolute bottom-2.5 left-2.5 bg-white/90 hover:bg-white text-[#0A1C42] p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      title="Quick Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Remove from Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2.5 right-2.5 bg-white/90 hover:bg-white text-[#EC4899] p-2 rounded-full shadow-md transition-transform hover:scale-110 cursor-pointer"
                      title="Remove from wishlist"
                      aria-label="Remove item from wishlist"
                    >
                      <Heart className="w-4 h-4 fill-[#EC4899]" />
                    </button>
                  </div>

                  {/* Details & Actions */}
                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-[#D49B24] uppercase tracking-wider block mb-1">
                        {product.category}
                      </span>
                      <h3 className="font-serif text-sm font-bold text-[#06142E] line-clamp-1 group-hover:text-[#163B7A] transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-baseline gap-2 mt-1.5">
                        <span className="font-bold text-sm text-[#0A1C42]">
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <span className="text-xs text-[#7A584A] line-through">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#FAF2E6] flex items-center gap-2">
                      <button
                        onClick={() => handleMoveToBag(product)}
                        className="flex-1 bg-[#0A1C42] hover:bg-[#06122B] text-white py-2 px-3 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-2 text-[#7A584A] hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reassurance Banner */}
            <div className="p-6 rounded-2xl bg-white border border-[#EADBCE] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#0A1C42]">
                    100% Anti-Tarnish Lifetime Guarantee
                  </h4>
                  <p className="text-xs text-[#7A584A]">
                    All pieces in your wishlist feature 22K micro gold plating and Jaipur Kundan foil backing.
                  </p>
                </div>
              </div>

              <Link
                to="/collections"
                className="text-xs font-bold text-[#163B7A] hover:text-[#0A1C42] flex items-center gap-1 shrink-0 uppercase tracking-wider"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center bg-white rounded-3xl border border-[#EADBCE] p-8 max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FAF2E6] flex items-center justify-center text-[#D49B24] mx-auto mb-4 border border-[#D49B24]/30 shadow-inner">
              <Heart className="w-8 h-8 stroke-[1.5]" />
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#06142E] mb-2">
              Your Royal Wishlist is Empty
            </h2>

            <p className="text-xs sm:text-sm text-[#7A584A] leading-relaxed mb-6">
              You haven't saved any heirloom pieces yet. Explore our handcrafted festive jhumkas, Kundan bangles, and imperial chokers to build your dream bridal collection.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/collections"
                className="w-full sm:w-auto bg-[#0A1C42] hover:bg-[#06122B] text-white px-6 py-3 rounded-full font-bold text-xs shadow-festive transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore All Collections</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/#jhumkas-section"
                className="w-full sm:w-auto bg-[#FAF7F0] hover:bg-[#F3E8D6] text-[#0A1C42] border border-[#D5C2B4] px-6 py-3 rounded-full font-bold text-xs transition-colors cursor-pointer"
              >
                View Festive Jhumkas
              </Link>
            </div>
          </div>
        )}

        {/* You May Also Cherish Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#EADBCE]">
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-bold text-[#06142E] tracking-tight">
                You May Also Cherish
              </h2>
              <p className="text-xs text-[#7A584A] mt-1">
                Handcrafted bestsellers adored by brides across Jaipur & Delhi.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {recommendations.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
