import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  FileText,
  Phone,
  Mail,
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react'

interface PolicyLayoutProps {
  title: string
  subtitle: string
  lastUpdated?: string
  children: React.ReactNode
}

export const PolicyLayout: React.FC<PolicyLayoutProps> = ({
  title,
  subtitle,
  lastUpdated = 'September 2026',
  children
}) => {
  const { pathname } = useLocation()

  const policyNav = [
    {
      title: 'Shipping & Delivery Policy',
      path: '/policies/shipping',
      icon: Truck,
      desc: 'Free insured transit across India'
    },
    {
      title: 'Refund & 7-Day Exchange',
      path: '/policies/returns',
      icon: RotateCcw,
      desc: 'Hassle-free doorstep returns'
    },
    {
      title: 'Privacy Policy',
      path: '/policies/privacy',
      icon: ShieldCheck,
      desc: 'Your data security & SSL protection'
    },
    {
      title: 'Terms of Service',
      path: '/policies/terms',
      icon: FileText,
      desc: 'Product warranties & authenticity'
    },
  ]

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Luxury Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7A584A] mb-6">
          <Link to="/" className="hover:text-[#0A1C42] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-[#7A584A]">Customer Policies</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="font-semibold text-[#0A1C42]">{title}</span>
        </nav>

        {/* Hero Header Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#06142E] via-[#0A1C42] to-[#0A1F4D] text-white p-8 sm:p-12 mb-10 overflow-hidden shadow-festive border border-[#D49B24]/30">
          <div className="rainbow-line absolute top-0 left-0 right-0 h-1.5" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D49B24]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#D49B24] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#D49B24]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>glaMISTERa Customer Trust</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-[#EADFCB] font-light leading-relaxed">
              {subtitle}
            </p>

            <div className="flex items-center gap-2 mt-4 text-xs text-[#EADFCB]/80">
              <Clock className="w-3.5 h-3.5 text-[#D49B24]" />
              <span>Last updated: {lastUpdated} • Compliant with Indian Consumer Protection Rules</span>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Policy Navigation (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-[#EADBCE] shadow-sm">
              <h3 className="font-serif text-base font-bold text-[#06142E] mb-3 px-2">
                All Policies & Guarantees
              </h3>
              <div className="space-y-1.5">
                {policyNav.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.path

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#0A1C42] text-white shadow-md'
                          : 'hover:bg-[#FAF7F0] text-[#06142E]'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 shrink-0 mt-0.5 ${
                          isActive ? 'text-[#D49B24]' : 'text-[#7A584A]'
                        }`}
                      />
                      <div>
                        <div className={`text-xs font-bold ${isActive ? 'text-white' : 'text-[#06142E]'}`}>
                          {item.title}
                        </div>
                        <div className={`text-[11px] mt-0.5 ${isActive ? 'text-[#EADFCB]' : 'text-[#7A584A]'}`}>
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Need Direct Assistance Card */}
            <div className="bg-[#FAF6EE] rounded-2xl p-6 border border-[#D49B24]/40 text-[#06142E] space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A1C42]">
                <ShieldCheck className="w-4 h-4 text-[#D49B24]" />
                <span>Concierge Assistance</span>
              </div>
              <p className="text-xs text-[#7A584A] leading-relaxed">
                Have questions regarding custom sizing, wedding orders, or courier dispatches? Our jewellery care team is available 7 days a week.
              </p>

              <div className="space-y-2 pt-2 text-xs font-semibold">
                <a
                  href="https://wa.me/918826433922?text=Namaste!%20I%20have%20a%20question%20regarding%20glaMISTERa%20policies."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCE] text-[#0A1C42] hover:border-[#D49B24] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp: +91 88264 33922</span>
                </a>

                <a
                  href="mailto:concierge@glamistera.com"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADBCE] text-[#0A1C42] hover:border-[#D49B24] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D49B24]" />
                  <span>concierge@glamistera.com</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Right Main Content Card (8 cols) */}
          <main className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-[#EADBCE] shadow-sm text-[#06142E] space-y-8">
            {children}
          </main>

        </div>

      </div>
    </div>
  )
}
