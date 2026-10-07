import { EarringCategory } from '@/types'

export const quickCategories = [
  { id: 'new-arrivals', name: 'New Arrivals', icon: 'Sparkles', count: 48, route: '/new-arrivals' },
  { id: 'best-sellers', name: 'Best Sellers', icon: 'Flame', count: 64, route: '/best-sellers' },
  { id: 'kids-jewellery', name: "Kid's Jewellery", icon: 'HeartHandshake', count: 24, route: '/kids-jewellery' },
  { id: 'bangles', name: 'Bangles & Kadas', icon: 'CircleDot', count: 32, route: '/bangles' },
  { id: 'anti-tarnish', name: 'Anti-Tarnish', icon: 'ShieldCheck', count: 90, route: '/anti-tarnish' },
  { id: 'premium', name: 'Premium', icon: 'Crown', count: 45, route: '/premium' },
  { id: 'bridal', name: 'Bridal', icon: 'Gem', count: 56, route: '/bridal' },
  { id: 'necklaces', name: 'Chokers & Sets', icon: 'Gem', count: 48, route: '/necklaces' },
]

export const earringCategories: EarringCategory[] = [
  {
    id: 'disc',
    name: 'Disc',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
    itemCount: 42,
    description: 'Double disc drop earrings in golden brown polish'
  },
  {
    id: 'signature',
    name: 'Signature',
    image: 'https://images.unsplash.com/photo-1611591475152-47831c367468?auto=format&fit=crop&w=600&q=80',
    itemCount: 58,
    description: 'Teardrop evil eye earrings on display stand'
  },
  {
    id: 'evil-eye',
    name: 'Evil Eye',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    itemCount: 36,
    description: 'Handcrafted beaded evil eye stud earrings'
  },
  {
    id: 'jhumka',
    name: 'Jhumka',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80',
    itemCount: 74,
    description: 'Vibrant pink tiered dome jhumkas'
  },
  {
    id: 'stud',
    name: 'Stud',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    itemCount: 65,
    description: 'Bow motifs with sparkling crystal drops'
  },
  {
    id: 'festive',
    name: 'Festive',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    itemCount: 88,
    description: 'Double coiled black disc festive drops'
  },
  {
    id: 'jhumki',
    name: 'Jhumki',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80',
    itemCount: 52,
    description: 'Miniature bell jhumkis on stand'
  },
  {
    id: 'loops-hoops',
    name: 'Loops & Hoops',
    image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=600&q=80',
    itemCount: 49,
    description: 'Beaded wire hoop earrings on acrylic stand'
  }
]
