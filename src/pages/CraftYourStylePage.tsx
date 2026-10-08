import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Send,
  MessageCircle,
  Gem,
  Palette
} from 'lucide-react'
import { useToastStore } from '@/store/useToast'

export const CraftYourStylePage: React.FC = () => {
  const { addToast } = useToastStore()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [category, setCategory] = useState('Bridal Choker & Earrings')
  const [colorTone, setColorTone] = useState('Deep Crimson & Emerald')
  const [notes, setNotes] = useState('')

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) return

    const whatsappText = encodeURIComponent(
      `Namaste glaMISTERa! I'd like to book a bespoke consultation.\nName: ${name}\nPhone: +91 ${phone}\nCategory: ${category}\nLehenga Color/Tone: ${colorTone}\nNotes: ${notes || 'Looking for festive lehenga matching'}`
    )

    addToast({
      title: 'Consultation Scheduled!',
      description: 'Opening WhatsApp to connect with our Jaipur design atelier...',
      type: 'success'
    })

    setTimeout(() => {
      window.open(`https://wa.me/918826433922?text=${whatsappText}`, '_blank')
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Luxury Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7A584A] mb-8">
          <Link to="/" className="hover:text-[#0A1C42] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="font-semibold text-[#0A1C42]">Craft Your Style (Bespoke Atelier)</span>
        </nav>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-festive border border-[#D49B24]/30 bg-[#06142E] text-white p-8 sm:p-14 mb-12">
          <div className="rainbow-line absolute top-0 left-0 right-0 h-1.5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D49B24]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#D49B24] text-xs font-semibold uppercase tracking-wider border border-[#D49B24]/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bespoke Indian Haute Joaillerie</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Craft Your Style With Our Jaipur Atelier
              </h1>

              <p className="text-sm sm:text-base text-[#EADFCB] font-light leading-relaxed max-w-xl">
                Collaborate directly with our master gemologists to customize your bridal choker length, match your wedding lehenga colors, or customize bespoke Kundan bangles & kadas.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#EADFCB]">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> 1-on-1 Video Stone Preview
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> Exact Lehenga Silk Matching
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> Anti-Tarnish Lifetime Seal
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D49B24]/40">
                <img
                  src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80"
                  alt="Bespoke Kundan Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-[#EADBCE] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A1C42] text-[#D49B24] flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-serif text-lg font-bold text-[#06142E]">Design Consultation</h3>
            <p className="text-xs text-[#7A584A] leading-relaxed">
              Share your lehenga color swatch, neck collar measurements, or dream jewellery silhouette via WhatsApp or video call.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#EADBCE] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A1C42] text-[#D49B24] flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-serif text-lg font-bold text-[#06142E]">Artisan Hand-Setting</h3>
            <p className="text-xs text-[#7A584A] leading-relaxed">
              Our Jaipur karigars hand-cut uncut Polki and foil-backed Kundan stones into 22K micro gold plated brass alloy frames.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#EADBCE] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A1C42] text-[#D49B24] flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-serif text-lg font-bold text-[#06142E]">Insured Luxury Delivery</h3>
            <p className="text-xs text-[#7A584A] leading-relaxed">
              Dispatched with tamper-proof seal in our velvet keepsake trousseau box, backed by our lifetime anti-tarnish guarantee.
            </p>
          </div>
        </div>

        {/* Interactive Consultation Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EADBCE] shadow-festive relative overflow-hidden">
          <div className="rainbow-line absolute top-0 left-0 right-0 h-1.5" />

          <div className="max-w-2xl mx-auto text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1C42]/10 text-[#0A1C42] text-xs font-semibold mb-2">
              <Calendar className="w-3.5 h-3.5 text-[#D49B24]" />
              <span>Complimentary Bridal Appointment</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#06142E]">
              Book Your Bespoke Consultation
            </h2>
            <p className="text-xs sm:text-sm text-[#7A584A] mt-1.5">
              Fill out your wedding or festive details and our design concierge will reach out within 2 hours.
            </p>
          </div>

          <form onSubmit={handleConsultationSubmit} className="max-w-2xl mx-auto space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Radhika Kapoor"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                  WhatsApp Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-xs font-bold text-[#0A1C42] select-none">+91</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                  Piece of Interest
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24] cursor-pointer"
                >
                  <option value="Bridal Choker & Earrings">Bridal Choker & Earrings</option>
                  <option value="Royal Layered Rani Haar">Royal Layered Rani Haar</option>
                  <option value="Heirloom Kundan Bangles & Kadas">Heirloom Kundan Bangles & Kadas</option>
                  <option value="Custom Festive Jhumkas">Custom Festive Jhumkas</option>
                  <option value="Full Bridal Trousseau Set">Full Bridal Trousseau Set</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                  Lehenga Color Palette
                </label>
                <select
                  value={colorTone}
                  onChange={(e) => setColorTone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24] cursor-pointer"
                >
                  <option value="Deep Crimson & Emerald">Deep Crimson & Emerald</option>
                  <option value="Rani Pink & Pearl White">Rani Pink & Pearl White</option>
                  <option value="Pastel Peach & Mint Green">Pastel Peach & Mint Green</option>
                  <option value="Royal Peacock Blue & Gold">Royal Peacock Blue & Gold</option>
                  <option value="Antique Ivory & Champagne Gold">Antique Ivory & Champagne Gold</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A1C42] uppercase tracking-wider mb-1.5">
                Special Requests or Sizing Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention target wedding date, preferred collar choker length, or wrist size..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#D5C2B4] text-[#06142E] text-sm focus:outline-none focus:ring-2 focus:ring-[#D49B24]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0A1C42] hover:bg-[#06122B] text-white py-4 px-6 rounded-xl font-bold text-sm shadow-festive transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span>Schedule 1-on-1 WhatsApp Consultation</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
