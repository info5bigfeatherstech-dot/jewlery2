import React from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Crown,
  Gem,
  Award,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'
import { AureliaLogo } from '@/components/ui/AureliaLogo'

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Luxury Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7A584A] mb-8">
          <Link to="/" className="hover:text-[#0A1C42] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="font-semibold text-[#0A1C42]">About Aurelia Jewels</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-festive border border-[#D49B24]/30 bg-[#06142E] text-white p-8 sm:p-14 mb-12">
          <div className="rainbow-line absolute top-0 left-0 right-0 h-1.5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D49B24]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#D49B24] text-xs font-semibold uppercase tracking-wider border border-[#D49B24]/30 backdrop-blur-md">
                <Crown className="w-3.5 h-3.5" />
                <span>Royal Indian Craftsmanship Since 2018</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                The Soul of Indian Jewellery Heritage
              </h1>

              <p className="text-sm sm:text-base text-[#EADFCB] font-light leading-relaxed">
                Born from the historic lanes of Johari Bazaar in Jaipur, Aurelia Jewels reimagines centuries of royal Rajputana ornament craftsmanship for modern festive celebrations across India and the globe.
              </p>
            </div>

            <div className="hidden md:flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 border border-[#D49B24]/30 backdrop-blur-md shrink-0">
              <AureliaLogo variant="stacked" theme="dark" size="lg" />
            </div>
          </div>
        </div>

        {/* 2-Column Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-6 space-y-5 text-sm text-[#4A3B32] leading-relaxed">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0A1C42]">
              <Sparkles className="w-4 h-4 text-[#D49B24]" />
              <span>Our Sacred Story</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#06142E] leading-tight">
              Preserving the Art of Jaipur Kundan & Jadau
            </h2>

            <p>
              In an era of mass-produced plastic accessories, Aurelia Jewels remains steadfast in honoring the slow, meditative art of handmade Indian jewellery. Every bell jhumka, foil-backed Kundan kada, and multi-layered Rani Haar is meticulously carved, polished, and hand-strung by fifth-generation hereditary karigars.
            </p>

            <p>
              We believe royal heritage should not be locked inside bank vaults. By pairing authentic Rajasthani craftsmanship with our signature 22K micro gold electro-deposition and anti-tarnish protective sealing, our pieces deliver heirloom aesthetic brilliance with feather-light everyday comfort.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-2xl bg-white border border-[#EADBCE]">
                <div className="font-serif text-2xl font-bold text-[#0A1C42]">25,000+</div>
                <div className="text-xs text-[#7A584A] mt-0.5">Festive Brides Adorned</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#EADBCE]">
                <div className="font-serif text-2xl font-bold text-[#0A1C42]">100%</div>
                <div className="text-xs text-[#7A584A] mt-0.5">Anti-Tarnish Guarantee</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#D49B24]/40">
              <img
                src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80"
                alt="Aurelia Jewels Heritage"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#06142E]">
              The Four Aurelia Pillars
            </h2>
            <p className="text-xs sm:text-sm text-[#7A584A] mt-1.5">
              The promises that accompany every velvet jewel box sent from our atelier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#EADBCE] shadow-sm space-y-2.5">
              <Gem className="w-8 h-8 text-[#D49B24]" />
              <h3 className="font-serif text-base font-bold text-[#06142E]">Jaipur Kundan Foil</h3>
              <p className="text-xs text-[#7A584A] leading-relaxed">
                Authentic hand-cut uncut glass and polki stones set in pure silver-gold foil for radiant fire.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#EADBCE] shadow-sm space-y-2.5">
              <ShieldCheck className="w-8 h-8 text-[#10B981]" />
              <h3 className="font-serif text-base font-bold text-[#06142E]">Anti-Tarnish Seal</h3>
              <p className="text-xs text-[#7A584A] leading-relaxed">
                Protected by high-micron electro-deposition to guard against perspiration and humidity.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#EADBCE] shadow-sm space-y-2.5">
              <Heart className="w-8 h-8 text-[#EC4899]" />
              <h3 className="font-serif text-base font-bold text-[#06142E]">Hypoallergenic Core</h3>
              <p className="text-xs text-[#7A584A] leading-relaxed">
                100% lead and nickel-free brass alloys, completely gentle on sensitive skin during long wedding hours.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#EADBCE] shadow-sm space-y-2.5">
              <Award className="w-8 h-8 text-[#163B7A]" />
              <h3 className="font-serif text-base font-bold text-[#06142E]">Fair Artisan Wages</h3>
              <p className="text-xs text-[#7A584A] leading-relaxed">
                Direct atelier partnerships ensuring sustainable livelihoods for Jaipur gemstone hereditary craftsmen.
              </p>
            </div>
          </div>
        </div>

        {/* Atelier Contact Card */}
        <div className="bg-gradient-to-br from-[#06142E] via-[#0A1C42] to-[#081734] text-white rounded-3xl p-8 sm:p-12 shadow-festive border border-[#D49B24]/30">
          <div className="max-w-2xl space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">Visit Our Heritage Ateliers</h3>
            <p className="text-xs sm:text-sm text-[#EADFCB] font-light leading-relaxed">
              Experience the craftsmanship in person or connect directly with our master designers for bridal consultations.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#EADFCB]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D49B24] shrink-0" />
                <span>Johari Bazaar Atelier, Jaipur, Rajasthan & NCR Design Studio, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D49B24] shrink-0" />
                <span>WhatsApp Concierge: +91 88264 33922</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D49B24] shrink-0" />
                <span>concierge@aureliajewels.com</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
