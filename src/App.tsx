import React, { useState } from 'react'
import { AnnouncementBar } from '@/components/home/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { QuickCategoryStrip } from '@/components/home/QuickCategoryStrip'
import { HeroSlider } from '@/components/home/HeroSlider'
import { ShopEarringCategory } from '@/components/home/ShopEarringCategory'
import { JhumkasSection } from '@/components/home/JhumkasSection'
import { PromoBanner } from '@/components/home/PromoBanner'
import { NewArrivalsSection } from '@/components/home/NewArrivalsSection'
import { ArtworkSection } from '@/components/home/ArtworkSection'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { TrustBadges } from '@/components/home/TrustBadges'
import { CraftYourStyle } from '@/components/home/CraftYourStyle'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { BackToTop } from '@/components/ui/BackToTop'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { QuickViewModal } from '@/components/product/QuickViewModal'
import { ToastContainer } from '@/components/ui/ToastContainer'
import { CursorGlow } from '@/components/ui/CursorGlow'
import { LoginModal } from '@/components/layout/LoginModal'

export function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#FAF7F0] text-[#06142E] font-sans selection:bg-[#E89E28]/30 selection:text-[#0A1C42]">
      
      {/* Lightweight Cursor Glow on Desktop */}
      <CursorGlow />

      {/* 1. AnnouncementBar */}
      <AnnouncementBar />

      {/* 2. Header */}
      <Header />

      {/* 3. QuickCategoryStrip */}
      <QuickCategoryStrip />

      <main id="main-content">
        {/* 4. HeroSlider */}
        <HeroSlider />

        {/* 5. ShopEarringCategory */}
        <ShopEarringCategory />

        {/* 6. ProductSection "Jhumkas" */}
        <JhumkasSection />

        {/* 7. New Arrivals with dedicated Full-Width Image Banner */}
        <NewArrivalsSection />

        {/* 9. PromoBanner 2 (Second, different image & bridal/royal theme) */}
        <PromoBanner
          id="promo-2"
          tag="ROYAL HERITAGE JAIPUR"
          title="Kundan Watches That Tell Ancient Tales"
          subtitle="Where horology meets Indian heirloom jadau craftsmanship."
          description="Designed by Artist Richa, each watch bracelet pairs Japanese quartz accuracy with hand-cut foil-backed Kundan stones, emerald cabochons, and royal elephant motifs."
          ctaText="Discover Kundan Watches"
          ctaLink="#new-arrivals-section"
          image="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
          badgeText="Signature Collection 2026"
          reverse={true}
        />

        {/* 10. ProductSection "Artwork By Richa" */}
        <ArtworkSection />

        {/* 11. ReviewsSection */}
        <ReviewsSection />

        {/* 12. TrustBadges */}
        <TrustBadges />

        {/* 13. CraftYourStyle CTA */}
        <CraftYourStyle />
      </main>

      {/* 15. Footer */}
      <Footer />

      {/* 16. MobileBottomNav */}
      <MobileBottomNav onOpenLogin={() => setIsLoginModalOpen(true)} />

      {/* Extra Overlays & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <ToastContainer />
      <BackToTop />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  )
}

export default App
