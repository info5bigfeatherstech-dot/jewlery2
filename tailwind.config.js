/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          gold: "#D49B24",
          marigold: "#E89E28",
        },
        navy: {
          50: "#F0F4FA",
          100: "#DDE7F5",
          200: "#BFD3ED",
          300: "#94B6DF",
          400: "#6293CC",
          500: "#3B72B5",
          600: "#275596",
          700: "#1E4176",
          800: "#102B66",
          900: "#0A1C42",
          950: "#040D1E",
        },
        gold: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#D49B24",
          600: "#B47E18",
          700: "#8F5E0F",
          800: "#704810",
          900: "#54370D",
        },
        ivory: {
          50: "#FFFFFF",
          100: "#FDFBF7",
          200: "#FAF6EE",
          300: "#F4EDE0",
          400: "#EADFCB",
          500: "#DACBB1",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "'Cormorant Garamond'", "serif"],
        display: ["'Playfair Display'", "serif"],
        cormorant: ["'Cormorant Garamond'", "serif"],
        sans: ["'Poppins'", "'Inter'", "sans-serif"],
        devanagari: ["'Rozha One'", "'Poppins'", "sans-serif"],
      },
      backgroundImage: {
        'rainbow-gradient': "linear-gradient(90deg, #FF6B4A, #EC4899, #8B5CF6, #06B6D4, #10B981, #F59E0B)",
        'rainbow-soft': "linear-gradient(135deg, rgba(255,107,74,0.15), rgba(236,72,153,0.15), rgba(139,92,246,0.15), rgba(6,182,212,0.15))",
        'gold-shimmer': "linear-gradient(120deg, rgba(212,155,36,0.2) 0%, rgba(254,243,199,0.8) 50%, rgba(212,155,36,0.2) 100%)",
        'navy-gradient': "linear-gradient(135deg, #0A1C42 0%, #051025 100%)",
        'festive-mesh': "radial-gradient(at 0% 0%, rgba(212, 155, 36, 0.08) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(10, 28, 66, 0.08) 0px, transparent 50%)",
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        }
      },
      animation: {
        shimmer: 'shimmer 3s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        'marquee-slow': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        wiggle: 'wiggle 0.5s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      boxShadow: {
        'festive': '0 10px 30px -5px rgba(91, 14, 30, 0.12), 0 4px 6px -2px rgba(212, 155, 36, 0.08)',
        'festive-hover': '0 20px 40px -10px rgba(91, 14, 30, 0.2), 0 8px 16px -4px rgba(212, 155, 36, 0.15)',
        'gold-glow': '0 0 25px rgba(212, 155, 36, 0.35)',
        'rainbow-glow': '0 0 20px rgba(236, 72, 153, 0.25), 0 0 35px rgba(139, 92, 246, 0.15)',
      }
    },
  },
  plugins: [],
}
