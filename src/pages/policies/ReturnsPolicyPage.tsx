import React from 'react'
import { PolicyLayout } from './PolicyLayout'
import { RotateCcw, ShieldCheck, CheckCircle2, AlertCircle, Phone, CreditCard } from 'lucide-react'

export const ReturnsPolicyPage: React.FC = () => {
  return (
    <PolicyLayout
      title="Refund & 7-Day Exchange Policy"
      subtitle="Complete peace of mind with doorstep reverse pickup, zero questions asked on damage, and speedy UPI/bank refunds."
    >
      <div className="space-y-6 text-sm leading-relaxed text-[#4A3B32]">
        
        {/* Banner */}
        <div className="p-5 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-start gap-3.5">
          <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#06142E]">
            <strong className="text-[#0A1C42]">The 7-Day glaMISTERa Promise:</strong> If your jewellery does not match your festive expectations, or if you require an alternative silhouette or wrist size, we provide hassle-free exchanges within 7 calendar days of delivery.
          </div>
        </div>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <RotateCcw className="w-5 h-5 text-[#D49B24]" />
            <h2>1. Eligibility for Return or Exchange</h2>
          </div>
          <p>
            To qualify for an exchange or refund under our 7-day policy:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>The jewellery piece must remain unused, unworn, and in its pristine original finish.</li>
            <li>Pieces must be returned with the original luxury velvet box, authenticity certificate, and protective anti-tarnish zip sleeve.</li>
            <li>For hygiene considerations, earrings and jhumkas with removed tamper-evident seals cannot be returned unless found defective upon unboxing.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <AlertCircle className="w-5 h-5 text-[#D49B24]" />
            <h2>2. Transit Damage & Manufacturing Defect Guarantee</h2>
          </div>
          <p>
            In the rare event that a piece arrives with transit damage or loose stone settings:
          </p>
          <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#D49B24]/40 text-xs sm:text-sm space-y-2 text-[#0A1C42]">
            <p className="font-semibold">
              ✨ 100% Free Immediate Replacement Guarantee:
            </p>
            <p className="text-[#7A584A]">
              Simply send a brief unboxing photograph or short video to our concierge on WhatsApp (+91 88264 33922) within 48 hours of delivery. We will immediately dispatch a brand-new replacement at zero surcharge and arrange reverse courier pickup of the damaged unit.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <ShieldCheck className="w-5 h-5 text-[#D49B24]" />
            <h2>3. Simple 3-Step Return Process</h2>
          </div>
          <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm">
            <li>
              <strong>Initiate Request:</strong> Message our WhatsApp concierge (+91 88264 33922) or email <a href="mailto:concierge@glamistera.com" className="text-[#163B7A] font-bold underline">concierge@glamistera.com</a> with your Order ID.
            </li>
            <li>
              <strong>Doorstep Reverse Pickup:</strong> Our team schedules a reverse courier pickup from your home address via Blue Dart or Delhivery.
            </li>
            <li>
              <strong>Quality Inspection & Refund:</strong> Once received and verified at our Jaipur workshop, your replacement is dispatched or refund is credited within 4 to 7 business days.
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-[#06142E]">
            <CreditCard className="w-5 h-5 text-[#D49B24]" />
            <h2>4. Refund Modes & Timelines</h2>
          </div>
          <p>
            Refunds are credited through the following channels:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>Prepaid Orders (UPI / NetBanking / Cards):</strong> Refund is routed directly back to the original source account within 4–7 banking days.</li>
            <li><strong>Cash on Delivery (COD) Orders:</strong> Refund is issued via instant UPI transfer (GPay, PhonePe, Paytm) or NEFT bank transfer upon receiving your preferred account details.</li>
          </ul>
        </section>

      </div>
    </PolicyLayout>
  )
}
