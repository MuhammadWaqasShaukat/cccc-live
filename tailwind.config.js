/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  safelist: [
    "::-webkit-scrollbar",
    "::-webkit-scrollbar-track",
    "::-webkit-scrollbar-thumb",
  ],
  theme: {
    extend: {
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
        110: "110",
        120: "120",
        130: "130",
        140: "140",
        150: "150",
      },
      screens: {
        xs: "480px",
      },
    },

    fontFamily: {
      "patrick-hand": ['"Patrick Hand"', "sans-serif"],
      "patrick-hand-sc": ['"Patrick Hand SC"', "sans-serif"],
      heavitas: ["Heavitas", "sans-serif"],
      impact: ["Impact", "sans-serif"],
    },
    backgroundImage: {
      "grass-pattern": "url('/images/section-about/grass.webp')",
      "about-section-castle": "url('/images/section-about/castle.about.webp')",
      "about-section-castle-sm":
        "url('/images/section-about/castle.about.sm.webp')",
      "mint-section-book": "url('/images/section-mint/mint-book.webp')",
      "sm-mint-section-book": "url('/images/section-mint/mint-book-sm.webp')",
      "mint-section-paper": "url('/images/section-mint/bg-paper.webp')",
      "mint-section-book-tr": "url('/images/section-mint/book-border-tr.webp')",
      "mint-section-book-bl": "url('/images/section-mint/book-border-bl.webp')",
      "mint-section-book-lg": "url('/images/section-mint/book-border-lg.webp')",
      "mint-section-book-lg-1":
        "url('/images/section-mint/book-border-lg-1.webp')",
      "mint-section-time": "url('/images/section-mint/time.webp')",
      "mint-section-nfts-book":
        "url('/images/section-mint/our-nfts-book.webp')",
      "mint-section-egg-book": "url('/images/section-mint/our-eggs-book.webp')",
      "hero-section-upper": "url('/images/section-hero/bg-upper.webp')",
      "hero-section-lower": "url('/images/section-hero/field.webp')",
      "hero-section-castle-red-1":
        "url('/images/section-hero/castle-red-top.webp')",
      "hero-section-castle-red-2":
        "url('/images/section-hero/castle-red.webp')",
      "hero-section-castle-blue-1":
        "url('/images/section-hero/castle-blue-top.webp')",
      "hero-section-castle-blue-2":
        "url('/images/section-hero/castle-blue.webp')",
      "hero-section-red-1": "url('/images/section-hero/red1.webp')",
      "hero-section-red-2": "url('/images/section-hero/red2.webp')",
      "hero-section-shark-1": "url('/images/section-hero/shark1.webp')",
      "hero-section-shark-2": "url('/images/section-hero/shark2.webp')",
      "hero-section-distant": "url('/images/section-hero/distant-bg.webp')",

      "hero-section-tombstone":
        "url('/images/section-hero/menu-tombstone.webp')",

      "menu-btn": "url('/images/section-hero/menu-button.webp')",

      "menu-btn-hovered":
        "url('/images/section-hero/menu-button-hovered.webp')",
      "menu-btn-disabled":
        "url('/images/section-hero/menu-button-disabled.webp')",
      "hero-connect": "url('/images/section-hero/connect.webp')",
      "top-bar-cow-face": "url('/images/cow-face.webp')",
      "top-bar-sheep-face": "url('/images/sheep-face.webp')",
      "icon-arrow-left": 'url("/images/arrow-left.webp")',
      "icon-arrow-right": 'url("/images/arrow-right.webp")',
      "ok-btn": 'url("/images/ok-btn.webp")',
      "about-ok-btn": 'url("/images/sm-about-ok-btn.webp")',
      "sell-nft-btn": 'url("/images/sell-nft-btn.webp")',
      "summon-egg-btn": "url('/images/egg-summon-btn.webp')",
      "summon-disabled-btn": "url('/images/egg-summon-btn-1.webp')",
      "mint-btn": "url('/images/mint-btn.webp')",
      "mint-btn-sm": "url('/images/mint-now-sm-btn.webp')",
      "mint-btn-sm-hovered": "url('/images/mint-now-sm-hovered-btn.webp')",
      "slider-btn": "url('/images/slider-btn.webp')",
      "summon-disabled-peppos-btn": "url('/images/egg-summon-btn-1-2.webp')",
      "banner-claim-nft": "url('/images/banner.webp')",

      "bm-sm-header": "url('/images/bookmarks/sm-min-corner.webp')",
      "bm-sm-mint": "url('/images/bookmarks/bm-sm-mint.webp')",
      "bm-sm-nfts": "url('/images/bookmarks/bm-sm-nfts.webp')",
      "bm-sm-eggs": "url('/images/bookmarks/bm-sm-eggs.webp')",
      "bm-sm-1": "url('/images/bookmarks/bm-sm-1.webp')",
      "bm-help": "url('/images/bookmarks/help-bg.webp')",
      "bm-mint-icon": "url('/images/bookmarks/mint-icon.webp')",
      "bm-nft-icon": "url('/images/bookmarks/nft-icon.webp')",
      "bm-egg-icon": "url('/images/bookmarks/egg-icon.webp')",
      "bm-mint": "url('/images/bookmarks/bookmark-mint.webp')",
      "bm-mint-1": "url('/images/bookmarks/bookmark-mint-1.webp')",
      "bm-nft": "url('/images/bookmarks/bookmark-nft.webp')",
      "bm-nft-1": "url('/images/bookmarks/bookmark-nft-1.webp')",
      "bm-egg": "url('/images/bookmarks/bookmark-egg.webp')",
      "bm-egg-1": "url('/images/bookmarks/bookmark-egg-1.webp')",
      "counter-plus": "url('/images/plus.svg')",
      "counter-minus": "url('/images/minus.svg')",
      "egg-glow": "url('/images/egg-glow.webp')",
      "egg-glow-1": "url('/images/egg-glow-1.webp')",

      "how-it-works": "url('/images/how-it-works.webp')",
      "how-it-works-arm": "url('/images/arm.webp')",

      "mint-over-heading": "url('/images/section-mint/mint-over-bg.webp')",
      "mint-over": "url('/images/section-mint/book-mint-over.webp')",

      "how-it-works-leaf": "url('/images/section-mint/mint-old-page.webp')",

      "close-btn": "url('/images/btn-close.webp')",
      "back-btn": "url('/images/section-mint/back-btn.webp')",

      "old-book": "url('/images/section-mint/old-book.webp')",

      "help-icon": "url('/images/section-mint/help-icon.webp')",

      "no-eggs": "url('/images/section-mint/empty-eggs.webp')",
      "no-nfts": "url('/images/section-mint/empty-nfts.webp')",

      "tutorial-step-1": "url('/images/how-it-works/card-1.webp')",
      "tutorial-step-2": "url('/images/how-it-works/card-2.webp')",
      "tutorial-step-3": "url('/images/how-it-works/card-3.webp')",
      "tutorial-step-4": "url('/images/how-it-works/card-4.webp')",

      "tutorial-label-step-1": "url('/images/how-it-works/label-1.webp')",
      "tutorial-label-step-2": "url('/images/how-it-works/label-2.webp')",
      "tutorial-label-step-3": "url('/images/how-it-works/label-3.webp')",
      "tutorial-label-step-4": "url('/images/how-it-works/label-4.webp')",

      "super-offer-lg": "url('/images/section-mint/super-offer-bg.webp')",
      "super-offer-sm": "url('/images/section-mint/super-offer-bg-sm.webp')",
      "super-offer": "url('/images/section-mint/super-offer.webp')",
      "super-offer-title":
        "url('/images/section-mint/supper-offer-title.webp')",
      "supper-offer-mint-btn":
        "url('/images/section-mint/supper-offer-mint-btn.webp')",
    },
  },
  plugins: [],
};
