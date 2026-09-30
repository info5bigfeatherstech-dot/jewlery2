import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  Lock,
  Truck,
  CheckCircle2,
  Gift,
  ArrowRight,
  Phone,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  Sparkles,
  ChevronRight,
  ShoppingBag,
  Tag
} from 'lucide-react'
import { useStore, FREE_SHIPPING_THRESHOLD } from '@/store/useStore'
import { useToastStore } from '@/store/useToast'
import { formatPrice } from '@/lib/utils'
import { Order } from '@/types'

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const { items, getSubtotal, clearCart, addOrder, user } = useStore()
  const { addToast } = useToastStore()

  const subtotal = getSubtotal()

  // Form State
  const [fullName, setFullName] = useState(user?.name || 'Ananya Sharma')
  const [phone, setPhone] = useState(user?.phone || '9876543210')
  const [email, setEmail] = useState(user?.email || 'ananya.sharma@example.com')
  const [pincode, setPincode] = useState('302017')
  const [city, setCity] = useState('Jaipur, Rajasthan')
  const [address, setAddress] = useState('Flat 402, Royal Palms, Malviya Nagar')
  const [landmark, setLandmark] = useState('Near World Trade Park')
  const [isGift, setIsGift] = useState(true)
  const [giftNote, setGiftNote] = useState('Wishing you royal joy and endless sparkle this festive season!')

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi')
  const [upiId, setUpiId] = useState('ananya@okhdfcbank')

  // Coupon State
  const [couponCode, setCouponCode] = useState('RANG10')
  const [isCouponApplied, setIsCouponApplied] = useState(true)
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(10)

  // Order Submission State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null)

  // Calculations
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 99
  const discountAmount = isCouponApplied ? Math.round((subtotal * couponDiscountPercent) / 100) : 0
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee)

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (!couponCode) return
    const code = couponCode.trim().toUpperCase()
    if (code === 'RANG10') {
      setIsCouponApplied(true)
      setCouponDiscountPercent(10)
      addToast({
        title: 'Coupon RANG10 Applied!',
        description: '10% Festive discount has been applied to your order.',
        type: 'success'
      })
    } else if (code === 'AURELIA20') {
      setIsCouponApplied(true)
      setCouponDiscountPercent(20)
      addToast({
        title: 'VIP Coupon Applied!',
        description: '20% Royal discount has been applied to your order.',
        type: 'success'
      })
    } else {
      addToast({
        title: 'Invalid Coupon Code',
        description: 'Please try RANG10 for 10% off your festive order.',
        type: 'info'
      })
    }
  }

  const handleAutofillDemo = () => {
    setFullName('Princess Gayatri Devi')
    setPhone('9829012345')
    setEmail('gayatri.devi@heritagejaipur.in')
    setPincode('302001')
    setCity('Jaipur, Rajasthan')
    setAddress('Suite 101, Rambagh Palace Enclave')
    setLandmark('Opposite Heritage Gardens')
    setIsGift(true)
    addToast({
      title: 'Autofilled Royal Jaipur Address',
      description: 'Demo details filled for fast checkout validation.',
      type: 'info'
    })
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName || !phone || !address || !pincode) {
      addToast({
        title: 'Incomplete Address',
        description: 'Please fill in your full delivery address and phone number.',
        type: 'info'
      })
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      const orderId = `AUR-2026-${Math.floor(10000 + Math.random() * 90000)}`
      const trackingNumber = `BLUEDART-${Math.floor(100000000 + Math.random() * 900000000)}`

      const newOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Processing',
        subtotal,
        discount: discountAmount,
        total: finalTotal,
        paymentMethod:
          paymentMethod === 'upi'
            ? 'UPI (GPay / PhonePe)'
            : paymentMethod === 'card'
            ? 'Credit/Debit Card'
            : paymentMethod === 'netbanking'
            ? 'NetBanking'
            : 'Cash on Delivery',
        trackingNumber,
        deliveryAddress: {
          fullName,
          phone: `+91 ${phone}`,
          address,
          city,
          pincode
        },
        items: items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          price: item.product.price
        }))
      }

      addOrder(newOrder)
      setPlacedOrder(newOrder)
      clearCart()

      addToast({
        title: 'Order Placed Successfully!',
        description: `Order ${orderId} confirmed with Bluedart Insured Express.`,
        type: 'success'
      })
    }, 1200)
  }

  // If order was successfully placed, render Order Success Confirmation screen
  if (placedOrder) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#D49B24]/40 shadow-2xl relative overflow-hidden"
        >
          <div className="rainbow-line absolute top-0 left-0 right-0 h-1.5" />

          {/* Golden Success Icon */}
          <div className="w-20 h-20 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mx-auto mb-6 border border-[#10B981]/30">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-bold text-[#D49B24] uppercase tracking-widest block">
              Booking Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#06142E]">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-[#7A584A] max-w-md mx-auto">
              Your royal jewellery order has been received and is being carefully packaged in our Jaipur atelier.
            </p>
          </div>

          {/* Order Details Receipt Box */}
          <div className="bg-[#FAF7F0] rounded-2xl p-6 border border-[#EADBCE] space-y-4 mb-8 text-xs sm:text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-[#EADBCE]">
              <span className="text-[#7A584A]">Order Number:</span>
              <strong className="font-mono text-[#0A1C42] text-sm">{placedOrder.id}</strong>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-[#EADBCE]">
              <span className="text-[#7A584A]">Delivery Address:</span>
              <span className="text-right text-[#06142E] max-w-xs font-medium">
                {placedOrder.deliveryAddress.fullName}, {placedOrder.deliveryAddress.address}, {placedOrder.deliveryAddress.city} - {placedOrder.deliveryAddress.pincode}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-[#EADBCE]">
              <span className="text-[#7A584A]">Payment Method:</span>
              <span className="font-semibold text-[#0A1C42]">{placedOrder.paymentMethod}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-[#EADBCE]">
              <span className="text-[#7A584A]">Estimated Delivery:</span>
              <span className="font-bold text-[#10B981] flex items-center gap-1.5">
                <Truck className="w-4 h-4" /> 3 – 5 Days (Bluedart Insured Express)
              </span>
            </div>

            <div className="flex justify-between items-center pt-1 text-base font-bold text-[#0A1C42]">
              <span>Amount Paid:</span>
              <span className="text-[#0A1C42]">{formatPrice(placedOrder.total)}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="w-full sm:w-auto bg-[#0A1C42] hover:bg-[#06122B] text-white px-7 py-3.5 rounded-full font-bold text-xs shadow-festive transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View in My Privé Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/collections"
              className="w-full sm:w-auto bg-[#FAF7F0] hover:bg-[#F3E8D6] text-[#0A1C42] border border-[#D5C2B4] px-7 py-3.5 rounded-full font-bold text-xs transition-colors flex items-center justify-center"
            >
              Continue Exploring
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Luxury Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7A584A] mb-6">
          <Link to="/" className="hover:text-[#0A1C42] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <Link to="/collections" className="hover:text-[#0A1C42] transition-colors">
            Collections
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="font-semibold text-[#0A1C42]">Checkout</span>
        </nav>

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#EADBCE] gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-xs font-semibold uppercase tracking-wider mb-1.5 border border-[#10B981]/30">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit SSL Insured Checkout</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#06142E] tracking-tight">
              Aurelia Privé Checkout
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAutofillDemo}
              className="text-xs font-semibold px-4 py-2 rounded-full bg-[#FAF2E6] hover:bg-[#F3E8D6] text-[#0A1C42] border border-[#D49B24]/40 transition-colors cursor-pointer"
            >
              1-Click Demo Fill
            </button>
            <a
              href="https://wa.me/918826433922"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#7A584A] hover:text-[#0A1C42] flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden sm:inline">WhatsApp Help</span>
            </a>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Delivery & Payment Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Delivery Address Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#0A1C42] text-white flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <h2 className="font-serif text-lg font-bold text-[#06142E]">
                    Delivery Address
                  </h2>
                </div>
                <span className="text-xs text-[#10B981] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Insured Delivery
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Recipient's Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                    Mobile Number *
                  </label>
                  <div className="flex">
                    <span className="px-3 py-2.5 rounded-l-xl bg-[#EADBCE]/50 border border-r-0 border-[#D5C2B4] text-xs font-semibold text-[#0A1C42] flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit number"
                      maxLength={10}
                      className="w-full px-3 py-2.5 rounded-r-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                    Email (for invoice & tracking updates) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                    Flat / House No. / Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 402, Royal Palms, Malviya Nagar"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="6-digit Pincode"
                    maxLength={6}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                    City & State
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Jaipur, Rajasthan"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Near temple, park or metro station"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                  />
                </div>
              </div>

              {/* Complimentary Gift Box Option */}
              <div className="pt-2 border-t border-[#FAF2E6]">
                <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#EADBCE] cursor-pointer hover:bg-[#F4EDE0] transition-colors">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="mt-0.5 rounded text-[#0A1C42] focus:ring-[#D49B24]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#0A1C42] flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#D49B24]" /> Add Complimentary Velvet Gift Packaging & Greeting Card (FREE)
                    </span>
                    <span className="text-[#7A584A] block mt-0.5">
                      Every piece is wrapped in royal gold-stamped velvet box with authenticity seal.
                    </span>
                  </div>
                </label>

                {isGift && (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Enter custom gift note message..."
                      className="w-full px-4 py-2 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-xs focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-sm space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#0A1C42] text-white flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h2 className="font-serif text-lg font-bold text-[#06142E]">
                  Select Payment Mode
                </h2>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-start justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-[#0A1C42] bg-[#FAF7F0] shadow-sm'
                      : 'border-[#EADBCE] hover:bg-[#FAF7F0]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="text-[#0A1C42] focus:ring-[#D49B24]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-[#D49B24]" />
                        <span className="font-bold text-xs sm:text-sm text-[#06142E]">
                          UPI (GPay / PhonePe / Paytm / BHIM)
                        </span>
                        <span className="bg-[#10B981]/15 text-[#10B981] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Fastest
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A584A] mt-0.5">
                        Instant scan or direct UPI app approval. 100% secure.
                      </p>
                    </div>
                  </div>
                </label>

                {paymentMethod === 'upi' && (
                  <div className="pl-8 pb-1">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Enter UPI ID (e.g. mobile@upi)"
                      className="w-full px-4 py-2 rounded-xl bg-white border border-[#D5C2B4] text-[#06142E] text-xs focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                    />
                  </div>
                )}

                {/* Card Option */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-start justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#0A1C42] bg-[#FAF7F0] shadow-sm'
                      : 'border-[#EADBCE] hover:bg-[#FAF7F0]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-[#0A1C42] focus:ring-[#D49B24]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#0A1C42]" />
                        <span className="font-bold text-xs sm:text-sm text-[#06142E]">
                          Credit / Debit Cards (Visa, RuPay, MasterCard)
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A584A] mt-0.5">
                        All Indian & International debit/credit cards accepted.
                      </p>
                    </div>
                  </div>
                </label>

                {/* NetBanking Option */}
                <label
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`flex items-start justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#0A1C42] bg-[#FAF7F0] shadow-sm'
                      : 'border-[#EADBCE] hover:bg-[#FAF7F0]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="text-[#0A1C42] focus:ring-[#D49B24]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#0A1C42]" />
                        <span className="font-bold text-xs sm:text-sm text-[#06142E]">
                          NetBanking (All Major Indian Banks)
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A584A] mt-0.5">
                        HDFC, ICICI, SBI, Axis, Kotak and 50+ banks.
                      </p>
                    </div>
                  </div>
                </label>

                {/* COD Option */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-start justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#0A1C42] bg-[#FAF7F0] shadow-sm'
                      : 'border-[#EADBCE] hover:bg-[#FAF7F0]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-[#0A1C42] focus:ring-[#D49B24]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#0A1C42]" />
                        <span className="font-bold text-xs sm:text-sm text-[#06142E]">
                          Cash on Delivery (COD)
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A584A] mt-0.5">
                        Pay cash or UPI at your doorstep upon delivery.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Place Order (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-sm sticky top-24 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EADBCE]">
                <h3 className="font-serif text-lg font-bold text-[#06142E] flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#D49B24]" />
                  <span>Order Summary</span>
                </h3>
                <span className="text-xs font-semibold text-[#7A584A]">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Items List in Bag */}
              <div className="max-h-60 overflow-y-auto no-scrollbar space-y-3 divide-y divide-[#FAF2E6]">
                {items.length > 0 ? (
                  items.map((item) => (
                    <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-14 h-14 rounded-xl object-cover bg-[#FDFBF7] border border-[#EADBCE] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-bold text-[#06142E] truncate">
                          {item.product.title}
                        </h4>
                        <span className="text-[11px] text-[#7A584A]">
                          Qty: {item.quantity} × {formatPrice(item.product.price)}
                        </span>
                      </div>
                      <span className="font-bold text-xs text-[#0A1C42] shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#7A584A] py-2">
                    Bag is empty. You can still test placing an order with our demo item!
                  </p>
                )}
              </div>

              {/* Promo Coupon Box */}
              <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-[#FAF2E6]">
                <label className="block text-[11px] font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#D49B24]" />
                  <span>Festive Coupon Code</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter RANG10"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-xs font-mono uppercase font-bold focus:outline-none focus:ring-1 focus:ring-[#D49B24]"
                  />
                  <button
                    type="submit"
                    className="bg-[#0A1C42] hover:bg-[#06122B] text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {isCouponApplied && (
                  <p className="text-[11px] text-[#10B981] font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Code {couponCode} applied ({couponDiscountPercent}% Off)
                  </p>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-2 text-xs pt-3 border-t border-[#EADBCE]">
                <div className="flex justify-between text-[#7A584A]">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-[#06142E]">{formatPrice(subtotal)}</span>
                </div>

                {isCouponApplied && (
                  <div className="flex justify-between text-[#10B981]">
                    <span>Festive Discount ({couponDiscountPercent}%)</span>
                    <span className="font-semibold">- {formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#7A584A]">
                  <span>Insured Express Delivery</span>
                  <span className="font-bold text-[#10B981]">
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#0A1C42] pt-3 border-t border-[#EADBCE]">
                  <span>Total Amount</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full bg-[#0A1C42] hover:bg-[#06122B] text-white py-4 px-6 rounded-2xl font-bold text-sm shadow-festive transition-all flex items-center justify-center gap-2 cursor-pointer group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Royal Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#D49B24]" />
                    <span>Place Order & Pay {formatPrice(finalTotal)}</span>
                  </>
                )}
              </button>

              {/* Guarantee Strip */}
              <div className="pt-2 flex items-center justify-around text-[10px] text-[#7A584A] border-t border-[#FAF2E6]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> 100% Anti-Tarnish
                </span>
                <span>•</span>
                <span>7-Day Exchange</span>
                <span>•</span>
                <span>Hallmarked Craft</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
