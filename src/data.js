// JENU'S - Kashmir Valley Gourmet Dry Fruits & Saffron Dataset
// Certified under FSSAI Central License: 10026061000412

export const CATEGORIES = [
  { id: 'all', name: 'All Products', image: '/images/cat-all-crest.svg' },
  { id: 'combos', name: 'Value Combos', image: '/images/combos-pack.jpg' },
  { id: 'spices', name: 'Authentic Spices', image: '/images/real-mirch-macro.jpg' },
  { id: 'walnuts', name: 'Snow Walnuts', image: '/images/real-walnuts-macro.jpg' },
  { id: 'almonds', name: 'Mamra Almonds', image: '/images/real-mamra-macro.jpg' },
  { id: 'saffron', name: 'Pampore Saffron', image: '/images/real-saffron-macro.jpg' },
  { id: 'dried-fruits', name: 'Figs & Apricots', image: '/images/real-apricots-macro.jpg' },
  { id: 'berries-seeds', name: 'Chilgoza & Berries', image: '/images/real-berries-macro.jpg' },
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
