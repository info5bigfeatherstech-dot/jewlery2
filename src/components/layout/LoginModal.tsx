import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Lock,
  Phone,
  Mail,
  User,
  Sparkles,
  CheckCircle2,
  Gift,
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { useToastStore } from '@/store/useToast'

interface LoginModalProps {
  isOpen?: boolean
  onClose?: () => void
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose
}) => {
  const { isLoginOpen, closeLogin, setUser } = useStore()
  const { addToast } = useToastStore()

  const isOpen = propIsOpen !== undefined ? propIsOpen : isLoginOpen
  const handleClose = propOnClose || closeLogin

  // Mode: 'signin' vs 'signup'
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')
  const [authType, setAuthType] = useState<'otp' | 'password'>('otp')

  // Form states
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Body scroll lock and ESC key dismissal for optimal performance
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetAndClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length < 10) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsOtpSent(true)
      addToast({
        title: 'OTP Sent Successfully',
        description: `Code sent to +91 ${phone} (Demo OTP: 1234)`,
        type: 'info'
      })
    }, 400)
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length < 4) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      setUser({
        name: 'Meera Sharma',
        phone: phone || '9876543210',
        email: 'meera.sharma@example.com',
        isVip: true,
        memberSince: 'September 2024',
        tier: 'Aurelia Privé Gold Member'
      })
      setSuccessMessage('Welcome back to Aurelia Privé!')
      addToast({
        title: 'Logged In Successfully',
        description: 'Welcome back to Aurelia Privé Club',
        type: 'success'
      })
      setTimeout(() => {
        resetAndClose()
      }, 1000)
    }, 450)
  }

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      setUser({
        name: email.split('@')[0],
        phone: '9876543210',
        email,
        isVip: true,
        memberSince: 'September 2024',
        tier: 'Aurelia Privé Gold Member'
      })
      setSuccessMessage('Welcome back to Aurelia Privé!')
      addToast({
        title: 'Logged In Successfully',
        description: 'Signed in with email',
        type: 'success'
      })
      setTimeout(() => {
        resetAndClose()
      }, 1000)
    }, 450)
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !phone) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      setUser({
        name: fullName,
        phone,
        email: email || `${phone}@aureliaprive.com`,
        isVip: true,
        memberSince: 'Today',
        tier: 'Aurelia Privé Gold Member'
      })
      setSuccessMessage(`Welcome to Privé, ${fullName}!`)
      addToast({
        title: 'Privé Account Created!',
        description: 'Welcome coupon RANG10 active for 10% off',
        type: 'success'
      })
      setTimeout(() => {
        resetAndClose()
      }, 1100)
    }, 500)
  }

  const handleDemoSignIn = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      setUser({
        name: 'Princess Meera Sharma',
        phone: '9876543210',
        email: 'meera.sharma@example.com',
        isVip: true,
        memberSince: 'August 2024',
        tier: 'Aurelia Privé Gold Member'
      })
      setSuccessMessage('Welcome, Princess Meera!')
      addToast({
        title: 'VIP Demo Sign In',
        description: 'Logged in as VIP Member • 10% Discount Active',
        type: 'success'
      })
      setTimeout(() => {
        resetAndClose()
      }, 1000)
    }, 400)
  }

  const resetAndClose = () => {
    setIsSuccess(false)
    setIsOtpSent(false)
    setPhone('')
    setEmail('')
    setPassword('')
    setFullName('')
    setOtp('')
    handleClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Smooth Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Optimized Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-[#FAF7F0] rounded-3xl shadow-2xl border border-[#EADBCE] p-6 sm:p-8 z-10 overflow-hidden max-h-[90vh] overflow-y-auto transform-gpu will-change-transform"
            role="dialog"
            aria-modal="true"
            aria-label="Aurelia Privé Login"
          >
            {/* Top decorative gradient line */}
            <div className="rainbow-line absolute top-0 left-0 right-0 h-1.5" />

            {/* Close Button */}
            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F4EDE0] text-[#0A1C42] transition-colors cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Brand Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1C42]/10 text-[#0A1C42] text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D49B24]" />
                <span>Namaste & Welcome</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#06142E]">
                Aurelia <span className="text-[#D49B24]">Privé</span> Club
              </h2>
              <p className="text-xs text-[#7A584A] mt-1">
                Access your orders, anti-tarnish warranty, and festive wishlists.
              </p>
            </div>

            {/* Sign In vs Register Switcher Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#F4EDE0] rounded-2xl border border-[#EADBCE] mb-6">
              <button
                type="button"
                onClick={() => { setActiveTab('signin'); setIsOtpSent(false); }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'signin'
                    ? 'bg-white text-[#0A1C42] shadow-sm'
                    : 'text-[#7A584A] hover:text-[#0A1C42]'
                }`}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('signup'); setIsOtpSent(false); }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'signup'
                    ? 'bg-white text-[#0A1C42] shadow-sm'
                    : 'text-[#7A584A] hover:text-[#0A1C42]'
                }`}
              >
                <span>New Account</span>
                <span className="text-[10px] bg-[#D49B24]/20 text-[#0A1C42] px-1.5 py-0.2 rounded-full font-black">
                  10% OFF
                </span>
              </button>
            </div>

            {/* Success State or Animated Tab Forms */}
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="py-10 text-center space-y-3"
                >
                  <CheckCircle2 className="w-14 h-14 text-[#10B981] mx-auto animate-bounce" />
                  <h4 className="font-serif text-xl font-bold text-[#06142E]">{successMessage}</h4>
                  <p className="text-xs text-[#7A584A]">You are all set to explore festive jewellery.</p>
                </motion.div>
              ) : activeTab === 'signin' ? (
                /* --- SIGN IN TAB --- */
                <motion.div
                  key="signin-form"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  {/* Method selector: OTP vs Email */}
                  <div className="flex items-center justify-center gap-4 text-xs font-semibold text-[#7A584A] pb-1">
                    <button
                      type="button"
                      onClick={() => { setAuthType('otp'); setIsOtpSent(false); }}
                      className={`cursor-pointer pb-1 border-b-2 transition-all ${
                        authType === 'otp'
                          ? 'border-[#0A1C42] text-[#0A1C42] font-bold'
                          : 'border-transparent text-gray-500 hover:text-black'
                      }`}
                    >
                      Mobile OTP
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => setAuthType('password')}
                      className={`cursor-pointer pb-1 border-b-2 transition-all ${
                        authType === 'password'
                          ? 'border-[#0A1C42] text-[#0A1C42] font-bold'
                          : 'border-transparent text-gray-500 hover:text-black'
                      }`}
                    >
                      Email & Password
                    </button>
                  </div>

                  {authType === 'otp' ? (
                    !isOtpSent ? (
                      <form onSubmit={handleSendOtp} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                            Mobile Number
                          </label>
                          <div className="relative flex items-center">
                            <span className="absolute left-3.5 text-xs font-bold text-[#0A1C42] select-none">
                              +91
                            </span>
                            <input
                              type="tel"
                              required
                              maxLength={10}
                              pattern="[0-9]{10}"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                              placeholder="98765 43210"
                              className="w-full pl-13 pr-4 py-3 rounded-xl bg-white border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={phone.length < 10 || isLoading}
                          className="w-full bg-[#0A1C42] hover:bg-[#06122B] disabled:opacity-50 text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          {isLoading ? <span>Sending Code...</span> : <span>Get One-Time Password (OTP)</span>}
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="text-center text-xs text-[#7A584A]">
                          OTP sent to <span className="font-bold text-[#0A1C42]">+91 {phone}</span>
                          <button
                            type="button"
                            onClick={() => setIsOtpSent(false)}
                            className="text-[#163B7A] font-bold underline ml-1 cursor-pointer"
                          >
                            Change
                          </button>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5 text-center">
                            Enter 4-Digit OTP <span className="text-[#D49B24] font-normal">(Use 1234)</span>
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={4}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            placeholder="1 2 3 4"
                            className="w-full text-center tracking-[0.8em] text-xl font-bold py-3 rounded-xl bg-white border border-[#D5C2B4] text-[#06142E] focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={otp.length < 4 || isLoading}
                          className="w-full bg-[#0A1C42] hover:bg-[#06122B] disabled:opacity-50 text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                        >
                          {isLoading ? <span>Verifying...</span> : <span>Verify & Access Account</span>}
                        </button>
                      </form>
                    )
                  ) : (
                    <form onSubmit={handleEmailSignIn} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                          Password
                        </label>
                        <div className="relative flex items-center">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 pr-11 py-2.5 rounded-xl bg-white border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 text-gray-400 hover:text-black cursor-pointer"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#0A1C42] hover:bg-[#06122B] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                      >
                        {isLoading ? <span>Signing In...</span> : <span>Sign In With Email</span>}
                      </button>
                    </form>
                  )}

                  {/* 1-Click Fast VIP Demo Fill Button */}
                  <div className="pt-2 border-t border-[#EADBCE]">
                    <button
                      type="button"
                      onClick={handleDemoSignIn}
                      className="w-full py-2.5 px-3 rounded-xl border border-[#D49B24]/50 bg-[#FAF2E6] hover:bg-[#F3E8D6] text-[#0A1C42] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D49B24]" />
                      <span>1-Click VIP Demo Sign In</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* --- SIGN UP / REGISTER TAB --- */
                <motion.div
                  key="signup-form"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                    {/* Welcome Discount Banner */}
                    <div className="p-3 rounded-xl bg-[#D49B24]/15 border border-[#D49B24]/40 flex items-center gap-2.5">
                      <Gift className="w-4 h-4 text-[#D49B24] shrink-0" />
                      <div className="text-xs text-[#06142E]">
                        Use code <strong className="text-[#D49B24]">RANG10</strong> for <strong>10% Off</strong> your first festive order!
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Radhika Kapoor"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1">
                        Mobile Number
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-xs font-bold text-[#0A1C42] select-none">+91</span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="98765 43210"
                          className="w-full pl-13 pr-4 py-2.5 rounded-xl bg-white border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#0A1C42] hover:bg-[#06122B] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {isLoading ? <span>Creating Account...</span> : <span>Create Account & Join Privé</span>}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Security Footer */}
            <div className="mt-5 pt-4 border-t border-[#EADBCE] text-center text-[11px] text-[#7A584A] flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#D49B24]" />
              <span>100% Encrypted & Safe • Zero Third-Party Sharing</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
