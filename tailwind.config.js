/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  safelist: [
  '::-webkit-scrollbar',
  '::-webkit-scrollbar-track',
  '::-webkit-scrollbar-thumb'
],
  theme: {

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
        },
         screens: {
        xs: '480px',
      },
      },

      fontFamily: {
        "patrick-hand": ['"Patrick Hand"', "sans-serif"],
        "patrick-hand-sc": ['"Patrick Hand SC"', "sans-serif"],
        "heavitas": ["Heavitas", "sans-serif"],
        "impact": ["Impact", "sans-serif"],
      },
      backgroundImage: {
        'grass-pattern': "url('/images/section-about/grass.png')",
        'about-section-castle': "url('/images/section-about/castle.about.png')",
        'about-section-castle-sm': "url('/images/section-about/castle.about.sm.png')",
        'mint-section-book': "url('/images/section-mint/mint-book.png')",
         'sm-mint-section-book': "url('/images/section-mint/mint-book-sm.png')",
        'mint-section-paper': "url('/images/section-mint/bg-paper.png')",
        'mint-section-book-tr': "url('/images/section-mint/book-border-tr.png')",
        'mint-section-book-bl': "url('/images/section-mint/book-border-bl.png')",
        "mint-section-book-lg": "url('/images/section-mint/book-border-lg.png')",
        "mint-section-book-lg-1": "url('/images/section-mint/book-border-lg-1.png')",
        "mint-section-time": "url('/images/section-mint/time.png')",
        'mint-section-nfts-book': "url('/images/section-mint/our-nfts-book.png')",
        'mint-section-egg-book': "url('/images/section-mint/our-eggs-book.png')",
        'hero-section-upper': "url('/images/section-hero/bg-upper.png')",
        'hero-section-lower': "url('/images/section-hero/field.png')",
        'hero-section-castle-red-1': "url('/images/section-hero/castle-red-top.png')",
        'hero-section-castle-red-2': "url('/images/section-hero/castle-red-1.png')",
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
        'hero-section-tombstone': "url('/images/section-hero/menu-tombstone.png')",
        'menu-btn': "url('/images/section-hero/menu-button.png')",
        'menu-btn-hovered': "url('/images/section-hero/menu-button-hovered.png')",
        'hero-connect': "url('/images/section-hero/connect.png')",
        'hero-section-logo': "url('/images/section-hero/logo-lg.png')",
        "top-bar-cow-face": "url('/images/cow-face.png')",
        "top-bar-sheep-face": "url('/images/sheep-face.png')",
        "icon-arrow-left": 'url("/images/arrow-left.svg")',
        "icon-arrow-right": 'url("/images/arrow-right.svg")',
        "ok-btn": 'url("/images/ok-btn.png")',
        "about-ok-btn": 'url("/images/sm-about-ok-btn.png")',
        "sell-nft-btn": 'url("/images/sell-nft-btn.png")',
        "summon-egg-btn": "url('/images/egg-summon-btn.png')",
        "summon-disabled-btn": "url('/images/egg-summon-btn-1.png')",
        "mint-btn": "url('/images/mint-btn.png')",
        "mint-btn-sm": "url('/images/mint-now-sm-btn.png')",
        "mint-btn-sm-hovered": "url('/images/mint-now-sm-hovered-btn.png')",
        "slider-btn": "url('/images/slider-btn.png')",
        "summon-disabled-peppos-btn": "url('/images/egg-summon-btn-1-2.png')",
        "banner-claim-nft": "url('/images/banner.png')",
        "bm-sm-header":"url('/images/bookmarks/sm-min-corner.png')", 
        "bm-sm": "url('/images/bookmarks/bm-sm.png')",
        "bm-sm-1": "url('/images/bookmarks/bm-sm-1.png')",
        "bm-help": "url('/images/bookmarks/help-bg.png')",
        "bm-mint-icon": "url('/images/bookmarks/mint-icon.png')",
        "bm-nft-icon": "url('/images/bookmarks/nft-icon.png')",
        "bm-egg-icon": "url('/images/bookmarks/egg-icon.png')",
        "bm-mint": "url('/images/bookmarks/bookmark-mint.png')",
        "bm-mint-1": "url('/images/bookmarks/bookmark-mint-1.png')",
        "bm-nft": "url('/images/bookmarks/bookmark-nft.png')",
        "bm-nft-1": "url('/images/bookmarks/bookmark-nft-1.png')",
        "bm-egg": "url('/images/bookmarks/bookmark-egg.png')",
        "bm-egg-1": "url('/images/bookmarks/bookmark-egg-1.png')",
        "counter-plus": "url('/images/plus.svg')",
        "counter-minus": "url('/images/minus.svg')",
        "egg": "url('/images/egg.png')",
        "egg-1": "url('/images/egg-1.png')",
        "egg-glow": "url('/images/egg-glow.png')",
        "egg-glow-1": "url('/images/egg-glow-1.png')",
      }
    },
  plugins: [],
}

