import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Package,
  Heart,
  MapPin,
  Gift,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Truck,
  Phone,
  CheckCircle2,
  Copy,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  FileText
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { useToastStore } from '@/store/useToast'
import { allProducts } from '@/data/products'
import { formatPrice } from '@/lib/utils'

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { user, setUser, orders, wishlistIds, addToCart, openCart } = useStore()
  const { addToast } = useToastStore()

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'rewards' | 'settings'>('orders')

  // Address edit state
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      title: 'Home (Default)',
      fullName: user?.name || 'Ananya Sharma',
      phone: '+91 98765 43210',
      addressLine: 'Flat 402, Royal Palms Enclave, Malviya Nagar',
      city: 'Jaipur, Rajasthan',
      pincode: '302017',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'Office / Studio',
      fullName: user?.name || 'Ananya Sharma',
      phone: '+91 98765 43210',
      addressLine: 'Atelier Suite 204, MI Road Heritage Complex',
      city: 'Jaipur, Rajasthan',
      pincode: '302001',
      isDefault: false
    }
  ])

  // Profile Form state
  const [profileName, setProfileName] = useState(user?.name || 'Ananya Sharma')
  const [profilePhone, setProfilePhone] = useState(user?.phone || '9876543210')
  const [profileEmail, setProfileEmail] = useState(user?.email || 'ananya.sharma@example.com')

  // Tracking modal state
  const [trackingModalOrder, setTrackingModalOrder] = useState<string | null>(null)

  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id))

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code)
    addToast({
      title: `Copied Code ${code}!`,
      description: 'Paste it during checkout to redeem your royal discount.',
      type: 'success'
    })
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setUser({
      name: profileName,
      phone: profilePhone,
      email: profileEmail,
      isVip: true,
      memberSince: user?.memberSince || 'August 2024',
      tier: user?.tier || 'Aurelia Privé Gold Member'
    })
    addToast({
      title: 'Profile Updated',
      description: 'Your contact details have been safely updated.',
      type: 'success'
    })
  }

  const handleSignOut = () => {
    setUser(null)
    addToast({
      title: 'Signed Out',
      description: 'You have been safely signed out of your Privé account.',
      type: 'info'
    })
    navigate('/')
  }

  const handleMoveToBag = (product: typeof allProducts[0]) => {
    addToCart(product, 1)
    addToast({
      title: 'Added to Bag',
      description: `${product.title} has been moved to your shopping bag.`,
      type: 'success'
    })
    openCart()
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
          <span className="font-semibold text-[#0A1C42]">Privé Account</span>
        </nav>

        {/* Member Profile Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-sm mb-8 relative overflow-hidden">
          <div className="rainbow-line absolute top-0 left-0 right-0 h-1.5" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#0A1C42] to-[#163B7A] text-white flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#D49B24] shadow-md">
                  {profileName.charAt(0)}
                </div>
                <span className="absolute -bottom-1 -right-1 bg-[#D49B24] text-[#06142E] p-1 rounded-full shadow-sm text-[10px] font-black" title="VIP Member">
                  👑
                </span>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D49B24]/15 text-[#D49B24] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{user?.tier || 'Aurelia Privé Gold Member'}</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#06142E]">
                  {profileName}
                </h1>
                <p className="text-xs text-[#7A584A] mt-0.5">
                  +91 {profilePhone} • {profileEmail}
                </p>
              </div>
            </div>

            {/* Quick Stats Pill Group */}
            <div className="grid grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-[#EADBCE] pt-4 md:pt-0 md:pl-6 text-center">
              <div className="p-2 sm:p-3 rounded-2xl bg-[#FAF7F0] border border-[#EADBCE]">
                <span className="font-serif text-lg sm:text-xl font-bold text-[#0A1C42] block">
                  {orders.length}
                </span>
                <span className="text-[10px] text-[#7A584A] font-medium">Orders</span>
              </div>
              <div className="p-2 sm:p-3 rounded-2xl bg-[#FAF7F0] border border-[#EADBCE]">
                <span className="font-serif text-lg sm:text-xl font-bold text-[#EC4899] block">
                  {wishlistIds.length}
                </span>
                <span className="text-[10px] text-[#7A584A] font-medium">Wishlist</span>
              </div>
              <div className="p-2 sm:p-3 rounded-2xl bg-[#FAF7F0] border border-[#EADBCE]">
                <span className="font-serif text-lg sm:text-xl font-bold text-[#10B981] block">
                  3
                </span>
                <span className="text-[10px] text-[#7A584A] font-medium">Coupons</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Navigation Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white rounded-3xl p-3 border border-[#EADBCE] shadow-sm space-y-1">
              {[
                { id: 'orders' as const, label: 'My Orders', icon: Package, badge: orders.length },
                { id: 'wishlist' as const, label: 'My Wishlist', icon: Heart, badge: wishlistIds.length },
                { id: 'addresses' as const, label: 'Saved Addresses', icon: MapPin },
                { id: 'rewards' as const, label: 'Privé Rewards & Coupons', icon: Gift, badge: '10% Off' },
                { id: 'settings' as const, label: 'Profile & Security', icon: Settings },
              ].map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0A1C42] text-white shadow-md'
                        : 'text-[#7A584A] hover:text-[#0A1C42] hover:bg-[#FAF7F0]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-[#D49B24] text-[#0A1C42]'
                            : 'bg-[#FAF2E6] text-[#0A1C42] border border-[#D49B24]/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}

              <div className="pt-2 border-t border-[#FAF2E6]">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Concierge Help Card */}
            <div className="bg-[#06142E] text-white rounded-3xl p-6 border border-[#D49B24]/30 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#D49B24] text-[#06142E] flex items-center justify-center font-bold text-xs">
                  ✨
                </span>
                <h4 className="font-serif text-sm font-bold text-white">Privé Jewellery Concierge</h4>
              </div>
              <p className="text-xs text-[#EADFCB] leading-relaxed font-light">
                Need urgent bridal trousseau sizing, custom choker lengths, or lehenga styling advice?
              </p>
              <a
                href="https://wa.me/918826433922"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Content Area (8 Cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: MY ORDERS */}
              {activeTab === 'orders' && (
                <motion.div
                  key="orders-tab"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#EADBCE]">
                    <h2 className="font-serif text-xl font-bold text-[#06142E]">
                      Order History ({orders.length})
                    </h2>
                    <span className="text-xs text-[#7A584A]">
                      All orders insured with Bluedart Express
                    </span>
                  </div>

                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="bg-white rounded-3xl p-6 border border-[#EADBCE] shadow-sm space-y-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#FAF2E6] gap-2">
                            <div>
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono text-sm font-bold text-[#0A1C42]">
                                  {order.id}
                                </span>
                                <span
                                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                    order.status === 'Delivered'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-blue-100 text-blue-700'
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <span className="text-xs text-[#7A584A] mt-0.5 block">
                                Placed on {order.date} • {order.paymentMethod}
                              </span>
                            </div>

                            <div className="sm:text-right">
                              <span className="font-serif text-base font-bold text-[#0A1C42]">
                                {formatPrice(order.total)}
                              </span>
                            </div>
                          </div>

                          {/* Items in this order */}
                          <div className="space-y-3">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3">
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
                                    Qty: {item.quantity} × {formatPrice(item.price)}
                                  </span>
                                </div>
                                <span className="text-xs font-semibold text-[#0A1C42] shrink-0">
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Order Actions */}
                          <div className="pt-3 border-t border-[#FAF2E6] flex flex-wrap items-center justify-between gap-3 text-xs">
                            <span className="text-[#7A584A] flex items-center gap-1.5">
                              <Truck className="w-3.5 h-3.5 text-[#D49B24]" />
                              <span>Tracking: <strong className="font-mono text-[#0A1C42]">{order.trackingNumber || 'BLUEDART-882194812'}</strong></span>
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  addToast({
                                    title: 'Shipment Tracking',
                                    description: `Order ${order.id} is in transit via Bluedart Insured Express.`,
                                    type: 'info'
                                  })
                                }}
                                className="px-3.5 py-1.5 rounded-xl border border-[#D5C2B4] hover:bg-[#FAF7F0] text-[#0A1C42] font-semibold transition-colors cursor-pointer"
                              >
                                Track Package
                              </button>
                              <button
                                onClick={() => {
                                  addToast({
                                    title: 'GST Invoice Downloaded',
                                    description: `Tax invoice generated for order ${order.id}.`,
                                    type: 'success'
                                  })
                                }}
                                className="px-3.5 py-1.5 rounded-xl bg-[#FAF2E6] hover:bg-[#F3E8D6] text-[#0A1C42] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <FileText className="w-3 h-3 text-[#D49B24]" />
                                <span>Invoice</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center bg-white rounded-3xl border border-[#EADBCE] p-8">
                      <Package className="w-12 h-12 text-[#D49B24] mx-auto mb-3 opacity-60" />
                      <h3 className="font-serif text-lg font-bold text-[#06142E] mb-1">
                        No Orders Placed Yet
                      </h3>
                      <p className="text-xs text-[#7A584A] mb-4">
                        Discover our festive jhumkas and bridal chokers dipped in 22K gold.
                      </p>
                      <Link
                        to="/collections"
                        className="bg-[#0A1C42] text-white px-5 py-2.5 rounded-full text-xs font-bold inline-block"
                      >
                        Explore Collections
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 2: MY WISHLIST */}
              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist-tab"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#EADBCE]">
                    <h2 className="font-serif text-xl font-bold text-[#06142E]">
                      Saved Wishlist ({wishlistProducts.length})
                    </h2>
                    <Link
                      to="/wishlist"
                      className="text-xs font-bold text-[#163B7A] hover:text-[#0A1C42] flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>Full Wishlist Page</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlistProducts.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white rounded-2xl p-4 border border-[#EADBCE] shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-16 h-16 rounded-xl object-cover bg-[#FAF7F0] border border-[#EADBCE] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-xs font-bold text-[#06142E] truncate">
                              {product.title}
                            </h4>
                            <span className="font-bold text-xs text-[#0A1C42] block mt-0.5">
                              {formatPrice(product.price)}
                            </span>
                            <button
                              onClick={() => handleMoveToBag(product)}
                              className="mt-2 text-[11px] font-bold text-[#163B7A] hover:text-[#0A1C42] flex items-center gap-1 cursor-pointer"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>Move to Bag</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center bg-white rounded-3xl border border-[#EADBCE] p-8">
                      <Heart className="w-12 h-12 text-[#EC4899] mx-auto mb-3 opacity-60" />
                      <h3 className="font-serif text-lg font-bold text-[#06142E] mb-1">
                        Wishlist is Empty
                      </h3>
                      <p className="text-xs text-[#7A584A] mb-4">
                        Save your favorite heirloom pieces to view them here.
                      </p>
                      <Link
                        to="/collections"
                        className="bg-[#0A1C42] text-white px-5 py-2.5 rounded-full text-xs font-bold inline-block"
                      >
                        Discover Jewellery
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 3: SAVED ADDRESSES */}
              {activeTab === 'addresses' && (
                <motion.div
                  key="addresses-tab"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#EADBCE]">
                    <h2 className="font-serif text-xl font-bold text-[#06142E]">
                      Saved Delivery Addresses
                    </h2>
                    <button
                      onClick={() => {
                        addToast({
                          title: 'Address Form',
                          description: 'You can update your address details anytime during checkout.',
                          type: 'info'
                        })
                      }}
                      className="text-xs font-bold text-[#0A1C42] hover:text-[#163B7A] cursor-pointer"
                    >
                      + Add New Address
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="bg-white rounded-3xl p-6 border border-[#EADBCE] shadow-sm space-y-3 relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-sm font-bold text-[#06142E] flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#D49B24]" />
                            <span>{addr.title}</span>
                          </span>
                          {addr.isDefault && (
                            <span className="bg-[#10B981]/15 text-[#10B981] text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-[#7A584A] space-y-1">
                          <p className="font-semibold text-[#06142E]">{addr.fullName}</p>
                          <p>{addr.addressLine}</p>
                          <p>{addr.city} - {addr.pincode}</p>
                          <p>Phone: {addr.phone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 4: PRIVÉ REWARDS & COUPONS */}
              {activeTab === 'rewards' && (
                <motion.div
                  key="rewards-tab"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="pb-3 border-b border-[#EADBCE]">
                    <h2 className="font-serif text-xl font-bold text-[#06142E]">
                      Aurelia Privé Rewards & Coupons
                    </h2>
                    <p className="text-xs text-[#7A584A] mt-0.5">
                      Redeem these exclusive member codes at checkout for instant festive discounts.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        code: 'RANG10',
                        discount: '10% Flat Discount',
                        desc: 'Valid on entire festive jewellery collection with no minimum order value.',
                        expiry: 'Valid till 31 Dec 2026'
                      },
                      {
                        code: 'BRIDAL20',
                        discount: '20% Off Bridal Edit',
                        desc: 'Special privilege on Grand Bridal Trousseau Sets & Royal Kundan Haar above ₹4,999.',
                        expiry: 'Wedding Season Privilege'
                      },
                      {
                        code: 'FREESHIP',
                        discount: '100% Free Express Shipping',
                        desc: 'Complimentary Bluedart insured door delivery across 24,000+ Indian pincodes.',
                        expiry: 'Lifetime Member Perk'
                      }
                    ].map((coupon, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-3xl p-6 border border-[#D49B24]/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-black bg-[#FAF2E6] text-[#0A1C42] px-3 py-1 rounded-xl border border-[#D49B24]/40">
                              {coupon.code}
                            </span>
                            <span className="font-bold text-xs text-[#10B981]">
                              {coupon.discount}
                            </span>
                          </div>
                          <p className="text-xs text-[#7A584A] leading-relaxed pt-1">
                            {coupon.desc}
                          </p>
                          <span className="text-[10px] text-[#7A584A]/80 font-medium block">
                            {coupon.expiry}
                          </span>
                        </div>

                        <button
                          onClick={() => handleCopyCoupon(coupon.code)}
                          className="px-5 py-2.5 rounded-full bg-[#0A1C42] hover:bg-[#06122B] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 5: PROFILE & SECURITY */}
              {activeTab === 'settings' && (
                <motion.div
                  key="settings-tab"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="pb-3 border-b border-[#EADBCE]">
                    <h2 className="font-serif text-xl font-bold text-[#06142E]">
                      Profile & Contact Details
                    </h2>
                    <p className="text-xs text-[#7A584A] mt-0.5">
                      Keep your contact numbers updated to receive SMS and WhatsApp dispatch notifications.
                    </p>
                  </div>

                  <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-sm space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                        Mobile Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="bg-[#0A1C42] hover:bg-[#06122B] text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-md transition-colors cursor-pointer"
                      >
                        Save Profile Changes
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  )
}
