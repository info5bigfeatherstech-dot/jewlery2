import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  Gift,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react'
import { useToastStore } from '@/store/useToast'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { addToast } = useToastStore()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [newsletter, setNewsletter] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !phone || !password || !agreeTerms) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      addToast({
        title: 'Aurelia Privé Account Created!',
        description: 'Welcome coupon code RANG10 active for 10% off',
        type: 'success'
      })
      setTimeout(() => {
        navigate('/')
      }, 1500)
    }, 900)
  }

  const handleDemoFill = () => {
    setFullName('Ananya Singhania')
    setEmail('ananya.singhania@gmail.com')
    setPhone('9811223344')
    setPassword('RoyalKundan2026!')
    addToast({
      title: 'Demo Details Populated',
      description: 'Sample VIP member credentials filled',
      type: 'info'
    })
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
          <span className="font-semibold text-[#0A1C42]">Join Aurelia Privé</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Register Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-festive border border-[#EADBCE] relative flex flex-col justify-between">
            <div className="rainbow-line absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl" />

            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1C42]/10 text-[#0A1C42] text-xs font-semibold uppercase tracking-wider mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D49B24]" />
                  <span>Exclusive Royal Membership</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#06142E] tracking-tight">
                  Create Your Privé Account
                </h1>
                <p className="text-xs sm:text-sm text-[#7A584A] mt-1.5">
                  Join our circle of Indian jewellery connoisseurs and enjoy welcome privileges.
                </p>
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-[#10B981] mx-auto animate-bounce" />
                  <h3 className="font-serif text-2xl font-bold text-[#06142E]">
                    Welcome, {fullName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7A584A] max-w-sm mx-auto">
                    Your membership is confirmed. Use coupon code <strong className="text-[#D49B24]">RANG10</strong> at checkout for 10% off your first festive order!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <div className="relative flex items-center">
                      <User className="absolute left-4 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Radhika Kapoor"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                      />
                    </div>
                  </div>

                  {/* Email & Phone grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-4 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="radhika@example.com"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                        Phone (for courier updates)
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 text-xs font-bold text-[#0A1C42] select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="98765 43210"
                          className="w-full pl-13 pr-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                      Create Password
                    </label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full pl-11 pr-12 py-3 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
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

                  {/* Checkboxes */}
                  <div className="space-y-2.5 pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#7A584A] select-none">
                      <input
                        type="checkbox"
                        checked={newsletter}
                        onChange={(e) => setNewsletter(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded text-[#0A1C42] focus:ring-[#D49B24] accent-[#0A1C42]"
                      />
                      <span>
                        Send me private invitations for new heirloom jewellery unveilings and 10% welcome coupon.
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#7A584A] select-none">
                      <input
                        type="checkbox"
                        required
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded text-[#0A1C42] focus:ring-[#D49B24] accent-[#0A1C42]"
                      />
                      <span>
                        I agree to the{' '}
                        <Link to="/policies/terms" className="text-[#0A1C42] underline font-bold">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/policies/privacy" className="text-[#0A1C42] underline font-bold">
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !agreeTerms}
                    className="w-full bg-[#0A1C42] hover:bg-[#06122B] disabled:opacity-50 text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    {isLoading ? (
                      <span>Creating Account...</span>
                    ) : (
                      <>
                        <span>Create Account & Claim Welcome Perks</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Demo Helper */}
              <div className="mt-4 pt-4 border-t border-[#EADBCE] text-center">
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="text-xs font-semibold text-[#163B7A] hover:underline cursor-pointer"
                >
                  ⚡ Autofill with Sample Member Details
                </button>
              </div>
            </div>

            {/* Bottom Login Switcher */}
            <div className="mt-8 pt-5 border-t border-[#EADBCE] text-center text-xs text-[#7A584A]">
              Already have an Aurelia account?{' '}
              <Link
                to="/login"
                className="font-bold text-[#0A1C42] hover:text-[#163B7A] underline ml-1 cursor-pointer"
              >
                Sign In to Account
              </Link>
            </div>
          </div>

          {/* Right Column: Member Benefits & Gift Code (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#06142E] via-[#0A1C42] to-[#081734] text-white rounded-3xl p-8 sm:p-10 shadow-festive border border-[#D49B24]/30 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D49B24]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Welcome Voucher Badge */}
              <div className="p-4 rounded-2xl bg-[#D49B24]/20 border border-[#D49B24]/50 mb-6 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#D49B24] text-[#06142E] flex items-center justify-center font-bold shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#D49B24] font-bold">
                    Welcome Gift Included
                  </div>
                  <div className="text-sm font-bold text-white">
                    10% Off with Code: <span className="text-[#D49B24]">RANG10</span>
                  </div>
                </div>
              </div>

              <h2 className="font-serif text-2xl font-bold text-white mb-2 leading-snug">
                Why Join Aurelia Privé?
              </h2>
              <p className="text-xs text-[#EADFCB] leading-relaxed mb-6 font-light">
                Handcrafted jewellery crafted to be passed down through generations.
              </p>

              <div className="space-y-4 text-xs text-[#EADFCB]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Anti-Tarnish Registration:</strong> Every purchased jhumka and choker is permanently backed by our tarnish protection warranty.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Free Express Insured Shipping:</strong> Safe delivery with tamper-proof security seals right to your doorstep.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Custom Lehenga Color Matching:</strong> Save your bridal color references for personalized consultations with our designers.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">7-Day Hassle-Free Exchange:</strong> Easy doorstep exchanges if you ever desire a different size or silhouette.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-[11px] text-[#EADFCB]/80 flex items-center gap-2 relative z-10">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Certified Indian Artisan Heritage • 100% Verified Quality</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
