import React from 'react'
import { QuickCategoryStrip } from '@/components/home/QuickCategoryStrip'
import { HeroSlider } from '@/components/home/HeroSlider'
import { ShopEarringCategory } from '@/components/home/ShopEarringCategory'
import { JhumkasSection } from '@/components/home/JhumkasSection'
import { PromoBanner } from '@/components/home/PromoBanner'
import { NewArrivalsSection } from '@/components/home/NewArrivalsSection'
import { NecklacesSection } from '@/components/home/NecklacesSection'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { TrustBadges } from '@/components/home/TrustBadges'
import { CraftYourStyle } from '@/components/home/CraftYourStyle'

export const HomePage: React.FC = () => {
  return (
    <div id="home-page-container">
      {/* 0. Quick Category Filter Strip */}
      <QuickCategoryStrip />

      {/* 1. Hero Carousel */}
      <HeroSlider />

      {/* 2. Shop Earring Category Grid */}
      <ShopEarringCategory />

      {/* 3. Festive Jhumkas Section */}
      <JhumkasSection />

      {/* 4. New Arrivals / Festive Jewellery Carousel */}
      <NewArrivalsSection />

      {/* 5. Royal Heritage Jaipur Promo Banner */}
      <PromoBanner
        id="promo-2"
        tag="ROYAL HERITAGE JAIPUR"
        title="Kundan Kadas & Heirloom Bangles"
        subtitle="Where royal heritage meets Indian heirloom jadau craftsmanship."
        description="Sculpted by fifth-generation artisans, each royal kada pairs 22K micro gold plating with hand-cut foil-backed Kundan stones, emerald cabochons, and openable screw clasps."
        ctaText="Discover Bangles & Kadas"
        ctaLink="/bangles"
        image="https://images.unsplash.com/photo-1611591475152-47831c367468?auto=format&fit=crop&w=1200&q=80"
        badgeText="Jaipur Heritage Series"
        reverse={true}
      />

      {/* 6. Imperial Chokers & Bridal Rani Haar */}
      <NecklacesSection />

      {/* 7. Verified Customer Reviews */}
      <ReviewsSection />

      {/* 8. Trust & Hallmark Badges */}
      <TrustBadges />

      {/* 9. Craft Your Style / Bespoke Bridal Consultation */}
      <CraftYourStyle />
    </div>
  )
}
