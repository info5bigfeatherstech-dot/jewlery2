import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Phone,
  Heart
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { LoginModal } from '@/components/layout/LoginModal'

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { getCartCount, toggleCart, cartBounceKey, wishlistIds } = useStore()
  const cartCount = getCartCount()

  // Track scroll position for header blur and shrink
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mega-menu hover delay management
  const handleMouseEnterMega = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current)
    setIsMegaMenuOpen(true)
  }

  const handleMouseLeaveMega = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false)
    }, 180)
  }

  const toggleSearch = () => {
    setIsSearchExpanded(prev => !prev)
    if (!isSearchExpanded) {
      setTimeout(() => searchInputRef.current?.focus(), 150)
    }
  }

  const jewelleryCategories = [
    { title: 'All Earrings & Cuffs', desc: 'Jhumkas, drops, chandbalis & daily studs', link: '#shop-earrings' },
    { title: 'Necklaces & Sets', desc: 'Chokers, bridal haar & layered chains', link: '#jhumkas-section' },
    { title: 'Bracelets & Cuffs', desc: 'Openable kada, butterfly cuffs & charms', link: '#new-arrivals-section' },
    { title: 'Rings', desc: 'Adjustable statement cocktail rings', link: '#shop-earrings' },
    { title: 'Kundan Watches', desc: 'Heirloom watch bracelets with stones', link: '#new-arrivals-section' },
    { title: 'Bridal Sets', desc: 'Grand wedding ornaments & sets', link: '#craft-your-style' },
  ]

  return (
    <>
      <header className="relative z-40 w-full bg-[#FAF7F0] py-3.5 sm:py-4 border-b border-[#EADBCE]/60">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 lg:gap-3 xl:gap-6">
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#0A1C42] hover:bg-[#F4EDE0] rounded-xl transition-colors shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <a
              href="#"
              className="flex items-center gap-2 sm:gap-2.5 group text-left select-none shrink-0"
              aria-label="Aurelia Jewels Home"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0A1C42] via-[#1D4ED8] to-[#D49B24] p-[1.5px] shadow-sm flex items-center justify-center">
                  <span className="w-full h-full bg-[#081734] rounded-full flex items-center justify-center text-[#D49B24] font-serif font-black text-sm">
                    A
                  </span>
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-lg sm:text-xl xl:text-2xl font-bold tracking-tight text-[#0A1C42]">
                    Aurelia
                  </span>
                  <span className="font-serif text-sm sm:text-base xl:text-lg font-normal text-[#D49B24] tracking-widest uppercase">
                    Jewels
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#7A584A] font-medium -mt-1 hidden sm:block">
                  Handcrafted Luxury
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-7 text-xs xl:text-sm font-medium text-[#06142E] whitespace-nowrap shrink-0">
              {/* Mega Menu Trigger: Jewellery Collections */}
              <div
                className="relative py-2 shrink-0"
                onMouseEnter={handleMouseEnterMega}
                onMouseLeave={handleMouseLeaveMega}
              >
                <button
                  className="flex items-center gap-1.5 hover:text-[#163B7A] transition-colors py-1 group whitespace-nowrap"
                  aria-expanded={isMegaMenuOpen}
                >
                  <span className="relative">
                    Jewellery Collections
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF6B4A] to-[#D49B24] transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#D49B24] transition-transform duration-200 ${
                      isMegaMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {isMegaMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full -left-12 w-[680px] glass-dropdown rounded-2xl p-6 border border-[#EADBCE] shadow-2xl z-50 grid grid-cols-3 gap-6"
                    >
                      <div className="col-span-2 grid grid-cols-2 gap-4">
                        {jewelleryCategories.map((cat, i) => (
                          <a
                            key={i}
                            href={cat.link}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="group/item p-3 rounded-xl hover:bg-[#FAF2E6] transition-all border border-transparent hover:border-[#D49B24]/30"
                          >
                            <div className="font-serif font-semibold text-[#0A1C42] group-hover/item:text-[#163B7A] text-sm flex items-center justify-between">
                              <span>{cat.title}</span>
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#D49B24]" />
                            </div>
                            <p className="text-xs text-[#7A584A] mt-1 line-clamp-1">
                              {cat.desc}
                            </p>
                          </a>
                        ))}
                      </div>

                      {/* Featured Promo Card in Mega Menu */}
                      <div className="bg-gradient-to-br from-[#0A1C42] to-[#040D1E] rounded-xl p-4 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D49B24] bg-white/10 px-2 py-0.5 rounded-full">
                            Artisan Spotlight
                          </span>
                          <h4 className="font-serif text-base font-bold mt-2 leading-snug">
                            Anti-Tarnish Festive Kundan
                          </h4>
                          <p className="text-xs text-white/70 mt-1 line-clamp-2">
                            Water resistant & hand-set with pure Rajasthan pearls.
                          </p>
                        </div>

                        <a
                          href="#jhumkas-section"
                          onClick={() => setIsMegaMenuOpen(false)}
                          className="relative z-10 inline-flex items-center gap-1 text-xs font-semibold text-[#D49B24] hover:underline mt-4"
                        >
                          <span>Explore Collection</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>

                        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-[#D49B24]/10 rounded-full blur-xl pointer-events-none" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#new-arrivals-section"
                className="hover:text-[#163B7A] transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                <span>Kundan Watches</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D49B24] transition-all group-hover:w-full" />
              </a>

              <a
                href="#shop-earrings"
                className="hover:text-[#163B7A] transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                <span>Kids Jewellery</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D49B24] transition-all group-hover:w-full" />
              </a>

              <a
                href="#artwork-section"
                className="hover:text-[#163B7A] transition-colors relative py-1 group flex items-center gap-1 whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D49B24]" />
                <span className="text-[#163B7A] font-semibold">Art & Canvases</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D81B60] to-[#8E24AA] transition-all group-hover:w-full" />
              </a>

              <a
                href="#craft-your-style"
                className="hover:text-[#163B7A] transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                <span>Craft Your Style</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D49B24] transition-all group-hover:w-full" />
              </a>

              <a
                href="#about-section"
                className="hover:text-[#163B7A] transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                <span>About Us</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D49B24] transition-all group-hover:w-full" />
              </a>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-3 shrink-0">
              {/* Expanding Search Bar */}
              <div className="relative flex items-center">
                <AnimatePresence>
                  {isSearchExpanded && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 220, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden mr-2"
                    >
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search jhumka, watches, art..."
                        className="w-full text-xs py-2 pl-3 pr-8 rounded-full bg-white border border-[#D5C2B4] focus:outline-none focus:ring-1 focus:ring-[#D49B24] text-[#06142E]"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={toggleSearch}
                  className="p-2.5 rounded-full text-[#0A1C42] hover:bg-[#F4EDE0] transition-colors"
                  aria-label="Search catalog"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Login Modal Trigger */}
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 p-2.5 rounded-full text-[#0A1C42] hover:bg-[#F4EDE0] transition-colors text-xs font-semibold"
                aria-label="User account and login"
              >
                <User className="w-5 h-5" />
                <span className="hidden xl:inline">Account</span>
              </button>

              {/* Wishlist Link */}
              <a
                href="#jhumkas-section"
                className="relative p-2.5 rounded-full text-[#0A1C42] hover:bg-[#F4EDE0] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistIds.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#EC4899] text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistIds.length}
                  </span>
                )}
              </a>

              {/* Cart Button with Bouncing Count Badge */}
              <button
                onClick={toggleCart}
                className="relative p-2.5 rounded-full bg-[#0A1C42] text-white hover:bg-[#06122B] transition-colors shadow-sm flex items-center justify-center group"
                aria-label={`Open shopping cart with ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />

                {/* Animated Bouncing Cart Count Badge */}
                <motion.span
                  key={cartBounceKey}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.45, 0.9, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="absolute -top-1.5 -right-1.5 bg-[#D49B24] text-[#4A0E17] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                >
                  {cartCount}
                </motion.span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 bottom-0 left-0 w-[85%] max-w-sm bg-[#FAF7F0] z-50 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#EADBCE]">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#081734] text-[#D49B24] flex items-center justify-center font-serif font-black text-sm">
                      A
                    </span>
                    <span className="font-serif font-bold text-lg text-[#0A1C42]">
                      Aurelia <span className="text-[#D49B24] font-normal uppercase text-sm tracking-wider">Jewels</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-[#0A1C42] hover:bg-[#F4EDE0] rounded-full"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="py-6 space-y-1">
                  <a
                    href="#shop-earrings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FAF2E6] font-serif text-base font-semibold text-[#0A1C42]"
                  >
                    Shop Earrings & Jhumkas
                  </a>
                  <a
                    href="#new-arrivals-section"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FAF2E6] font-serif text-base font-semibold text-[#0A1C42]"
                  >
                    Kundan Watches & Bracelets
                  </a>
                  <a
                    href="#artwork-section"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-pink-50 text-[#163B7A] font-serif text-base font-bold"
                  >
                    <span>Wall Decor & Art by Richa</span>
                    <Sparkles className="w-4 h-4 text-[#D49B24]" />
                  </a>
                  <a
                    href="#craft-your-style"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FAF2E6] font-serif text-base font-semibold text-[#0A1C42]"
                  >
                    Craft Your Style (Custom & Bridal)
                  </a>
                  <a
                    href="#reviews-section"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FAF2E6] text-sm text-[#7A584A]"
                  >
                    Customer Testimonials (4.7★)
                  </a>
                  <a
                    href="#about-section"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FAF2E6] text-sm text-[#7A584A]"
                  >
                    About Artist Richa
                  </a>
                </div>
              </div>

              {/* Mobile Drawer Bottom Info */}
              <div className="pt-6 border-t border-[#EADBCE] space-y-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsLoginModalOpen(true)
                  }}
                  className="w-full bg-[#0A1C42] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Log In / Sign Up</span>
                </button>

                <div className="flex items-center gap-2 text-xs text-[#7A584A] justify-center">
                  <Phone className="w-3.5 h-3.5 text-[#D49B24]" />
                  <span>Call / WhatsApp: +91 88264 33922</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Account Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}
