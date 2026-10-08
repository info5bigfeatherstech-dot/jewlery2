import React from 'react'
import { PolicyLayout } from './PolicyLayout'
import { FileText, Sparkles, Scale, AlertTriangle, ShieldCheck, HeartHandshake } from 'lucide-react'

export const TermsPolicyPage: React.FC = () => {
  return (
    <PolicyLayout
      title="Terms of Service"
      subtitle="Craftsmanship authenticity standards, product care obligations, and user agreements for glaMISTERa."
    >
      <div className="space-y-6 text-sm leading-relaxed text-[#4A3B32]">
        
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <FileText className="w-5 h-5 text-[#D49B24]" />
            <h2>1. Agreement to Terms</h2>
          </div>
          <p>
            By accessing or browsing this website (glamistera.com) or purchasing any handcrafted jewellery, Kundan bangles, or bridal sets, you agree to be bound by these Terms of Service and all incorporated policies. If you do not agree with any provision, please discontinue using the service.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <Sparkles className="w-5 h-5 text-[#D49B24]" />
            <h2>2. Handcrafted Jewellery Authenticity & Finishes</h2>
          </div>
          <p>
            glaMISTERa pieces are handcrafted by master artisans utilizing traditional Indian jewellery techniques:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Jaipur Kundan & Jadau:</strong> Features foil-backed uncut glass stones hand-set into brass alloy frames, celebrating historic Rajasthani jewellery traditions.</li>
            <li><strong>22K Micro Gold Plating:</strong> Engineered with anti-tarnish electro-deposition sealing to prevent atmospheric oxidation under normal wear conditions.</li>
            <li><strong>Natural Variations:</strong> Because our stones and Meenakari enamel are worked by hand, slight natural variations in hue, stone faceting, or weight (±5%) are the hallmark of authentic handcrafted artisan pieces.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <ShieldCheck className="w-5 h-5 text-[#D49B24]" />
            <h2>3. Anti-Tarnish Warranty & Recommended Care</h2>
          </div>
          <p>
            To preserve your jewellery&apos;s radiant shine across decades of festivities, please observe our atelier care guidelines:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Keep jewellery away from direct contact with alcohol-based perfumes, body lotions, and chlorine water.</li>
            <li>Always put on your jewellery last after makeup and hairstyling have settled.</li>
            <li>Store each piece individually in the provided airtight zip pouch and velvet box to prevent friction scratch marks.</li>
            <li>Gently wipe with a soft microfibre cloth after wearing to remove perspiration before storage.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <Scale className="w-5 h-5 text-[#D49B24]" />
            <h2>4. Pricing, GST & Order Confirmations</h2>
          </div>
          <p>
            All prices quoted on the website are in Indian Rupees (INR) and inclusive of 3% GST applicable to fashion jewellery and ornaments under Indian law. We reserve the right to correct accidental typographical errors in pricing prior to shipping dispatch.
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <HeartHandshake className="w-5 h-5 text-[#D49B24]" />
            <h2>5. Governing Law & Atelier Jurisdiction</h2>
          </div>
          <p>
            These terms are governed by and construed in accordance with the laws of the Republic of India. Any disputes arising in connection with orders shall be subject to the exclusive jurisdiction of the competent courts in Jaipur / New Delhi, India.
          </p>
        </section>

      </div>
    </PolicyLayout>
  )
}
