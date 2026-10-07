import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const CraftYourStyle: React.FC = () => {

  return (
    <section id="craft-your-style" className="py-20 sm:py-28 bg-[#FAF7F0] relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-tr from-[#D49B24]/10 via-[#EC4899]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1C42]/10 text-[#0A1C42] text-xs font-bold uppercase tracking-wider">
              {/* <Gem className="w-3.5 h-3.5 text-[#D49B24]" /> */}
              <span>Bespoke & Bridal Trousseau</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#06142E] leading-[1.15]">
              Craft Your Style With{' '}
              <span className="rainbow-shimmer">Designer Richa</span>
            </h2>

            <p className="text-sm text-[#7A584A] leading-relaxed max-w-xl">
              Have a dream wedding lehenga that needs custom color-matched Kundan jewellery? Or desire an heirloom bridal choker crafted with genuine stones and anti-tarnish micro-gold finish? 
              Collaborate directly with Designer Richa to bring your bespoke jewellery vision to life.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0A1C42]">
                <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>Custom Lehenga Color-Matching</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0A1C42]">
                <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>Bespoke Choker & Haar Sizing</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0A1C42]">
                <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>Bridesmaid Bulk Gifting Favors</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0A1C42]">
                <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>1-on-1 WhatsApp Video Preview</span>
              </div>
            </div>

            {/* Consultation Button */}
            <div className="pt-4">
              <a
                href="https://wa.me/918826433922?text=Namaste%20Richa!%20I'd%20like%20to%20discuss%20a%20custom%20bespoke%20jewellery%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0A1C42] hover:bg-[#06122B] text-white px-6 py-3 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all group"
              >
                <span>Schedule Bespoke Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="text-xs text-[#7A584A] mt-2">
                Usually responds within 2 business hours • Free design estimate
              </p>
            </div>
          </motion.div>

          {/* Right Floating Overlapping Image Collage (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5 relative h-[380px] sm:h-[460px] flex items-center justify-center"
          >
            {/* Base Backdrop Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-4 top-4 w-56 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10 -rotate-6"
            >
              <img
                src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=700&q=80"
                alt="Bridal Kundan Set"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                  Handcrafted Bridal Sets
                </span>
              </div>
            </motion.div>

            {/* Overlapping Top Card */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute right-4 bottom-4 w-60 sm:w-72 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20 rotate-3"
            >
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
                alt="Bespoke Kundan Choker"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                  Bespoke Kundan Chokers
                </span>
              </div>
            </motion.div>

            {/* Mini Floating Floating Badge */}
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 right-12 z-30 bg-[#FAF7F0] p-3 rounded-2xl shadow-festive border border-[#D49B24] flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-[#0A1C42] text-[#D49B24] flex items-center justify-center font-bold text-xs">
                100%
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-[#0A1C42]">Custom Tailored</div>
                <div className="text-[9px] text-[#7A584A]">To Your Attire</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
