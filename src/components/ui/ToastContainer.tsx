import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Heart, X, Sparkles } from 'lucide-react'
import { useToastStore } from '@/store/useToast'

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore()

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            className="pointer-events-auto bg-[#0A1C42] text-[#FAF7F0] p-3.5 rounded-xl shadow-festive border border-[#D49B24]/40 flex items-center gap-3 backdrop-blur-md"
          >
            {toast.image ? (
              <img
                src={toast.image}
                alt=""
                className="w-11 h-11 object-cover rounded-lg border border-[#D49B24]/30 flex-shrink-0"
              />
            ) : toast.type === 'heart' ? (
              <div className="w-10 h-10 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 fill-current" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg bg-[#D49B24]/20 text-[#D49B24] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#D49B24]">
                {toast.type === 'heart' ? 'Wishlist Updated' : 'Added to Cart'}
              </div>
              <div className="text-sm font-medium text-white truncate">{toast.title}</div>
              {toast.description && (
                <div className="text-xs text-white/70 truncate">{toast.description}</div>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
