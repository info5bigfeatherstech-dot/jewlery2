import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Grid, ShoppingBag, User, MessageCircle } from 'lucide-react'
import { useStore } from '@/store/useStore'

interface MobileBottomNavProps {
  onOpenLogin: () => void
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenLogin }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'category' | 'cart' | 'account' | 'whatsapp'>('home')
  const { toggleCart, getCartCount } = useStore()
  const cartCount = getCartCount()

  const handleTabClick = (tab: 'home' | 'category' | 'cart' | 'account' | 'whatsapp') => {
    setActiveTab(tab)
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (tab === 'category') {
      document.getElementById('shop-earrings')?.scrollIntoView({ behavior: 'smooth' })
    } else if (tab === 'cart') {
      toggleCart()
    } else if (tab === 'account') {
      onOpenLogin()
    } else if (tab === 'whatsapp') {
      window.open('https://wa.me/918826433922', '_blank')
    }
  }

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'category' as const, label: 'Category', icon: Grid },
    { id: 'cart' as const, label: 'Bag', icon: ShoppingBag, badge: cartCount },
    { id: 'account' as const, label: 'Account', icon: User },
    { id: 'whatsapp' as const, label: 'WhatsApp', icon: MessageCircle },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-lg border-t border-[#EADBCE] md:hidden py-2 px-3 shadow-festive">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className="relative flex flex-col items-center justify-center py-1 px-3 text-center"
              aria-label={item.label}
            >
              {/* Sliding Pill Indicator for Active Tab */}
              {isActive && (
                <motion.div
                  layoutId="activeMobileTabPill"
                  className="absolute inset-0 bg-[#0A1C42]/10 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-[#0A1C42]' : 'text-[#7A584A]'
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#D49B24] text-[#4A0E17] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] font-medium mt-1 transition-colors ${
                  isActive ? 'text-[#0A1C42] font-bold' : 'text-[#7A584A]'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
