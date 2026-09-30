import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import {
  Sparkles,
  SlidersHorizontal,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { allProducts, jhumkasData, newArrivalsData, chokersData } from '@/data/products'
import { Product } from '@/types'

interface CollectionPageProps {
  forcedCategory?: string
}

interface CategoryMeta {
  title: string
  subtitle: string
  tag: string
  bannerImg: string
  filterFn: (p: Product) => boolean
}

export const CollectionPage: React.FC<CollectionPageProps> = ({ forcedCategory }) => {
  const params = useParams<{ categoryId?: string }>()
  const activeSlug = (forcedCategory || params.categoryId || 'all').toLowerCase()

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured')
  const [priceRange, setPriceRange] = useState<'all' | 'under-1000' | '1000-4000' | 'above-4000'>('all')

  const categoryMetaMap: Record<string, CategoryMeta> = {
    all: {
      title: 'Imperial Indian Jewellery Collections',
      subtitle: 'Handcrafted festive jhumkas, royal Kundan bangles, and imperial bridal chokers dipped in 22K micro gold polish.',
      tag: 'Complete Heirloom Catalog',
      bannerImg: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1600&q=80',
      filterFn: () => true
    },
    collections: {
      title: 'Imperial Indian Jewellery Collections',
      subtitle: 'Handcrafted festive jhumkas, royal Kundan bangles, and imperial bridal chokers dipped in 22K micro gold polish.',
      tag: 'Complete Heirloom Catalog',
      bannerImg: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1600&q=80',
      filterFn: () => true
    },
    jhumkas: {
      title: 'Festive Handcrafted Jhumkas & Chandbalis',
      subtitle: 'Feather-light brass core adorned with Basra pearl clusters, sacred lotus motifs, and tinkling chime ghungroos.',
      tag: 'Jaipur Artisan Series',
      bannerImg: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1600&q=80',
      filterFn: (p) => p.category === 'Jhumkas' || p.title.toLowerCase().includes('jhumka')
    },
    bangles: {
      title: 'Royal Kundan Bangles, Kadas & Bracelets',
      subtitle: 'Heirloom openable kadas, Jaipur Meenakari bangles, and sparkling Austrian crystal tennis bracelets dipped in 22K micro gold polish.',
      tag: 'Imperial Wrist Adornments',
      bannerImg: 'https://images.unsplash.com/photo-1611591475152-47831c367468?auto=format&fit=crop&w=1600&q=80',
      filterFn: (p) => p.category === 'Bangles' || p.category === 'Bracelets' || p.title.toLowerCase().includes('bangle') || p.title.toLowerCase().includes('kada') || p.title.toLowerCase().includes('bracelet')
    },
    watches: {
      title: 'Royal Kundan Bangles, Kadas & Bracelets',
      subtitle: 'Heirloom openable kadas, Jaipur Meenakari bangles, and sparkling Austrian crystal tennis bracelets dipped in 22K micro gold polish.',
      tag: 'Imperial Wrist Adornments',
      bannerImg: 'https://images.unsplash.com/photo-1611591475152-47831c367468?auto=format&fit=crop&w=1600&q=80',
      filterFn: (p) => p.category === 'Bangles' || p.category === 'Bracelets' || p.title.toLowerCase().includes('bangle') || p.title.toLowerCase().includes('kada') || p.title.toLowerCase().includes('bracelet')
    },
    necklaces: {
      title: 'Imperial Chokers & Royal Bridal Haar',
      subtitle: 'Opulent Jaipur Kundan chokers, uncut Polki haar, and reversible Meenakari collars finished with lifetime anti-tarnish seal.',
      tag: 'Bridal Heritage Centerpieces',
      bannerImg: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1600&q=80',
      filterFn: (p) => p.category === 'Necklaces' || chokersData.some((c) => c.id === p.id)
    },
    'new-arrivals': {
      title: 'New Festive Arrivals 2026',
      subtitle: 'Be the first to adorn our newly unveiled artisan creations, freshly polished and hallmarked at our Jaipur atelier.',
      tag: 'Fresh Unveilings',
      bannerImg: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80',
      filterFn: (p) => p.badge === 'NEW' || newArrivalsData.some((n) => n.id === p.id)
    },
    'best-sellers': {
      title: 'Most Loved Best Sellers',
      subtitle: 'Our top customer favorites celebrated for high luster, wedding durability, and glowing 5-star customer reviews.',
      tag: 'Trending & Beloved',
      bannerImg: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1600&q=80',
      filterFn: (p) => p.badge === 'BEST SELLER' || p.rating >= 4.9
    },
    'kids-jewellery': {
      title: "Kid's & Teens Festive Jewellery",
      subtitle: 'Ultra-lightweight, hypoallergenic studs, dainty butterfly cuffs, and gentle anti-tarnish pieces made for delicate skin.',
      tag: 'Gentle & Hypoallergenic',
      bannerImg: 'https://images.unsplash.com/photo-1611591475152-47831c367468?auto=format&fit=crop&w=1600&q=80',
      filterFn: (p) =>
        p.id === 'arrival-2' ||
        p.id === 'arrival-6' ||
        p.id === 'jhumka-1' ||
        p.id === 'jhumka-2' ||
        p.price <= 499
    },
    kids: {
      title: "Kid's & Teens Festive Jewellery",
      subtitle: 'Ultra-lightweight, hypoallergenic studs, dainty butterfly cuffs, and gentle anti-tarnish pieces made for delicate skin.',
      tag: 'Gentle & Hypoallergenic',
      bannerImg: 'https://images.unsplash.com/photo-1611591475152-47831c367468?auto=format&fit=crop&w=1600&q=80',
      filterFn: (p) =>
        p.id === 'arrival-2' ||
        p.id === 'arrival-6' ||
        p.id === 'jhumka-1' ||
        p.id === 'jhumka-2' ||
        p.price <= 499
    },
    'anti-tarnish': {
      title: 'Lifetime Anti-Tarnish Guarantee Collection',
      subtitle: 'Engineered with 22K micro gold electro-deposition to resist sweat, water, and humidity across festive wedding seasons.',
      tag: '100% Tarnish-Free Plating',
      bannerImg: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1600&q=80',
      filterFn: () => true
    },
    bridal: {
      title: 'Grand Bridal Trousseau & Wedding Sets',
      subtitle: 'Complete heirloom bridal statement pieces featuring layered Basra pearls, Jadau peacock pendants, and matching jhumkis.',
      tag: 'Royal Wedding Edit',
      bannerImg: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80',
      filterFn: (p) =>
        p.category === 'Necklaces' ||
        p.title.toLowerCase().includes('choker') ||
        p.title.toLowerCase().includes('haar') ||
        p.title.toLowerCase().includes('kundan')
    },
    premium: {
      title: 'Aurelia Haute Joaillerie (Premium)',
      subtitle: 'Masterpiece collector editions handcrafted with uncut Polki, authentic Meenakari reverse enameling, and heavy 22K gold polish.',
      tag: 'Collector Editions',
      bannerImg: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1600&q=80',
      filterFn: (p) => p.price >= 799 || p.rating >= 4.9
    }
  }

  const currentMeta = categoryMetaMap[activeSlug] || categoryMetaMap.all

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter(currentMeta.filterFn)

    // Price Filter
    if (priceRange === 'under-1000') {
      result = result.filter((p) => p.price < 1000)
    } else if (priceRange === '1000-4000') {
      result = result.filter((p) => p.price >= 1000 && p.price <= 4000)
    } else if (priceRange === 'above-4000') {
      result = result.filter((p) => p.price > 4000)
    }

    // Sort
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [currentMeta, priceRange, sortBy])

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Clean Category Title Header (No Banner) */}
        <div className="mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#06142E] mb-1.5">
            {currentMeta.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#7A584A] max-w-3xl leading-relaxed">
            {currentMeta.subtitle}
          </p>
        </div>

        {/* Filter and Sorting Control Strip */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EADBCE] shadow-sm mb-8">
          
          {/* Price Range Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-[#7A584A] mr-1 hidden sm:inline">Price:</span>
            {[
              { id: 'all' as const, label: 'All Prices' },
              { id: 'under-1000' as const, label: 'Under ₹1,000' },
              { id: '1000-4000' as const, label: '₹1,000 – ₹4,000' },
              { id: 'above-4000' as const, label: 'Above ₹4,000' }
            ].map((rng) => (
              <button
                key={rng.id}
                onClick={() => setPriceRange(rng.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  priceRange === rng.id
                    ? 'bg-[#FAF2E6] text-[#0A1C42] border border-[#D49B24]/40 font-bold'
                    : 'text-[#7A584A] hover:text-[#0A1C42]'
                }`}
              >
                {rng.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown & Product Counter */}
          <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#EADBCE]">
            <span className="text-xs text-[#7A584A] font-medium">
              Showing <strong className="text-[#0A1C42]">{filteredProducts.length}</strong> pieces
            </span>

            <div className="flex items-center gap-1.5 bg-[#FAF7F0] border border-[#D5C2B4] rounded-xl px-2.5 py-1.5 text-xs text-[#0A1C42]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#D49B24]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer pr-1"
                aria-label="Sort jewellery collection"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated (★)</option>
              </select>
            </div>
          </div>

        </div>

        {/* 4-Card Responsive Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#EADBCE] p-8 space-y-4">
            <Sparkles className="w-12 h-12 text-[#D49B24] mx-auto opacity-70" />
            <h3 className="font-serif text-xl font-bold text-[#06142E]">No pieces match your price filter</h3>
            <p className="text-xs text-[#7A584A]">Try adjusting your price range filter to discover our collections.</p>
            <button
              onClick={() => setPriceRange('all')}
              className="bg-[#0A1C42] hover:bg-[#06122B] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Reset Price Filter
            </button>
          </div>
        )}

        {/* Bottom Trust Guarantee Strip */}
        <div className="mt-16 pt-10 border-t border-[#EADBCE] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-5 rounded-2xl bg-white border border-[#EADBCE] space-y-1.5 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-[#10B981] mx-auto" />
            <h4 className="font-serif text-sm font-bold text-[#0A1C42]">Lifetime Anti-Tarnish Guarantee</h4>
            <p className="text-xs text-[#7A584A]">22K micro gold plating sealed against discoloration.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#EADBCE] space-y-1.5 shadow-sm">
            <Truck className="w-6 h-6 text-[#D49B24] mx-auto" />
            <h4 className="font-serif text-sm font-bold text-[#0A1C42]">Free Insured Express Delivery</h4>
            <p className="text-xs text-[#7A584A]">Complimentary on all pan-India orders above ₹499.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#EADBCE] space-y-1.5 shadow-sm">
            <RotateCcw className="w-6 h-6 text-[#163B7A] mx-auto" />
            <h4 className="font-serif text-sm font-bold text-[#0A1C42]">7-Day Doorstep Exchange</h4>
            <p className="text-xs text-[#7A584A]">Effortless reverse pickup if you ever need a size swap.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
