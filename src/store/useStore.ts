import { create } from 'zustand'
import { Product, CartItem, Order, UserProfile } from '@/types'

interface CartStore {
  items: CartItem[]
  isCartOpen: boolean
  cartBounceKey: number
  wishlistIds: string[]
  quickViewProduct: Product | null
  isQuickViewOpen: boolean
  
  // Cart Actions
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => boolean
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  
  // Quick View Actions
  openQuickView: (product: Product) => void
  closeQuickView: () => void

  // Login Modal Actions
  isLoginOpen: boolean
  openLogin: () => void
  closeLogin: () => void

  // User Profile & Authentication State
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void

  // Orders State
  orders: Order[]
  addOrder: (order: Order) => void
  
  // Computed helpers
  getCartCount: () => number
  getSubtotal: () => number
}

const FREE_SHIPPING_THRESHOLD = 999

export const useStore = create<CartStore>((set, get) => ({
  user: {
    name: 'Ananya Sharma',
    phone: '9876543210',
    email: 'ananya.sharma@example.com',
    isVip: true,
    memberSince: 'August 2024',
    tier: 'Aurelia Privé Gold Member'
  },
  orders: [
    {
      id: 'AUR-2026-94812',
      date: '28 Sep 2026',
      status: 'Delivered',
      subtotal: 3899,
      discount: 389,
      total: 3510,
      paymentMethod: 'UPI (GPay)',
      trackingNumber: 'BLUEDART-882194812',
      deliveryAddress: {
        fullName: 'Ananya Sharma',
        phone: '+91 98765 43210',
        address: '402, Royal Palms, Malviya Nagar',
        city: 'Jaipur, Rajasthan',
        pincode: '302017'
      },
      items: [
        {
          product: {
            id: 'neck-4',
            title: 'Rajasthani Meenakari Floral Collar Hasli',
            price: 3899,
            image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=600&q=80',
            rating: 5,
            reviewCount: 41,
            category: 'Necklaces'
          },
          quantity: 1,
          price: 3899
        }
      ]
    },
    {
      id: 'AUR-2026-87140',
      date: '15 Sep 2026',
      status: 'Delivered',
      subtotal: 1399,
      discount: 140,
      total: 1259,
      paymentMethod: 'Credit Card',
      trackingNumber: 'BLUEDART-773187140',
      deliveryAddress: {
        fullName: 'Ananya Sharma',
        phone: '+91 98765 43210',
        address: '402, Royal Palms, Malviya Nagar',
        city: 'Jaipur, Rajasthan',
        pincode: '302017'
      },
      items: [
        {
          product: {
            id: 'arrival-5',
            title: 'Heritage Gajraj Elephant Kundan Kada',
            price: 1399,
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
            rating: 5,
            reviewCount: 143,
            category: 'Bangles'
          },
          quantity: 1,
          price: 1399
        }
      ]
    }
  ],
  items: [
    // Pre-populate with one item for instant wow & demonstration
    {
      product: {
        id: 'jhumka-1',
        title: 'Feather Jhumka in Golden Pearl',
        price: 499,
        compareAtPrice: 899,
        rating: 4.8,
        reviewCount: 142,
        badge: 'BEST SELLER',
        category: 'Jhumkas',
        image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
        inStock: true
      },
      quantity: 1
    }
  ],
  isCartOpen: false,
  cartBounceKey: 0,
  wishlistIds: ['jhumka-3', 'arrival-1'],
  quickViewProduct: null,
  isQuickViewOpen: false,
  isLoginOpen: false,

  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  addToCart: (product: Product, quantity = 1) => {
    set((state) => {
      const existingIndex = state.items.findIndex(item => item.product.id === product.id)
      let newItems: CartItem[]
      if (existingIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
        )
      } else {
        newItems = [...state.items, { product, quantity }]
      }
      return {
        items: newItems,
        cartBounceKey: state.cartBounceKey + 1
      }
    })
  },

  removeFromCart: (productId: string) => {
    set((state) => ({
      items: state.items.filter(item => item.product.id !== productId)
    }))
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(productId)
      return
    }
    set((state) => ({
      items: state.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    }))
  },

  clearCart: () => set({ items: [] }),

  toggleWishlist: (productId: string) => {
    let added = false
    set((state) => {
      const exists = state.wishlistIds.includes(productId)
      added = !exists
      return {
        wishlistIds: exists
          ? state.wishlistIds.filter(id => id !== productId)
          : [...state.wishlistIds, productId]
      }
    })
    return added
  },

  clearWishlist: () => set({ wishlistIds: [] }),

  isInWishlist: (productId: string) => {
    return get().wishlistIds.includes(productId)
  },

  setUser: (user: UserProfile | null) => set({ user }),

  addOrder: (order: Order) => {
    set((state) => ({
      orders: [order, ...state.orders]
    }))
  },

  openQuickView: (product: Product) => {
    set({ quickViewProduct: product, isQuickViewOpen: true })
  },

  closeQuickView: () => {
    set({ isQuickViewOpen: false })
  },

  getCartCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }
}))

export { FREE_SHIPPING_THRESHOLD }
