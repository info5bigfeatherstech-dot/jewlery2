import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  Phone,
  Heart
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { GlamisteraLogo } from '@/components/ui/GlamisteraLogo'

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const searchInputRef = useRef<HTMLInputElement>(null)

  const { getCartCount, toggleCart, cartBounceKey, wishlistIds, openLogin, user } = useStore()
  const cartCount = getCartCount()

  // Track scroll position for header blur and shrink
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSearch = () => {
    setIsSearchExpanded(prev => !prev)
    if (!isSearchExpanded) {
      setTimeout(() => searchInputRef.current?.focus(), 150)
    }
  }

  return (
    <>
      <header className="relative z-40 w-full bg-[#FAF7F0] py-2 sm:py-2.5 border-b border-[#EADBCE]/60">
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
            <Link
              to="/"
              className="flex items-center shrink-0"
              aria-label="glaMISTERa Home"
            >
              <GlamisteraLogo variant="horizontal" theme="light" size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-7 text-xs xl:text-sm font-medium text-[#06142E] whitespace-nowrap shrink-0">
              <Link
                to="/collections"
                className="hover:text-[#163B7A] transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                <span>Jewellery Collections</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D49B24] transition-all group-hover:w-full" />
              </Link>

              <Link
                to="/bangles"
                className="hover:text-[#163B7A] transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                <span>Bangles & Kadas</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D49B24] transition-all group-hover:w-full" />
              </Link>

              <Link
                to="/kids-jewellery"
                className="hover:text-[#163B7A] transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                <span>Kids Jewellery</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D49B24] transition-all group-hover:w-full" />
              </Link>

              <Link
                to="/necklaces"
                className="hover:text-[#163B7A] transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                <span>Chokers & Haar</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D49B24] transition-all group-hover:w-full" />
              </Link>

              <Link
                to="/craft-your-style"
                className="hover:text-[#163B7A] transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                <span>Craft Your Style</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D49B24] transition-all group-hover:w-full" />
              </Link>

              <Link
                to="/about"
                className="hover:text-[#163B7A] transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                <span>About Us</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D49B24] transition-all group-hover:w-full" />
              </Link>
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
                        placeholder="Search jhumkas, chokers, bangles..."
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

              {/* Account / Profile Button */}
              <Link
                to="/profile"
                className="hidden sm:flex items-center gap-1.5 p-2.5 rounded-full text-[#0A1C42] hover:bg-[#F4EDE0] transition-colors text-xs font-semibold cursor-pointer"
                aria-label="User account and profile"
              >
                <div className="relative">
                  <User className="w-5 h-5" />
                  {user && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10B981] border border-white" />
                  )}
                </div>
                <span className="hidden xl:inline">{user ? 'My Privé' : 'Account'}</span>
              </Link>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-full text-[#0A1C42] hover:bg-[#F4EDE0] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistIds.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#EC4899] text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistIds.length}
                  </span>
                )}
              </Link>

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
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center"
                    aria-label="glaMISTERa Home"
                  >
                    <GlamisteraLogo variant="horizontal" theme="light" size="sm" showTagline={false} />
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-[#0A1C42] hover:bg-[#F4EDE0] rounded-full"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="py-5 space-y-1">
                  <Link
                    to="/collections"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FAF2E6] font-serif text-base font-semibold text-[#0A1C42]"
                  >
                    All Jewellery Collections
                  </Link>
                  <Link
                    to="/bangles"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FAF2E6] font-serif text-base font-semibold text-[#0A1C42]"
                  >
                    Royal Bangles & Kadas
                  </Link>
                  <Link
                    to="/necklaces"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FAF2E6] font-serif text-base font-semibold text-[#0A1C42]"
                  >
                    Chokers & Bridal Haar
                  </Link>
                  <Link
                    to="/kids-jewellery"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FAF2E6] font-serif text-base font-semibold text-[#0A1C42]"
                  >
                    Kids Jewellery
                  </Link>
                  <Link
                    to="/craft-your-style"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FAF2E6] font-serif text-base font-semibold text-[#0A1C42]"
                  >
                    Craft Your Style (Custom & Bridal)
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FAF2E6] font-serif text-base font-semibold text-[#0A1C42] flex items-center justify-between"
                  >
                    <span>My Saved Wishlist</span>
                    {wishlistIds.length > 0 && (
                      <span className="bg-[#EC4899] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {wishlistIds.length}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FAF2E6] font-serif text-base font-semibold text-[#0A1C42]"
                  >
                    My Privé Profile & Orders
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FAF2E6] text-sm text-[#7A584A]"
                  >
                    About glaMISTERa
                  </Link>
                  <Link
                    to="/policies/shipping"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FAF2E6] text-sm text-[#7A584A]"
                  >
                    Shipping & Exchange Policies
                  </Link>
                </div>
              </div>

              {/* Mobile Drawer Bottom Info */}
              <div className="pt-4 border-t border-[#EADBCE] space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    openLogin()
                  }}
                  className="w-full bg-[#0A1C42] hover:bg-[#06122B] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In / Privé Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    openLogin()
                  }}
                  className="w-full bg-[#FAF6EE] border border-[#D49B24]/40 hover:bg-[#F3E8D6] text-[#0A1C42] py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>New Member? Register for 10% Off</span>
                </button>

                <div className="flex items-center gap-2 text-[11px] text-[#7A584A] justify-center pt-1">
                  <Phone className="w-3.5 h-3.5 text-[#D49B24]" />
                  <span>WhatsApp: +91 88264 33922</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
