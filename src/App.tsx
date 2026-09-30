import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AnnouncementBar } from '@/components/home/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { QuickViewModal } from '@/components/product/QuickViewModal'
import { LoginModal } from '@/components/layout/LoginModal'
import { ToastContainer } from '@/components/ui/ToastContainer'
import { CursorGlow } from '@/components/ui/CursorGlow'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { useStore } from '@/store/useStore'

// Pages
import { HomePage } from '@/pages/HomePage'
import { CollectionPage } from '@/pages/CollectionPage'
import { CraftYourStylePage } from '@/pages/CraftYourStylePage'
import { AboutPage } from '@/pages/AboutPage'
import { PrivacyPolicyPage } from '@/pages/policies/PrivacyPolicyPage'
import { ShippingPolicyPage } from '@/pages/policies/ShippingPolicyPage'
import { ReturnsPolicyPage } from '@/pages/policies/ReturnsPolicyPage'
import { TermsPolicyPage } from '@/pages/policies/TermsPolicyPage'
import { PoliciesHubPage } from '@/pages/policies/PoliciesHubPage'
import { WishlistPage } from '@/pages/WishlistPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { ProfilePage } from '@/pages/ProfilePage'

/** Redirects any direct /login or /register URL visits to home while triggering the luxury popup modal */
function AuthPopupRedirect() {
  const { openLogin } = useStore()
  useEffect(() => {
    openLogin()
  }, [openLogin])
  return <Navigate to="/" replace />
}

export function App() {
  return (
    <div className="relative min-h-screen bg-[#FAF7F0] text-[#06142E] font-sans selection:bg-[#E89E28]/30 selection:text-[#0A1C42]">
      {/* Route & Hash Scroll Handler */}
      <ScrollToTop />

      {/* Lightweight Ambient Cursor Glow on Desktop */}
      <CursorGlow />

      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Luxury Header */}
      <Header />

      {/* 3. Main Dynamic Content / Multi-Page Routing */}
      <main id="main-content">
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<HomePage />} />

          {/* Dedicated Navbar & Category Routes */}
          <Route path="/collections" element={<CollectionPage forcedCategory="all" />} />
          <Route path="/collections/:categoryId" element={<CollectionPage />} />
          <Route path="/category/:categoryId" element={<CollectionPage />} />
          <Route path="/bangles" element={<CollectionPage forcedCategory="bangles" />} />
          <Route path="/watches" element={<Navigate to="/bangles" replace />} />
          <Route path="/necklaces" element={<CollectionPage forcedCategory="necklaces" />} />
          <Route path="/kids-jewellery" element={<CollectionPage forcedCategory="kids-jewellery" />} />
          <Route path="/new-arrivals" element={<CollectionPage forcedCategory="new-arrivals" />} />
          <Route path="/best-sellers" element={<CollectionPage forcedCategory="best-sellers" />} />
          <Route path="/anti-tarnish" element={<CollectionPage forcedCategory="anti-tarnish" />} />
          <Route path="/bridal" element={<CollectionPage forcedCategory="bridal" />} />
          <Route path="/premium" element={<CollectionPage forcedCategory="premium" />} />

          {/* Bespoke & About Pages */}
          <Route path="/craft-your-style" element={<CraftYourStylePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Wishlist, Checkout & User Profile Pages */}
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/account" element={<ProfilePage />} />

          {/* Auth & Policies */}
          <Route path="/login" element={<AuthPopupRedirect />} />
          <Route path="/register" element={<AuthPopupRedirect />} />
          <Route path="/policies" element={<PoliciesHubPage />} />
          <Route path="/policies/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/policies/shipping" element={<ShippingPolicyPage />} />
          <Route path="/policies/returns" element={<ReturnsPolicyPage />} />
          <Route path="/policies/terms" element={<TermsPolicyPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 4. Luxury Footer */}
      <Footer />

      {/* 5. Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* 6. Drawers, Modals & Alerts */}
      <CartDrawer />
      <QuickViewModal />
      <LoginModal />
      <ToastContainer />
    </div>
  )
}

export default App
