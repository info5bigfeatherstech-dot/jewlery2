import React from 'react'
import { PolicyLayout } from './PolicyLayout'
import { Truck, ShieldCheck, Box, Clock, MapPin, CheckCircle2 } from 'lucide-react'

export const ShippingPolicyPage: React.FC = () => {
  return (
    <PolicyLayout
      title="Shipping & Delivery Policy"
      subtitle="Insured pan-India express dispatch with tamper-evident luxury jewellery gift packaging."
    >
      <div className="space-y-6 text-sm leading-relaxed text-[#4A3B32]">
        
        {/* Highlight Callout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#FAF6EE] border border-[#D49B24]/40 text-center">
          <div className="space-y-1">
            <div className="font-serif font-bold text-lg text-[#0A1C42]">FREE SHIPPING</div>
            <div className="text-xs text-[#7A584A]">On all prepaid orders over ₹499</div>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-[#D49B24]/30 pt-3 sm:pt-0">
            <div className="font-serif font-bold text-lg text-[#0A1C42]">2–4 DAYS</div>
            <div className="text-xs text-[#7A584A]">Express Metro Delivery</div>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-[#D49B24]/30 pt-3 sm:pt-0">
            <div className="font-serif font-bold text-lg text-[#0A1C42]">100% INSURED</div>
            <div className="text-xs text-[#7A584A]">Zero transit damage liability</div>
          </div>
        </div>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <Clock className="w-5 h-5 text-[#D49B24]" />
            <h2>1. Order Processing & Dispatch Timelines</h2>
          </div>
          <p>
            Every piece at Aurelia Jewels is carefully inspected by our master gemologists prior to dispatch:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Ready-to-Ship Pieces (Jhumkas, Bangles, Earrings):</strong> Dispatched within 24 to 36 hours of payment confirmation.</li>
            <li><strong>Bespoke Bridal Sets & Custom Chokers:</strong> Handcrafted to your lehenga measurements within 3 to 5 business days, followed by WhatsApp photo confirmation.</li>
            <li>Orders placed on national holidays or Sundays are queued for dispatch on the subsequent working morning.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <MapPin className="w-5 h-5 text-[#D49B24]" />
            <h2>2. Domestic Delivery Schedules (Pan-India)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-[#EADBCE]">
              <thead>
                <tr className="bg-[#FAF6EE] text-[#0A1C42] font-serif">
                  <th className="p-3 border border-[#EADBCE]">Destination Region</th>
                  <th className="p-3 border border-[#EADBCE]">Estimated Transit Time</th>
                  <th className="p-3 border border-[#EADBCE]">Courier Partner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADBCE]">
                <tr>
                  <td className="p-3 font-semibold text-[#0A1C42]">Delhi NCR, Jaipur, Mumbai, Bengaluru</td>
                  <td className="p-3">2 to 3 Business Days</td>
                  <td className="p-3">Blue Dart Air Express</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#0A1C42]">Other State Capitals & Tier-1 Cities</td>
                  <td className="p-3">3 to 4 Business Days</td>
                  <td className="p-3">Delhivery / Blue Dart</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#0A1C42]">Tier-2, Tier-3 & Regional Pincodes</td>
                  <td className="p-3">4 to 6 Business Days</td>
                  <td className="p-3">Speed Post / Xpressbees</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <Box className="w-5 h-5 text-[#D49B24]" />
            <h2>3. Tamper-Proof Luxury Packaging</h2>
          </div>
          <p>
            Your jewellery travels safely in our signature packaging designed for gifting:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Plush velvet-lined keepsake jewellery box with magnetic closure.</li>
            <li>Anti-tarnish airtight zip pouches with silica desiccant moisture absorbents.</li>
            <li>Outer corrugated protective carton sealed with holographic tamper-evident tape.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <ShieldCheck className="w-5 h-5 text-[#D49B24]" />
            <h2>4. Live Tracking & Cash on Delivery (COD)</h2>
          </div>
          <p>
            Upon courier pickup, a tracking link with the Air Waybill (AWB) number is transmitted via SMS and WhatsApp. Cash on Delivery (COD) is supported across 19,000+ Indian pincodes with a nominal verification fee of ₹49.
          </p>
        </section>

      </div>
    </PolicyLayout>
  )
}
