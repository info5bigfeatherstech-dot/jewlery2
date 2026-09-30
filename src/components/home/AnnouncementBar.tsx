import React from 'react'
import { Sparkles, Truck, ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react'

export const AnnouncementBar: React.FC = () => {
  const items = [
    { text: 'Free Shipping Across India Above ₹999', icon: Truck },
    { text: '100% Anti-Tarnish Jewellery Guarantee', icon: ShieldCheck },
    { text: 'Handcrafted With Love By Indian Artisans', icon: HeartHandshake },
    { text: 'On-Call & WhatsApp Support: +91 88264 33922', icon: PhoneCall },
    { text: 'Certified Jaipur Kundan & Real Jadau Settings', icon: Sparkles },
  ]

  return (
    <div
      className="bg-[#0A1C42] text-[#FAF7F0] border-b border-[#D49B24]/30 overflow-hidden py-2 text-[11px] sm:text-xs font-medium tracking-wide relative z-40 select-none group"
      aria-label="Store Announcements"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {/* Render twice for seamless continuous infinite loop */}
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon
          return (
            <div key={idx} className="flex items-center gap-2.5 mx-6 flex-shrink-0">
              <Icon className="w-3.5 h-3.5 text-[#D49B24]" />
              <span className="text-[#FDFBF7]">{item.text}</span>
              <span className="text-[#D49B24]/40 ml-4 font-bold">•</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
