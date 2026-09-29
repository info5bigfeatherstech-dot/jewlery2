import { create } from 'zustand'
import { Product, CartItem } from '@/types'

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
  
  // Quick View Actions
  openQuickView: (product: Product) => void
  closeQuickView: () => void
  
  // Computed helpers
  getCartCount: () => number
  getSubtotal: () => number
}

const FREE_SHIPPING_THRESHOLD = 999

export const useStore = create<CartStore>((set, get) => ({
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

  isInWishlist: (productId: string) => {
    return get().wishlistIds.includes(productId)
  },

  openQuickView: (product: Product) => {
    set({ quickViewProduct: product, isQuickViewOpen: true })
  },

  closeQuickView: () => {
    set({ isQuickViewOpen: false, quickViewProduct: null })
  },

  getCartCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }
}))

export { FREE_SHIPPING_THRESHOLD }
