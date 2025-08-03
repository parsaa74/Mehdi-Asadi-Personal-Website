/**
 * Mehdi Asadi — Visual Artist Portfolio
 * Tailwind Configuration for Contemporary Persian Design Language
 * Inspired by Tehran's urban typography and experimental calligraphy
 */
module.exports = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Override default Tailwind values with artist-specific choices
    fontFamily: {
      // Primary typeface - Moderat for authentic design
      'sans': ['Moderat', 'Inter', 'system-ui', 'sans-serif'],
      'moderat': ['Moderat', 'Inter', 'system-ui', 'sans-serif'],
      // Experimental typography for research context
      'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'monospace'],
    },
    fontWeight: {
       'normal': 400,
       'medium': 500,
       'bold': 700,
       'black': 900,
     },
    // Persian-inspired spacing scale based on traditional proportions
    spacing: {
      'px': '1px',
      '0': '0',
      '0.5': '0.125rem',   // 2px
      '1': '0.25rem',      // 4px
      '1.5': '0.375rem',   // 6px
      '2': '0.5rem',       // 8px
      '2.5': '0.625rem',   // 10px
      '3': '0.75rem',      // 12px
      '3.5': '0.875rem',   // 14px
      '4': '1rem',         // 16px
      '5': '1.25rem',      // 20px
      '6': '1.5rem',       // 24px
      '7': '1.75rem',      // 28px
      '8': '2rem',         // 32px
      '9': '2.25rem',      // 36px
      '10': '2.5rem',      // 40px
      '11': '2.75rem',     // 44px
      '12': '3rem',        // 48px
      // Persian golden ratio intervals
      '14': '3.5rem',      // 56px
      '16': '4rem',        // 64px
      '18': '4.5rem',      // 72px - Cultural significance
      '20': '5rem',        // 80px
      '24': '6rem',        // 96px
      '28': '7rem',        // 112px
      '32': '8rem',        // 128px
      '36': '9rem',        // 144px
      '40': '10rem',       // 160px
      '44': '11rem',       // 176px
      '48': '12rem',       // 192px
      '52': '13rem',       // 208px
      '56': '14rem',       // 224px
      '60': '15rem',       // 240px
      '64': '16rem',       // 256px
      '72': '18rem',       // 288px
      '80': '20rem',       // 320px
      '88': '22rem',       // 352px - Tehran urban scale
      '96': '24rem',       // 384px
      '128': '32rem',      // 512px - Spatial canvas scale
    },
    extend: {
      // Contemporary Persian Color Palette
      // Inspired by Tehran's urban landscape and traditional Persian art
      colors: {
        // Base semantic colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        // Cultural color system
        'tehran': {
          // Urban landscape inspired
          concrete: '#f5f5f5',
          dust: '#e8e6e3',
          shadow: '#2a2a2a',
          night: '#0f0f0f',
        },

        'persian': {
          // Traditional Persian art colors
          saffron: '#f4a261',    // زعفران
          turquoise: '#2a9d8f',  // فیروزه
          crimson: '#e76f51',    // قرمز
          indigo: '#264653',     // نیل
          gold: '#e9c46a',       // طلا
        },

        // Experimental design tokens
        'glitch': {
          red: '#ff0040',
          cyan: '#00ffff',
          yellow: '#ffff00',
          noise: 'rgba(255, 255, 255, 0.1)',
        },

        // Semantic system (preserved for functionality)
        muted: {
          DEFAULT: 'var(--muted)',
          light: 'var(--muted-light)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-light)',
        },
        border: {
          DEFAULT: 'var(--border)',
          light: 'var(--border-light)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          elevated: 'var(--surface-elevated)',
          overlay: 'var(--surface-overlay)',
        },
        artistic: {
          red: 'var(--artistic-red)',
          blue: 'var(--artistic-blue)',
          yellow: 'var(--artistic-yellow)',
          green: 'var(--artistic-green)',
        },
      },
      // Experimental Typography Scale
      // Based on Persian calligraphy proportions and contemporary design research
      fontSize: {
        // Display typography for spatial canvas
        'spatial': ['clamp(4rem, 12vw, 8rem)', {
          lineHeight: '0.8',
          letterSpacing: '-0.05em',
          fontWeight: '300',
        }],
        'display': ['clamp(3rem, 8vw, 6rem)', {
          lineHeight: '0.85',
          letterSpacing: '-0.04em',
          fontWeight: '400',
        }],

        // Cultural heading system
        'persian-xl': ['clamp(2.5rem, 6vw, 4rem)', {
          lineHeight: '1.0',
          letterSpacing: '-0.03em',
          wordSpacing: '0.1em', // Persian text rhythm
        }],
        'persian-lg': ['clamp(2rem, 4vw, 3rem)', {
          lineHeight: '1.1',
          letterSpacing: '-0.025em',
          wordSpacing: '0.05em',
        }],
        'persian-md': ['clamp(1.5rem, 3vw, 2rem)', {
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
          wordSpacing: '0.03em',
        }],

        // Research typography
        'research': ['0.875rem', {
          lineHeight: '1.7',
          letterSpacing: '0.02em',
          wordSpacing: '0.03em',
        }],
        'mono-sm': ['0.75rem', {
          lineHeight: '1.5',
          letterSpacing: '0.05em',
          fontFamily: 'SF Mono, Monaco, monospace',
        }],

        // Legacy support
        'heading-xl': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'heading-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'heading-md': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'heading-sm': ['clamp(1.25rem, 2.5vw, 1.5rem)', { lineHeight: '1.4', letterSpacing: '-0.015em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
      },
      // Experimental Animation System
      // Inspired by Persian calligraphy flow and digital glitch aesthetics
      animation: {
        // Cultural animations
        'persian-fade': 'persianFade 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'calligraphy-draw': 'calligraphyDraw 2s ease-out',
        'spatial-float': 'spatialFloat 6s ease-in-out infinite',

        // Glitch effects for experimental work
        'glitch-text': 'glitchText 0.3s ease-in-out',
        'glitch-image': 'glitchImage 0.6s ease-in-out infinite',
        'rgb-shift': 'rgbShift 0.2s ease-in-out',

        // Tehran urban rhythm
        'urban-pulse': 'urbanPulse 4s ease-in-out infinite',
        'dust-settle': 'dustSettle 3s ease-out',

        // Legacy support
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },

      keyframes: {
        // Persian-inspired animations
        persianFade: {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
          '60%': { opacity: '0.8', transform: 'translateY(-5px) scale(1.02)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        calligraphyDraw: {
          '0%': { strokeDasharray: '0 100', opacity: '0' },
          '50%': { strokeDasharray: '50 100', opacity: '0.8' },
          '100%': { strokeDasharray: '100 100', opacity: '1' },
        },
        spatialFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(5px) rotate(-0.5deg)' },
        },

        // Experimental glitch effects
        glitchText: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
        },
        glitchImage: {
          '0%, 100%': { filter: 'hue-rotate(0deg) saturate(1)' },
          '25%': { filter: 'hue-rotate(90deg) saturate(1.2)' },
          '50%': { filter: 'hue-rotate(180deg) saturate(0.8)' },
          '75%': { filter: 'hue-rotate(270deg) saturate(1.1)' },
        },
        rgbShift: {
          '0%, 100%': { textShadow: '0 0 0 transparent' },
          '50%': { textShadow: '2px 0 0 #ff0040, -2px 0 0 #00ffff' },
        },

        // Urban Tehran atmosphere
        urbanPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        dustSettle: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '50%': { opacity: '0.3', transform: 'translateY(0px)' },
          '100%': { opacity: '0.1', transform: 'translateY(10px)' },
        },

        // Legacy keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      // Artistic design tokens
      backdropBlur: {
        'cultural': '12px',
        'glitch': '2px',
      },

      // Persian geometric proportions
      aspectRatio: {
        'persian': '1.618 / 1',    // Golden ratio
        'calligraphy': '3 / 2',    // Traditional Persian manuscript
        'spatial': '16 / 10',      // Spatial canvas ratio
      },

      // Experimental filters for glitch effects
      blur: {
        'glitch': '1px',
        'cultural': '8px',
      },
    },
  },
  plugins: [],
}