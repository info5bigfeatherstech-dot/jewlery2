import React from 'react'
import { motion } from 'framer-motion'
import { Truck, PhoneCall, ShieldCheck, Award } from 'lucide-react'

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Truck,
      title: 'Free Express Shipping',
      subtitle: 'All-India insured delivery on orders above ₹999 with tamper-proof packaging.'
    },
    {
      icon: PhoneCall,
      title: 'On-Call & WhatsApp Support',
      subtitle: 'Direct styling advice & bridal consultations at +91 88264 33922.'
    },
    {
      icon: ShieldCheck,
      title: '100% Payment Secured',
      subtitle: 'Safe encrypted checkouts via UPI, Cards, NetBanking, and verified gateways.'
    },
    {
      icon: Award,
      title: 'Trusted Artisan Supplier',
      subtitle: 'Authentic anti-tarnish micro gold plating and hand-set Jaipur Kundan stones.'
    }
  ]

  return (
    <section className="py-14 bg-[#FAF2E6]/80 border-y border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, idx) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: 'easeOut' }}
                className="group flex flex-col items-center sm:items-start text-center sm:text-left p-4 rounded-2xl transition-all"
              >
                {/* Icon with hover wiggle animation */}
                <motion.div
                  whileHover={{ rotate: [-6, 6, -4, 4, 0] }}
                  transition={{ duration: 0.45 }}
                  className="w-14 h-14 rounded-2xl bg-white border border-[#D49B24]/40 shadow-sm flex items-center justify-center text-[#0A1C42] group-hover:bg-[#0A1C42] group-hover:text-[#D49B24] transition-colors mb-4 flex-shrink-0"
                >
                  <Icon className="w-7 h-7 stroke-[1.7]" />
                </motion.div>

                <h3 className="font-serif text-base font-bold text-[#06142E] group-hover:text-[#0A1C42] transition-colors">
                  {badge.title}
                </h3>
                <p className="text-xs text-[#7A584A] mt-1.5 leading-relaxed font-sans">
                  {badge.subtitle}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
