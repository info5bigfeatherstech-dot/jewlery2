export type ProductBadge = "BEST SELLER" | "TRENDING" | "NEW"

export interface Product {
  id: string
  title: string
  image: string
  hoverImage?: string
  price: number
  compareAtPrice?: number
  rating: number
  reviewCount: number
  badge?: ProductBadge
  category: string
  description?: string
  inStock?: boolean
  features?: string[]
  isArtwork?: boolean
  dimensions?: string
  medium?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface EarringCategory {
  id: string
  name: string
  hindiName?: string
  image: string
  itemCount: number
  description?: string
}

export interface Review {
  id: string
  name: string
  avatar: string
  rating: number
  timeAgo: string
  text: string
  productTitle?: string
  verified: boolean
  location: string
}

export interface InstagramPost {
  id: string
  image: string
  likes: number
  comments: number
  caption: string
  link: string
}

export interface HeroSlideData {
  id: string
  subtitle: string
  title: string
  highlightText: string
  description: string
  primaryCtaText: string
  primaryCtaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  image: string
  tag: string
}

export interface OrderItem {
  product: Product
  quantity: number
  price: number
}

export interface Order {
  id: string
  date: string
  items: OrderItem[]
  subtotal: number
  discount: number
  total: number
  status: 'Processing' | 'Dispatched' | 'Delivered'
  deliveryAddress: {
    fullName: string
    phone: string
    address: string
    city: string
    pincode: string
  }
  paymentMethod: string
  trackingNumber?: string
}

export interface UserProfile {
  name: string
  phone: string
  email: string
  isVip: boolean
  memberSince?: string
  tier?: string
}
