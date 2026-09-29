import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, Phone, Sparkles, CheckCircle2 } from 'lucide-react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber.length >= 10) {
      setIsOtpSent(true)
    }
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length === 4) {
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setIsOtpSent(false)
        setPhoneNumber('')
        setOtp('')
        onClose()
      }, 1500)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#FAF7F0] rounded-3xl shadow-2xl border border-[#EADBCE] p-7 z-10 overflow-hidden"
          >
            {/* Top decorative gradient line */}
            <div className="rainbow-line absolute top-0 left-0 right-0 h-1" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F4EDE0] text-[#0A1C42] transition-colors"
              aria-label="Close login dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1C42]/10 text-[#0A1C42] text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D49B24]" />
                <span>Namaste & Welcome</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#0A1C42]">
                Aurelia <span className="text-[#D49B24]">Privé</span> Club
              </h2>
              <p className="text-xs text-[#7A584A] mt-1">
                Access your orders, festive wishlists, and exclusive artisan preview drops
              </p>
            </div>

            {isSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto animate-bounce" />
                <h4 className="font-serif text-lg font-bold text-[#0A1C42]">Welcome back!</h4>
                <p className="text-xs text-[#7A584A]">Successfully logged in to your account.</p>
              </div>
            ) : !isOtpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0A1C42] mb-1.5">
                    Mobile Number
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-sm font-semibold text-[#0A1C42]">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      pattern="[0-9]{10}"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="98765 43210"
                      className="w-full pl-14 pr-4 py-3 rounded-xl bg-white border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={phoneNumber.length < 10}
                  className="w-full bg-[#0A1C42] hover:bg-[#06122B] disabled:opacity-50 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-md transition-colors"
                >
                  Get One-Time Password (OTP)
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="text-center text-xs text-[#7A584A] mb-2">
                  OTP sent to +91 {phoneNumber}{' '}
                  <button
                    type="button"
                    onClick={() => setIsOtpSent(false)}
                    className="text-[#163B7A] font-semibold underline ml-1"
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0A1C42] mb-1.5">
                    Enter 4-Digit OTP (Use 1234)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="1 2 3 4"
                    className="w-full text-center tracking-[1em] text-lg font-bold py-3 rounded-xl bg-white border border-[#D5C2B4] text-[#06142E] focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={otp.length < 4}
                  className="w-full bg-[#0A1C42] hover:bg-[#06122B] disabled:opacity-50 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-md transition-colors"
                >
                  Verify & Continue
                </button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-[#EADBCE] text-center text-[11px] text-[#7A584A] flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#D49B24]" />
              <span>We never share your details with third parties</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
