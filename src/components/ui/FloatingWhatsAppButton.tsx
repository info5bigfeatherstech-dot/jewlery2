import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export const FloatingWhatsAppButton: React.FC = () => {
  return (
    <div className="fixed bottom-20 md:bottom-7 right-5 z-40">
      <motion.a
        href="https://wa.me/918826433922?text=Namaste!%20I'm%20interested%20in%20handcrafted%20luxury%20jewellery%20from%20glaMISTERa."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with our jewellery styling expert on WhatsApp"
        className="relative group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-3 md:px-4 md:py-3.5 rounded-full shadow-festive transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing ring */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping -z-10"
          style={{ animationDuration: '2.5s' }}
          aria-hidden="true"
        />

        <MessageCircle className="w-6 h-6 fill-white text-[#25D366] flex-shrink-0" />
        
        <span className="hidden md:inline font-medium text-xs tracking-wide">
          Chat with Stylist
        </span>

        {/* Tooltip on hover */}
        <span className="absolute right-0 bottom-full mb-2 hidden group-hover:md:block px-3 py-1.5 bg-[#0A1C42] text-white text-xs rounded-lg shadow-lg whitespace-nowrap border border-[#D49B24]/30 pointer-events-none">
          Quick response on WhatsApp (+91 88264 33922)
        </span>
      </motion.a>
    </div>
  )
}
