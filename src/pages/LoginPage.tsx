import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Lock,
  Phone,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Gem,
  ArrowRight,
  ChevronRight
} from 'lucide-react'
import { useToastStore } from '@/store/useToast'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { addToast } = useToastStore()

  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
    }, 600)
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length < 4) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      addToast({
        title: 'Welcome to Aurelia Privé!',
        description: 'Successfully verified and logged in',
        type: 'success'
      })
      setTimeout(() => {
        navigate('/')
      }, 1200)
    }, 800)
  }

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      addToast({
        title: 'Welcome to Aurelia Privé!',
        description: 'Signed in to your collector profile',
        type: 'success'
      })
      setTimeout(() => {
        navigate('/')
      }, 1200)
    }, 800)
  }

  const handleDemoLogin = () => {
    setEmail('meera.sharma@aureliajewels.com')
    setPassword('RoyalJewels2026')
    setAuthMethod('password')
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      addToast({
        title: 'Signed in as VIP Member',
        description: 'Welcome Meera Sharma • 10% Discount Active',
        type: 'success'
      })
      setTimeout(() => {
        navigate('/')
      }, 1200)
    }, 700)
  }

  return (
    <div className="min-h-[85vh] bg-[#FAF7F0] py-8 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#D49B24]/10 via-[#0A1C42]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-t from-[#D49B24]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Luxury Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7A584A] mb-8">
          <Link to="/" className="hover:text-[#0A1C42] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="font-semibold text-[#0A1C42]">Account Login</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-festive border border-[#EADBCE] relative flex flex-col justify-between">
            <div className="rainbow-line absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl" />

            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1C42]/10 text-[#0A1C42] text-xs font-semibold uppercase tracking-wider mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D49B24]" />
                  <span>Aurelia Privé Club</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#06142E] tracking-tight">
                  Sign In to Your Account
                </h1>
                <p className="text-xs sm:text-sm text-[#7A584A] mt-1.5">
                  Access your bespoke bridal orders, saved wishlists, and anti-tarnish warranty.
                </p>
              </div>

              {/* Login Method Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#FAF7F0] rounded-2xl border border-[#EADBCE] mb-6">
                <button
                  type="button"
                  onClick={() => { setAuthMethod('otp'); setIsOtpSent(false); }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    authMethod === 'otp'
                      ? 'bg-white text-[#0A1C42] shadow-sm'
                      : 'text-[#7A584A] hover:text-[#0A1C42]'
                  }`}
                >
                  <Phone className="w-4 h-4 text-[#D49B24]" />
                  <span>Mobile OTP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('password')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    authMethod === 'password'
                      ? 'bg-white text-[#0A1C42] shadow-sm'
                      : 'text-[#7A584A] hover:text-[#0A1C42]'
                  }`}
                >
                  <Mail className="w-4 h-4 text-[#D49B24]" />
                  <span>Email & Password</span>
                </button>
              </div>

              {/* Success View */}
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-[#10B981] mx-auto animate-bounce" />
                  <h3 className="font-serif text-2xl font-bold text-[#06142E]">
                    Welcome to Aurelia Jewels!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7A584A]">
                    Redirecting you to your royal collection...
                  </p>
                </motion.div>
              ) : authMethod === 'otp' ? (
                /* OTP Login Form */
                !isOtpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-2">
                        Mobile Number
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 text-sm font-bold text-[#0A1C42] select-none">
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
                          className="w-full pl-16 pr-4 py-3.5 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24] font-medium"
                        />
                      </div>
                      <p className="text-[11px] text-[#7A584A] mt-1.5">
                        We will send a 4-digit verification code to your Indian phone number.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={phone.length < 10 || isLoading}
                      className="w-full bg-[#0A1C42] hover:bg-[#06122B] disabled:opacity-50 text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isLoading ? (
                        <span>Sending OTP...</span>
                      ) : (
                        <>
                          <span>Get One-Time Password (OTP)</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#EADBCE] text-center text-xs text-[#7A584A]">
                      OTP sent to <span className="font-bold text-[#0A1C42]">+91 {phone}</span>
                      <button
                        type="button"
                        onClick={() => setIsOtpSent(false)}
                        className="text-[#163B7A] font-bold underline ml-2 cursor-pointer"
                      >
                        Change
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-2 text-center">
                        Enter 4-Digit OTP <span className="text-[#D49B24] font-normal">(Demo code: 1234)</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="1 2 3 4"
                        className="w-full text-center tracking-[1em] text-2xl font-black py-3.5 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={otp.length < 4 || isLoading}
                      className="w-full bg-[#0A1C42] hover:bg-[#06122B] disabled:opacity-50 text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isLoading ? <span>Verifying...</span> : <span>Verify & Access Account</span>}
                    </button>
                  </form>
                )
              ) : (
                /* Email & Password Login Form */
                <form onSubmit={handleEmailLogin} className="space-y-4">
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
                      className="w-full px-4 py-3.5 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-[#0A1C42] uppercase tracking-wider">
                        Password
                      </label>
                      <a href="#" className="text-xs text-[#163B7A] hover:underline font-medium">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 pr-12 py-3.5 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 text-gray-400 hover:text-[#0A1C42] transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded text-[#0A1C42] focus:ring-[#D49B24] accent-[#0A1C42]"
                    />
                    <label htmlFor="rememberMe" className="text-xs text-[#7A584A] select-none cursor-pointer">
                      Keep me signed in for 30 days
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#0A1C42] hover:bg-[#06122B] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoading ? <span>Signing In...</span> : <span>Sign In to Account</span>}
                  </button>
                </form>
              )}

              {/* Quick Demo Login Option */}
              <div className="mt-6 pt-5 border-t border-[#EADBCE] text-center">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#D49B24]/40 bg-[#FAF6EE] text-[#0A1C42] hover:bg-[#F3E8D6] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D49B24]" />
                  <span>One-Click VIP Member Demo Sign In</span>
                </button>
              </div>
            </div>

            {/* Bottom Register Switcher */}
            <div className="mt-8 pt-5 border-t border-[#EADBCE] text-center text-xs text-[#7A584A]">
              Don&apos;t have an Aurelia account yet?{' '}
              <Link
                to="/register"
                className="font-bold text-[#0A1C42] hover:text-[#163B7A] underline ml-1 cursor-pointer"
              >
                Create Account & Join Privé Club
              </Link>
            </div>
          </div>

          {/* Right Column: Luxury Privé Perks (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#06142E] via-[#0A1C42] to-[#081734] text-white rounded-3xl p-8 sm:p-10 shadow-festive border border-[#D49B24]/30 flex flex-col justify-between relative overflow-hidden">
            {/* Background filigree subtle pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D49B24]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#D49B24]/20 border border-[#D49B24]/50 flex items-center justify-center text-[#D49B24] mb-6">
                <Gem className="w-6 h-6" />
              </div>

              <h2 className="font-serif text-2xl font-bold text-white mb-2 leading-snug">
                The Aurelia Privé Experience
              </h2>
              <p className="text-xs text-[#EADFCB] leading-relaxed mb-8 font-light">
                Sign in to access bespoke Indian craftsmanship advantages preserved exclusively for our collectors.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#D49B24] shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Lifetime Anti-Tarnish Guarantee</h4>
                    <p className="text-[11px] text-[#EADFCB] mt-0.5 leading-normal">
                      Digital warranty certificate linked to every order for lifetime polish care.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#D49B24] shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Live Courier Tracking & Priority Dispatch</h4>
                    <p className="text-[11px] text-[#EADFCB] mt-0.5 leading-normal">
                      Insured Blue Dart express shipments with tamper-proof seal alerts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#D49B24] shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">VIP Festive Previews</h4>
                    <p className="text-[11px] text-[#EADFCB] mt-0.5 leading-normal">
                      Private 48-hour early access to handcrafted Kundan bangles and bridal chokers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-[11px] text-[#EADFCB]/80 flex items-center gap-2 relative z-10">
              <Lock className="w-3.5 h-3.5 text-[#D49B24]" />
              <span>256-Bit SSL Encrypted Indian Jewellery Storefront</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
