import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { useStore, FREE_SHIPPING_THRESHOLD } from '@/store/useStore'
import { formatPrice } from '@/lib/utils'

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, items, updateQuantity, removeFromCart, getSubtotal } = useStore()

  const subtotal = getSubtotal()
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Slide-in panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FAF7F0] z-50 shadow-2xl flex flex-col border-l border-[#EADBCE]"
            role="dialog"
            aria-modal="true"
            aria-label="Your Shopping Bag"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#EADBCE] bg-[#FDFBF7] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#0A1C42]" />
                <h2 className="font-serif text-lg font-bold text-[#0A1C42]">
                  Your Bag ({items.reduce((s, i) => s + i.quantity, 0)})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-[#F4EDE0] text-[#0A1C42] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-5 py-3.5 bg-[#FAF2E6] border-b border-[#EADBCE]">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-[#0A1C42]">
                {shippingRemaining > 0 ? (
                  <span>
                    Add <strong className="text-[#163B7A]">{formatPrice(shippingRemaining)}</strong> more for <strong>FREE Express Shipping</strong>!
                  </span>
                ) : (
                  <span className="text-[#10B981] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Congratulations! You unlocked FREE Express Shipping!
                  </span>
                )}
                <span className="text-[11px] font-semibold">{shippingProgress}%</span>
              </div>
              <div className="w-full bg-[#EADBCE] rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D49B24] via-[#EC4899] to-[#10B981]"
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EADBCE]/70">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-20 h-20 rounded-full bg-[#F4EDE0] flex items-center justify-center text-[#163B7A] mb-4">
                    <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#0A1C42] mb-2">
                    Your shopping bag is empty
                  </h3>
                  <p className="text-sm text-[#7A584A] max-w-xs mb-6">
                    Explore our handcrafted festive jhumkas, Kundan watch bracelets, and canvas paintings.
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2.5 rounded-full bg-[#0A1C42] text-white text-sm font-semibold hover:bg-[#06122B] shadow-md transition-colors"
                  >
                    Start Exploring
                  </button>
                </div>
              ) : (
                items.map(({ product, quantity }) => (
                  <div key={product.id} className="py-4 flex gap-4 first:pt-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-xl border border-[#EADBCE] bg-white flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-semibold text-[#06142E] line-clamp-1">
                            {product.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            aria-label={`Remove ${product.title} from cart`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-xs text-[#7A584A] mt-0.5">{product.category}</div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#D5C2B4] rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1.5 hover:bg-[#FAF7F0] text-[#0A1C42] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-[#0A1C42]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1.5 hover:bg-[#FAF7F0] text-[#0A1C42] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-sm font-bold text-[#0A1C42]">
                          {formatPrice(product.price * quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#EADBCE] bg-[#FDFBF7] space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#7A584A]">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#06142E]">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#7A584A]">
                    <span>Shipping</span>
                    <span className="font-medium text-[#06142E]">
                      {shippingRemaining === 0 ? (
                        <span className="text-green-600 font-bold">FREE</span>
                      ) : (
                        '₹99 (Free above ₹999)'
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#0A1C42] pt-2 border-t border-[#EADBCE]">
                    <span>Estimated Total</span>
                    <span>{formatPrice(subtotal + (shippingRemaining === 0 ? 0 : 99))}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert('Proceeding to Secure Checkout with Razorpay / UPI / Cards')}
                  className="w-full bg-[#0A1C42] hover:bg-[#06122B] text-white py-3.5 px-4 rounded-xl font-semibold text-sm shadow-festive flex items-center justify-center gap-2 transition-all group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-[#7A584A] pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D49B24]" /> 100% Safe Payments
                  </span>
                  <span>•</span>
                  <span>Anti-Tarnish Assurance</span>
                  <span>•</span>
                  <span>Easy Return</span>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
