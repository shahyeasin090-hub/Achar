import { Product, ReviewItem } from '../types';

/**
 * ============================================================================
 * PAHARI SHAD BY KAKOLI — SINGLE PRODUCT & BRAND DATA FILE
 * ============================================================================
 * How to update products & photos:
 * 1. Replace any `image` path below with your real product photo URL or local
 *    asset path (e.g. "/images/moricher-achar.jpg").
 * 2. Update prices (in BDT), weight options, or descriptions directly here.
 * 3. Update `BRAND_CONFIG` below with Kakoli's real WhatsApp number, Facebook
 *    page URL, and YouTube channel URL before going live.
 */

export const BRAND_CONFIG = {
  brandName: 'Pahari Shad by Kakoli',
  brandNameBn: 'পাহাড়ি স্বাদ বাই কাকলি',
  // Replace with Kakoli's real WhatsApp number in international format (no + or spaces)
  whatsappNumber: '8801700000000',
  displayPhone: '+880 1700-000000',
  // Replace with Kakoli's Facebook Page / Messenger username
  facebookPageUrl: 'https://www.facebook.com',
  messengerUrl: 'https://m.me/paharishadbykakoli',
  youtubeVlogUrl: 'https://www.youtube.com/@JkKakoliVlog',
  tiktokUrl: 'https://www.tiktok.com',
  freeDeliveryThreshold: 1500,
  dhakaDeliveryFee: 60,
  outsideDhakaDeliveryFee: 120,
};

export const HERO_AND_STORY_IMAGES = {
  // Replace with real hill-tract landscape or kitchen preparation photos
  heroMountainRiver: '/src/assets/images/hero_hills_river_1794830485204.jpg',
  storyKitchen: '/src/assets/images/story_handmade_jars_1794830488796.jpg',
  storySpices: '/src/assets/images/spices_turmeric_chili_1794830486678.jpg',
  storyHarvest: '/src/assets/images/fruits_amla_boroi_1794830487970.jpg',
};

export const CATEGORIES: {
  id: 'all' | 'pickle' | 'spice' | 'fruit' | 'shutki' | 'combo';
  labelBn: string;
  labelEn: string;
}[] = [
  { id: 'all', labelBn: 'সবগুলো', labelEn: 'All' },
  { id: 'pickle', labelBn: 'আচার', labelEn: 'Pickles' },
  { id: 'spice', labelBn: 'মশলা', labelEn: 'Spices' },
  { id: 'fruit', labelBn: 'পাহাড়ি ফল', labelEn: 'Hill Fruits' },
  { id: 'shutki', labelBn: 'শুঁটকি/অন্যান্য', labelEn: 'Shutki & More' },
  { id: 'combo', labelBn: 'কম্বো প্যাক', labelEn: 'Combo Packs' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'pahari-morich-achar',
    slug: 'pahari-morich-achar',
    category: 'pickle',
    nameBn: 'পাহাড়ি মরিচের আচার',
    nameEn: 'Hill Chili Pickle',
    subtitleBn: 'খাঁটি সরিষার তেলে রোদে শুকানো ঝাল স্বাদ',
    subtitleEn: 'Sun-cured spicy chili in cold-pressed mustard oil',
    shortDescBn:
      'বান্দরবানের পাহাড়ি লাল মরিচ, খাঁটি ঘানি ভাঙা সরিষার তেল আর ঘরোয়া পাঁচফোড়নে তৈরি ঝাঁঝালো আচার।',
    shortDescEn:
      'Crafted with sun-ripened hill red chilies, pure ghani-pressed mustard oil, and hand-roasted five-spice.',
    longDescBn:
      'গরম ভাত, খিচুড়ি বা পোলাওয়ের সাথে এক চামচ পাহাড়ি মরিচের আচার মানেই মুখরোচক স্বাদ। প্রতিটি বয়াম কাকলির নিজস্ব তত্ত্বাবধানে কোনো প্রকার প্রিজারভেটিভ বা কৃত্রিম রঙ ছাড়াই রোদে শুকিয়ে তৈরি করা হয়।',
    longDescEn:
      'One spoonful transforms steamed rice, khichuri, or biriyani. Prepared in small sun-cured batches under Kakoli’s kitchen supervision with zero artificial preservatives, vinegar shortcuts, or synthetic colors.',
    ingredientsBn: ['পাহাড়ি লাল মরিচ', 'খাঁটি সরিষার তেল', 'কালো সরিষা', 'মেথি ও মৌরি', 'বিট লবণ'],
    ingredientsEn: ['Hill Red Chilies', 'Pure Mustard Oil', 'Black Mustard Seeds', 'Fenugreek & Fennel', 'Black Salt'],
    // Placeholder image — replace with real photo of Pahari Moricher Achar
    image: '/src/assets/images/jar_chili_pickle_1794830485466.jpg',
    basePrice: 350,
    defaultWeightLabel: '500g',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', gramsLabel: '250g', price: 190 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', gramsLabel: '500g', price: 350 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', gramsLabel: '1kg', price: 660 },
    ],
    popular: true,
    heroShelf: true,
    tagBn: 'বেস্টসেলার',
    tagEn: 'Bestseller',
    spiceLevel: 'hot',
    originBn: 'বান্দরবান পাহাড়',
    originEn: 'Bandarban Hills',
  },
  {
    id: 'roshun-mix-achar',
    slug: 'roshun-mix-achar',
    category: 'pickle',
    nameBn: 'রসুন-মিক্স আচার',
    nameEn: 'Garlic Mixed Pickle',
    subtitleBn: 'দেশি কোয়া রসুন ও মশলার সুগন্ধি মিশ্রণ',
    subtitleEn: 'Whole aromatic garlic cloves in spiced mustard oil',
    shortDescBn:
      'দেশি রসুনের নরম কোয়া, ভাজা শুকনো মরিচ এবং ঘন মশলার সাথে সরিষার তেলে মজানো দারুণ আচার।',
    shortDescEn:
      'Tender local garlic cloves marinated with toasted dry chilies, turmeric, and aromatic roasted spices.',
    longDescBn:
      'রসুনের ঝাঁঝ এবং টক-ঝাল মশলার ভারসাম্যে তৈরি আমাদের রসুন-মিক্স আচার প্রতিদিনের খাবারে বাড়তি রুচি আনে। দীর্ঘদিন কাঁচের বয়ামে রেখে খাওয়ার উপযোগী।',
    longDescEn:
      'A deeply savory balance of mellowed garlic cloves and tangy-spiced oil. Crafted for daily meals and packaged in hygienic, airtight glass jars so every clove stays rich and aromatic.',
    ingredientsBn: ['দেশি রসুন', 'সরিষার তেল', 'শুকনো মরিচ', 'হলুদ ও ধনিয়া গুঁড়া', 'পাঁচফোড়ন'],
    ingredientsEn: ['Local Garlic Cloves', 'Mustard Oil', 'Dry Red Chili', 'Hill Turmeric & Coriander', 'Panch Phoron'],
    // Placeholder image — replace with real photo of Roshun-Mix Achar
    image: '/src/assets/images/jar_garlic_pickle_1794830485625.jpg',
    basePrice: 420,
    defaultWeightLabel: '500g',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', gramsLabel: '250g', price: 230 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', gramsLabel: '500g', price: 420 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', gramsLabel: '1kg', price: 790 },
    ],
    popular: true,
    heroShelf: true,
    tagBn: 'জনপ্রিয়',
    tagEn: 'Popular',
    spiceLevel: 'medium',
    originBn: 'খাগড়াছড়ি',
    originEn: 'Khagrachari',
  },
  {
    id: 'jolpai-achar',
    slug: 'jolpai-achar',
    category: 'pickle',
    nameBn: 'জলপাইয়ের আচার',
    nameEn: 'Hill Olive Pickle',
    subtitleBn: 'টক-ঝাল-মিষ্টি ঘরোয়া জলপাই আচার',
    subtitleEn: 'Tangy, sweet & spiced traditional olive pickle',
    shortDescBn:
      'তাজা পাহাড়ি জলপাই, আখের গুড় এবং খাঁটি মশলায় তৈরি ঐতিহ্যবাহী টক-ঝাল-মিষ্টি আচার।',
    shortDescEn:
      'Fresh orchard olives slow-simmered with cane jaggery, roasted cumin, and fragrant mustard oil.',
    longDescBn:
      'শীতের রোদে নরম করা দেশি জলপাই আর খাঁটি গুড়-মশলার জাদু। ছোট-বড় সবার প্রিয় এই আচার ভাত, মুড়ি মাখা কিংবা বিকেলের নাস্তায় দারুণ জমে।',
    longDescEn:
      'Sun-softened local green olives coated in a nostalgic sweet-tangy masala glaze. Loved across all ages as an accompaniment to rice, muri-makha, or savory snacks.',
    ingredientsBn: ['তাজা পাহাড়ি জলপাই', 'আখের গুড়', 'সরিষার তেল', 'ভাজা জিরা ও ধনিয়া', 'শুকনো মরিচ'],
    ingredientsEn: ['Fresh Hill Olives', 'Cane Jaggery', 'Mustard Oil', 'Roasted Cumin & Coriander', 'Dried Chili'],
    // Placeholder image — replace with real photo of Jolpaier Achar
    image: '/src/assets/images/jar_olive_pickle_1794830486172.jpg',
    basePrice: 380,
    defaultWeightLabel: '500g',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', gramsLabel: '250g', price: 210 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', gramsLabel: '500g', price: 380 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', gramsLabel: '1kg', price: 720 },
    ],
    popular: true,
    heroShelf: true,
    spiceLevel: 'mild',
    originBn: 'রাঙ্গামাটি',
    originEn: 'Rangamati',
  },
  {
    id: 'trio-achar-combo',
    slug: 'trio-achar-combo',
    category: 'combo',
    nameBn: 'তিন রকমের আচার কম্বো',
    nameEn: '3-Pickle Tasting Combo',
    subtitleBn: 'মরিচ, রসুন ও জলপাই — তিনটি সিগনেচার বয়াম একসাথে',
    subtitleEn: 'Chili, Garlic & Olive — 3 signature jars in one bundle',
    shortDescBn:
      'আমাদের সবচেয়ে জনপ্রিয় ৩টি আচার (মরিচ, রসুন-মিক্স ও জলপাই — প্রতিটি ৫০০ গ্রাম) সাশ্রয়ী কম্বো প্যাকে।',
    shortDescEn:
      'Our three bestselling jars (Chili, Garlic Mix & Olive — 500g each) bundled at special savings.',
    longDescBn:
      'পরিবারের সবার পছন্দের কথা ভেবে অথবা প্রিয়জনকে উপহার দেওয়ার জন্য আদর্শ কম্বো প্যাক। আলাদাভাবে কিনলে দাম পড়ে ১১৫০ টাকা, কম্বোতে পাচ্ছেন মাত্র ১০০০ টাকায়।',
    longDescEn:
      'Designed for family dining or thoughtful gifting. Normally ৳1,150 if ordered separately—save ৳150 when you pick the curated 3-jar heritage combo.',
    ingredientsBn: ['পাহাড়ি মরিচের আচার (৫০০g)', 'রসুন-মিক্স আচার (৫০০g)', 'জলপাইয়ের আচার (৫০০g)'],
    ingredientsEn: ['Hill Chili Pickle (500g)', 'Garlic Mixed Pickle (500g)', 'Hill Olive Pickle (500g)'],
    // Placeholder image — replace with real photo of 3-Pickle Combo
    image: '/src/assets/images/jar_combo_trio_1794830486592.jpg',
    basePrice: 1000,
    defaultWeightLabel: '1.5kg (3 × 500g)',
    weightOptions: [
      { id: '250g', labelBn: '৩ × ২৫০ গ্রাম', labelEn: '3 × 250g', gramsLabel: '750g', price: 560 },
      { id: '500g', labelBn: '৩ × ৫০০ গ্রাম', labelEn: '3 × 500g', gramsLabel: '1.5kg', price: 1000 },
      { id: '1kg', labelBn: '৩ × ১ কেজি', labelEn: '3 × 1kg', gramsLabel: '3kg', price: 1890 },
    ],
    popular: true,
    heroShelf: true,
    tagBn: '১৫০৳ সাশ্রয়',
    tagEn: 'Save ৳150',
    spiceLevel: 'medium',
    originBn: 'পার্বত্য চট্টগ্রাম',
    originEn: 'Chittagong Hill Tracts',
  },
  {
    id: 'pahari-holud-gura',
    slug: 'pahari-holud-gura',
    category: 'spice',
    nameBn: 'হলুদের গুঁড়া',
    nameEn: 'Pure Hill Turmeric Powder',
    subtitleBn: 'গাঢ় রঙ ও খাঁটি ঘ্রাণের পাহাড়ি কাঁচা হলুদ থেকে ভাঙানো',
    subtitleEn: 'High-curcumin sun-dried hill turmeric stone-ground',
    shortDescBn:
      'পাহাড়ি জমির জৈব হলুদ রোদে শুকিয়ে নিজস্ব মিলে ভাঙানো ১০০% ভেজালমুক্ত হলুদের গুঁড়া।',
    shortDescEn:
      'Single-origin hill turmeric rhizomes boiled, sun-dried, and freshly milled with zero fillers.',
    longDescBn:
      'সাধারণ বাজারের হলুদের চেয়ে পাহাড়ি হলুদে কারকিউমিনের পরিমাণ বেশি থাকায় সামান্য হলুদেই তরকারিতে আসে চমৎকার সোনালি রঙ ও প্রাকৃতিক সুবাস।',
    longDescEn:
      'Naturally rich in curcumin, a pinch delivers vibrant golden color and earthy aroma to curries, lentils, and marinades—completely free from chalk, starch, or dye.',
    ingredientsBn: ['১০০% বাছাইকৃত পাহাড়ি হলুদ'],
    ingredientsEn: ['100% Selected Hill Turmeric Rhizomes'],
    // Placeholder image — replace with real photo of Turmeric Powder
    image: '/src/assets/images/spices_turmeric_chili_1794830486678.jpg',
    basePrice: 180,
    defaultWeightLabel: '250g',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', gramsLabel: '250g', price: 180 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', gramsLabel: '500g', price: 340 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', gramsLabel: '1kg', price: 650 },
    ],
    popular: true,
    tagBn: '১০০% খাঁটি',
    tagEn: '100% Pure',
    spiceLevel: 'none',
    originBn: 'রুমা, বান্দরবান',
    originEn: 'Ruma, Bandarban',
  },
  {
    id: 'pahari-morich-gura',
    slug: 'pahari-morich-gura',
    category: 'spice',
    nameBn: 'মরিচের গুঁড়া',
    nameEn: 'Hill Red Chili Powder',
    subtitleBn: 'বোটা ফেলে পরিষ্কার করে ভাঙানো ঝাল ও রঙের মিশ্রণ',
    subtitleEn: 'De-stemmed sun-dried hill chilies, freshly ground',
    shortDescBn:
      'কোনো কৃত্রিম রঙ বা বীজ-খোসা ভেজাল ছাড়াই রোদে শুকানো পাহাড়ি মরিচের খাঁটি গুঁড়া।',
    shortDescEn:
      'Cleanly sorted, sun-dried red chilies milled fresh in small batches without synthetic dyes.',
    longDescBn:
      'প্রতিটি শুকনো মরিচ হাতে বেছে ও মুছে পরিষ্কার করার পর ভাঙানো হয়, তাই রান্নায় দেয় প্রাকৃতিক লাল রঙ এবং খাঁটি ঘরোয়া ঝাঁঝ।',
    longDescEn:
      'Every dried chili is hand-sorted and wiped clean prior to grinding, preserving natural crimson color and clean heat without brick dust or artificial coloring.',
    ingredientsBn: ['১০০% রোদে শুকানো পাহাড়ি লাল মরিচ'],
    ingredientsEn: ['100% Sun-Dried Hill Red Chilies'],
    // Placeholder image — replace with dedicated chili powder photo
    image: '/src/assets/images/spices_turmeric_chili_1794830486678.jpg',
    basePrice: 220,
    defaultWeightLabel: '250g',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', gramsLabel: '250g', price: 220 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', gramsLabel: '500g', price: 420 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', gramsLabel: '1kg', price: 800 },
    ],
    spiceLevel: 'hot',
    originBn: 'বান্দরবান',
    originEn: 'Bandarban',
  },
  {
    id: 'pahari-amloki',
    slug: 'pahari-amloki',
    category: 'fruit',
    nameBn: 'আমলকি',
    nameEn: 'Fresh Hill Amla',
    subtitleBn: 'টাটকা বন্য পাহাড়ি আমলকি — ভিটামিন সি সমৃদ্ধ',
    subtitleEn: 'Crisp wild hill gooseberries packed with Vitamin C',
    shortDescBn:
      'পাহাড়ি গাছ থেকে সরাসরি সংগ্রহ করা কচকচে তাজা আমলকি, আচার বা রোজ খাওয়ার জন্য সেরা।',
    shortDescEn:
      'Hand-picked wild hill gooseberries—crisp, tart, and ideal for daily wellness or home pickling.',
    longDescBn:
      'কোনো ফরমালিন বা কেমিক্যাল স্প্রে ছাড়াই পাহাড়ি বাগান থেকে সংগ্রহ করা টাটকা আমলকি। অর্ডার পাওয়ার পর বাছাই করে প্যাক করা হয়।',
    longDescEn:
      'Harvested directly from hillside orchards with zero chemical sprays or preservatives. Sorted fresh per order for crisp texture and natural tartness.',
    ingredientsBn: ['তাজা পাহাড়ি আমলকি (বাছাইকৃত)'],
    ingredientsEn: ['Fresh Wild Hill Amla'],
    // Placeholder image — replace with real Amla photo
    image: '/src/assets/images/fruits_amla_boroi_1794830487970.jpg',
    basePrice: 200,
    defaultWeightLabel: '500g',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', gramsLabel: '250g', price: 110 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', gramsLabel: '500g', price: 200 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', gramsLabel: '1kg', price: 380 },
    ],
    tagBn: 'টাটকা সংগ্রহ',
    tagEn: 'Fresh Harvest',
    spiceLevel: 'none',
    originBn: 'থানচি পাহাড়',
    originEn: 'Thanchi Hills',
  },
  {
    id: 'pahari-boroi',
    slug: 'pahari-boroi',
    category: 'fruit',
    nameBn: 'বরই',
    nameEn: 'Hill Jujube (Boroi)',
    subtitleBn: 'রসালো টক-মিষ্টি পাহাড়ি বরই',
    subtitleEn: 'Juicy sweet-tart mountain jujube harvest',
    shortDescBn:
      'পাহাড়ের ঢালে প্রাকৃতিকভাবে বেড়ে ওঠা রসালো টক-মিষ্টি দেশি বরই, লবণ-মরিচে ভর্তার জন্য দারুণ।',
    shortDescEn:
      'Naturally grown mountain jujubes with a crisp sweet-tart bite—perfect with chili salt.',
    longDescBn:
      'গাছপাকা ও আধপাকা বাছাইকৃত পাহাড়ি বরই। তাজা খাওয়া ছাড়াও ঘরে বসেই রোদে শুকিয়ে বরইয়ের আচার তৈরির জন্য একদম উপযোগী।',
    longDescEn:
      'Hand-selected hill jujubes picked at peak juiciness. Enjoy fresh as a crunchy snack or sun-dry at home for classic Bangladeshi boroi achar.',
    ingredientsBn: ['তাজা পাহাড়ি বরই'],
    ingredientsEn: ['Fresh Mountain Jujube (Boroi)'],
    // Placeholder image — replace with real Boroi photo
    image: '/src/assets/images/fruits_amla_boroi_1794830487970.jpg',
    basePrice: 160,
    defaultWeightLabel: '500g',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', gramsLabel: '250g', price: 90 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', gramsLabel: '500g', price: 160 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', gramsLabel: '1kg', price: 300 },
    ],
    spiceLevel: 'none',
    originBn: 'রাঙ্গামাটি',
    originEn: 'Rangamati',
  },
  {
    id: 'pahari-tetul',
    slug: 'pahari-tetul',
    category: 'fruit',
    nameBn: 'তেঁতুল',
    nameEn: 'Organic Hill Tamarind',
    subtitleBn: 'টক-মিষ্টি পাকা পাহাড়ি তেঁতুল (বীচি ও আঁশ পরিষ্কার)',
    subtitleEn: 'Rich, naturally sweet-tangy cleaned hill tamarind',
    shortDescBn:
      'পাহাড়ি গাছের পাকা কালচে-বাদামি খাঁটি তেঁতুল — চাটনি, টক, ফুচকা ও রান্নার জন্য অতুলনীয়।',
    shortDescEn:
      'Deep amber-brown ripe hill tamarind—ideal for fuchka tok, chutneys, fish curries, and pickles.',
    longDescBn:
      'রোদে শুকানো পরিষ্কার পাকা পাহাড়ি তেঁতুল, যা দীর্ঘদিন সংরক্ষণ করা যায়। কৃত্রিম টক বা রঙ ছাড়া আসল প্রাকৃতিক স্বাদ।',
    longDescEn:
      'Sun-cured natural ripe tamarind pods packed cleanly for long shelf life without sulfites or artificial souring agents.',
    ingredientsBn: ['১০০% পাকা পাহাড়ি তেঁতুল'],
    ingredientsEn: ['100% Ripe Hill Tamarind'],
    // Placeholder image — replace with real Tetul photo
    image: '/src/assets/images/tamarind_hill_harvest_1794830488295.jpg',
    basePrice: 140,
    defaultWeightLabel: '500g',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', gramsLabel: '250g', price: 80 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', gramsLabel: '500g', price: 140 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', gramsLabel: '1kg', price: 260 },
    ],
    popular: true,
    spiceLevel: 'none',
    originBn: 'খাগড়াছড়ি',
    originEn: 'Khagrachari',
  },
  {
    id: 'pahari-loitta-shutki',
    slug: 'pahari-loitta-shutki',
    category: 'shutki',
    nameBn: 'কেমিক্যালমুক্ত লইট্টা শুঁটকি',
    nameEn: 'Chemical-Free Dried Loitta',
    subtitleBn: 'চট্টগ্রাম-পাহাড়ি উপকূলীয় রোদে শুকানো লবণমুক্ত শুঁটকি',
    subtitleEn: 'Sun-dried coastal Loitta fish with zero harsh chemicals',
    shortDescBn:
      'কোনো প্রকার বিষাক্ত কীটনাশক বা অতিরিক্ত লবণ ছাড়া প্রাকৃতিক রোদে শুকানো পরিষ্কার লইট্টা শুঁটকি।',
    shortDescEn:
      'Carefully dried under natural coastal sunlight in hygienic nets—clean aroma and tender texture.',
    longDescBn:
      'শুঁটকি প্রেমীদের জন্য কাকলির বিশেষ বাছাইকৃত লইট্টা শুঁটকি। রান্নার আগে হালকা গরম পানিতে ধুয়ে ভুনা বা ভর্তা করলে অসাধারণ স্বাদ পাওয়া যায়।',
    longDescEn:
      'Personally sourced and inspected by Kakoli to ensure zero harsh preservatives. Rinse briefly in warm water and cook into spicy bhuna or bhorta.',
    ingredientsBn: ['১০০% সামুদ্রিক লইট্টা মাছ (রোদে শুকানো)'],
    ingredientsEn: ['100% Sun-Dried Loitta Fish'],
    // Placeholder image — replace with real Shutki photo
    image: '/src/assets/images/story_handmade_jars_1794830488796.jpg',
    basePrice: 450,
    defaultWeightLabel: '250g',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', gramsLabel: '250g', price: 450 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', gramsLabel: '500g', price: 860 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', gramsLabel: '1kg', price: 1650 },
    ],
    tagBn: 'অর্গানিক শুঁটকি',
    tagEn: 'Clean Dried',
    spiceLevel: 'none',
    originBn: 'চট্টগ্রাম ও কক্সবাজার',
    originEn: 'Chattogram Coast',
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    nameBn: 'তানজিনা আক্তার',
    nameEn: 'Tanjina Akter',
    cityBn: 'ধানমন্ডি, ঢাকা',
    cityEn: 'Dhanmondi, Dhaka',
    productBn: 'তিন রকমের আচার কম্বো',
    productEn: '3-Pickle Tasting Combo',
    rating: 5,
    commentBn:
      'কাকলি আপুর মরিচ আর রসুনের আচার এক কথায় অসাধারণ! একদম মায়ের হাতের আচারের মতো ঘ্রাণ, কোনো অতিরিক্ত তেল বা ভিনেগারের গন্ধ নেই।',
    commentEn:
      'Kakoli apu’s chili and garlic pickles taste truly homemade! Warm authentic aroma with zero harsh vinegar smell.',
    dateBn: 'অক্টোবর ২০২৬',
    dateEn: 'Oct 2026',
  },
  {
    id: 'rev-2',
    nameBn: 'মাহমুদুল হাসান',
    nameEn: 'Mahmudul Hasan',
    cityBn: 'উত্তরা, ঢাকা',
    cityEn: 'Uttara, Dhaka',
    productBn: 'হলুদের গুঁড়া ও জলপাইয়ের আচার',
    productEn: 'Turmeric Powder & Olive Pickle',
    rating: 5,
    commentBn:
      'পাহাড়ি হলুদের রঙ আর ঘ্রাণ বাজারের প্যাকেট মশলা থেকে সম্পূর্ণ আলাদা। ডেলিভারি পেয়েই আবার ২ কেজি অর্ডার করেছি পরিবারের জন্য।',
    commentEn:
      'The hill turmeric aroma and deep color are miles ahead of store-bought spices. Immediately ordered 2kg more for family.',
    dateBn: 'নভেম্বর ২০২৬',
    dateEn: 'Nov 2026',
  },
  {
    id: 'rev-3',
    nameBn: 'ফারহানা ইয়াসমিন',
    nameEn: 'Farhana Yasmin',
    cityBn: 'চট্টগ্রাম',
    cityEn: 'Chattogram',
    productBn: 'আমলকি ও তেঁতুল',
    productEn: 'Amla & Organic Tamarind',
    rating: 5,
    commentBn:
      'আমলকি একদম টাটকা আর কচকচে ছিল। প্যাকেজিং খুব সুন্দর আর নিরাপদ ছিল, কোনো বয়াম ফাটেনি।',
    commentEn:
      'The amla arrived super crisp and fresh, and the jar packaging was cushioned securely with zero leakage.',
    dateBn: 'অক্টোবর ২০২৬',
    dateEn: 'Oct 2026',
  },
  {
    id: 'rev-4',
    nameBn: 'সাজিদুর রহমান',
    nameEn: 'Sajidur Rahman',
    cityBn: 'সিলেট',
    cityEn: 'Sylhet',
    productBn: 'পাহাড়ি মরিচের আচার',
    productEn: 'Hill Chili Pickle',
    rating: 5,
    commentBn:
      'Jk Kakoli Vlog দেখে অর্ডার করেছিলাম। খিচুড়ির সাথে পাহাড়ি মরিচের আচার জাস্ট দারুণ! ডেলিভারিও পেয়েছি ৩ দিনের মধ্যে।',
    commentEn:
      'Ordered after watching Jk Kakoli Vlog. The hill chili pickle with khichuri is unbeatable, and delivery reached Sylhet in 3 days.',
    dateBn: 'নভেম্বর ২০২৬',
    dateEn: 'Nov 2026',
  },
];
