/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {


      extend: {
        zIndex: {
          '60': '60',
          '70': '70',
          '80': '80',
          '90': '90',
          '100': '100',
          '110': '110',
          '120': '120',
          '130': '130',
          '140': '140',
          '150': '150',
        }
      },

      fontFamily: {
        "patrick-hand": ['"Patrick Hand"', "sans-serif"],
        "patrick-hand-sc": ['"Patrick Hand SC"', "sans-serif"],
        "impact": ["Impact", "sans-serif"],
      },
      backgroundImage: {
        'grass-pattern': "url('/images/section-about/grass.png')",

        'about-section': "url('/images/section-about/background-section-about.png')",
        'about-section-text-block': "url('/images/section-about/text-block-bg.png')",
        'about-section-text-block-sm': "url('/images/section-about/sm-text-block-bg.png')",
        'about-section-floor': "url('/images/section-about/floor.png')",
        'about-section-gold-l1': "url('/images/section-about/gold-stacks.png')",
        'about-section-gold-l2': "url('/images/section-about/gold-stacks-layer-2.png')",
        'about-section-gold-l2-mobile': "url('/images/section-about/gold-stacks-layer-2-mobile.png')",
        'about-section-statue-left': "url('/images/section-about/statue-left.png')",
        'about-section-statue-right': "url('/images/section-about/statue-right.png')",


        'mint-section': "url('/images/section-mint/background-mint-about.png')",
        'mint-section-stripe-pattern': "url('/images/section-mint/stripe-bar.png')",
        'mint-section-book': "url('/images/section-mint/mint-book.png')",
        'mint-section-btn': "url('/images/section-mint/button-bg.svg')",
        "summon-egg-btn": "url('/images/section-mint/summon-egg-bg.png')",
        "crack-disabled-btn": "url('/images/section-mint/crack-disabled.png')",


        'mint-section-coins-2': "url('/images/section-mint/bg-coins-2.png')",
        'mint-section-ipods': "url('/images/section-mint/bg-ipods.png')",
        'mint-section-cannabis': "url('/images/section-mint/bg-cannabis.png')",
        'mint-section-coins-1': "url('/images/section-mint/bg-coins-1.png')",
        'mint-section-paper': "url('/images/section-mint/bg-paper.png')",
        'mint-section-donat': "url('/images/section-mint/bg-donat.png')",
        'mint-section-keys': "url('/images/section-mint/bg-keys.png')",
        'mint-section-feather': "url('/images/section-mint/bg-feather.png')",
        'mint-section-potato': "url('/images/section-mint/bg-potato.png')",
        'mint-section-coins-3': "url('/images/section-mint/bg-coins-3.png')",
        'mint-section-letter': "url('/images/section-mint/bg-letter.png')",
        'mint-section-coins-2-2': "url('/images/section-mint/bg-coins-2.2.png')",

        'mint-section-heading': "url('/images/section-mint/min-heading-bg.png')",
        'mint-controls': "url('/images/section-mint/mint-controls-bg.png')",


        'social-section': "url('/images/section-social/bg-upper.png')",
        'social-section-wall': "url('/images/section-social/bg-lower.png')",
        'social-section-fighter-1': "url('/images/section-social/fighter1.png')",
        'social-section-fighter-2': "url('/images/section-social/fighter2.png')",
        'social-section-fighter-3': "url('/images/section-social/fighter3.png')",
        'social-section-fighter-4': "url('/images/section-social/fighter4.png')",
        'social-section-fighter-5': "url('/images/section-social/fighter5.png')",
        'social-section-fighter-6': "url('/images/section-social/fighter6.png')",

        'social-section-button-secondary': "url('/images/button-secondary.svg')",
        'social-section-button-x': "url('/images/button-x.svg')",
        'social-section-button-telegram': "url('/images/button-telegram.svg')",
        'social-section-button-instagram': "url('/images/button-instagram.svg')",

        'hero-section-upper': "url('/images/section-hero/bg-upper.png')",
        'hero-section-lower': "url('/images/section-hero/field.png')",

        'hero-section-castle-red-1': "url('/images/section-hero/castle-red-top.png')",
        'hero-section-castle-red-2': "url('/images/section-hero/castle-red.png')",
        'hero-section-castle-blue-1': "url('/images/section-hero/castle-blue-top.png')",
        'hero-section-castle-blue-2': "url('/images/section-hero/castle-blue.png')",

        'hero-section-red-1': "url('/images/section-hero/red1.png')",
        'hero-section-red-2': "url('/images/section-hero/red2.png')",
        'hero-section-shark-1': "url('/images/section-hero/shark1.png')",
        'hero-section-shark-2': "url('/images/section-hero/shark2.png')",


        'hero-section-chillguy': "url('/images/section-hero/chillguy.png')",
        'hero-section-frog': "url('/images/section-hero/frog.png')",
        'hero-section-distant': "url('/images/section-hero/distant-bg.png')",
        'hero-section-main': "url('/images/section-hero/battle-main.png')",

        'hero-section-memcoin-1': "url('/images/section-hero/memcoin1.png')",
        'hero-section-memcoin-2': "url('/images/section-hero/memcoin2.png')",
        'hero-section-memcoin-2-open': "url('/images/section-hero/memcoin2.open.png')",
        'hero-section-memcoin-3': "url('/images/section-hero/memcoin3.png')",
        'hero-section-memcoin-4': "url('/images/section-hero/memcoin4.png')",
        'hero-section-memcoin-6': "url('/images/section-hero/memcoin6.png')",
        'hero-section-memcoin-5': "url('/images/section-hero/memcoin5.png')",
        'hero-section-memcoin-7': "url('/images/section-hero/memcoin7.png')",
        'hero-section-memcoin-8': "url('/images/section-hero/memcoin8.png')",

        'hero-section-logo': "url('/images/section-hero/logo-lg.png')",

        "top-bar-cow-face": "url('/images/cow-face.png')",
        "top-bar-sheep-face": "url('/images/section-about/johny-face.png')"




      }
    },
  },
  plugins: [],
}

