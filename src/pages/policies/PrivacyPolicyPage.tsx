import React from 'react'
import { PolicyLayout } from './PolicyLayout'
import { Lock, ShieldCheck, Key, Eye, UserCheck } from 'lucide-react'

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <PolicyLayout
      title="Privacy Policy"
      subtitle="How Aurelia Jewels safeguards your personal identity, payment security, and bespoke consultation data."
    >
      <div className="space-y-6 text-sm leading-relaxed text-[#4A3B32]">
        
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <ShieldCheck className="w-5 h-5 text-[#D49B24]" />
            <h2>1. Commitment to Your Privacy</h2>
          </div>
          <p>
            At Aurelia Jewels (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we recognize the trust you place in us when sharing your personal information for handcrafted jewellery purchases and bespoke bridal styling. This Privacy Policy outlines our transparent protocols for gathering, securing, and processing your information when you visit our website or interact with our atelier concierge.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <Key className="w-5 h-5 text-[#D49B24]" />
            <h2>2. Information We Collect</h2>
          </div>
          <p>
            To deliver an authentic luxury experience, we may collect the following information when you place an order, create an Aurelia Privé account, or request bespoke jewellery customization:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Contact Details:</strong> Full name, shipping/billing address, mobile phone number, and email address.</li>
            <li><strong>Bespoke Customization Data:</strong> Wrist sizing for Kundan bangles & kadas, choker collar measurements, lehenga color swatches, and WhatsApp consultation media.</li>
            <li><strong>Payment & Transaction Information:</strong> All card, UPI, and NetBanking transactions are processed through RBI-approved PCI-DSS Level 1 compliant payment gateways (Razorpay / Cashfree). We never store your CVV or UPI PIN on our servers.</li>
            <li><strong>Device & Browsing Analytics:</strong> Anonymized browser type, IP address, and cookie preferences to ensure optimal loading performance.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <UserCheck className="w-5 h-5 text-[#D49B24]" />
            <h2>3. How We Use Your Information</h2>
          </div>
          <p>
            Your information is strictly utilized to enhance your jewellery purchasing experience:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Processing, crafting, and dispatching your jewellery orders with insured courier partners (Blue Dart, Delhivery).</li>
            <li>Sending automated real-time SMS & WhatsApp updates with courier AWB tracking numbers.</li>
            <li>Maintaining your digital Lifetime Anti-Tarnish Warranty Certificate in your member profile.</li>
            <li>Providing 1-on-1 video preview sessions for bridal trousseau sets when scheduled.</li>
            <li>Sending exclusive festive coupons (such as code RANG10) only if you have chosen to opt-in.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <Lock className="w-5 h-5 text-[#D49B24]" />
            <h2>4. Data Protection & Zero Third-Party Sale Policy</h2>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#D49B24]/30 text-xs sm:text-sm text-[#0A1C42] font-medium">
            <strong>Our Sacred Promise:</strong> We never sell, rent, monetize, or trade your personal information, phone number, or wedding photos to third-party marketing brokers or advertising networks under any circumstances.
          </div>
          <p>
            Data is only shared with verified operational logistics partners strictly for shipping physical parcels to your doorstep.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <Eye className="w-5 h-5 text-[#D49B24]" />
            <h2>5. Your Rights & Data Deletion</h2>
          </div>
          <p>
            You retain complete control over your personal data. At any time, you may request a copy of your stored records or request complete deletion of your customer profile by emailing us at <a href="mailto:concierge@aureliajewels.com" className="text-[#163B7A] font-bold underline">concierge@aureliajewels.com</a>.
          </p>
        </section>

      </div>
    </PolicyLayout>
  )
}
