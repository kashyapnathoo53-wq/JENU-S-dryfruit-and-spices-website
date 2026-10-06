// JENU'S - Kashmir Valley Gourmet Dry Fruits & Saffron Dataset
// Certified under FSSAI Central License: 10026061000412

export const CATEGORIES = [
  { id: 'all', name: 'All Products', image: '/images/cat-all-crest.svg' },
  { id: 'combos', name: 'Value Combos', image: '/images/combos-pack.jpg' },
  { id: 'powdered-spices', name: 'Powdered Spices', image: '/images/mirch-powder-macro.jpg' },
  { id: 'raw-spices', name: 'Raw Whole Spices', image: '/images/choti-elaichi-macro.jpg' },
  { id: 'spices', name: 'All Spices', image: '/images/real-mirch-macro.jpg' },
  { id: 'cashews', name: 'King Cashews', image: '/images/cashews-jumbo-macro.jpg' },
  { id: 'pistachios', name: 'Mountain Pistachios', image: '/images/pista-inshell-macro.jpg' },
  { id: 'raisins', name: 'Kishmish & Raisins', image: '/images/raisins-green-macro.jpg' },
  { id: 'dates', name: 'Dates & Chhuara', image: '/images/dates-medjool-macro.jpg' },
  { id: 'almonds', name: 'Mamra Almonds', image: '/images/real-mamra-macro.jpg' },
  { id: 'walnuts', name: 'Snow Walnuts', image: '/images/real-walnuts-macro.jpg' },
  { id: 'saffron', name: 'Pampore Saffron', image: '/images/real-saffron-macro.jpg' },
  { id: 'dried-fruits', name: 'Figs & Apricots', image: '/images/real-apricots-macro.jpg' },
  { id: 'berries-seeds', name: 'Chilgoza & Exotic Nuts', image: '/images/real-berries-macro.jpg' },
  { id: 'kahwa-spices', name: 'Shahi Kahwa', image: '/images/kahwa-brewed-cup.jpg' },
  { id: 'hampers', name: 'Gourmet Hampers', image: '/images/royal-hamper.jpg' }
];

export const PRODUCTS = [
  {
    id: 'jnu-mamra-01',
    name: "JENU'S Royal Kashmiri Mamra Almonds",
    subname: "Grade A+ Oil-Rich Kashmiri Mamra Badam",
    category: 'almonds',
    productType: "Grade A+ Himalayan Mamra Almond (Prunus dulcis)",
    origin: 'Shopian & Pulwama, Kashmir',
    harvestYear: '2026 Fresh Valley Harvest',
    rating: 4.9,
    reviewsCount: 1420,
    badge: 'Bestseller',
    badgeType: 'bestseller',
    fssaiCertified: true,
    image: '/images/real-mamra-macro.jpg',
    images: [
      '/images/real-mamra-macro.jpg',
      '/images/real-almonds-raw-camera.jpg',
      '/images/mamra-almonds-macro.jpg',
      '/images/real-almonds-stages-camera.jpg',
      '/images/mamra-almonds-packaged.jpg'
    ],
    overview: {
      terroir: "Shopian Terraced Slopes (6,800 ft Altitude)",
      harvestMethod: "100% Handpicked, Mountain Air Sun-Cured",
      aromaFlavor: "Crisp crunch, rich sweet almond butter & natural oils",
      purityGrade: "50% Natural Almond Oil, Unbleached & Non-GMO",
      packagingStandard: "Nitrogen-flushed cold storage canister with aroma-lock",
      shelfLife: "12 Months in cool dry mountain storage"
    },
    description: "Handpicked from high-altitude orchards in Kashmir. Our Mamra Badam contains up to 50% natural almond oil content—nearly twice that of commercial California almonds. Crisp, nutrient-dense, and sweet.",
    benefits: [
      "FSSAI Certified: 100% food safety & heavy-metal tested",
      "50% natural almond oil content (rich in natural Vitamin E)",
      "Sun-dried in crisp sub-zero Himalayan mountain air",
      "Zero chemical polishing, unbleached and non-GMO"
    ],
    nutrition: {
      calories: "579 kcal",
      protein: "21.2g",
      healthyFats: "49.9g",
      carbs: "21.6g",
      fiber: "12.5g"
    },
    weights: [
      { weight: '250g', price: 890, originalPrice: 1150, discount: 22 },
      { weight: '500g', price: 1690, originalPrice: 2200, discount: 23, isDefault: true },
      { weight: '1kg', price: 3250, originalPrice: 4200, discount: 22 }
    ]
  },
  {
    id: 'jnu-saffron-02',
    name: "JENU'S Pure Pampore Mongra Saffron",
    subname: "Grade A1+ Certified Kashmiri Mongra Kesar",
    category: 'saffron',
    productType: "GI-Tagged Grade A1+ Pampore Mongra (Crocus sativus)",
    origin: 'Pampore Plateau, Kashmir',
    harvestYear: '2026 Purple Crocus Bloom',
    rating: 5.0,
    reviewsCount: 2180,
    badge: 'FSSAI Certified',
    badgeType: 'fssai',
    fssaiCertified: true,
    image: '/images/real-saffron-macro.jpg',
    images: [
      '/images/real-saffron-macro.jpg',
      '/images/real-saffron-raw-camera.jpg',
      '/images/saffron-infusion.jpg',
      '/images/real/real-saffron-threads.jpg',
      '/images/saffron-pampore-packaged.jpg'
    ],
    overview: {
      terroir: "Pampore Karewa Plateau (5,300 ft Altitude)",
      harvestMethod: "Dawn hand-plucked crimson stigmas only (Mongra grade)",
      aromaFlavor: "Warm honeyed hay, delicate floral & bittersweet saffron bouquet",
      purityGrade: "Crocin coloring strength 254+, Zero yellow style filaments",
      packagingStandard: "Pharmaceutical-grade airtight amber glass vial",
      shelfLife: "24 Months when kept away from moisture and direct sunlight"
    },
    description: "Directly harvested from purple crocus sativus fields in Pampore. Comprises only deep crimson stigmas (Mongra) free from yellow styles, providing extraordinary natural crocin coloring strength (254+) and floral notes.",
    benefits: [
      "FSSAI Certified & Lab Tested: Zero artificial color or adulteration",
      "Certified Grade A1+ with Crocin color strength exceeding 250",
      "Rich in active safranal & picrocrocin antioxidants",
      "Sealed in pharmaceutical-grade airtight glass jars"
    ],
    nutrition: {
      calories: "310 kcal",
      protein: "11.4g",
      healthyFats: "5.8g",
      carbs: "65.4g",
      fiber: "3.9g"
    },
    weights: [
      { weight: '1g', price: 420, originalPrice: 550, discount: 23, isDefault: true },
      { weight: '2g', price: 810, originalPrice: 1080, discount: 25 },
      { weight: '5g', price: 1950, originalPrice: 2650, discount: 26 }
    ]
  },
  {
    id: 'jnu-walnut-03',
    name: "JENU'S Kashmiri Kagzi Snow Walnuts",
    subname: "Extra-White Hand-Sorted Kernels (Akhrot Halves)",
    category: 'walnuts',
    productType: "Paper-Shell Kagzi Snow Walnut (Juglans regia)",
    origin: 'Kupwara & Pahalgam, Kashmir',
    harvestYear: '2026 Fresh Valley Harvest',
    rating: 4.9,
    reviewsCount: 980,
    badge: 'Extra White',
    badgeType: 'premium',
    fssaiCertified: true,
    image: '/images/real-walnuts-macro.jpg',
    images: [
      '/images/real-walnuts-macro.jpg',
      '/images/real-walnuts-raw-camera.jpg',
      '/images/walnuts-shell.jpg',
      '/images/real/real-walnuts-halves.jpg',
      '/images/walnuts-akhrot-packaged.jpg'
    ],
    overview: {
      terroir: "Kupwara & Pahalgam Alpine Valleys (7,200 ft Altitude)",
      harvestMethod: "Traditional wooden pole harvest & clean river washing",
      aromaFlavor: "Delicate buttery sweetness, velvety crunch, zero bitterness",
      purityGrade: "Hand-cracked unbroken whole halves, chlorine-free & unbleached",
      packagingStandard: "Nitrogen-purged vacuum sealed preservation canister",
      shelfLife: "9 Months in airtight cool dry storage"
    },
    description: "Distinctive paper-thin 'Kagzi' shells with creamy, snow-white kernels. Hand-cracked and carefully graded to retain whole unbroken halves. Naturally loaded with plant-based Omega-3 ALA.",
    benefits: [
      "FSSAI Certified: 100% natural, chlorine-free and unbleached",
      "High concentration of brain-healthy Omega-3 ALA fatty acids",
      "Gentle buttery flavor with zero bitterness",
      "Sun-cured on hygienic wooden racks in alpine air"
    ],
    nutrition: {
      calories: "654 kcal",
      protein: "15.2g",
      healthyFats: "65.2g",
      carbs: "13.7g",
      fiber: "6.7g"
    },
    weights: [
      { weight: '250g', price: 480, originalPrice: 650, discount: 26 },
      { weight: '500g', price: 890, originalPrice: 1250, discount: 28, isDefault: true },
      { weight: '1kg', price: 1690, originalPrice: 2400, discount: 29 }
    ]
  },
  {
    id: 'jnu-hamper-04',
    name: "JENU'S Royal Khatamband Wooden Gift Hamper",
    subname: "Handcrafted Seasoned Kashmir Walnut Wood Suite",
    category: 'hampers',
    productType: "Artisanal Seasoned Walnut Wood Khatamband Gift Suite",
    origin: 'Artisan Woodcraft Atelier, Srinagar',
    harvestYear: 'Festive Edition 2026',
    rating: 5.0,
    reviewsCount: 640,
    badge: 'Luxury Suite',
    badgeType: 'luxury',
    fssaiCertified: true,
    image: '/images/royal-hamper.jpg',
    images: [
      '/images/royal-hamper.jpg',
      '/images/real-mamra-macro.jpg',
      '/images/real-walnuts-macro.jpg',
      '/images/real-saffron-macro.jpg',
      '/images/real-apricots-macro.jpg'
    ],
    overview: {
      terroir: "Artisan Woodcraft Atelier, Downtown Srinagar",
      harvestMethod: "Hand-chiseled solid seasoned walnut timber with brass fittings",
      aromaFlavor: "Natural timber aroma housing 5 royal valley gourmet harvests",
      purityGrade: "Heirloom craftsmanship filled with 100% FSSAI certified dry fruits",
      packagingStandard: "Hand-carved wooden case with velvet partitions & satin ribbon",
      shelfLife: "12 Months (individual inner containers are vacuum sealed)"
    },
    description: "An heirloom-quality presentation box hand-carved in solid Kashmir walnut wood. Houses 4 velvet-lined compartments containing Mamra Almonds (250g), Snow Walnuts (250g), Dried Figs (250g), Golden Apricots (250g), and a central glass jar of Pampore Saffron (1g).",
    benefits: [
      "Solid hand-carved walnut wood box with brass latch",
      "All contents FSSAI Certified and batch tested",
      "Complimentary personalized greeting message",
      "Vacuum-sealed packaging preserving 12-month shelf life"
    ],
    nutrition: {
      calories: "Assorted",
      protein: "18.5g avg",
      healthyFats: "45.0g avg",
      carbs: "28.0g avg",
      fiber: "10.0g avg"
    },
    weights: [
      { weight: '1.2kg Grand Suite', price: 2999, originalPrice: 4200, discount: 28, isDefault: true },
      { weight: '2kg Royal Suite', price: 4899, originalPrice: 6800, discount: 28 }
    ]
  },
  {
    id: 'jnu-figs-05',
    name: "JENU'S Sun-Dried Kashmiri Figs & Apricots",
    subname: "Traditional Threaded Golden Anjeer & Shopian Zardalu",
    category: 'dried-fruits',
    productType: "Sun-Dried Mountain Anjeer & Golden Zardalu (Ficus carica)",
    origin: 'Shopian Terraced Orchards, Kashmir',
    harvestYear: '2026 Fresh Valley Harvest',
    rating: 4.8,
    reviewsCount: 810,
    badge: 'Sulphur Free',
    badgeType: 'natural',
    fssaiCertified: true,
    image: '/images/real-figs-macro.jpg',
    images: [
      '/images/real-figs-macro.jpg',
      '/images/figs-close.jpg',
      '/images/figs-apricots-close.jpg',
      '/images/figs-apricots-packaged.jpg',
      '/images/real-figs-apricots-macro.jpg'
    ],
    overview: {
      terroir: "Shopian Terraced Orchards (6,500 ft Altitude)",
      harvestMethod: "Tree-ripened, hand-threaded on natural hemp twine",
      aromaFlavor: "Chewy honey nectar, caramelized date notes with pleasant seed crunch",
      purityGrade: "100% Sulphur-Free, Zero artificial syrups or added sugar",
      packagingStandard: "Resealable aroma-barrier zip pouch with moisture absorber",
      shelfLife: "12 Months stored in ambient cool storage"
    },
    description: "Plump, sun-ripened Kashmiri figs threaded on traditional twine alongside sweet golden Shopian apricots. Dried slowly under mountain sunlight without artificial sulphur, refined syrups, or coloring.",
    benefits: [
      "FSSAI Certified: 100% natural, zero preservatives or added sugars",
      "Rich in soluble dietary fiber and essential minerals (iron, potassium)",
      "Low glycemic index snack for everyday vitality",
      "Hygienically sorted and nitrogen sealed"
    ],
    nutrition: {
      calories: "249 kcal",
      protein: "3.3g",
      healthyFats: "0.9g",
      carbs: "63.9g",
      fiber: "9.8g"
    },
    weights: [
      { weight: '250g', price: 390, originalPrice: 520, discount: 25 },
      { weight: '500g', price: 740, originalPrice: 990, discount: 25, isDefault: true },
      { weight: '1kg', price: 1390, originalPrice: 1900, discount: 26 }
    ]
  },
  {
    id: 'jnu-kahwa-06',
    name: "JENU'S Royal Shahi Kashmiri Saffron Kahwa",
    subname: "Whole Leaf Green Tea, Saffron Strands, Sliced Almonds & Cardamom",
    category: 'kahwa-spices',
    productType: "Royal Himalayan Saffron Spiced Green Tea (Camellia sinensis blend)",
    origin: 'Pampore & Gulmarg, Kashmir',
    harvestYear: '2026 Special Blend',
    rating: 4.9,
    reviewsCount: 1120,
    badge: 'Signature Blend',
    badgeType: 'bestseller',
    fssaiCertified: true,
    image: '/images/kahwa-tea-blend.jpg',
    images: [
      '/images/kahwa-tea-blend.jpg',
      '/images/kahwa-brewed-cup.jpg',
      '/images/saffron-infusion.jpg',
      '/images/kahwa-tea.jpg',
      '/images/kahwa-tea-packaged.jpg'
    ],
    overview: {
      terroir: "Pampore, Gulmarg & High Valley Slopes",
      harvestMethod: "First-flush whole green tea leaves hand-blended with whole spices",
      aromaFlavor: "Warming cardamom bouquet, sweet saffron notes, rose petal undertones",
      purityGrade: "Contains genuine Pampore saffron threads and sliced Mamra badam",
      packagingStandard: "Double-lid airtight matte tin canister with protective seal",
      shelfLife: "18 Months in airtight dry tea caddy"
    },
    description: "An authentic Himalayan botanical brew crafted with whole green tea leaves, genuine Pampore saffron, slivered Mamra almonds, green cardamom, and fragrant Kashmiri rose petals.",
    benefits: [
      "FSSAI Certified: 100% natural herbs and spices, no artificial flavors",
      "Infused with real Pampore saffron threads and almond slivers",
      "Natural digestive and warming winter wellness drink",
      "Sealed in an airtight matte presentation canister"
    ],
    nutrition: {
      calories: "45 kcal / cup",
      protein: "1.8g",
      healthyFats: "2.1g",
      carbs: "4.2g",
      fiber: "1.1g"
    },
    weights: [
      { weight: '250g Canister', price: 460, originalPrice: 620, discount: 25, isDefault: true },
      { weight: '500g Pack', price: 860, originalPrice: 1190, discount: 27 },
      { weight: '1kg Bulk Tin', price: 1590, originalPrice: 2200, discount: 27 }
    ]
  },
  {
    id: 'jnu-chilgoza-07',
    name: "JENU'S Wild Himalayan Chilgoza (Pine Nuts)",
    subname: "Raw Himalayan Forest Hand-Harvested Pine Nuts in Shell",
    category: 'berries-seeds',
    productType: "Wild Himalayan Forest Pine Nuts (Pinus gerardiana)",
    origin: 'High Kinnaur & Kashmir Forest Ridges',
    harvestYear: '2026 Wild Crop',
    rating: 4.9,
    reviewsCount: 520,
    badge: 'Wild Foraged',
    badgeType: 'premium',
    fssaiCertified: true,
    image: '/images/real-chilgoza-macro.jpg',
    images: [
      '/images/real-chilgoza-macro.jpg',
      '/images/chilgoza-pinenuts-macro.jpg',
      '/images/chilgoza-pinenuts.jpg',
      '/images/real-chilgoza-macro.jpg',
      '/images/chilgoza-pinenuts-packaged.jpg'
    ],
    overview: {
      terroir: "Wild Himalayan Ridges (Kinnaur & Kashmir High Forest, 8,500 ft)",
      harvestMethod: "Foraged by local mountaineers from wild pine cones",
      aromaFlavor: "Creamy, decadent buttery pine aroma with delicate resinous sweet finish",
      purityGrade: "Raw in protective natural slender shell, zero heating or chemical wash",
      packagingStandard: "Heavy-duty nitrogen vacuum foil pack",
      shelfLife: "9 Months in cool refrigeration or dry pantry"
    },
    description: "Rare and prized edible delicacy gathered from wild Himalayan Pinus gerardiana trees. Slender golden shells with ivory, buttery pine nut kernels rich in pinolenic acid.",
    benefits: [
      "FSSAI Certified: Wild harvested, pesticide-free and unrefined",
      "Naturally abundant in pinolenic acid and monounsaturated fats",
      "Buttery, velvety texture with sweet pine aroma",
      "Carefully vacuum-packed for peak freshness"
    ],
    nutrition: {
      calories: "673 kcal",
      protein: "13.7g",
      healthyFats: "68.4g",
      carbs: "13.1g",
      fiber: "3.7g"
    },
    weights: [
      { weight: '200g', price: 990, originalPrice: 1350, discount: 26 },
      { weight: '500g', price: 2350, originalPrice: 3200, discount: 26, isDefault: true },
      { weight: '1kg', price: 4490, originalPrice: 6100, discount: 26 }
    ]
  },
  {
    id: 'jnu-apricots-08',
    name: "JENU'S Shopian Sweet Golden Apricots (Zardalu)",
    subname: "Sun-Matured Sweet Apricots with Edible Kernel",
    category: 'dried-fruits',
    productType: "Shopian Sweet Golden Apricots with Edible Kernel (Prunus armeniaca)",
    origin: 'Shopian Terraces, Kashmir',
    harvestYear: '2026 Fresh Valley Harvest',
    rating: 4.7,
    reviewsCount: 460,
    badge: 'Unsulphured',
    badgeType: 'natural',
    fssaiCertified: true,
    image: '/images/real-apricots-macro.jpg',
    images: [
      '/images/real-apricots-macro.jpg',
      '/images/apricots-kargil.jpg',
      '/images/apricots-khumani-close.jpg',
      '/images/figs-apricots-close.jpg',
      '/images/figs-apricots-packaged.jpg'
    ],
    overview: {
      terroir: "Shopian Valley Orchards (6,700 ft Altitude)",
      harvestMethod: "Gentle sun-drying on wooden alpine racks",
      aromaFlavor: "Tangy sweet apricot jam aroma with crisp edible sweet kernel inside",
      purityGrade: "Natural unbleached golden amber hue, sulphur dioxide free",
      packagingStandard: "Nitrogen-purged matte stand-up pouch",
      shelfLife: "12 Months in airtight cool pantry"
    },
    description: "Naturally dried in the pure, dry mountain air of Shopian. These velvety caramel-golden apricots are rich in beta-carotene and dietary fiber, featuring a sweet, edible almond-like seed inside.",
    benefits: [
      "FSSAI Certified: 100% pure fruit, no sulphur dioxide treatments",
      "Rich in Vitamin A (Beta-carotene) supporting eye health",
      "High natural potassium for cardiovascular wellness",
      "Includes nutritious sweet edible seed inside"
    ],
    nutrition: {
      calories: "241 kcal",
      protein: "3.4g",
      healthyFats: "0.5g",
      carbs: "62.6g",
      fiber: "7.3g"
    },
    weights: [
      { weight: '250g', price: 340, originalPrice: 450, discount: 24 },
      { weight: '500g', price: 640, originalPrice: 880, discount: 27, isDefault: true },
      { weight: '1kg', price: 1190, originalPrice: 1650, discount: 27 }
    ]
  },
  {
    id: 'jnu-gurbandi-09',
    name: "JENU'S Kashmiri Gurbandi Almonds",
    subname: "High-Oil Wild Almond Kernels (Chhoti Giri)",
    category: 'almonds',
    productType: "High-Oil Wild Kashmiri Mountain Almond (Chhoti Giri)",
    origin: 'Pulwama Hills, Kashmir',
    harvestYear: '2026 Fresh Valley Harvest',
    rating: 4.8,
    reviewsCount: 390,
    badge: 'High Oil',
    badgeType: 'natural',
    fssaiCertified: true,
    image: '/images/real-gurbandi-macro.jpg',
    images: [
      '/images/real-gurbandi-macro.jpg',
      '/images/gurbandi-almonds-close.jpg',
      '/images/real-almonds-raw-camera.jpg',
      '/images/real-almonds-stages-camera.jpg',
      '/images/mamra-almonds-packaged.jpg'
    ],
    overview: {
      terroir: "Pulwama Foothills & South Kashmir Slopes",
      harvestMethod: "Wild-harvested small batch picking & natural sun curing",
      aromaFlavor: "Intense concentrated almond flavor with natural essential oil richness",
      purityGrade: "Up to 52% natural cold-press oil yield, unpolished",
      packagingStandard: "Airtight vacuum sealed canister with gold tamper seal",
      shelfLife: "12 Months in dry ambient conditions"
    },
    description: "Cherished in traditional Ayurvedic nutrition. While more compact in size, wild Gurbandi almonds boast the highest concentration of cold-pressed natural almond oil and Vitamin E.",
    benefits: [
      "FSSAI Certified: Unprocessed, zero artificial gloss or wax",
      "Highest concentration of natural cold-press almond oil",
      "Ideal for daily soaked morning nutrition",
      "Pure high-altitude mountain harvest"
    ],
    nutrition: {
      calories: "595 kcal",
      protein: "22.0g",
      healthyFats: "52.0g",
      carbs: "19.5g",
      fiber: "11.8g"
    },
    weights: [
      { weight: '250g', price: 420, originalPrice: 580, discount: 27 },
      { weight: '500g', price: 790, originalPrice: 1100, discount: 28, isDefault: true },
      { weight: '1kg', price: 1490, originalPrice: 2100, discount: 29 }
    ]
  },
  {
    id: 'jnu-berries-10',
    name: "JENU'S Valley Cranberries & Blueberries",
    subname: "Sun-Infused Antioxidant Superfood Blend",
    category: 'berries-seeds',
    productType: "Glacial Valley Ruby Cranberries & Blueberries (Vaccinium blend)",
    origin: 'High Altitude Glacial Valleys, Kashmir',
    harvestYear: '2026 Crop',
    rating: 4.8,
    reviewsCount: 670,
    badge: 'Antioxidants',
    badgeType: 'natural',
    fssaiCertified: true,
    image: '/images/real-berries-macro.jpg',
    images: [
      '/images/real-berries-macro.jpg',
      '/images/cranberries-close.jpg',
      '/images/blueberries-close.jpg',
      '/images/berries-seeds-mix-close.jpg',
      '/images/figs-apricots-packaged.jpg'
    ],
    overview: {
      terroir: "Glacial Stream Basins of Northern Kashmir",
      harvestMethod: "Hand-gathered wild berries gently sun-infused",
      aromaFlavor: "Zesty sweet-tart berry explosion with bright alpine sweetness",
      purityGrade: "No refined high-fructose syrups, sweetened with mountain apple juice",
      packagingStandard: "Multilayer UV-barrier zip pouch",
      shelfLife: "12 Months in sealed pouch"
    },
    description: "Plump ruby cranberries and Himalayan blueberries gently dried to retain proanthocyanidins. Naturally balanced with mountain apple juice extract, without refined white sugar.",
    benefits: [
      "FSSAI Certified: Free from high-fructose corn syrups and artificial dyes",
      "High in anthocyanin and polyphenolic antioxidants",
      "Clean label: Sweetened naturally with apple juice",
      "Packed in nitrogen-purged resealable pouches"
    ],
    nutrition: {
      calories: "325 kcal",
      protein: "1.2g",
      healthyFats: "0.8g",
      carbs: "82.0g",
      fiber: "6.5g"
    },
    weights: [
      { weight: '250g', price: 380, originalPrice: 500, discount: 24 },
      { weight: '500g', price: 720, originalPrice: 960, discount: 25, isDefault: true },
      { weight: '1kg', price: 1350, originalPrice: 1850, discount: 27 }
    ]
  },
  {
    id: 'jnu-chinar-box-11',
    name: "JENU'S Royal Chinar Velvet Festive Box",
    subname: "Imperial Presentation Box with Brass Lock & Saffron",
    category: 'hampers',
    productType: "Imperial Crimson Velvet Gifting Box with Brass Fittings",
    origin: 'Pampore & Srinagar Heritage Series',
    harvestYear: '2026 Special Release',
    rating: 5.0,
    reviewsCount: 780,
    badge: 'Festive Choice',
    badgeType: 'luxury',
    fssaiCertified: true,
    image: '/images/royal-hamper.jpg',
    images: [
      '/images/royal-hamper.jpg',
      '/images/hamper-open-suite.jpg',
      '/images/real-mamra-macro.jpg',
      '/images/real-walnuts-macro.jpg',
      '/images/real-saffron-macro.jpg'
    ],
    overview: {
      terroir: "Pampore, Kupwara & Downtown Srinagar",
      harvestMethod: "Master artisan presentation packaging housing Grade-A dry fruits",
      aromaFlavor: "Enchanting aroma of fresh Mamra almonds, walnuts & pure Mongra saffron",
      purityGrade: "Includes certified 2g jar of Grade A1 Pampore Saffron & brass spoon",
      packagingStandard: "Rich royal crimson velvet case with gold foil and brass latch",
      shelfLife: "12 Months (individual airtight jars inside)"
    },
    description: "Presented in an opulent crimson velvet gift case with embossed gold accents. Houses 500g Snow Walnuts, 500g Mamra Almonds, and a certified 2g jar of Grade A1 Pampore Saffron with a brass serving spoon.",
    benefits: [
      "FSSAI Certified gourmet contents in sealed glass containers",
      "Includes 1000g of dry fruits + 2g Pampore Saffron + brass spoon",
      "Elegant gift packaging suitable for corporate & family gifting",
      "Certified freshness and laboratory purity documentation"
    ],
    nutrition: {
      calories: "Assorted",
      protein: "19.0g avg",
      healthyFats: "52.0g avg",
      carbs: "20.0g avg",
      fiber: "9.0g avg"
    },
    weights: [
      { weight: '1kg + 2g Saffron Suite', price: 3499, originalPrice: 4800, discount: 27, isDefault: true },
      { weight: '2kg + 5g Saffron Suite', price: 5999, originalPrice: 8200, discount: 26 }
    ]
  },
  {
    id: 'jnu-deal-bundle-12',
    name: "The Kashmir Royal Valley Trio (Daily Special)",
    subname: "500g Mamra Almonds + 500g Snow Walnuts + 1g Pampore Saffron",
    category: 'combos',
    productType: "Flagship Valley 3-in-1 Trio: Mamra Almonds + Snow Walnuts + Pampore Saffron",
    origin: 'Shopian, Kupwara & Pampore',
    harvestYear: '2026 Special Allocation',
    rating: 5.0,
    reviewsCount: 1890,
    badge: '31% Savings',
    badgeType: 'bestseller',
    fssaiCertified: true,
    image: '/images/combos-pack.jpg',
    comboItems: [
      { name: "Kashmiri Mamra Almonds", weight: "500g", img: "/images/real-mamra-macro.jpg" },
      { name: "Kagzi Snow Walnuts", weight: "500g", img: "/images/real-walnuts-macro.jpg" },
      { name: "Pure Pampore Mongra Saffron", weight: "1g", img: "/images/real-saffron-macro.jpg" }
    ],
    images: [
      '/images/combos-pack.jpg',
      '/images/real-mamra-macro.jpg',
      '/images/real-walnuts-macro.jpg',
      '/images/real-saffron-macro.jpg',
      '/images/saffron-infusion.jpg'
    ],
    overview: {
      terroir: "Shopian, Kupwara & Pampore Karewas",
      harvestMethod: "Coordinated seasonal harvest fresh from grower collectives",
      aromaFlavor: "Harmonious union of rich almond oil, buttery walnut halves & floral saffron",
      purityGrade: "100% Laboratory Tested, FSSAI Central Certified Batch",
      packagingStandard: "Insulated thermal gift box with individual sealed canisters",
      shelfLife: "12 Months under standard dry conditions"
    },
    description: "Our signature flagship bundle bringing the purest harvests of Kashmir into your home at an exceptional price. Contains 500g oil-rich Mamra Almonds, 500g crisp Snow Walnuts, and 1g FSSAI Certified Pampore Saffron in an insulated thermal carton.",
    benefits: [
      "FSSAI Certified: 100% natural, laboratory tested for purity",
      "Save 31% over individual item prices",
      "Packaged in an insulated thermal-protective gift carton",
      "Includes complimentary priority air dispatch from Srinagar"
    ],
    nutrition: {
      calories: "Assorted",
      protein: "20.0g avg",
      healthyFats: "55.0g avg",
      carbs: "18.0g avg",
      fiber: "10.0g avg"
    },
    weights: [
      { weight: 'Full Trio Suite', price: 1899, originalPrice: 2750, discount: 31, isDefault: true }
    ]
  },
  {
    id: 'jnu-spice-mirch-13',
    name: "JENU'S Authentic Sun-Dried Kashmiri Mirch",
    subname: "Naturally Grown Wrinkled Deep Crimson Mild Chillies",
    category: 'spices',
    productType: "GI-Cultivar Pure Kashmiri Lal Mirch (Capsicum annuum var. kashmiri)",
    origin: 'Kulgam & Pulwama, Kashmir',
    harvestYear: '2026 Sun-Cured Valley Harvest',
    rating: 4.9,
    reviewsCount: 1280,
    badge: 'Naturally Grown',
    badgeType: 'natural',
    fssaiCertified: true,
    image: '/images/real-mirch-macro.jpg',
    images: [
      '/images/real-mirch-macro.jpg',
      '/images/kashmiri-mirch-powder.jpg',
      '/images/kashmiri-mirch.jpg',
      '/images/kashmiri-mirch-packaged.jpg',
      '/images/spices-assortment-dishes.jpg'
    ],
    overview: {
      terroir: "Kulgam & Pulwama Alluvial Valley Loam",
      harvestMethod: "Hand-picked ripe ruby pods, sun-dried on hygienic wooden racks",
      aromaFlavor: "Vibrant smoky sweetness, gentle warming heat (1,000–2,000 SHU), vivid red color",
      purityGrade: "Cold stone-ground, 100% free of Sudan red dye, synthetic oil or fillers",
      packagingStandard: "Food-grade airtight canister with inner moisture-barrier membrane",
      shelfLife: "12 Months in airtight cool spice rack"
    },
    description: "Naturally cultivated in mineral-dense Kashmir valley loam without synthetic fertilizers. Famed worldwide for its intensely vivid ruby-red hue, subtle smoky sweetness, and gentle heating (1,000–2,000 SHU). Zero Sudan dyes or chemical adulteration.",
    benefits: [
      "100% Naturally Grown: Zero artificial coloring, non-GMO, chemical-free",
      "Rich in natural capsaicin and immune-boosting bioflavonoids",
      "Hygienically sun-cured on mountain wooden racks in pristine valley air",
      "Stone-ground cold process preserving volatile essential aromatic oils"
    ],
    nutrition: {
      calories: "282 kcal",
      protein: "12.0g",
      healthyFats: "14.3g",
      carbs: "31.6g",
      fiber: "27.2g"
    },
    weights: [
      { weight: '100g Whole Pods', price: 190, originalPrice: 260, discount: 27 },
      { weight: '250g Stone-Ground', price: 380, originalPrice: 520, discount: 27, isDefault: true },
      { weight: '500g Value Pack', price: 690, originalPrice: 980, discount: 30 },
      { weight: '1kg Chef Tin', price: 1290, originalPrice: 1850, discount: 30 }
    ]
  },
  {
    id: 'jnu-spice-jeera-14',
    name: "JENU'S Wild Kashmiri Shahi Jeera",
    subname: "Wild-Foraged Alpine Royal Black Cumin from Gurez",
    category: 'spices',
    productType: "Wild Himalayan Alpine Shahi Jeera (Bunium persicum)",
    origin: 'High Gurez & Kishtwar Valley Slopes',
    harvestYear: '2026 Alpine Foraged Harvest',
    rating: 5.0,
    reviewsCount: 940,
    badge: 'Wild Foraged',
    badgeType: 'premium',
    fssaiCertified: true,
    image: '/images/real-jeera-macro.jpg',
    images: [
      '/images/real-jeera-macro.jpg',
      '/images/shahi-jeera-close.jpg',
      '/images/shahi-jeera.jpg',
      '/images/shahi-jeera-packaged.jpg',
      '/images/spices-assortment-dishes.jpg'
    ],
    overview: {
      terroir: "High Gurez Valley & Kishtwar Alpine Slopes (8,200 ft Altitude)",
      harvestMethod: "Wild foraged from rocky slopes by pastoral mountain collectors",
      aromaFlavor: "Complex pine, thyme, roasted anise bouquet with warm peppery finish",
      purityGrade: "3.8% Natural essential volatile oils, unwashed and chemical-free",
      packagingStandard: "Airtight glass apothecary spice jar with aroma-lock gasket",
      shelfLife: "18 Months in airtight glass container"
    },
    description: "Naturally wild-foraged from rocky alpine ridges at 8,000+ feet altitude. Considerably thinner, darker, and more fragrant than regular cumin seeds, boasting an intoxicating bouquet of pine, thyme, and roasted anise.",
    benefits: [
      "Wild-crafted mountain harvest completely free from agricultural chemicals",
      "High natural volatile oil concentration (3.8%) delivering intense aroma",
      "Traditional Ayurvedic digestive tonic and respiratory revitalizer",
      "Airtight glass jar sealing preserves crisp aromatic longevity"
    ],
    nutrition: {
      calories: "375 kcal",
      protein: "17.8g",
      healthyFats: "22.3g",
      carbs: "44.2g",
      fiber: "10.5g"
    },
    weights: [
      { weight: '100g Glass Jar', price: 360, originalPrice: 490, discount: 27, isDefault: true },
      { weight: '250g Pouch', price: 820, originalPrice: 1150, discount: 29 },
      { weight: '500g Pack', price: 1540, originalPrice: 2200, discount: 30 }
    ]
  },
  {
    id: 'jnu-spice-ver-15',
    name: "JENU'S Traditional Kashmiri Wazwan Masala Ver",
    subname: "Artisanal Sun-Cured Heritage Spice Cake Disc",
    category: 'spices',
    productType: "Artisanal Wazwan Heritage Spice Cake Disc (Kashmiri Ver Tikki)",
    origin: 'Heritage Spice Atelier, Downtown Srinagar',
    harvestYear: 'Handcrafted 2026 Season',
    rating: 4.9,
    reviewsCount: 710,
    badge: 'Heritage Recipe',
    badgeType: 'luxury',
    fssaiCertified: true,
    image: '/images/wazwan-ver-packaged.jpg',
    images: [
      '/images/wazwan-ver-packaged.jpg',
      '/images/wazwan-ver.jpg',
      '/images/wazwan-ver-slice.jpg',
      '/images/real-mirch-macro.jpg',
      '/images/spices-assortment-dishes.jpg'
    ],
    overview: {
      terroir: "Heritage Spice Atelier, Downtown Srinagar",
      harvestMethod: "Hand-kneaded with wild shallots (pran), garlic, mirch & whole valley spices",
      aromaFlavor: "Pungent royal Wazwan aromatics, roasted alliums, warm cloves and mustard oil",
      purityGrade: "Heirloom slow sun-cure, preserved in cold-pressed mustard oil",
      packagingStandard: "Vacuum-sealed presentation pack with wax paper wrap",
      shelfLife: "12 Months at room temperature"
    },
    description: "The centuries-old culinary crown of Kashmir's master chefs (Wazas). Hand-kneaded discs of sun-dried wild shallots (pran), valley garlic, Kashmiri red chillies, black cumin, ginger, cloves, and asafoetida, slow-cured in pure cold-pressed mustard oil.",
    benefits: [
      "Authentic artisanal heirloom recipe passed down through generations",
      "100% naturally grown mountain spices preserved in cold-pressed mustard oil",
      "Instantly imparts royal Wazwan aroma and complexity to dishes",
      "Naturally cured traditional disc with 12-month ambient shelf life"
    ],
    nutrition: {
      calories: "320 kcal",
      protein: "9.4g",
      healthyFats: "18.2g",
      carbs: "38.5g",
      fiber: "14.0g"
    },
    weights: [
      { weight: '150g Spice Cake Disc', price: 320, originalPrice: 440, discount: 27, isDefault: true },
      { weight: '300g Twin Pack (2 Discs)', price: 590, originalPrice: 850, discount: 31 },
      { weight: '600g Master Box (4 Discs)', price: 1120, originalPrice: 1650, discount: 32 }
    ]
  },
  {
    id: 'jnu-spice-chest-16',
    name: "JENU'S Royal Valley 5-Spice Kitchen Chest",
    subname: "Naturally Grown Kashmiri Mirch, Shahi Jeera, Black Cardamom, Ginger & Fennel",
    category: 'spices',
    productType: "Heritage 5-Spice Gourmet Collection in Wooden Aroma Caddy",
    origin: 'Pampore, Kishtwar & Pulwama, Kashmir',
    harvestYear: '2026 Complete Harvest Collection',
    rating: 5.0,
    reviewsCount: 1150,
    badge: 'Kitchen Essential',
    badgeType: 'bestseller',
    fssaiCertified: true,
    image: '/images/spices-assortment-packaged.jpg',
    images: [
      '/images/spices-assortment-packaged.jpg',
      '/images/real-mirch-macro.jpg',
      '/images/real-jeera-macro.jpg',
      '/images/kashmiri-mirch-powder.jpg',
      '/images/spices-assortment-dishes.jpg'
    ],
    overview: {
      terroir: "Pampore, Kishtwar, Pulwama & Srinagar",
      harvestMethod: "Handpicked and stone-ground by master Kashmiri spice artisans",
      aromaFlavor: "Complete Kashmiri flavor profile: sweet mirch, black cumin, cardamom, ginger & fennel",
      purityGrade: "Zero adulteration, batch lab-tested for heavy metals and aflatoxins",
      packagingStandard: "5 Modular glass jars housed in an engraved Kashmiri wooden display chest",
      shelfLife: "12 Months for optimum volatile oil potency"
    },
    description: "The definitive collection of naturally grown Kashmiri kitchen spices. Contains 100g Kashmiri Mirch, 100g Wild Shahi Jeera, 100g Smoky Black Cardamom (Badi Elaichi), 100g Sun-Dried Ginger (Sonth), and 100g Alpine Fennel Seeds (Badiyan) in separate modular aroma-lock jars.",
    benefits: [
      "All 5 spices 100% naturally grown and sun-cured in Kashmir",
      "FSSAI certified: laboratory tested for purity, aflatoxins and heavy metals",
      "Pre-portioned in modular airtight glass aroma-lock containers",
      "Includes complimentary authentic Kashmiri recipe collection booklet"
    ],
    nutrition: {
      calories: "Assorted",
      protein: "14.2g avg",
      healthyFats: "15.0g avg",
      carbs: "42.0g avg",
      fiber: "19.0g avg"
    },
    weights: [
      { weight: '500g Complete 5-Spice Chest', price: 890, originalPrice: 1250, discount: 29, isDefault: true },
      { weight: '1kg Grand Kitchen Chest', price: 1690, originalPrice: 2400, discount: 30 }
    ]
  },
  {
    id: 'jnu-combo-vitality-17',
    name: "JENU'S Valley Vitality Duo (Mamra Almonds + Snow Walnuts)",
    subname: "500g High-Oil Mamra Badam + 500g Kagzi Snow Walnut Halves",
    category: 'combos',
    productType: "Valley Vitality Wellness Duo: 500g Mamra Badam + 500g Kagzi Walnuts",
    origin: 'Shopian & Kupwara, Kashmir',
    harvestYear: '2026 Fresh Valley Harvest',
    rating: 5.0,
    reviewsCount: 2480,
    badge: 'Super Saver Combo',
    badgeType: 'bestseller',
    fssaiCertified: true,
    image: '/images/combos-pack.jpg',
    comboItems: [
      { name: "Kashmiri Mamra Almonds", weight: "500g", img: "/images/real-mamra-macro.jpg" },
      { name: "Kagzi Snow Walnuts", weight: "500g", img: "/images/real-walnuts-macro.jpg" }
    ],
    images: [
      '/images/combos-pack.jpg',
      '/images/real-mamra-macro.jpg',
      '/images/real-walnuts-macro.jpg',
      '/images/mamra-almonds-packaged.jpg',
      '/images/walnuts-akhrot-packaged.jpg'
    ],
    overview: {
      terroir: "Shopian & Kupwara High Altitude Valley",
      harvestMethod: "Fresh 2026 harvest, hand-cracked and sort-graded for maximum crunch",
      aromaFlavor: "Natural plant-based sweetness, rich almond oils & buttery walnut halves",
      purityGrade: "Unbleached, chlorine-free, high Omega-3 and natural Vitamin E",
      packagingStandard: "Dual vacuum-sealed canisters in protective twin gift box",
      shelfLife: "12 Months in cool dry storage"
    },
    description: "Our most popular everyday wellness combination. Pairs 500g of cold-climate Kashmiri Mamra Almonds with 500g of extra-white Kagzi Snow Walnut halves. Packed with natural almond oil, Omega-3 ALA, and plant protein at a massive 28% bundle discount.",
    benefits: [
      "Save 28% compared to buying individual packs",
      "500g Mamra Almonds (50% natural oil) + 500g Snow Walnuts",
      "100% unbleached, raw, non-GMO, zero chemicals",
      "Nitrogen vacuum sealed in resealable stand-up pouches"
    ],
    nutrition: {
      calories: "616 kcal avg",
      protein: "18.2g",
      healthyFats: "57.5g",
      carbs: "17.6g",
      fiber: "9.6g"
    },
    weights: [
      { weight: '1kg Standard Duo (500g + 500g)', price: 2190, originalPrice: 3050, discount: 28, isDefault: true },
      { weight: '2kg Family Mega Saver (1kg + 1kg)', price: 4190, originalPrice: 5900, discount: 29 }
    ]
  },
  {
    id: 'jnu-combo-saffron-kahwa-18',
    name: "JENU'S Himalayan Royal Morning Combo",
    subname: "1g Pure Pampore Mongra Saffron + 250g Shahi Saffron Kahwa Tea + Brass Spoon",
    category: 'combos',
    productType: "Royal Valley Morning Awakening Set: 1g Pampore Saffron + 250g Shahi Kahwa",
    origin: 'Pampore Plateau & Gulmarg, Kashmir',
    harvestYear: '2026 Fresh Bloom Blend',
    rating: 4.9,
    reviewsCount: 1320,
    badge: 'Immunity Booster',
    badgeType: 'premium',
    fssaiCertified: true,
    image: '/images/kahwa-tea-blend.jpg',
    comboItems: [
      { name: "Pure Pampore Mongra Saffron", weight: "1g", img: "/images/real-saffron-macro.jpg" },
      { name: "Royal Shahi Saffron Kahwa Tea", weight: "250g", img: "/images/kahwa-tea-blend.jpg" }
    ],
    images: [
      '/images/kahwa-tea-blend.jpg',
      '/images/real-saffron-macro.jpg',
      '/images/kahwa-brewed-cup.jpg',
      '/images/saffron-infusion.jpg',
      '/images/kahwa-tea-packaged.jpg'
    ],
    overview: {
      terroir: "Pampore Karewas & Gulmarg Mountain Slopes",
      harvestMethod: "Hand-plucked crocus sativus threads blended with whole tea leaves",
      aromaFlavor: "Invigorating saffron floral warmth, crisp cardamom and almond notes",
      purityGrade: "Grade A1+ certified saffron paired with authentic Kashmiri green tea",
      packagingStandard: "Matte royal tea canister + glass saffron jar + brass measuring spoon",
      shelfLife: "18 Months in sealed containers"
    },
    description: "The quintessential Kashmiri morning ritual. Combines 1g of Grade A1+ Pampore Mongra Saffron (Crocin 254+) with a 250g canister of authentic whole-leaf Shahi Kahwa blended with green cardamom and almond slivers. Includes a hand-finished brass measuring spoon.",
    benefits: [
      "26% instant savings on Kashmir's two iconic royal botanicals",
      "Certified Grade A1+ Mongra Saffron + Whole leaf spiced green tea",
      "Natural immune support, glowing complexion, and digestive warmth",
      "Complimentary brass dosing spoon and ceremonial brewing guide"
    ],
    nutrition: {
      calories: "45 kcal/cup",
      protein: "1.8g",
      healthyFats: "2.1g",
      carbs: "4.2g",
      fiber: "1.1g"
    },
    weights: [
      { weight: 'Single Ritual Set (1g Saffron + 250g Kahwa)', price: 799, originalPrice: 1080, discount: 26, isDefault: true },
      { weight: 'Double Ritual Set (2g Saffron + 500g Kahwa)', price: 1499, originalPrice: 2090, discount: 28 }
    ]
  },
  {
    id: 'jnu-combo-grand-quad-19',
    name: "JENU'S Grand Alpine Four Connoisseur Combo",
    subname: "250g Mamra + 250g Walnuts + 250g Figs + 200g Wild Chilgoza",
    category: 'combos',
    productType: "Grand Alpine 4-Piece Connoisseur Pack (Mamra + Walnuts + Figs + Chilgoza)",
    origin: 'High Valleys of Kashmir & Kinnaur',
    harvestYear: '2026 Fresh Valley Harvest',
    rating: 5.0,
    reviewsCount: 1650,
    badge: 'Best Value Quad',
    badgeType: 'luxury',
    fssaiCertified: true,
    image: '/images/combos-pack.jpg',
    comboItems: [
      { name: "Mamra Almonds", weight: "250g", img: "/images/real-mamra-macro.jpg" },
      { name: "Kagzi Snow Walnuts", weight: "250g", img: "/images/real-walnuts-macro.jpg" },
      { name: "Sun-Dried Figs", weight: "250g", img: "/images/real-figs-macro.jpg" },
      { name: "Wild Himalayan Chilgoza", weight: "200g", img: "/images/real-chilgoza-macro.jpg" }
    ],
    images: [
      '/images/combos-pack.jpg',
      '/images/real-mamra-macro.jpg',
      '/images/real-walnuts-macro.jpg',
      '/images/real-figs-macro.jpg',
      '/images/real-chilgoza-macro.jpg'
    ],
    overview: {
      terroir: "Shopian, Kupwara, Kinnaur & Pulwama High Ridges",
      harvestMethod: "Wild foraged & orchard hand-selected 2026 premium crop",
      aromaFlavor: "Exquisite diversity: buttery chilgoza, honey figs, crisp mamra & sweet walnuts",
      purityGrade: "100% Raw, chemical-free and heavy-metal laboratory tested",
      packagingStandard: "4 Individual nitrogen-vacuum sealed packages in master gift carton",
      shelfLife: "10 Months in cool ambient storage"
    },
    description: "The ultimate dry fruit connoisseur pack. Gathers 250g Mamra Almonds, 250g Kagzi Snow Walnuts, 250g Sun-Dried Figs, and 200g Wild Himalayan Chilgoza pine nuts into one seamless luxury bundle with maximum savings.",
    benefits: [
      "Save 30% over individual retail packs",
      "Complete spectrum of heart-healthy fats, minerals, and dietary fiber",
      "Individually vacuum packed to preserve peak crunch and freshness",
      "Free express air delivery from Srinagar included"
    ],
    nutrition: {
      calories: "560 kcal avg",
      protein: "14.5g",
      healthyFats: "46.0g",
      carbs: "32.0g",
      fiber: "9.0g"
    },
    weights: [
      { weight: '950g Grand Quad Pack', price: 2390, originalPrice: 3420, discount: 30, isDefault: true },
      { weight: '1.9kg Double Grand Quad', price: 4590, originalPrice: 6600, discount: 30 }
    ]
  },
  {
    id: 'jnu-combo-spice-nut-20',
    name: "JENU'S Royal Valley Spice & Nut Kitchen Heritage Bundle",
    subname: "250g Kashmiri Mirch + 100g Wild Shahi Jeera + 500g Mamra Almonds + 1g Saffron",
    category: 'combos',
    productType: "Royal Valley Culinary Master Suite: Mirch + Shahi Jeera + Mamra + Saffron",
    origin: 'Shopian, Pulwama, Kishtwar & Pampore',
    harvestYear: '2026 Complete Valley Heritage Batch',
    rating: 5.0,
    reviewsCount: 1820,
    badge: 'Valley Complete',
    badgeType: 'bestseller',
    fssaiCertified: true,
    image: '/images/spices-assortment-packaged.jpg',
    comboItems: [
      { name: "Sun-Dried Kashmiri Mirch", weight: "250g", img: "/images/real-mirch-macro.jpg" },
      { name: "Wild Shahi Jeera in Glass Jar", weight: "100g", img: "/images/real-jeera-macro.jpg" },
      { name: "Kashmiri Mamra Almonds", weight: "500g", img: "/images/real-mamra-macro.jpg" },
      { name: "Pure Pampore Mongra Saffron", weight: "1g", img: "/images/real-saffron-macro.jpg" }
    ],
    images: [
      '/images/spices-assortment-packaged.jpg',
      '/images/real-mirch-macro.jpg',
      '/images/real-jeera-macro.jpg',
      '/images/real-mamra-macro.jpg',
      '/images/real-saffron-macro.jpg'
    ],
    overview: {
      terroir: "Kulgam, Gurez, Shopian & Pampore Valley",
      harvestMethod: "Traditional Kashmiri smallholder farming & wild mountain gathering",
      aromaFlavor: "Complete symphony: smoky sweet mirch, aromatic black cumin, almond oil & saffron",
      purityGrade: "Unadulterated spices and Grade-A dry fruits, FSSAI Central Certified",
      packagingStandard: "Deluxe airtight canisters and glass jars in rigid presentation carton",
      shelfLife: "12 Months in cool pantry"
    },
    description: "Bring the complete authentic taste of Kashmir into your home. Combines 250g stone-ground Kashmiri Mirch, 100g wild Shahi Jeera in a glass jar, 500g oil-rich Mamra Almonds, and 1g Pure Pampore Mongra Saffron. Everything needed for royal Kashmiri cooking and nutrition.",
    benefits: [
      "Save 32% with our most comprehensive culinary package",
      "Naturally grown spices + wild foraged cumin + oil-dense almonds + pure saffron",
      "Zero chemicals, artificial dyes, or preservatives across all items",
      "Packed in premium nitrogen-sealed gourmet presentation box"
    ],
    nutrition: {
      calories: "Assorted",
      protein: "18.0g avg",
      healthyFats: "38.0g avg",
      carbs: "34.0g avg",
      fiber: "16.0g avg"
    },
    weights: [
      { weight: 'Full Heritage Kitchen Suite (851g)', price: 2690, originalPrice: 3950, discount: 32, isDefault: true },
      { weight: 'Grand Executive Suite (1.7kg)', price: 5190, originalPrice: 7650, discount: 32 }
    ]
  },
{
    "id": "jnu-powder-mirch-21",
    "name": "JENU'S Authentic Kashmiri Degi Mirch Powder",
    "subname": "Sun-Dried Stemless Kashmiri Red Chilli Ground Fine (Natural Crimson Glow)",
    "category": "spices",
    "subCategory": "powdered-spices",
    "productType": "Pure Stemless Kashmiri Degi Red Chilli Powder (Mild Heat, High Natural Color)",
    "origin": "Pampore & Pulwama, Kashmir",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.9,
    "reviewsCount": 890,
    "badge": "Cold Milled",
    "badgeType": "bestseller",
    "fssaiCertified": true,
    "image": "/images/mirch-powder-macro.jpg",
    "images": [
      "/images/mirch-powder-macro.jpg",
      "/images/mirch-powder-bowl.jpg",
      "/images/mirch-powder-spices.jpg",
      "/images/mirch-powder-chakki.jpg",
      "/images/mirch-powder-packaged.jpg"
    ],
    "overview": {
      "terroir": "Pampore Alluvial Terraces (5,300 ft Altitude)",
      "harvestMethod": "100% Sun-Dried Kashmiri Long Chillies, De-stemmed & Slow Cold-Milled",
      "aromaFlavor": "Sweet smoky paprika aroma, mild 1,500 SHU warmth, royal ruby red hue",
      "purityGrade": "100% Pure Chilli, Zero Added Colors, Zero Sudan Dyes, Non-GMO",
      "packagingStandard": "Aroma-lock nitrogen purged foil canister with inner freshness seal",
      "shelfLife": "12 Months in cool dry spice storage"
    },
    "description": "True Kashmiri Degi Mirch is world-renowned for its brilliant natural ruby-red hue and mild, fragrant warmth. Grown in the pristine Himalayan microclimate, hand-destemmed, and ground on slow traditional chakki stones to preserve natural volatile oils.",
    "benefits": [
      "FSSAI Certified: 100% pure, zero artificial colors, zero Sudan dye tested",
      "Delivers iconic vibrant crimson color without overpowering fiery heat",
      "Cold-milled below 40\u00b0C to preserve natural capsaicin and essential aroma oils",
      "Rich in natural Vitamin C and bioflavonoid antioxidants"
    ],
    "nutrition": {
      "calories": "282 kcal",
      "protein": "12.0g",
      "healthyFats": "14.3g",
      "carbs": "31.6g",
      "fiber": "27.2g"
    },
    "weights": [
      {
        "weight": "100g Jar",
        "price": 180,
        "originalPrice": 240,
        "discount": 25,
        "isDefault": true
      },
      {
        "weight": "250g Pouch",
        "price": 390,
        "originalPrice": 520,
        "discount": 25
      },
      {
        "weight": "500g Pack",
        "price": 720,
        "originalPrice": 980,
        "discount": 27
      }
    ]
  },
  {
    "id": "jnu-powder-saunf-22",
    "name": "JENU'S Himalayan Fennel Seed Powder (Badiyan)",
    "subname": "Fragrant Green Kashmiri Saunf Stone-Ground (Key Wazwan Rogan Josh Spice)",
    "category": "spices",
    "subCategory": "powdered-spices",
    "productType": "Cold-Milled Mountain Fennel Powder (Badiyan / Saunf Chooran)",
    "origin": "Anantnag & Shopian, Kashmir",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.8,
    "reviewsCount": 640,
    "badge": "Aroma Rich",
    "badgeType": "organic",
    "fssaiCertified": true,
    "image": "/images/saunf-powder-macro.jpg",
    "images": [
      "/images/saunf-powder-macro.jpg",
      "/images/saunf-seeds-macro.jpg",
      "/images/saunf-harvest.jpg",
      "/images/saunf-mortar.jpg",
      "/images/saunf-packaged.jpg"
    ],
    "overview": {
      "terroir": "Anantnag Alpine Slopes (6,100 ft Altitude)",
      "harvestMethod": "Handpicked green anise seed heads, shade-cured and fine stone-ground",
      "aromaFlavor": "Sweet herbaceous liquorice fragrance, cooling digestive notes",
      "purityGrade": "Grade A+ High Anethole Content, 100% Unadulterated",
      "packagingStandard": "Hermetically sealed food-grade tin canister",
      "shelfLife": "12 Months in airtight container"
    },
    "description": "The indispensable soul of traditional Kashmiri curries and Rogan Josh. Our Kashmiri Badiyan is milled from extra-plump, high-altitude green fennel seeds that develop an exceptionally sweet, anethole-rich liquorice fragrance in the crisp mountain air.",
    "benefits": [
      "FSSAI Certified: 100% pure Himalayan mountain fennel, zero starch fillers",
      "Essential cornerstone spice for authentic Kashmiri Rogan Josh & Yakhni",
      "Potent natural digestive rich in natural anethole, fenchone, and cineole oils",
      "Calms stomach lining and freshens breath naturally"
    ],
    "nutrition": {
      "calories": "345 kcal",
      "protein": "15.8g",
      "healthyFats": "14.9g",
      "carbs": "52.3g",
      "fiber": "39.8g"
    },
    "weights": [
      {
        "weight": "100g Jar",
        "price": 160,
        "originalPrice": 220,
        "discount": 27,
        "isDefault": true
      },
      {
        "weight": "250g Pouch",
        "price": 340,
        "originalPrice": 480,
        "discount": 29
      },
      {
        "weight": "500g Pack",
        "price": 640,
        "originalPrice": 900,
        "discount": 29
      }
    ]
  },
  {
    "id": "jnu-powder-sonth-23",
    "name": "JENU'S Sun-Cured Mountain Sonth Powder",
    "subname": "Pure High-Pungency Himalayan Dried Ginger Root Powder",
    "category": "spices",
    "subCategory": "powdered-spices",
    "productType": "Pure Sun-Dried Mountain Ginger Root Powder (Shunthi / Sonth)",
    "origin": "Baramulla Valley, Kashmir",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.9,
    "reviewsCount": 780,
    "badge": "High Pungency",
    "badgeType": "ayurvedic",
    "fssaiCertified": true,
    "image": "/images/sonth-powder-macro.jpg",
    "images": [
      "/images/sonth-powder-macro.jpg",
      "/images/sonth-roots-macro.jpg",
      "/images/sonth-sliced-dry.jpg",
      "/images/sonth-stone-grind.jpg",
      "/images/sonth-packaged.jpg"
    ],
    "overview": {
      "terroir": "Baramulla Foothills (5,800 ft Altitude)",
      "harvestMethod": "Cleaned, peeled, sun-bleached on mountain mats, and finely milled",
      "aromaFlavor": "Intense warming gingerol pungency, clean peppery aroma with citrus finish",
      "purityGrade": "Grade 1 Export Quality, Zero Fibrous Clumping, Non-Irradiated",
      "packagingStandard": "Nitrogen-purged airtight aluminium-foil canister",
      "shelfLife": "12 Months in cool dry dark place"
    },
    "description": "Made from thick, fibrous mountain ginger rhizomes that are slowly dried under the Himalayan sun until rock-hard, then pulverised into an ultra-fine, silky cream powder. Infuses gravies, herbal teas, and winter tonics with deep, warming gingerol heat.",
    "benefits": [
      "FSSAI Certified: 100% natural ginger root, heavy-metal tested pure",
      "High concentration of gingerols & shogaols for natural immunity and warmth",
      "Traditional pairing with fennel in royal Kashmiri Dum Aloo and Wazwan",
      "Relieves joint stiffness, morning sickness, and digestive sluggishness"
    ],
    "nutrition": {
      "calories": "335 kcal",
      "protein": "9.0g",
      "healthyFats": "4.2g",
      "carbs": "71.6g",
      "fiber": "14.1g"
    },
    "weights": [
      {
        "weight": "100g Jar",
        "price": 190,
        "originalPrice": 260,
        "discount": 27,
        "isDefault": true
      },
      {
        "weight": "250g Pouch",
        "price": 420,
        "originalPrice": 580,
        "discount": 28
      },
      {
        "weight": "500g Pack",
        "price": 790,
        "originalPrice": 1100,
        "discount": 28
      }
    ]
  },
  {
    "id": "jnu-powder-haldi-24",
    "name": "JENU'S High-Curcumin Golden Haldi Powder",
    "subname": "Pure 7%+ Curcumin Himalayan Turmeric Ground Fresh (Zero Lead Chrome)",
    "category": "spices",
    "subCategory": "powdered-spices",
    "productType": "High-Curcumin Pure Mountain Turmeric Powder (Curcuma longa)",
    "origin": "Pulwama Valley, Kashmir",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 5.0,
    "reviewsCount": 1150,
    "badge": "7% Curcumin",
    "badgeType": "gold",
    "fssaiCertified": true,
    "image": "/images/haldi-powder-macro.jpg",
    "images": [
      "/images/haldi-powder-macro.jpg",
      "/images/haldi-rhizome-macro.jpg",
      "/images/haldi-cross-section.jpg",
      "/images/haldi-harvest-roots.jpg",
      "/images/haldi-packaged.jpg"
    ],
    "overview": {
      "terroir": "Pulwama Highland Slopes (5,600 ft Altitude)",
      "harvestMethod": "Boiled in mountain spring water, sun-cured for 25 days, and stone ground",
      "aromaFlavor": "Earthy, musky warm aroma, radiant golden saffron glow, rich natural oils",
      "purityGrade": "Lab-Verified 7.2% Curcumin Content (Commercial brands only have 2-3%)",
      "packagingStandard": "UV-shielded double-seal air-locked jar",
      "shelfLife": "18 Months in cool dry mountain storage"
    },
    "description": "Standard supermarket turmeric is stripped of volatile oils and has barely 2% curcumin. JENU'S Mountain Haldi is sourced from pristine highland plots yielding unbleached roots with over 7% natural curcumin. Radiates deep golden saffron brilliance.",
    "benefits": [
      "FSSAI Certified: 100% pure, 0% lead chromate, 0% starch adulteration",
      "Exceptional 7.2% curcumin strength\u2014powerful cellular antioxidant & anti-inflammatory",
      "Retains natural turmeric oleoresin and healing turmerone volatile oils",
      "Creates golden milk lattes and rich Kashmiri curries with intense color"
    ],
    "nutrition": {
      "calories": "354 kcal",
      "protein": "7.8g",
      "healthyFats": "9.9g",
      "carbs": "64.9g",
      "fiber": "21.1g"
    },
    "weights": [
      {
        "weight": "100g Jar",
        "price": 195,
        "originalPrice": 270,
        "discount": 28,
        "isDefault": true
      },
      {
        "weight": "250g Pouch",
        "price": 440,
        "originalPrice": 620,
        "discount": 29
      },
      {
        "weight": "500g Pack",
        "price": 820,
        "originalPrice": 1180,
        "discount": 31
      }
    ]
  },
  {
    "id": "jnu-powder-garam-masala-25",
    "name": "JENU'S Royal Kashmiri Wazwan Garam Masala",
    "subname": "Master Artisan Blend of Black Cardamom, Cinnamon, Cloves, Mace & Saffron",
    "category": "spices",
    "subCategory": "powdered-spices",
    "productType": "Artisan Royal Wazwan Garam Masala (Whole Mountain Spices Roasted & Ground)",
    "origin": "Old Srinagar Spice Bazaar, Kashmir",
    "harvestYear": "Handcrafted 2026 Blend",
    "rating": 4.9,
    "reviewsCount": 920,
    "badge": "Master Blend",
    "badgeType": "luxury",
    "fssaiCertified": true,
    "image": "/images/garam-masala-powder-macro.jpg",
    "images": [
      "/images/garam-masala-powder-macro.jpg",
      "/images/garam-masala-whole-blend.jpg",
      "/images/garam-masala-roasting.jpg",
      "/images/garam-masala-bowl.jpg",
      "/images/garam-masala-packaged.jpg"
    ],
    "overview": {
      "terroir": "Old Srinagar Spice Bazaar & Pampore Orchards",
      "harvestMethod": "Individual whole spices slow-roasted on cast iron, small-batch blended",
      "aromaFlavor": "Smoky black cardamom, sweet cinnamon warmth, floral mace, and royal saffron threads",
      "purityGrade": "100% Whole Spices Only, Zero Cheap Coriander/Chilli Powder Dilution",
      "packagingStandard": "Double-walled tin with gold embossed seal",
      "shelfLife": "12 Months in airtight container"
    },
    "description": "Unlike commercial garam masalas cut with 50% cheap coriander powder, JENU'S Royal Wazwan recipe consists purely of prized whole spices: smoky mountain black cardamom, sweet Ceylon cinnamon, high-oil cloves, wild star anise, mace blades, and Pampore saffron.",
    "benefits": [
      "FSSAI Certified: 100% whole spices, zero fillers, zero artificial flavoring",
      "Formulated to the exact royal ratio of Kashmir's master banquet chefs",
      "A tiny pinch elevates biryanis, roasts, curries, and vegetable roasts",
      "Infuses profound warmth, complex aroma, and authentic feast quality"
    ],
    "nutrition": {
      "calories": "379 kcal",
      "protein": "11.2g",
      "healthyFats": "14.8g",
      "carbs": "56.4g",
      "fiber": "26.3g"
    },
    "weights": [
      {
        "weight": "100g Jar",
        "price": 280,
        "originalPrice": 390,
        "discount": 28,
        "isDefault": true
      },
      {
        "weight": "250g Pouch",
        "price": 640,
        "originalPrice": 890,
        "discount": 28
      },
      {
        "weight": "500g Pack",
        "price": 1190,
        "originalPrice": 1690,
        "discount": 30
      }
    ]
  },
  {
    "id": "jnu-powder-dhaniya-26",
    "name": "JENU'S Himalayan Mountain Coriander Powder (Dhaniya)",
    "subname": "Cold-Milled Fragrant Small-Seed Mountain Coriander (Citrus Floral Bouquet)",
    "category": "spices",
    "subCategory": "powdered-spices",
    "productType": "Cold-Stone Milled Mountain Coriander Powder (Coriandrum sativum)",
    "origin": "Kupwara Valley, Kashmir",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.8,
    "reviewsCount": 510,
    "badge": "Cold Milled",
    "badgeType": "organic",
    "fssaiCertified": true,
    "image": "/images/dhaniya-powder-macro.jpg",
    "images": [
      "/images/dhaniya-powder-macro.jpg",
      "/images/dhaniya-seeds-macro.jpg",
      "/images/dhaniya-seeds-harvest.jpg",
      "/images/dhaniya-mortar.jpg",
      "/images/dhaniya-packaged.jpg"
    ],
    "overview": {
      "terroir": "Kupwara Mountain Terraces (5,400 ft Altitude)",
      "harvestMethod": "Sun-cured small aromatic coriander berries stone-milled cold",
      "aromaFlavor": "Bright citrusy floral bouquet, subtle warm nutty sweetness",
      "purityGrade": "Grade 1 Bold Mountain Coriander, Unbleached & Non-GMO",
      "packagingStandard": "Aroma-seal aluminium pouch with zip lock",
      "shelfLife": "12 Months in airtight container"
    },
    "description": "High-altitude Himalayan coriander seeds are distinctly smaller and rounder than plains varieties, but contain triple the concentration of aromatic linalool and natural essential oils. Imparts curries with a velvety thick body and refreshing citrus floral aroma.",
    "benefits": [
      "FSSAI Certified: 100% pure coriander, zero stalks, zero sawdust or husk adulterants",
      "High natural linalool oil content delivers a bright, sweet citrus undertone",
      "Thickens curry bases naturally while balancing spice heat",
      "Aids pancreatic enzyme secretion and promotes healthy cholesterol balance"
    ],
    "nutrition": {
      "calories": "298 kcal",
      "protein": "12.4g",
      "healthyFats": "17.8g",
      "carbs": "54.9g",
      "fiber": "41.9g"
    },
    "weights": [
      {
        "weight": "100g Jar",
        "price": 140,
        "originalPrice": 190,
        "discount": 26,
        "isDefault": true
      },
      {
        "weight": "250g Pouch",
        "price": 290,
        "originalPrice": 420,
        "discount": 31
      },
      {
        "weight": "500g Pack",
        "price": 540,
        "originalPrice": 790,
        "discount": 32
      }
    ]
  },
  {
    "id": "jnu-raw-badi-elaichi-27",
    "name": "JENU'S Smoky Kashmiri Badi Elaichi (Black Cardamom)",
    "subname": "Large Ribbed Mountain Pods Sun-Cured Over Pine Wood Smoke",
    "category": "spices",
    "subCategory": "raw-spices",
    "productType": "Grade 1 Jumbo Whole Black Cardamom Pods (Amomum subulatum)",
    "origin": "Kashmir & Himalayan Valleys",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.9,
    "reviewsCount": 830,
    "badge": "Jumbo Pods",
    "badgeType": "bestseller",
    "fssaiCertified": true,
    "image": "/images/badi-elaichi-macro.jpg",
    "images": [
      "/images/badi-elaichi-macro.jpg",
      "/images/badi-elaichi-seeds-close.jpg",
      "/images/badi-elaichi-tray.jpg",
      "/images/badi-elaichi-harvest.jpg",
      "/images/badi-elaichi-packaged.jpg"
    ],
    "overview": {
      "terroir": "High Himalayan Forest Glades (6,200 ft Altitude)",
      "harvestMethod": "Handpicked whole seed pods, traditional slow smoke curing over pine embers",
      "aromaFlavor": "Intense resinous camphor, rich woodsmoke, notes of menthol and ginger",
      "purityGrade": "Grade 1 Extra-Large Unbroken Pods packed with glossy black sticky seeds",
      "packagingStandard": "Heavy glass preserve jar with gold metal lid",
      "shelfLife": "24 Months in cool dry mountain storage"
    },
    "description": "The quintessential royal spice of North Indian and Wazwan cuisine. Our Jumbo Badi Elaichi pods are hand-sorted for maximum size and pod integrity, then slow-cured over pine wood embers to seal in the resinous, smoky camphor essential oils inside.",
    "benefits": [
      "FSSAI Certified: 100% pure mountain pods, zero hollow or insect-damaged rejects",
      "Essential for authentic Dum Biryani, Rogan Josh, Nihari, and Dal Makhani",
      "Each large pod contains 40+ aromatic sticky oil-rich black seeds",
      "Powerful carminative and respiratory decongestant"
    ],
    "nutrition": {
      "calories": "311 kcal",
      "protein": "10.8g",
      "healthyFats": "6.7g",
      "carbs": "68.5g",
      "fiber": "28.0g"
    },
    "weights": [
      {
        "weight": "100g Jar",
        "price": 290,
        "originalPrice": 410,
        "discount": 29,
        "isDefault": true
      },
      {
        "weight": "250g Pouch",
        "price": 680,
        "originalPrice": 960,
        "discount": 29
      },
      {
        "weight": "500g Pack",
        "price": 1290,
        "originalPrice": 1850,
        "discount": 30
      }
    ]
  },
  {
    "id": "jnu-raw-choti-elaichi-28",
    "name": "JENU'S Royal Kashmiri Green Cardamom (Choti Elaichi)",
    "subname": "Extra Bold 8mm+ Vibrant Emerald Pods Bursting with Aromatic Essential Oils",
    "category": "spices",
    "subCategory": "raw-spices",
    "productType": "Grade A+ Extra Bold 8mm+ Whole Green Cardamom (Elettaria cardamomum)",
    "origin": "Himalayan Forest Foothills",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 5.0,
    "reviewsCount": 1640,
    "badge": "8mm+ Bold",
    "badgeType": "gold",
    "fssaiCertified": true,
    "image": "/images/choti-elaichi-macro.jpg",
    "images": [
      "/images/choti-elaichi-macro.jpg",
      "/images/choti-elaichi-seeds-close.jpg",
      "/images/choti-elaichi-handful.jpg",
      "/images/choti-elaichi-brass-bowl.jpg",
      "/images/choti-elaichi-packaged.jpg"
    ],
    "overview": {
      "terroir": "Shaded Mountain Rain Slopes (4,500 ft Altitude)",
      "harvestMethod": "Handpicked at exact maturity, slow shade-dried to lock in vibrant green hue",
      "aromaFlavor": "Exquisite sweet floral eucalyptus perfume, intensely aromatic black seeds",
      "purityGrade": "Grade 8mm+ Jumbo Extra Bold, Unbleached, Zero Artificial Green Dye",
      "packagingStandard": "Gold luxury airtight container with aroma-lock seal",
      "shelfLife": "24 Months in cool dark pantry"
    },
    "description": "Known as the Queen of Spices. JENU'S selects only the rarest 8mm+ extra bold pods\u2014fat, heavy, and intensely green. Crack open a pod to find densely packed, pitch-black resinous seeds that release a heady rush of floral, sweet cineole perfume.",
    "benefits": [
      "FSSAI Certified: 100% natural, lab-tested free from chemical green dye or washes",
      "Extra-bold 8mm+ pods contain high 8-10% volatile essential oil concentration",
      "The crowning aromatic in royal Shahi Kahwa, saffron desserts, and celebratory feasts",
      "Natural breath freshener, digestive tonic, and mood enhancer"
    ],
    "nutrition": {
      "calories": "311 kcal",
      "protein": "10.8g",
      "healthyFats": "6.7g",
      "carbs": "68.5g",
      "fiber": "28.0g"
    },
    "weights": [
      {
        "weight": "50g Jar",
        "price": 320,
        "originalPrice": 450,
        "discount": 29,
        "isDefault": true
      },
      {
        "weight": "100g Tin",
        "price": 590,
        "originalPrice": 850,
        "discount": 31
      },
      {
        "weight": "250g Pack",
        "price": 1390,
        "originalPrice": 1990,
        "discount": 30
      }
    ]
  },
  {
    "id": "jnu-raw-cinnamon-29",
    "name": "JENU'S Organic Ceylon Cinnamon Quills (Dalchini)",
    "subname": "Multi-Layered Sweet Fragrant Bark Sticks (Zero Toxic Coumarin)",
    "category": "spices",
    "subCategory": "raw-spices",
    "productType": "True Ceylon Cinnamon Quills (Cinnamomum verum / Alba Grade Sticks)",
    "origin": "Highland Forest Groves",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.9,
    "reviewsCount": 870,
    "badge": "True Ceylon",
    "badgeType": "organic",
    "fssaiCertified": true,
    "image": "/images/cinnamon-quills-macro.jpg",
    "images": [
      "/images/cinnamon-quills-macro.jpg",
      "/images/cinnamon-layers-close.jpg",
      "/images/cinnamon-bundle.jpg",
      "/images/cinnamon-bark-harvest.jpg",
      "/images/cinnamon-packaged.jpg"
    ],
    "overview": {
      "terroir": "High Altitude Organic Forest Groves (4,000 ft Altitude)",
      "harvestMethod": "Paper-thin inner bark hand-peeled and rolled into multi-layered cigar quills",
      "aromaFlavor": "Delicate sweet warm cinnamon aroma, subtle spicy citrus, zero harsh bite",
      "purityGrade": "True Ceylon (Cinnamomum verum) \u2014 under 0.004% coumarin (safe for daily use)",
      "packagingStandard": "Airtight tall canister to preserve intact quill sticks",
      "shelfLife": "36 Months in cool dry storage"
    },
    "description": "Most commercial 'cinnamon' in stores is actually cheap Chinese Cassia\u2014hard as rock and full of liver-toxic coumarin. JENU'S brings you True Ceylon Cinnamon: fragile, multi-layered quills that crumble in your fingers, releasing a subtle, sweet, refined warmth.",
    "benefits": [
      "FSSAI Certified: True Ceylon cinnamon verified, safe ultra-low coumarin (<0.004%)",
      "Multiple paper-thin layers rolled into cigar quills, easily crushed by hand",
      "Proven support for healthy blood sugar metabolism and insulin sensitivity",
      "Subtle gourmet sweetness for kahwa tea, spiced mulled cider, and curries"
    ],
    "nutrition": {
      "calories": "247 kcal",
      "protein": "4.0g",
      "healthyFats": "1.2g",
      "carbs": "80.6g",
      "fiber": "53.1g"
    },
    "weights": [
      {
        "weight": "100g Tube",
        "price": 260,
        "originalPrice": 360,
        "discount": 28,
        "isDefault": true
      },
      {
        "weight": "250g Pouch",
        "price": 590,
        "originalPrice": 820,
        "discount": 28
      },
      {
        "weight": "500g Pack",
        "price": 1090,
        "originalPrice": 1550,
        "discount": 30
      }
    ]
  },
  {
    "id": "jnu-raw-cloves-30",
    "name": "JENU'S High-Oil Kashmiri Cloves (Laung)",
    "subname": "Intact Handpicked Flower Buds with Natural Oil Sheen & Crown Intact",
    "category": "spices",
    "subCategory": "raw-spices",
    "productType": "Grade 1 Whole Clove Buds (Syzygium aromaticum Handpicked)",
    "origin": "Himalayan Foothill Gardens",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.9,
    "reviewsCount": 730,
    "badge": "High Eugenol",
    "badgeType": "bestseller",
    "fssaiCertified": true,
    "image": "/images/cloves-macro.jpg",
    "images": [
      "/images/cloves-macro.jpg",
      "/images/cloves-oil-sheen.jpg",
      "/images/cloves-handful.jpg",
      "/images/cloves-harvest.jpg",
      "/images/cloves-packaged.jpg"
    ],
    "overview": {
      "terroir": "Himalayan Forest Gardens (4,200 ft Altitude)",
      "harvestMethod": "Hand-plucked before pink petals open, sun-dried on mats until deep reddish-brown",
      "aromaFlavor": "Pungent sweet aromatic warmth, numbing eugenol spicy tingle",
      "purityGrade": "Grade 1 Handpicked: 100% Head-Intact Whole Buds, High 18%+ Essential Oil",
      "packagingStandard": "Luxury glass container with airtight gold metal cap",
      "shelfLife": "24 Months in cool dark cupboard"
    },
    "description": "Press a JENU'S clove with your fingernail and you will see pure eugenol oil seep onto your skin. Every single clove is hand-sorted to ensure the spherical flower bud (head) is intact on the stem. Imparts profound aromatic depth and comforting winter warmth.",
    "benefits": [
      "FSSAI Certified: 100% whole cloves, zero headless stems or exhausted oil rejects",
      "Floats vertically in water\u2014the authentic hallmark of oil-saturated premium cloves",
      "Rich in eugenol: potent natural antibacterial, dental soother, and throat warmer",
      "Essential anchor spice for Shahi Kahwa tea, biryani tadka, and mulled drinks"
    ],
    "nutrition": {
      "calories": "274 kcal",
      "protein": "6.0g",
      "healthyFats": "13.0g",
      "carbs": "65.5g",
      "fiber": "33.9g"
    },
    "weights": [
      {
        "weight": "100g Jar",
        "price": 280,
        "originalPrice": 390,
        "discount": 28,
        "isDefault": true
      },
      {
        "weight": "250g Pouch",
        "price": 640,
        "originalPrice": 900,
        "discount": 29
      },
      {
        "weight": "500g Pack",
        "price": 1220,
        "originalPrice": 1750,
        "discount": 30
      }
    ]
  },
  {
    "id": "jnu-raw-star-anise-31",
    "name": "JENU'S Royal Whole Star Anise (Chakra Phool)",
    "subname": "8-Pointed Unbroken Aromatic Star Pods with Glossy Amber Seeds",
    "category": "spices",
    "subCategory": "raw-spices",
    "productType": "Grade A Unbroken Whole Star Anise Pods (Illicium verum)",
    "origin": "Himalayan Evergreen Valleys",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.8,
    "reviewsCount": 590,
    "badge": "Unbroken Stars",
    "badgeType": "luxury",
    "fssaiCertified": true,
    "image": "/images/star-anise-macro.jpg",
    "images": [
      "/images/star-anise-macro.jpg",
      "/images/star-anise-single-close.jpg",
      "/images/star-anise-walnut-wood.jpg",
      "/images/star-anise-harvest.jpg",
      "/images/star-anise-packaged.jpg"
    ],
    "overview": {
      "terroir": "Himalayan Mountain Foothills (4,800 ft Altitude)",
      "harvestMethod": "Hand-harvested when unripe green, sun-dried until deep rust-brown star carps open",
      "aromaFlavor": "Intense sweet licorice, pungent floral anethole bouquet with herbal undertones",
      "purityGrade": "100% Pure Illicium verum (Zero toxic wild Japanese star anise adulteration)",
      "packagingStandard": "Wide-mouth preserve container protecting fragile star points",
      "shelfLife": "24 Months in dry pantry"
    },
    "description": "Resembling carved wooden ornaments, our whole Star Anise pods are hand-selected for complete 8-pointed star symmetry. Each boat-shaped carpel cradles a glossy, aromatic amber seed that infuses royal biryanis, broths, and spiced chai with complex sweet perfume.",
    "benefits": [
      "FSSAI Certified: 100% authentic edible star anise, lab-tested safe & pure",
      "Handpicked unbroken stars: visually striking presentation for gourmet kitchens",
      "Natural rich source of shikimic acid (the active antiviral compound)",
      "Imparts a smooth, lingering sweet anethole note to slow-cooked gravies"
    ],
    "nutrition": {
      "calories": "337 kcal",
      "protein": "18.0g",
      "healthyFats": "16.0g",
      "carbs": "50.0g",
      "fiber": "14.6g"
    },
    "weights": [
      {
        "weight": "100g Jar",
        "price": 240,
        "originalPrice": 340,
        "discount": 29,
        "isDefault": true
      },
      {
        "weight": "250g Pouch",
        "price": 540,
        "originalPrice": 780,
        "discount": 31
      },
      {
        "weight": "500g Pack",
        "price": 990,
        "originalPrice": 1450,
        "discount": 32
      }
    ]
  },
  {
    "id": "jnu-raw-mace-32",
    "name": "JENU'S Golden Mace Blades (Javitri Flower)",
    "subname": "Lattice Aril of Mountain Nutmeg (Golden Orange Translucent Lace)",
    "category": "spices",
    "subCategory": "raw-spices",
    "productType": "Artisanal Whole Mace Blades (Myristica fragrans Lacy Aril / Javitri)",
    "origin": "Himalayan Forest Gardens",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.9,
    "reviewsCount": 480,
    "badge": "Lacy Flower",
    "badgeType": "gold",
    "fssaiCertified": true,
    "image": "/images/mace-javitri-macro.jpg",
    "images": [
      "/images/mace-javitri-macro.jpg",
      "/images/mace-aril-nutmeg-close.jpg",
      "/images/mace-tray.jpg",
      "/images/mace-handful.jpg",
      "/images/mace-packaged.jpg"
    ],
    "overview": {
      "terroir": "Sub-Himalayan Spice Groves (4,100 ft Altitude)",
      "harvestMethod": "Carefully peeled by hand from fresh nutmeg nuts, flattened and sun-cured into golden amber blades",
      "aromaFlavor": "Exquisitely delicate warm nutmeg perfume, floral citrus notes, subtle bittersweet finish",
      "purityGrade": "Grade 1 Whole Golden Mace Blades, Zero Powder Breakage or Spent Arils",
      "packagingStandard": "Cushioned air-locked glass jar preserving fragile lace blades",
      "shelfLife": "24 Months in dark cool pantry"
    },
    "description": "The delicate, crimson-amber lace webbing that envelops the nutmeg seed. Hand-peeled in whole pieces and sun-cured until brittle, Javitri delivers a more refined, floral, and intensely fragrant alternative to nutmeg. The secret high-note in Kashmiri Wazwan Rista.",
    "benefits": [
      "FSSAI Certified: 100% whole unbroken mace blades, zero synthetic dyes or oils",
      "Prized for creating royal transparent broths without muddying food color",
      "Rich in myristicin and elemicin: traditional digestive stimulant and calming tonic",
      "Instantly perfumes royal Awadhi and Kashmiri feast preparations"
    ],
    "nutrition": {
      "calories": "475 kcal",
      "protein": "6.7g",
      "healthyFats": "32.4g",
      "carbs": "50.5g",
      "fiber": "20.2g"
    },
    "weights": [
      {
        "weight": "50g Jar",
        "price": 340,
        "originalPrice": 480,
        "discount": 29,
        "isDefault": true
      },
      {
        "weight": "100g Tin",
        "price": 640,
        "originalPrice": 920,
        "discount": 30
      },
      {
        "weight": "250g Pack",
        "price": 1490,
        "originalPrice": 2150,
        "discount": 31
      }
    ]
  },
  {
    "id": "jnu-cashews-jumbo-33",
    "name": "JENU'S Royal Jumbo Cashews (King W180 Kaju)",
    "subname": "Extra Large Whole Creamy White Cashew Nuts (Grade W180 King Size)",
    "category": "dryfruits",
    "subCategory": "cashews",
    "productType": "Grade W180 King Size Jumbo Whole Cashew Kernels (Anacardium occidentale)",
    "origin": "Himalayan Mountain Storage Reserve",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 5.0,
    "reviewsCount": 1820,
    "badge": "W180 King Size",
    "badgeType": "gold",
    "fssaiCertified": true,
    "image": "/images/cashews-jumbo-macro.jpg",
    "images": [
      "/images/cashews-jumbo-macro.jpg",
      "/images/cashews-w180-scale.jpg",
      "/images/cashews-handful.jpg",
      "/images/cashews-raw-bowl.jpg",
      "/images/cashews-packaged.jpg"
    ],
    "overview": {
      "terroir": "Pristine Mountain Reserve Storage (4,800 ft Altitude)",
      "harvestMethod": "Carefully shelled, steam-conditioned, hand-sorted for maximum W180 count (under 180 nuts per pound)",
      "aromaFlavor": "Buttery, sweet, melt-in-mouth creamy texture with natural crisp snap",
      "purityGrade": "Grade W180 King Size: Zero Blemishes, Zero Splits, Zero Chemical Bleaching",
      "packagingStandard": "Nitrogen-flushed vacuum-sealed food-grade tin canister",
      "shelfLife": "12 Months in airtight container"
    },
    "description": "Known across the dryfruit trade as the 'King of Cashews'. W180 represents the largest, rarest cashew grade in the world\u2014requiring less than 180 nuts to weigh a full pound. Hand-selected for immaculate ivory color, giant crescent curve, and rich buttery crunch.",
    "benefits": [
      "FSSAI Certified: 100% natural, unbleached, zero chemical polishing agents",
      "Giant King W180 size delivers an exceptionally rich, velvety creamy crunch",
      "High in heart-healthy monounsaturated oleic acid and plant-based protein",
      "Rich in copper, magnesium, and phosphorus for bone and cellular energy"
    ],
    "nutrition": {
      "calories": "553 kcal",
      "protein": "18.2g",
      "healthyFats": "43.8g",
      "carbs": "30.2g",
      "fiber": "3.3g"
    },
    "weights": [
      {
        "weight": "250g Jar",
        "price": 490,
        "originalPrice": 690,
        "discount": 29,
        "isDefault": true
      },
      {
        "weight": "500g Tin",
        "price": 940,
        "originalPrice": 1350,
        "discount": 30
      },
      {
        "weight": "1kg Box",
        "price": 1790,
        "originalPrice": 2600,
        "discount": 31
      }
    ]
  },
  {
    "id": "jnu-cashews-roasted-34",
    "name": "JENU'S Slow-Roasted Himalayan Pink Salt Cashews",
    "subname": "Golden-Roasted Jumbo Cashews Lightly Seasoned with Pure Rock Salt",
    "category": "dryfruits",
    "subCategory": "cashews",
    "productType": "Dry Slow-Roasted Jumbo Cashews with Crushed Himalayan Pink Salt",
    "origin": "Artisanal Valley Roastery, Srinagar",
    "harvestYear": "Fresh Roasted 2026 Batch",
    "rating": 4.9,
    "reviewsCount": 1340,
    "badge": "Slow Roasted",
    "badgeType": "bestseller",
    "fssaiCertified": true,
    "image": "/images/cashews-roasted-macro.jpg",
    "images": [
      "/images/cashews-roasted-macro.jpg",
      "/images/cashews-roasted-bowl.jpg",
      "/images/cashews-roasted-split.jpg",
      "/images/cashews-roasting-process.jpg",
      "/images/cashews-roasted-packaged.jpg"
    ],
    "overview": {
      "terroir": "Artisanal Valley Roastery, Srinagar",
      "harvestMethod": "Dry hot-air roasted without oil, tossed with micro-pulverized Himalayan pink crystal salt",
      "aromaFlavor": "Toasty caramelised nut butter, delicate mineral salt crunch, zero greasy residue",
      "purityGrade": "100% Oil-Free Dry Roast, Pure Unrefined Himalayan Rock Salt",
      "packagingStandard": "Aroma-locked nitrogen-flushed foil canister",
      "shelfLife": "9 Months in airtight container"
    },
    "description": "We take our giant jumbo cashews and slow-roast them in small batches with hot mountain air\u2014never deep-fried in commercial palm oil. Finished with a delicate dusting of mineral-rich Himalayan pink salt to accentuate the natural sweetness of the cashew nut.",
    "benefits": [
      "FSSAI Certified: 100% oil-free dry roasted, zero added palm oil or hydrogenated fats",
      "Seasoned with genuine unrefined Himalayan pink salt containing 84 trace minerals",
      "Ultra-crispy snap that stays crunchy long after opening the aroma seal",
      "Guilt-free premium energy snack for high-performance active lifestyles"
    ],
    "nutrition": {
      "calories": "574 kcal",
      "protein": "17.6g",
      "healthyFats": "46.3g",
      "carbs": "29.7g",
      "fiber": "3.1g"
    },
    "weights": [
      {
        "weight": "250g Jar",
        "price": 520,
        "originalPrice": 720,
        "discount": 28,
        "isDefault": true
      },
      {
        "weight": "500g Tin",
        "price": 990,
        "originalPrice": 1420,
        "discount": 30
      },
      {
        "weight": "1kg Box",
        "price": 1890,
        "originalPrice": 2750,
        "discount": 31
      }
    ]
  },
  {
    "id": "jnu-pista-inshell-35",
    "name": "JENU'S Royal Mountain In-Shell Pistachios",
    "subname": "Naturally Opened Jumbo Shells with Rich Emerald Purple Kernels",
    "category": "dryfruits",
    "subCategory": "pistachios",
    "productType": "Grade A+ Jumbo Roasted In-Shell Pistachios Lightly Salted (Pistacia vera)",
    "origin": "Himalayan Mountain Orchards",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.9,
    "reviewsCount": 1210,
    "badge": "Naturally Split",
    "badgeType": "bestseller",
    "fssaiCertified": true,
    "image": "/images/pista-inshell-macro.jpg",
    "images": [
      "/images/pista-inshell-macro.jpg",
      "/images/pista-split-handful.jpg",
      "/images/pista-wood-tray.jpg",
      "/images/pista-harvest-orchard.jpg",
      "/images/pista-inshell-packaged.jpg"
    ],
    "overview": {
      "terroir": "High Altitude Arid Mountain Slopes (5,200 ft Altitude)",
      "harvestMethod": "Tree-ripened until shells naturally pop open ('smiling pistachios'), lightly sea-salted",
      "aromaFlavor": "Rich buttery nut crunch, savoury mineral salt finish, sweet chlorophyll undertone",
      "purityGrade": "Naturally Split Only (Zero mechanically forced open shells, zero closed nut duds)",
      "packagingStandard": "Resealable stand-up aroma pouch with oxygen absorber",
      "shelfLife": "12 Months in airtight container"
    },
    "description": "Every single pistachio in this selection opened naturally on the tree branch when fully ripe. Unlike chemically forced or mechanically cracked commercial nuts, naturally split pistachios boast vibrant green-purple kernels that retain their natural sweet essential oils.",
    "benefits": [
      "FSSAI Certified: 100% naturally opened shells, 99%+ smiling crack rate",
      "Lightly roasted with a trace of sea salt for crisp, irresistible shelling pleasure",
      "One of the lowest-calorie, highest-protein nuts with potent lutein & zeaxanthin",
      "Supports ocular health, heart vitality, and mindful portion-controlled snacking"
    ],
    "nutrition": {
      "calories": "562 kcal",
      "protein": "20.3g",
      "healthyFats": "45.3g",
      "carbs": "27.5g",
      "fiber": "10.6g"
    },
    "weights": [
      {
        "weight": "250g Jar",
        "price": 540,
        "originalPrice": 750,
        "discount": 28,
        "isDefault": true
      },
      {
        "weight": "500g Tin",
        "price": 1040,
        "originalPrice": 1480,
        "discount": 30
      },
      {
        "weight": "1kg Box",
        "price": 1990,
        "originalPrice": 2890,
        "discount": 31
      }
    ]
  },
  {
    "id": "jnu-pista-giri-36",
    "name": "JENU'S Emerald Pistachio Kernels (Pista Giri)",
    "subname": "100% Raw Shelled Vivid Green Pistachio Slivers for Shahi Kahwa & Gourmet Delicacies",
    "category": "dryfruits",
    "subCategory": "pistachios",
    "productType": "Raw Unsalted Emerald Shelled Pistachio Kernels (Super-Green Pista Giri)",
    "origin": "Himalayan Highland Orchards",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 5.0,
    "reviewsCount": 840,
    "badge": "Emerald Green",
    "badgeType": "gold",
    "fssaiCertified": true,
    "image": "/images/pista-giri-macro.jpg",
    "images": [
      "/images/pista-giri-macro.jpg",
      "/images/pista-slivers-close.jpg",
      "/images/pista-giri-handful.jpg",
      "/images/pista-kahwa-garnish.jpg",
      "/images/pista-giri-packaged.jpg"
    ],
    "overview": {
      "terroir": "High Altitude Cold Slopes (5,800 ft Altitude)",
      "harvestMethod": "Early harvest kernels shelled gently by hand to protect pristine green chlorophyll layer",
      "aromaFlavor": "Sweet, delicate raw pistachio cream, intense green aroma, tender crunch",
      "purityGrade": "Grade A1 Super Green: 100% Raw, Unsalted, Zero Shell Shards, Zero Brown Discoloration",
      "packagingStandard": "Nitrogen-purged vacuum pack protecting chlorophyll from oxidation",
      "shelfLife": "12 Months in refrigeration"
    },
    "description": "Picked early in the season when the chlorophyll pigmentation is at its absolute peak, our raw Pista Giri kernels are prized for their vivid emerald green color. The mandatory royal garnish for steaming cups of Kashmiri Shahi Kahwa, phirni, and kheer.",
    "benefits": [
      "FSSAI Certified: 100% pure raw kernels, zero salt, zero oil, zero preservatives",
      "Vibrant emerald color naturally highlights Kashmiri kahwa and luxury festive sweets",
      "Dense with natural antioxidants, vitamin B6, thiamine, and potassium",
      "Slivers smoothly without crumbling into dust"
    ],
    "nutrition": {
      "calories": "569 kcal",
      "protein": "21.1g",
      "healthyFats": "45.8g",
      "carbs": "28.3g",
      "fiber": "10.3g"
    },
    "weights": [
      {
        "weight": "150g Jar",
        "price": 490,
        "originalPrice": 690,
        "discount": 29,
        "isDefault": true
      },
      {
        "weight": "300g Pouch",
        "price": 940,
        "originalPrice": 1340,
        "discount": 30
      },
      {
        "weight": "600g Pack",
        "price": 1790,
        "originalPrice": 2590,
        "discount": 31
      }
    ]
  },
  {
    "id": "jnu-raisins-green-37",
    "name": "JENU'S Royal Long Green Seedless Raisins (Kishmish)",
    "subname": "Sun-Cured Slender Sweet Emerald Grapes (Zero Sulphur Treatment)",
    "category": "dryfruits",
    "subCategory": "raisins",
    "productType": "Extra Long Shade-Dried Green Seedless Raisins (Kishmish / Sultanas)",
    "origin": "Kashmir & Afghan Border Valleys",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.8,
    "reviewsCount": 990,
    "badge": "No Sulphur",
    "badgeType": "organic",
    "fssaiCertified": true,
    "image": "/images/raisins-green-macro.jpg",
    "images": [
      "/images/raisins-green-macro.jpg",
      "/images/raisins-green-handful.jpg",
      "/images/raisins-drying-shade.jpg",
      "/images/raisins-green-bowl.jpg",
      "/images/raisins-green-packaged.jpg"
    ],
    "overview": {
      "terroir": "Arid Mountain River Terraces (4,900 ft Altitude)",
      "harvestMethod": "Harvested from heirloom long grapevines, dried in ventilated mountain shade-houses",
      "aromaFlavor": "Honeyed sweetness with refreshing grape tang, juicy chewy tender skin",
      "purityGrade": "Naturally Shade-Dried: 100% Free of Chemical Sulphur Dioxide Bleaching",
      "packagingStandard": "Moisture-barrier canister with aroma preservation lid",
      "shelfLife": "12 Months in cool dry storage"
    },
    "description": "Slender, elongated grapes dried in traditional mud-brick ventilated drying houses called 'Kishmish Khana'. The gentle mountain breeze cures the grapes slowly without harsh sunlight, preserving their natural translucent emerald-amber hue and juicy sweetness.",
    "benefits": [
      "FSSAI Certified: 100% natural shade-cured, certified zero sulphur dioxide residue",
      "Signature long slender grape profile (up to 2.5cm long)\u2014tender and non-sticky",
      "Rich in natural fruit fructose, potassium, iron, and digestive dietary fiber",
      "Perfect wholesome natural sweetener for morning oatmeal, desserts, and snacks"
    ],
    "nutrition": {
      "calories": "299 kcal",
      "protein": "3.1g",
      "healthyFats": "0.5g",
      "carbs": "79.2g",
      "fiber": "3.7g"
    },
    "weights": [
      {
        "weight": "250g Jar",
        "price": 240,
        "originalPrice": 340,
        "discount": 29,
        "isDefault": true
      },
      {
        "weight": "500g Tin",
        "price": 460,
        "originalPrice": 660,
        "discount": 30
      },
      {
        "weight": "1kg Box",
        "price": 860,
        "originalPrice": 1260,
        "discount": 32
      }
    ]
  },
  {
    "id": "jnu-raisins-black-38",
    "name": "JENU'S High-Altitude Black Raisins (Kali Kishmish)",
    "subname": "Iron-Rich Deep Purple Seedless Sun-Dried Mountain Grapes",
    "category": "dryfruits",
    "subCategory": "raisins",
    "productType": "Seedless Black Mountain Raisins (Kali Kishmish / Munakka Alternative)",
    "origin": "Highland Mountain Orchards",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.9,
    "reviewsCount": 1120,
    "badge": "High Iron",
    "badgeType": "ayurvedic",
    "fssaiCertified": true,
    "image": "/images/raisins-black-macro.jpg",
    "images": [
      "/images/raisins-black-macro.jpg",
      "/images/raisins-black-handful.jpg",
      "/images/raisins-black-hydrated.jpg",
      "/images/raisins-black-vine.jpg",
      "/images/raisins-black-packaged.jpg"
    ],
    "overview": {
      "terroir": "High Himalayan Valleys (5,600 ft Altitude)",
      "harvestMethod": "Sun-dried in dry alpine air until grape sugars concentrate into deep purple-black nuggets",
      "aromaFlavor": "Deep rich berry wine sweetness, plump fleshy chew, subtle antioxidant tartness",
      "purityGrade": "Grade 1 Seedless: 100% Sun-Cured, Zero Added Sugars, Zero Artificial Glaze",
      "packagingStandard": "Food-grade airtight container with freshness seal",
      "shelfLife": "12 Months in airtight container"
    },
    "description": "Renowned in Ayurvedic and Unani traditions as a blood-building superfood. Sourced from deep-purple mountain grapes with exceptionally high anthocyanin and bioavailable iron content. Plump, seedless, and bursting with concentrated natural grape richness.",
    "benefits": [
      "FSSAI Certified: 100% natural, lab-tested pesticide-free and heavy-metal safe",
      "Exceptional natural plant iron content: highly recommended for hemoglobin health",
      "Soak overnight in water for traditional morning vitality and bowel regularity",
      "Packed with resveratrol and polyphenol antioxidants for radiant skin"
    ],
    "nutrition": {
      "calories": "296 kcal",
      "protein": "2.8g",
      "healthyFats": "0.4g",
      "carbs": "78.4g",
      "fiber": "4.5g"
    },
    "weights": [
      {
        "weight": "250g Jar",
        "price": 260,
        "originalPrice": 370,
        "discount": 30,
        "isDefault": true
      },
      {
        "weight": "500g Tin",
        "price": 490,
        "originalPrice": 710,
        "discount": 31
      },
      {
        "weight": "1kg Box",
        "price": 920,
        "originalPrice": 1360,
        "discount": 32
      }
    ]
  },
  {
    "id": "jnu-dates-medjool-39",
    "name": "JENU'S Royal Soft Medjool Dates (Khajoor)",
    "subname": "Plump Caramel-Rich Whole Dates with Soft Honey Pulp (Large Size)",
    "category": "dryfruits",
    "subCategory": "dates",
    "productType": "Grade A Premium Large Medjool Dates (Phoenix dactylifera)",
    "origin": "Mountain Sun Groves Reserve",
    "harvestYear": "2026 Fresh Harvest",
    "rating": 5.0,
    "reviewsCount": 1450,
    "badge": "Jumbo Medjool",
    "badgeType": "gold",
    "fssaiCertified": true,
    "image": "/images/dates-medjool-macro.jpg",
    "images": [
      "/images/dates-medjool-macro.jpg",
      "/images/dates-medjool-open-close.jpg",
      "/images/dates-medjool-five.jpg",
      "/images/dates-palm-harvest.jpg",
      "/images/dates-medjool-packaged.jpg"
    ],
    "overview": {
      "terroir": "Mineral-Rich Oasis Groves Reserve",
      "harvestMethod": "Handpicked tree-ripened clusters, gently sorted by hand to prevent skin bruising",
      "aromaFlavor": "Velvety caramel, maple syrup sweetness, melting soft honey fruit texture",
      "purityGrade": "Grade A Jumbo: Extra-Large Whole Dates, 100% Raw, Zero Added Glucose Syrup",
      "packagingStandard": "Royal hinged presentation gift box with gold crest",
      "shelfLife": "12 Months in refrigeration"
    },
    "description": "Known as the 'Jewel of Dates'. Unlike ordinary dry packaged dates, our Jumbo Medjool dates are exceptionally large, moist, and tender. Bite into one to experience an explosion of natural maple caramel pulp that melts on the tongue like a fine confection.",
    "benefits": [
      "FSSAI Certified: 100% natural fruit, zero added sugar syrup, zero chemical fumigants",
      "Sublime caramel flavor and soft pillow texture\u2014the undisputed king of dessert dates",
      "Outstanding natural energy fuel: rich in potassium, magnesium, and dietary fiber",
      "Ideal for Ramadan Iftar, morning stamina, and pre-workout clean energy"
    ],
    "nutrition": {
      "calories": "277 kcal",
      "protein": "1.8g",
      "healthyFats": "0.2g",
      "carbs": "75.0g",
      "fiber": "6.7g"
    },
    "weights": [
      {
        "weight": "350g Gift Box",
        "price": 490,
        "originalPrice": 690,
        "discount": 29,
        "isDefault": true
      },
      {
        "weight": "700g Royal Tin",
        "price": 940,
        "originalPrice": 1340,
        "discount": 30
      },
      {
        "weight": "1.4kg Master Pack",
        "price": 1790,
        "originalPrice": 2590,
        "discount": 31
      }
    ]
  },
  {
    "id": "jnu-dates-chhuara-40",
    "name": "JENU'S Traditional Kashmiri Sun-Dried Dates (Chhuara)",
    "subname": "Rock-Hard Nutrient-Dense Mountain Sun-Cured Dates for Vigour & Energy",
    "category": "dryfruits",
    "subCategory": "dates",
    "productType": "Traditional Whole Sun-Dried Yellow & Black Dates (Pahadi Chhuara)",
    "origin": "Highland Valley Reserve",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.8,
    "reviewsCount": 610,
    "badge": "Pahadi Chhuara",
    "badgeType": "ayurvedic",
    "fssaiCertified": true,
    "image": "/images/dates-chhuara-macro.jpg",
    "images": [
      "/images/dates-chhuara-macro.jpg",
      "/images/dates-chhuara-handful.jpg",
      "/images/dates-chhuara-split.jpg",
      "/images/dates-chhuara-brass-bowl.jpg",
      "/images/dates-chhuara-packaged.jpg"
    ],
    "overview": {
      "terroir": "Highland Mountain Terraces (5,100 ft Altitude)",
      "harvestMethod": "Boiled in herbal water, sun-baked for weeks until completely dehydrated and dense",
      "aromaFlavor": "Concentrated earthy date sweetness, firm chewy texture, deep malty notes",
      "purityGrade": "Grade 1 Whole Chhuara: Clean, Sound, Zero Insect Hollows, Unbleached",
      "packagingStandard": "Heavy-duty moisture-proof tin with inner seal",
      "shelfLife": "24 Months in cool dry storage"
    },
    "description": "Traditional Kashmiri Chhuara are sun-cured until rock-hard, concentrating every gram of calcium, iron, and natural sugars. Traditionally boiled in milk with crushed Mamra almonds and saffron to create a legendary Kashmiri winter tonic for physical vigor.",
    "benefits": [
      "FSSAI Certified: 100% natural mountain dried dates, verified pure and sound",
      "High calcium & iron content: traditional Ayurvedic tonic for bone density and stamina",
      "Boil with warm milk and crushed nuts for an authentic restorative bedtime drink",
      "Long shelf life of 2 years without requiring artificial refrigeration"
    ],
    "nutrition": {
      "calories": "282 kcal",
      "protein": "2.5g",
      "healthyFats": "0.4g",
      "carbs": "76.0g",
      "fiber": "8.0g"
    },
    "weights": [
      {
        "weight": "250g Jar",
        "price": 190,
        "originalPrice": 270,
        "discount": 30,
        "isDefault": true
      },
      {
        "weight": "500g Tin",
        "price": 360,
        "originalPrice": 520,
        "discount": 31
      },
      {
        "weight": "1kg Box",
        "price": 690,
        "originalPrice": 990,
        "discount": 30
      }
    ]
  },
  {
    "id": "jnu-hazelnuts-41",
    "name": "JENU'S Wild Himalayan Hazelnut Kernels",
    "subname": "Crunchy High-Oil Wild Forest Filberts with Rich Buttery Flavour",
    "category": "dryfruits",
    "subCategory": "nuts",
    "productType": "Wild Himalayan Forest Hazelnut Kernels (Corylus avellana / Filberts)",
    "origin": "Gulmarg & Pir Panjal Forests, Kashmir",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.9,
    "reviewsCount": 670,
    "badge": "Wild Forest",
    "badgeType": "organic",
    "fssaiCertified": true,
    "image": "/images/hazelnuts-macro.jpg",
    "images": [
      "/images/hazelnuts-macro.jpg",
      "/images/hazelnuts-inshell-cracked.jpg",
      "/images/hazelnuts-roasted-skins.jpg",
      "/images/hazelnuts-forest-harvest.jpg",
      "/images/hazelnuts-packaged.jpg"
    ],
    "overview": {
      "terroir": "Pir Panjal Conifer Slopes (7,200 ft Altitude)",
      "harvestMethod": "Wild-foraged in sub-alpine hazel thickets, sun-cured, and hand-cracked",
      "aromaFlavor": "Rich nutty praline sweetness, crisp woody crunch, natural hazelnut butter oils",
      "purityGrade": "100% Wild Forest Harvest, Raw & Unpolished, Non-GMO",
      "packagingStandard": "Airtight canister preserving delicate unsaturated fatty acids",
      "shelfLife": "12 Months in cool dry storage"
    },
    "description": "Foraged by local communities in the pristine alpine pine valleys of Kashmir. Wild Himalayan hazelnuts develop in sub-zero winters, yielding kernels with a higher natural oil density, deep praline aroma, and an unbeatable buttery forest crunch.",
    "benefits": [
      "FSSAI Certified: 100% wild forest harvest, free of agricultural sprays or fertilizers",
      "Rich in heart-protective monounsaturated fatty acids and natural Vitamin E",
      "High concentration of folate and manganese for neural and metabolic health",
      "Roasts into phenomenal homemade praline, desserts, and nut butter spreads"
    ],
    "nutrition": {
      "calories": "628 kcal",
      "protein": "15.0g",
      "healthyFats": "60.8g",
      "carbs": "16.7g",
      "fiber": "9.7g"
    },
    "weights": [
      {
        "weight": "200g Jar",
        "price": 460,
        "originalPrice": 640,
        "discount": 28,
        "isDefault": true
      },
      {
        "weight": "400g Tin",
        "price": 890,
        "originalPrice": 1260,
        "discount": 29
      },
      {
        "weight": "800g Box",
        "price": 1690,
        "originalPrice": 2450,
        "discount": 31
      }
    ]
  },
  {
    "id": "jnu-pecans-42",
    "name": "JENU'S Alpine Pecan Halves & Macadamia Medley",
    "subname": "Extra Crisp Rich Buttery Tree Nuts Hand-Cracked in Cold Mountain Foothills",
    "category": "dryfruits",
    "subCategory": "nuts",
    "productType": "Raw Whole Pecan Halves & Macadamia Nut Kernel Medley",
    "origin": "Himalayan Orchard Foothills",
    "harvestYear": "2026 Fresh Valley Harvest",
    "rating": 4.9,
    "reviewsCount": 540,
    "badge": "Gourmet Medley",
    "badgeType": "luxury",
    "fssaiCertified": true,
    "image": "/images/pecans-macro.jpg",
    "images": [
      "/images/pecans-macro.jpg",
      "/images/macadamia-macro.jpg",
      "/images/pecans-bowl.jpg",
      "/images/pecans-shell-cracking.jpg",
      "/images/pecans-packaged.jpg"
    ],
    "overview": {
      "terroir": "Himalayan Orchard Foothills (5,000 ft Altitude)",
      "harvestMethod": "Carefully cracked to preserve whole jumbo halves, air-cured in low humidity",
      "aromaFlavor": "Decadent melting butter, rich maple vanilla notes, delicate flaky crunch",
      "purityGrade": "Grade 1 Jumbo Halves: 100% Raw, Zero Added Salt or Oils, Unbleached",
      "packagingStandard": "Nitrogen-flushed canister protecting fragile kernels",
      "shelfLife": "12 Months in cool dry storage"
    },
    "description": "An exquisite pairing of two of the richest, most buttery tree nuts on earth. Crisp, golden-brown pecan halves loaded with maple-vanilla warmth alongside silky ivory macadamia kernels that literally melt like butter on your palate.",
    "benefits": [
      "FSSAI Certified: 100% pure raw whole nut halves, lab-tested premium quality",
      "Highest antioxidant content among all tree nuts (rich in gamma-tocopherol)",
      "Loaded with monounsaturated oleic and palmitoleic heart-healthy fats",
      "A sublime connoisseur indulgence for baking, cheese boards, and wholesome snacking"
    ],
    "nutrition": {
      "calories": "691 kcal",
      "protein": "9.2g",
      "healthyFats": "72.0g",
      "carbs": "13.9g",
      "fiber": "9.6g"
    },
    "weights": [
      {
        "weight": "200g Jar",
        "price": 540,
        "originalPrice": 760,
        "discount": 29,
        "isDefault": true
      },
      {
        "weight": "400g Tin",
        "price": 1040,
        "originalPrice": 1490,
        "discount": 30
      },
      {
        "weight": "800g Box",
        "price": 1980,
        "originalPrice": 2890,
        "discount": 31
      }
    ]
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Rajesh Malhotra",
    city: "New Delhi",
    date: "2 days ago",
    rating: 5,
    verified: true,
    product: "JENU'S Royal Kashmiri Mamra Almonds (500g)",
    comment: "The natural oil content and distinct curve of these Mamra almonds are exceptional. Clean packaging, genuine unbleached quality, and the FSSAI certification report gives complete peace of mind. Arrived via air cargo in 24 hours.",
    avatar: "RM"
  },
  {
    id: 2,
    name: "Dr. Ananya Sen",
    city: "Bengaluru",
    date: "4 days ago",
    rating: 5,
    verified: true,
    product: "Pure Pampore Mongra Saffron (2g)",
    comment: "The color diffusion and natural aroma of this Mongra saffron are exemplary. Just 3 strands imparted a brilliant golden-crimson hue. Verified the FSSAI lab parameters on the jar label. Truly professional service.",
    avatar: "AS"
  },
  {
    id: 3,
    name: "Vikramaditya Rao",
    city: "Mumbai",
    date: "1 week ago",
    rating: 5,
    verified: true,
    product: "Royal Khatamband Carved Wooden Hamper",
    comment: "Ordered 12 hampers for corporate gifts. The solid walnut wood craftsmanship, velvet linings, and FSSAI certified dry fruits were deeply appreciated by all recipients. Refined, decent, and very premium.",
    avatar: "VR"
  },
  {
    id: 4,
    name: "Zoya Mir",
    city: "Srinagar",
    date: "1 week ago",
    rating: 5,
    verified: true,
    product: "Kashmiri Kagzi Snow Walnuts (1kg)",
    comment: "Being from Kashmir, I appreciate honest, unbleached Kagzi walnuts that retain their natural light hue and healthy oils without chemical washes. JENU'S standards are exemplary.",
    avatar: "ZM"
  },
  {
    id: 5,
    name: "Chef Abhimanyu Kapoor",
    city: "New Delhi",
    date: "3 days ago",
    rating: 5,
    verified: true,
    product: "JENU'S Authentic Sun-Dried Kashmiri Mirch (250g)",
    comment: "As an executive chef, I have searched for real unadulterated Kashmiri Mirch that has that natural crimson sheen without synthetic dyes. JENU'S stone-ground mirch and wild shahi jeera are unmatched in purity and aroma.",
    avatar: "AK"
  },
  {
    id: 6,
    name: "Sunita Deshmukh",
    city: "Pune",
    date: "5 days ago",
    rating: 5,
    verified: true,
    product: "Valley Vitality Duo (Mamra Almonds + Snow Walnuts)",
    comment: "The 1kg combo pack offers remarkable value. You can see the pure quality immediately when cracking open the pouch. Both my kids love soaked almonds and walnuts every morning.",
    avatar: "SD"
  }
];

export const COUPONS = {
  'KASHMIR10': { type: 'percent', value: 10, minOrder: 0, description: '10% instant discount' },
  'VALLEYFRESH': { type: 'percent', value: 15, minOrder: 1500, description: '15% off orders above ₹1,500' },
  'FIRSTJENU': { type: 'flat', value: 100, minOrder: 699, description: '₹100 flat discount on first order' }
};

export const HAMPER_BOX_STYLES = [
  { id: 'walnut-wood', name: 'Carved Walnut Khatamband Box', price: 950, image: '/images/royal-hamper.jpg', desc: 'Solid Kashmir Walnut wood hand-finished with traditional motifs' },
  { id: 'papier-mache', name: 'Artisan Heritage Lacquer Box', price: 750, image: '/images/royal-hamper.jpg', desc: 'Hand-painted Kashmiri lacquer with subtle gold detailing' },
  { id: 'crimson-velvet', name: 'Imperial Velvet Presentation Case', price: 550, image: '/images/royal-hamper.jpg', desc: 'Plush burgundy velvet with brass clasp and satin partition' }
];

export const HAMPER_FILL_ITEMS = [
  { id: 'mamra-250', name: 'Mamra Almonds (250g)', price: 890, img: '/images/real-mamra-macro.jpg' },
  { id: 'walnut-250', name: 'Snow Walnuts (250g)', price: 480, img: '/images/real-walnuts-macro.jpg' },
  { id: 'saffron-1g', name: 'Pampore Mongra Saffron (1g)', price: 420, img: '/images/real-saffron-macro.jpg' },
  { id: 'mirch-250', name: 'Kashmiri Mirch (250g)', price: 380, img: '/images/real-mirch-macro.jpg' },
  { id: 'jeera-100', name: 'Wild Shahi Jeera (100g)', price: 360, img: '/images/real-jeera-macro.jpg' },
  { id: 'wazwan-150', name: 'Wazwan Masala Ver (150g)', price: 320, img: '/images/wazwan-ver-slice.jpg' },
  { id: 'spices-chest-500', name: '5-Spice Chest (500g)', price: 890, img: '/images/spices-assortment-dishes.jpg' },
  { id: 'figs-250', name: 'Sun-Dried Figs (250g)', price: 390, img: '/images/real-figs-macro.jpg' },
  { id: 'apricot-250', name: 'Shopian Dried Apricots (250g)', price: 340, img: '/images/real-apricots-macro.jpg' },
  { id: 'kahwa-250', name: 'Shahi Saffron Kahwa (250g)', price: 460, img: '/images/kahwa-tea-blend.jpg' },
  { id: 'chilgoza-200', name: 'Himalayan Chilgoza (200g)', price: 990, img: '/images/real-chilgoza-macro.jpg' }
];
