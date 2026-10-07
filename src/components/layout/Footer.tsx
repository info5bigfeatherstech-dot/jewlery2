import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
  CreditCard
} from 'lucide-react'
import { InstagramIcon, FacebookIcon } from '@/components/ui/SocialIcons'
import { useStore } from '@/store/useStore'
import { AureliaLogo } from '@/components/ui/AureliaLogo'

export const Footer: React.FC = () => {
  const { openLogin } = useStore()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address')
      return
    }
    setErrorMsg('')
    setIsSubscribed(true)
    setTimeout(() => {
      setEmail('')
    }, 4000)
  }

  const shopLinks = [
    { label: 'All Festive Jhumkas', href: '/#jhumkas-section' },
    { label: 'Royal Bangles & Kadas', href: '/bangles' },
    { label: 'Bridal Haar & Chokers', href: '/#necklaces-section' },
    { label: 'Earring Silhouettes', href: '/#shop-earrings' },
    { label: 'Bridal Trousseau & Sets', href: '/#craft-your-style' },
    { label: 'Anti-Tarnish Collection', href: '/#jhumkas-section' },
  ]

  const policyLinks: Array<{ label: string; href?: string; action?: () => void }> = [
    { label: 'My Saved Wishlist', href: '/wishlist' },
    { label: 'My Privé Profile & Orders', href: '/profile' },
    { label: 'Express Checkout', href: '/checkout' },
    { label: 'Shipping & Delivery Policy', href: '/policies/shipping' },
    { label: 'Refund & 7-Day Exchange', href: '/policies/returns' },
    { label: 'Privacy Policy', href: '/policies/privacy' },
    { label: 'Terms of Service', href: '/policies/terms' },
    { label: 'VIP Privé Sign In', action: openLogin },
  ]

  return (
    <footer id="about-section" className="bg-[#051025] text-[#FAF7F0] pt-16 pb-24 md:pb-16 border-t border-[#D49B24]/30 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#0A1C42] to-transparent opacity-40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter & Club Box */}
        <div className="bg-[#06142E] rounded-3xl p-8 sm:p-10 border border-[#D49B24]/30 shadow-2xl mb-16 relative overflow-hidden">
          <div className="rainbow-line absolute top-0 left-0 right-0 h-1" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D49B24]/20 text-[#D49B24] text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Royal Artisan Circle</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                Unlock 10% Off Your First Festive Order
              </h3>
              <p className="text-sm text-[#EADFCB] mt-1.5 max-w-lg font-light">
                Subscribe for private invitations to new heirloom jewellery unveilings, bridal trousseau previews, and limited-edition Kundan kada releases.
              </p>
            </div>

            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                {isSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-2xl bg-[#10B981]/20 border border-[#10B981] text-center flex items-center justify-center gap-2.5 text-[#10B981]"
                  >
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span className="font-semibold text-sm text-white">
                      Welcome to the family! Check your inbox for code <strong className="text-[#D49B24]">RANG10</strong>.
                    </span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="flex-1 px-4 py-3.5 rounded-full bg-[#FAF7F0] text-[#06142E] text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                      />
                      <button
                        type="submit"
                        className="bg-[#D49B24] hover:bg-[#b58017] text-[#06142E] font-bold px-6 py-3.5 rounded-full text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-md flex-shrink-0"
                      >
                        <span>Join Club</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {errorMsg && (
                      <p className="text-xs text-red-400 pl-3">{errorMsg}</p>
                    )}
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 4 Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block" aria-label="Aurelia Jewels Home">
              <AureliaLogo variant="horizontal" theme="dark" size="md" />
            </Link>

            <p className="text-xs sm:text-sm text-[#EADFCB] leading-relaxed font-light">
              Aurelia Jewels celebrates the beauty of royal Indian heritage and modern sophistication. Handcrafted by master artisans, our collections feature 100% anti-tarnish plating, uncut Kundan stones, and timeless original artistry.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/aurelia.jewels"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D49B24] hover:text-[#06142E] flex items-center justify-center transition-colors text-white"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D49B24] hover:text-[#06142E] flex items-center justify-center transition-colors text-white"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918826433922"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors text-white"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Shop Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-[#D49B24] uppercase tracking-wider text-xs">
              Handcrafted Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#EADFCB]">
              {shopLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:text-white transition-colors block py-0.5">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-base font-bold text-[#D49B24] uppercase tracking-wider text-xs">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-[#EADFCB]">
              {policyLinks.map((link, i) => (
                <li key={i}>
                  {link.action ? (
                    <button
                      type="button"
                      onClick={link.action}
                      className="hover:text-white transition-colors block py-0.5 text-left cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link to={link.href!} className="hover:text-white transition-colors block py-0.5">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Atelier & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-[#D49B24] uppercase tracking-wider text-xs">
              Studio & Atelier
            </h4>
            <div className="space-y-2.5 text-xs text-[#EADFCB]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D49B24] flex-shrink-0 mt-0.5" />
                <span>Aurelia Jewellery Atelier, Johari Bazaar & NCR Heritage Studio, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D49B24] flex-shrink-0" />
                <span>WhatsApp: +91 88264 33922</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D49B24] flex-shrink-0" />
                <span>concierge@aureliajewels.com</span>
              </div>
              <div className="flex items-center gap-2.5 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span className="text-[#10B981]">100% Anti-Tarnish Lifetime Guarantee</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} Aurelia Jewels. Handcrafted with love in India.
          </p>

          {/* Accepted Indian Payment Modes */}
          <div className="flex items-center gap-3 text-[11px] text-[#EADFCB]">
            <span className="flex items-center gap-1">
              <CreditCard className="w-4 h-4 text-[#D49B24]" />
              <span>UPI (GPay / PhonePe / Paytm)</span>
            </span>
            <span>•</span>
            <span>Cards & NetBanking</span>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
