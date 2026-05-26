export const products = [
  {
    id: "JW-NEC-0001", // Unique SKU/style number
    slug: "golden-elegance-necklace", // For routing
    name: "Golden Elegance Necklace",
    category: "Necklace", // Necklace, Ring, Earring, Bracelet, Set, etc.
    collection: "New Arrivals", // Home sections: New Arrivals, Occasions, Bridal, Festive, etc.
    occasion: "Bridal", // Occasion tag used on cards/filters
    gender: "Women", // Women, Men, Kids, Unisex

    metalType: "Gold", // Gold, Silver, Diamond, etc.
    metalPurity: "22K", // 18K, 22K, 24K...
    color: "Yellow Gold", // Used by Color filter
    grossWeight: 24.5, // In grams
    stones: [
      {
        type: "Diamond",
        shape: "Round",
        totalCarat: 1.25,
      },
    ],

    price: 245000, // Current price (in smallest currency unit or number)
    mrp: 265000, // Original price if you show discount
    currency: "INR",
    inStock: true,
    stockQty: 5,

    // Badges / labels used in listing cards
    tags: ["Best Seller", "New"],
    country: "India", // For flag you show on card

    images: {
      thumbnail: "/images/products/jw-nec-0001-thumb.jpg",
      gallery: [
        "/images/products/jw-nec-0001-1.jpg",
        "/images/products/jw-nec-0001-2.jpg",
        "/images/products/jw-nec-0001-3.jpg",
      ],
      modelShots: ["/images/products/jw-nec-0001-model-1.jpg"],
    },

    // Short data used on listing card
    shortDescription:
      "Intricately crafted 22K gold necklace with handset round diamonds, perfect for bridal occasions.",

    // Detailed PDP sections (tabs)
    description: {
      overview:
        "The Golden Elegance Necklace blends traditional Indian craftsmanship with modern design, featuring handset diamonds and a rich 22K yellow gold finish.",
      features: [
        { label: "Metal", value: "22K Yellow Gold" },
        { label: "Gross Weight", value: "24.50 g" },
        { label: "Diamond Carat", value: "1.25 ct (approx.)" },
        { label: "Occasion", value: "Bridal / Wedding" },
        { label: "Brand", value: "G-Crown Jewellers" },
      ],
      additionalInfo: [
        {
          label: "Care",
          value: "Store in a dry box, keep away from perfumes and chemicals.",
        },
        {
          label: "Warranty",
          value: "1-year warranty on manufacturing defects.",
        },
        {
          label: "Certification",
          value: "Authenticated diamond and purity certificate included.",
        },
      ],
    },

    // For PDP selectors (if applicable)
    variants: [
      {
        id: "JW-NEC-0001-16",
        size: "16 Inch",
        price: 245000,
        stockQty: 3,
      },
      {
        id: "JW-NEC-0001-18",
        size: "18 Inch",
        price: 252000,
        stockQty: 2,
      },
    ],

    // UX helpers
    rating: 4.8,
    ratingCount: 23,
    isFeatured: true, // Used on home “Featured Masterpieces”
    isNewArrival: true,
    isBestSeller: false,
    createdAt: "2025-11-15T00:00:00.000Z",
  },

  {
    id: "JW-RNG-0002",
    slug: "royal-solitaire-ring",
    name: "Royal Solitaire Ring",
    category: "Ring",
    collection: "Bridal",
    occasion: "Engagement",
    gender: "Women",

    metalType: "Gold",
    metalPurity: "18K",
    color: "Rose Gold",
    grossWeight: 6.2,
    stones: [
      {
        type: "Diamond",
        shape: "Princess",
        totalCarat: 0.75,
      },
    ],

    price: 98000,
    mrp: 110000,
    currency: "INR",
    inStock: true,
    stockQty: 8,

    tags: ["New"],
    country: "India",

    images: {
      thumbnail: "/images/products/jw-rng-0002-thumb.jpg",
      gallery: [
        "/images/products/jw-rng-0002-1.jpg",
        "/images/products/jw-rng-0002-2.jpg",
      ],
      modelShots: ["/images/products/jw-rng-0002-model-1.jpg"],
    },

    shortDescription:
      "Elegant 18K rose gold solitaire ring with a princess-cut diamond, perfect for engagements.",

    description: {
      overview:
        "The Royal Solitaire Ring is designed to make a timeless statement with its clean lines and sparkling princess-cut diamond.",
      features: [
        { label: "Metal", value: "18K Rose Gold" },
        { label: "Gross Weight", value: "6.20 g" },
        { label: "Diamond Carat", value: "0.75 ct (approx.)" },
        { label: "Occasion", value: "Engagement" },
        { label: "Brand", value: "G-Crown Jewellers" },
      ],
      additionalInfo: [
        { label: "Care", value: "Avoid impact and store separately." },
        { label: "Warranty", value: "1-year manufacturing warranty." },
        { label: "Certification", value: "Diamond and gold purity certified." },
      ],
    },

    variants: [
      { id: "JW-RNG-0002-12", size: "12", price: 98000, stockQty: 4 },
      { id: "JW-RNG-0002-14", size: "14", price: 98000, stockQty: 4 },
    ],

    rating: 4.6,
    ratingCount: 18,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    createdAt: "2025-11-20T00:00:00.000Z",
  },

  {
    id: "JW-EAR-0003",
    slug: "emerald-drop-earrings",
    name: "Emerald Drop Earrings",
    category: "Earring",
    collection: "Festive",
    occasion: "Festive",
    gender: "Women",

    metalType: "Gold",
    metalPurity: "22K",
    color: "Yellow Gold",
    grossWeight: 10.8,
    stones: [
      {
        type: "Emerald",
        shape: "Oval",
        totalCarat: 2.4,
      },
    ],

    price: 135000,
    mrp: 148000,
    currency: "INR",
    inStock: true,
    stockQty: 6,

    tags: ["Festive Pick"],
    country: "India",

    images: {
      thumbnail: "/images/products/jw-ear-0003-thumb.jpg",
      gallery: [
        "/images/products/jw-ear-0003-1.jpg",
        "/images/products/jw-ear-0003-2.jpg",
      ],
      modelShots: [],
    },

    shortDescription:
      "Traditional emerald drop earrings crafted in rich 22K yellow gold for festive elegance.",

    description: {
      overview:
        "These emerald drop earrings highlight timeless Indian craftsmanship, ideal for festive and cultural occasions.",
      features: [
        { label: "Metal", value: "22K Yellow Gold" },
        { label: "Gross Weight", value: "10.80 g" },
        { label: "Emerald Carat", value: "2.40 ct (approx.)" },
        { label: "Occasion", value: "Festive Wear" },
        { label: "Brand", value: "G-Crown Jewellers" },
      ],
      additionalInfo: [
        { label: "Care", value: "Wipe gently after use." },
        { label: "Warranty", value: "1-year warranty." },
      ],
    },

    variants: [],

    rating: 4.7,
    ratingCount: 12,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    createdAt: "2025-10-10T00:00:00.000Z",
  },

  {
    id: "JW-BRC-0004",
    slug: "classic-gold-bangle",
    name: "Classic Gold Bangle",
    category: "Bracelet",
    collection: "Everyday Luxe",
    occasion: "Daily Wear",
    gender: "Women",

    metalType: "Gold",
    metalPurity: "22K",
    color: "Yellow Gold",
    grossWeight: 18.3,
    stones: [],

    price: 185000,
    mrp: 198000,
    currency: "INR",
    inStock: true,
    stockQty: 10,

    tags: ["Best Seller"],
    country: "India",

    images: {
      thumbnail: "/images/products/jw-brc-0004-thumb.jpg",
      gallery: ["/images/products/jw-brc-0004-1.jpg"],
      modelShots: [],
    },

    shortDescription:
      "Minimal 22K gold bangle designed for daily elegance and comfort.",

    description: {
      overview:
        "A timeless gold bangle that pairs effortlessly with both ethnic and modern outfits.",
      features: [
        { label: "Metal", value: "22K Yellow Gold" },
        { label: "Gross Weight", value: "18.30 g" },
        { label: "Occasion", value: "Daily Wear" },
      ],
      additionalInfo: [
        { label: "Care", value: "Keep away from harsh chemicals." },
      ],
    },

    variants: [
      { id: "JW-BRC-0004-2.4", size: "2.4", price: 185000, stockQty: 5 },
      { id: "JW-BRC-0004-2.6", size: "2.6", price: 188000, stockQty: 5 },
    ],

    rating: 4.5,
    ratingCount: 31,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    createdAt: "2025-09-05T00:00:00.000Z",
  },

  {
    id: "JW-SET-0005",
    slug: "kundan-heritage-jewellery-set",
    name: "Kundan Heritage Jewellery Set",
    category: "Set",
    collection: "Occasions",
    occasion: "Wedding",
    gender: "Women",

    metalType: "Gold",
    metalPurity: "22K",
    color: "Yellow Gold",
    grossWeight: 42.7,
    stones: [{ type: "Kundan", shape: "Mixed", totalCarat: 8.5 }],

    price: 420000,
    mrp: 460000,
    currency: "INR",
    inStock: true,
    stockQty: 2,

    tags: ["Bridal Special"],
    country: "India",

    images: {
      thumbnail: "/images/products/jw-set-0005-thumb.jpg",
      gallery: [
        "/images/products/jw-set-0005-1.jpg",
        "/images/products/jw-set-0005-2.jpg",
      ],
      modelShots: [],
    },

    shortDescription:
      "Traditional Kundan jewellery set crafted for grand wedding celebrations.",

    description: {
      overview:
        "A luxurious Kundan set inspired by royal Indian heritage, perfect for bridal ensembles.",
      features: [
        { label: "Metal", value: "22K Gold" },
        { label: "Gross Weight", value: "42.70 g" },
        { label: "Occasion", value: "Wedding / Bridal" },
      ],
      additionalInfo: [
        { label: "Certification", value: "Gold purity certificate included." },
      ],
    },

    variants: [],

    rating: 4.9,
    ratingCount: 9,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    createdAt: "2025-08-18T00:00:00.000Z",
  },

  {
    id: "JW-NEC-0006",
    slug: "diamond-tennis-necklace",
    name: "Diamond Tennis Necklace",
    category: "Necklace",
    collection: "Luxury",
    occasion: "Party",
    gender: "Women",

    metalType: "White Gold",
    metalPurity: "18K",
    color: "White Gold",
    grossWeight: 14.9,
    stones: [{ type: "Diamond", shape: "Round", totalCarat: 3.2 }],

    price: 360000,
    mrp: 395000,
    currency: "INR",
    inStock: true,
    stockQty: 3,

    tags: ["Luxury"],
    country: "India",

    images: {
      thumbnail: "/images/products/jw-nec-0006-thumb.jpg",
      gallery: ["/images/products/jw-nec-0006-1.jpg"],
      modelShots: [],
    },

    shortDescription:
      "Sleek diamond tennis necklace in 18K white gold for modern luxury.",

    description: {
      overview:
        "This diamond tennis necklace offers a refined look, ideal for evening parties and premium occasions.",
      features: [
        { label: "Metal", value: "18K White Gold" },
        { label: "Diamond Carat", value: "3.20 ct (approx.)" },
      ],
      additionalInfo: [],
    },

    variants: [],

    rating: 4.8,
    ratingCount: 14,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    createdAt: "2025-12-01T00:00:00.000Z",
  },
];
