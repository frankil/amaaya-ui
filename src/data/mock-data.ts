import { LookCard, ProductCard, FriendProfile, VibeArchetype } from '@/types/style-soul';

// Curated fashion image URLs
const IMG = {
  vibes: {
    'old soul': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop',
    'celebrations': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop',
    'soft hour': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop',
    'loud & proud': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
    'new roots': 'https://images.unsplash.com/photo-1583391733981-8b530c48a2f0?w=400&h=500&fit=crop',
    'boardroom': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
    'wild thing': 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=400&h=500&fit=crop',
    'after dark': 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop',
    'main character': 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=500&fit=crop',
    'golden hour': 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop',
    'fresh pages': 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=400&h=500&fit=crop',
    'off-duty': 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=500&fit=crop',
  } as Record<VibeArchetype, string>,

  looks: [
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=650&fit=crop',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=550&fit=crop',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=480&fit=crop',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=550&fit=crop',
    'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=400&h=620&fit=crop',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=580&fit=crop',
    'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=400&h=520&fit=crop',
    'https://images.unsplash.com/photo-1583391733981-8b530c48a2f0?w=400&h=600&fit=crop',
  ],

  heroCollage: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&h=800&fit=crop',
  ],

  avatars: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  ],

  // Occasion browse images
  occasions: {
    'daily wear': 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=300&h=400&fit=crop',
    'date night': 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop',
    'wedding guest': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&h=400&fit=crop',
    'office power': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop',
    'festive glow': 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop',
    'girls night': 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=400&fit=crop',
    'brunch vibes': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=400&fit=crop',
    'travel mood': 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=300&h=400&fit=crop',
  },

  // Personality inspiration images
  personalities: [
    { name: 'The Deepika', tagline: 'Quiet power, red carpet ease', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop', vibe: 'old soul' },
    { name: 'The Alia', tagline: 'Playful chic, effortless transitions', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop', vibe: 'main character' },
    { name: 'The Sonam', tagline: 'Fashion-forward, never subtle', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=400&fit=crop', vibe: 'loud & proud' },
    { name: 'The Anushka', tagline: 'Clean lines, understated confidence', image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=300&h=400&fit=crop', vibe: 'fresh pages' },
    { name: 'The Konkona', tagline: 'Bohemian soul, handloom heart', image: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=300&h=400&fit=crop', vibe: 'wild thing' },
    { name: 'The Zendaya', tagline: 'Risk-taker, rule-breaker', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop', vibe: 'after dark' },
  ],

  // Garment type browse
  garmentTypes: [
    { name: 'Kurta Sets', icon: '👘', count: 342 },
    { name: 'Lehengas', icon: '✨', count: 189 },
    { name: 'Sarees', icon: '🪷', count: 267 },
    { name: 'Coord Sets', icon: '🎯', count: 415 },
    { name: 'Shararas', icon: '💫', count: 156 },
    { name: 'Blazer Sets', icon: '🔥', count: 98 },
    { name: 'Anarkalis', icon: '🌸', count: 203 },
    { name: 'Dhoti Pants', icon: '🌀', count: 87 },
  ],
};

export const VIBE_DESCRIPTIONS: Record<VibeArchetype, string> = {
  'old soul': 'Quiet luxury, timeless, minimal',
  'celebrations': 'Festive, maximalist, Indian grandeur',
  'soft hour': 'Romantic, flowy, dreamy pastels',
  'loud & proud': 'Streetwear, bold, graphic, unapologetic',
  'new roots': 'Ethnic fusion, contemporary Indian',
  'boardroom': 'Corporate chic, structured, powerful',
  'wild thing': 'Bohemian, earthy, free-form',
  'after dark': 'Sultry, evening, understated edge',
  'main character': 'Eclectic, experimental, risk-taker',
  'golden hour': 'Warm, rich tones, Bollywood dream',
  'fresh pages': 'Clean, minimal, white and neutral',
  'off-duty': 'Casual, comfortable, effortless',
};

export const VIBE_IMAGES = IMG.vibes;
export const AVATAR_IMAGES = IMG.avatars;
export const OCCASION_IMAGES = IMG.occasions;
export const PERSONALITY_INSPO = IMG.personalities;
export const GARMENT_TYPES = IMG.garmentTypes;

const BRANDS = ['Libas', 'Global Desi', 'W', 'Avaasa', 'Aks', 'Sangria', 'Aurelia', 'Nykaa Fashion'];
const GARMENTS = ['Silk Anarkali Set', 'Cotton Coord Set', 'Chanderi Kurta', 'Organza Saree', 'Sharara Set', 'Embroidered Lehenga', 'Linen Cape Set', 'Dhoti Pant Set', 'Block Print Kurta', 'Banarasi Dupatta Set', 'Ruffled Palazzo Set', 'Sequin Blazer Set'];
const VIBES_LIST: string[] = ['old soul', 'celebrations', 'soft hour', 'new roots', 'boardroom', 'golden hour', 'after dark', 'off-duty', 'fresh pages', 'wild thing', 'main character', 'loud & proud'];

export const MOCK_FEED_LOOKS: LookCard[] = IMG.looks.map((image, i) => ({
  id: `look-${i}`,
  image,
  vibes: [VIBES_LIST[i % VIBES_LIST.length], VIBES_LIST[(i + 3) % VIBES_LIST.length]],
  matchTag: i % 3 === 0 ? 'matches your vibe' : i % 4 === 0 ? 'works for your body type' : undefined,
  brand: BRANDS[i % BRANDS.length],
  price: [1299, 2499, 3999, 1799, 4599, 899, 5999, 2199, 1499, 3299, 6499, 999][i],
  title: GARMENTS[i % GARMENTS.length],
}));

export const MOCK_PRODUCTS: ProductCard[] = GARMENTS.slice(0, 8).map((name, i) => ({
  id: `product-${i}`,
  image: IMG.looks[i],
  brand: BRANDS[i % BRANDS.length],
  name,
  price: [1299, 2499, 3999, 1799, 4599, 2199, 1499, 3299][i],
  matchScore: [92, 87, 78, 95, 83, 71, 88, 90][i],
  matchReasons: [
    'A-line silhouette flatters your shape',
    'Matches your warm & earthy palette',
    'Perfect for sangeet occasions',
  ],
  caveat: i === 2 ? 'Polyester — may feel warm in summer' : undefined,
  vibes: [VIBES_LIST[i % VIBES_LIST.length]],
}));

export const MOCK_FRIENDS: FriendProfile[] = [
  { id: 'f1', name: 'Riya', avatar: IMG.avatars[0], streak: 14, todayVibe: 'soft hour', hasPostedToday: true },
  { id: 'f2', name: 'Meera', avatar: IMG.avatars[1], streak: 7, todayVibe: 'old soul', hasPostedToday: true },
  { id: 'f3', name: 'Shruti', avatar: IMG.avatars[2], streak: 3, todayVibe: undefined, hasPostedToday: false },
  { id: 'f4', name: 'Ananya', avatar: IMG.avatars[3], streak: 21, todayVibe: 'celebrations', hasPostedToday: true },
  { id: 'f5', name: 'Naina', avatar: IMG.avatars[4], streak: 5, todayVibe: 'off-duty', hasPostedToday: false },
  { id: 'f6', name: 'Divya', avatar: IMG.avatars[5], streak: 10, todayVibe: 'new roots', hasPostedToday: true },
];

export const SKIN_TONE_COLORS = [
  '#FDEBD0', '#F5CBA7', '#E8B98A', '#D4956B',
  '#C68642', '#A0522D', '#8B4513', '#5C3317',
];

export const COLOUR_PALETTE_SWATCHES: Record<string, string[]> = {
  'warm & earthy': ['#C1440E', '#A0522D', '#C2B280', '#556B2F'],
  'cool & calm': ['#6B8DAD', '#7C9A92', '#B8A9C9', '#8E8E8E'],
  'bold & vibrant': ['#C2185B', '#1565C0', '#2E7D32', '#E65100'],
  'soft & romantic': ['#F8BBD0', '#FFCCBC', '#CE93D8', '#FFF8E1'],
  'rich & dark': ['#6A0D34', '#1B3A2D', '#1A237E', '#3E2723'],
  'neutral & minimal': ['#FFFFFF', '#F5F5F0', '#9E9E9E', '#212121'],
};

export const TRENDING_VIBES = [
  { title: 'Organza everywhere — 3 ways under ₹2500', vibes: ['soft hour', 'celebrations'], image: IMG.looks[0] },
  { title: 'The quiet luxury kurta set moment', vibes: ['old soul', 'new roots'], image: IMG.looks[1] },
  { title: 'Sharara sets are back — here\'s how', vibes: ['celebrations', 'golden hour'], image: IMG.looks[4] },
  { title: 'Denim meets ethnic — the new fusion', vibes: ['loud & proud', 'new roots'], image: IMG.looks[3] },
];

export const MOODBOARD_PREVIEWS = [
  { title: 'Chandni Nights', count: 12, images: [IMG.looks[0], IMG.looks[4], IMG.looks[8], IMG.looks[2]] },
  { title: 'The Warm Minimalist', count: 8, images: [IMG.looks[1], IMG.looks[10], IMG.looks[6], IMG.looks[9]] },
];

/* ── Stories / Event-driven content ── */
export const STORY_EVENTS = [
  { id: 'ootd', type: 'contest' as const, label: '#OOTD', sublabel: 'Contest Live', emoji: '🏆', gradient: 'from-primary to-aura-gold', entries: 2847, yourRank: 34, timeLeft: '6h left' },
  { id: 'selfie', type: 'contest' as const, label: 'Selfie Wars', sublabel: 'Round 3', emoji: '📸', gradient: 'from-aura-rose to-accent', entries: 1203, yourRank: null, timeLeft: '12h left' },
  { id: 'celeb1', type: 'celeb' as const, label: 'Deepika', sublabel: 'Cannes Look', emoji: '', image: IMG.avatars[0], gradient: 'from-aura-gold to-primary', vibeMatch: 'old soul', trendingCount: 4200 },
  { id: 'celeb2', type: 'celeb' as const, label: 'Alia', sublabel: 'Airport OOTD', emoji: '', image: IMG.avatars[1], gradient: 'from-accent to-aura-rose', vibeMatch: 'off-duty', trendingCount: 3100 },
  { id: 'celeb3', type: 'celeb' as const, label: 'Zendaya', sublabel: 'Met Gala', emoji: '', image: IMG.avatars[2], gradient: 'from-primary to-aura-rose', vibeMatch: 'main character', trendingCount: 8900 },
  { id: 'challenge', type: 'challenge' as const, label: 'Style Swap', sublabel: 'New!', emoji: '🔄', gradient: 'from-aura-sage to-accent', participants: 456 },
  { id: 'trending', type: 'editorial' as const, label: 'Pinkvilla', sublabel: 'Top 10 Looks', emoji: '🔥', gradient: 'from-primary to-aura-gold', source: 'Pinkvilla' },
];

export const LIVE_SOCIAL_PROOF = {
  browsing: 1247,
  savedLastHour: 389,
  triedOnLastHour: 156,
  friendsBought: [
    { name: 'Riya', item: 'Silk Anarkali Set', time: '23m ago', avatar: IMG.avatars[0] },
    { name: 'Ananya', item: 'Organza Saree', time: '1h ago', avatar: IMG.avatars[3] },
  ],
};

export const VISUALIZE_PROMPTS = [
  { text: 'See yourself in this lehenga', emoji: '✨', type: 'try-on' },
  { text: 'Will this suit my body type?', emoji: '🪞', type: 'fit-check' },
  { text: 'Show me with bangs + this saree', emoji: '💇‍♀️', type: 'hair-style' },
];

export const STYLE_TIPS = [
  { tip: 'Your ivory linen kurta + copper jhumkas = instant upgrade. Try it today.', type: 'personal' },
  { tip: 'Layering a sheer dupatta over a solid kurta adds depth without effort.', type: 'general' },
  { tip: 'Match your footwear undertone to your jewellery — gold with gold, silver with silver.', type: 'general' },
];

/* ── Today's Look Tips — personalized daily styling advice ── */
export const TODAYS_LOOK_TIPS = [
  {
    id: 'tip-1',
    title: 'Your palazzo + crop kurta combo',
    insight: 'Add a structured dupatta drape and statement jhumkas to take this from "running errands" to "lunch date ready"',
    beforeLabel: 'Your current look',
    afterLabel: 'With Aura\'s twist',
    pieces: ['Ivory crop kurta', 'Teal palazzo', 'Oxidised jhumkas', 'Kolhapuri chappals'],
    mood: 'soft hour → elevated',
    image: IMG.looks[8],
    friendsWhoTried: 23,
    emoji: '✨',
  },
  {
    id: 'tip-2',
    title: 'Make your black coord pop',
    insight: 'A contrasting phulkari dupatta + mojaris turns your black coord into a festive-ready look without buying anything new',
    beforeLabel: 'Basic black',
    afterLabel: 'Festival ready',
    pieces: ['Black coord set', 'Phulkari dupatta', 'Gold mojaris', 'Maang tikka'],
    mood: 'off-duty → celebrations',
    image: IMG.looks[3],
    friendsWhoTried: 41,
    emoji: '🔥',
  },
  {
    id: 'tip-3',
    title: 'Oversized shirt hack',
    insight: 'Belt your oversized white shirt over dhoti pants — instant boardroom-meets-boho energy. Add a watch and you\'re done.',
    beforeLabel: 'Lazy Sunday',
    afterLabel: 'Power brunch',
    pieces: ['White oversized shirt', 'Dhoti pants', 'Leather belt', 'Minimal watch'],
    mood: 'off-duty → boardroom',
    image: IMG.looks[6],
    friendsWhoTried: 67,
    emoji: '💪',
  },
];

/* ── Complete Look Cards (replacing product-level thinking) ── */
export const COMPLETE_LOOKS: LookCard[] = [
  {
    id: 'look-complete-1',
    image: IMG.looks[0],
    vibes: ['celebrations', 'golden hour'],
    matchTag: 'perfect for your sangeet',
    title: 'The Golden Hour Sangeet Look',
    brand: 'Styled by Aura',
    price: 4299,
  },
  {
    id: 'look-complete-2',
    image: IMG.looks[1],
    vibes: ['old soul', 'new roots'],
    matchTag: 'matches your vibe',
    title: 'The Quiet Luxury Office Set',
    brand: 'Curated look',
    price: 3199,
  },
  {
    id: 'look-complete-3',
    image: IMG.looks[2],
    vibes: ['loud & proud', 'main character'],
    title: 'Statement Brunch Energy',
    brand: 'Curated look',
    price: 2799,
  },
  {
    id: 'look-complete-4',
    image: IMG.looks[4],
    vibes: ['soft hour', 'fresh pages'],
    matchTag: 'works for your body type',
    title: 'The Dreamy Date Night',
    brand: 'Styled by Aura',
    price: 3599,
  },
  {
    id: 'look-complete-5',
    image: IMG.looks[5],
    vibes: ['wild thing', 'new roots'],
    title: 'Boho Festival Ready',
    brand: 'Curated look',
    price: 2199,
  },
  {
    id: 'look-complete-6',
    image: IMG.looks[9],
    vibes: ['off-duty', 'fresh pages'],
    matchTag: 'Riya loved this look',
    title: 'The Effortless Weekend',
    brand: 'Styled by Aura',
    price: 1899,
  },
  {
    id: 'look-complete-7',
    image: IMG.looks[7],
    vibes: ['after dark', 'main character'],
    title: 'The Evening Power Move',
    brand: 'Curated look',
    price: 5499,
  },
  {
    id: 'look-complete-8',
    image: IMG.looks[10],
    vibes: ['boardroom', 'old soul'],
    matchTag: 'trending in your circle',
    title: 'Corporate Desi Chic',
    brand: 'Styled by Aura',
    price: 4199,
  },
];

export const LOOK_PIECES: Record<string, string[]> = {
  'look-complete-1': ['Organza lehenga skirt', 'Sequin blouse', 'Net dupatta', 'Gold juttis', 'Chandbali earrings'],
  'look-complete-2': ['Chanderi silk kurta', 'Straight-fit pants', 'Pashmina stole', 'Leather kolhapuris', 'Pearl studs'],
  'look-complete-3': ['Printed crop top', 'High-waist palazzos', 'Chunky necklace', 'Platform heels', 'Oversized sunglasses'],
  'look-complete-4': ['Ruffled anarkali', 'Churidar', 'Chiffon dupatta', 'Embroidered mojaris', 'Delicate bracelet'],
  'look-complete-5': ['Block-print kurta', 'Dhoti pants', 'Silver anklets', 'Woven bag', 'Oxidised rings'],
  'look-complete-6': ['Linen shirt', 'Cotton culottes', 'Canvas tote', 'White sneakers', 'Minimal hoops'],
  'look-complete-7': ['Velvet blazer', 'Silk camisole', 'Tailored trousers', 'Stiletto heels', 'Statement clutch'],
  'look-complete-8': ['Structured kurta', 'Cigarette pants', 'Silk scarf', 'Pointed flats', 'Analog watch'],
};

export const FASHION_NEWS = [
  { headline: 'Anamika Khanna just dropped a collection that redefines draping', source: 'Fashion Pulse', time: '2h ago' },
  { headline: "Janhvi Kapoor's airport look decoded — get the vibe for ₹3000", source: 'Celeb Style', time: '4h ago' },
  { headline: 'Handloom is trending: 5 brands doing it right', source: 'Conscious Fashion', time: '6h ago' },
];

/* ── Gossip / Editorial Content (Pinkvilla-style) ── */
export const GOSSIP_EDITORIAL = [
  {
    id: 'gossip-1',
    type: 'celeb-decode' as const,
    headline: "Janhvi Kapoor's ₹3,000 airport look that broke the internet",
    subtitle: 'We decoded every piece — and found dupes for all of them',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop',
    source: 'Pinkvilla',
    time: '2h ago',
    likes: 12400,
    pieces: 5,
    totalPrice: 2899,
    vibe: 'off-duty' as VibeArchetype,
    hot: true,
  },
  {
    id: 'gossip-2',
    type: 'drama' as const,
    headline: "Deepika vs Alia: Who wore the Sabyasachi saree better?",
    subtitle: 'Vote now — 34k people already picked sides',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop',
    source: 'Fashion Drama',
    time: '4h ago',
    likes: 34200,
    vibe: 'old soul' as VibeArchetype,
    hot: true,
  },
  {
    id: 'gossip-3',
    type: 'trending' as const,
    headline: "The ₹899 earring that every influencer is wearing right now",
    subtitle: 'Sold out 3 times. We found 4 alternatives.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop',
    source: 'Trend Alert',
    time: '6h ago',
    likes: 8900,
    vibe: 'golden hour' as VibeArchetype,
  },
  {
    id: 'gossip-4',
    type: 'collection-drop' as const,
    headline: "Anamika Khanna x H&M collab confirmed — here's what we know",
    subtitle: 'Prices starting ₹1,499. Drop date: March 25.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=400&fit=crop',
    source: 'Breaking',
    time: '1h ago',
    likes: 45000,
    vibe: 'main character' as VibeArchetype,
    hot: true,
  },
  {
    id: 'gossip-5',
    type: 'scandal' as const,
    headline: "That viral ₹12,000 lehenga? It's actually ₹2,200 on Meesho",
    subtitle: '7 more "luxury" pieces that are secretly budget',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=400&fit=crop',
    source: 'Budget Queen',
    time: '8h ago',
    likes: 67000,
    vibe: 'celebrations' as VibeArchetype,
  },
  {
    id: 'gossip-6',
    type: 'celeb-decode' as const,
    headline: "Zendaya's Met Gala look: Indian designers react",
    subtitle: '"This is what we\'ve been doing for centuries" — 5 desi alternatives',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=400&fit=crop',
    source: 'Celeb Watch',
    time: '12h ago',
    likes: 23400,
    pieces: 4,
    vibe: 'after dark' as VibeArchetype,
  },
];

export const EDITORIAL_CATEGORIES = [
  { label: 'for you', emoji: '✦' },
  { label: 'celeb style', emoji: '⭐' },
  { label: 'budget finds', emoji: '💰' },
  { label: 'drama', emoji: '🔥' },
  { label: 'new drops', emoji: '🆕' },
  { label: 'decoded', emoji: '🔍' },
];

/* ── Look Building Journey Steps ── */
export interface LookBuildingOption {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  tags: string[];
}

export interface LookBuildingStep {
  id: string;
  label: string;
  emoji: string;
  description: string;
  options: LookBuildingOption[];
}

export const LOOK_BUILDING_STEPS: Record<string, LookBuildingStep[]> = {
  'old soul': [
    {
      id: 'outfit', label: 'Outfit', emoji: '👗', description: 'Pick your base — the anchor of the look',
      options: [
        { id: 'os-o1', name: 'Chanderi Silk Kurta Set', brand: 'Libas', price: 2499, image: IMG.looks[1], tags: ['A-line', 'silk blend'] },
        { id: 'os-o2', name: 'Handloom Linen Saree', brand: 'Fabindia', price: 3299, image: IMG.looks[8], tags: ['drape', 'handwoven'] },
        { id: 'os-o3', name: 'Cotton Mulmul Anarkali', brand: 'W', price: 1899, image: IMG.looks[10], tags: ['flowy', 'breathable'] },
      ],
    },
    {
      id: 'bottom', label: 'Bottom', emoji: '👖', description: 'Complete the silhouette',
      options: [
        { id: 'os-b1', name: 'Straight Fit Pants', brand: 'Libas', price: 899, image: IMG.looks[6], tags: ['structured', 'cotton'] },
        { id: 'os-b2', name: 'Wide Leg Palazzos', brand: 'Global Desi', price: 1199, image: IMG.looks[9], tags: ['flowy', 'relaxed'] },
        { id: 'os-b3', name: 'Churidar', brand: 'Aurelia', price: 699, image: IMG.looks[11], tags: ['classic', 'snug'] },
      ],
    },
    {
      id: 'hair', label: 'Hair', emoji: '💇‍♀️', description: 'Set the mood with your hair',
      options: [
        { id: 'os-h1', name: 'Low Bun with Gajra', brand: 'Style tip', price: 0, image: IMG.avatars[0], tags: ['classic', 'elegant'] },
        { id: 'os-h2', name: 'Soft Side Part Waves', brand: 'Style tip', price: 0, image: IMG.avatars[1], tags: ['effortless', 'romantic'] },
        { id: 'os-h3', name: 'Sleek Center Braid', brand: 'Style tip', price: 0, image: IMG.avatars[2], tags: ['minimal', 'refined'] },
      ],
    },
    {
      id: 'makeup', label: 'Makeup', emoji: '💄', description: 'Define the finish',
      options: [
        { id: 'os-m1', name: 'Nude Lip + Kohl Eyes', brand: 'Lakmé', price: 599, image: IMG.avatars[3], tags: ['understated', 'classic'] },
        { id: 'os-m2', name: 'Berry Lip + Dewy Skin', brand: 'Nykaa', price: 799, image: IMG.avatars[4], tags: ['rich', 'warm'] },
        { id: 'os-m3', name: 'No-Makeup Makeup', brand: 'Forest Essentials', price: 1299, image: IMG.avatars[5], tags: ['bare', 'glowing'] },
      ],
    },
    {
      id: 'footwear', label: 'Footwear', emoji: '👡', description: 'Ground the look',
      options: [
        { id: 'os-f1', name: 'Kolhapuri Chappals', brand: 'Fizzy Goblet', price: 1899, image: IMG.looks[1], tags: ['artisan', 'leather'] },
        { id: 'os-f2', name: 'Block Heel Sandals', brand: 'Metro', price: 1499, image: IMG.looks[6], tags: ['structured', 'comfortable'] },
        { id: 'os-f3', name: 'Embroidered Juttis', brand: 'Needledust', price: 2499, image: IMG.looks[10], tags: ['handcraft', 'statement'] },
      ],
    },
    {
      id: 'accessories', label: 'Accessories', emoji: '💍', description: 'The finishing touches',
      options: [
        { id: 'os-a1', name: 'Oxidised Silver Jhumkas', brand: 'Amrapali', price: 1299, image: IMG.looks[8], tags: ['statement', 'heritage'] },
        { id: 'os-a2', name: 'Pearl Drop Earrings', brand: 'Tanishq', price: 2999, image: IMG.looks[9], tags: ['minimal', 'timeless'] },
        { id: 'os-a3', name: 'Kundan Choker + Maang Tikka', brand: 'Isharya', price: 3499, image: IMG.looks[0], tags: ['bridal', 'royal'] },
      ],
    },
    {
      id: 'bag', label: 'Bag', emoji: '👜', description: 'Carry the vibe',
      options: [
        { id: 'os-bg1', name: 'Woven Jute Clutch', brand: 'Nappa Dori', price: 1599, image: IMG.looks[5], tags: ['artisan', 'eco'] },
        { id: 'os-bg2', name: 'Embroidered Potli', brand: 'The Pink Potli', price: 899, image: IMG.looks[4], tags: ['festive', 'compact'] },
        { id: 'os-bg3', name: 'Structured Leather Sling', brand: 'Hidesign', price: 3299, image: IMG.looks[7], tags: ['versatile', 'refined'] },
      ],
    },
  ],
  // Default steps for other vibes (same structure, different content)
  'default': [
    {
      id: 'outfit', label: 'Outfit', emoji: '👗', description: 'Pick your base — the anchor of the look',
      options: [
        { id: 'df-o1', name: 'Printed Coord Set', brand: 'Global Desi', price: 2199, image: IMG.looks[2], tags: ['matching', 'playful'] },
        { id: 'df-o2', name: 'Silk Anarkali Set', brand: 'Libas', price: 3499, image: IMG.looks[0], tags: ['elegant', 'festive'] },
        { id: 'df-o3', name: 'Linen Cape Set', brand: 'Aks', price: 1799, image: IMG.looks[5], tags: ['layered', 'modern'] },
      ],
    },
    {
      id: 'bottom', label: 'Bottom', emoji: '👖', description: 'Complete the silhouette',
      options: [
        { id: 'df-b1', name: 'Sharara Pants', brand: 'Sangria', price: 1299, image: IMG.looks[4], tags: ['flared', 'festive'] },
        { id: 'df-b2', name: 'Dhoti Pants', brand: 'W', price: 999, image: IMG.looks[7], tags: ['draped', 'Indo-western'] },
        { id: 'df-b3', name: 'Fitted Trousers', brand: 'Vero Moda', price: 1499, image: IMG.looks[6], tags: ['tailored', 'sleek'] },
      ],
    },
    {
      id: 'hair', label: 'Hair', emoji: '💇‍♀️', description: 'Set the mood with your hair',
      options: [
        { id: 'df-h1', name: 'Messy Textured Waves', brand: 'Style tip', price: 0, image: IMG.avatars[0], tags: ['carefree', 'volume'] },
        { id: 'df-h2', name: 'High Ponytail + Scrunchie', brand: 'Style tip', price: 0, image: IMG.avatars[1], tags: ['energetic', 'clean'] },
        { id: 'df-h3', name: 'Half-Up with Face Frame', brand: 'Style tip', price: 0, image: IMG.avatars[2], tags: ['balanced', 'soft'] },
      ],
    },
    {
      id: 'makeup', label: 'Makeup', emoji: '💄', description: 'Define the finish',
      options: [
        { id: 'df-m1', name: 'Bold Red Lip + Liner', brand: 'MAC', price: 1499, image: IMG.avatars[3], tags: ['dramatic', 'confident'] },
        { id: 'df-m2', name: 'Glitter Eyes + Gloss', brand: 'Huda Beauty', price: 1199, image: IMG.avatars[4], tags: ['party', 'shimmer'] },
        { id: 'df-m3', name: 'Sun-Kissed Bronzer Look', brand: 'Nykaa', price: 699, image: IMG.avatars[5], tags: ['warm', 'natural'] },
      ],
    },
    {
      id: 'footwear', label: 'Footwear', emoji: '👡', description: 'Ground the look',
      options: [
        { id: 'df-f1', name: 'Strappy Block Heels', brand: 'Charles & Keith', price: 2499, image: IMG.looks[2], tags: ['elegant', 'comfortable'] },
        { id: 'df-f2', name: 'Embellished Flats', brand: 'Fizzy Goblet', price: 1899, image: IMG.looks[3], tags: ['sparkle', 'walkable'] },
        { id: 'df-f3', name: 'Platform Sneakers', brand: 'Puma', price: 3999, image: IMG.looks[9], tags: ['modern', 'street'] },
      ],
    },
    {
      id: 'accessories', label: 'Accessories', emoji: '💍', description: 'The finishing touches',
      options: [
        { id: 'df-a1', name: 'Layered Gold Necklace', brand: 'Tanishq', price: 4999, image: IMG.looks[0], tags: ['layered', 'warm'] },
        { id: 'df-a2', name: 'Statement Cuff + Rings', brand: 'Isharya', price: 2199, image: IMG.looks[4], tags: ['bold', 'modern'] },
        { id: 'df-a3', name: 'Minimal Pearl Set', brand: 'Mia', price: 1799, image: IMG.looks[8], tags: ['delicate', 'classic'] },
      ],
    },
    {
      id: 'bag', label: 'Bag', emoji: '👜', description: 'Carry the vibe',
      options: [
        { id: 'df-bg1', name: 'Beaded Evening Clutch', brand: 'The Pink Potli', price: 1299, image: IMG.looks[0], tags: ['festive', 'petite'] },
        { id: 'df-bg2', name: 'Canvas Crossbody', brand: 'Accessorize', price: 1999, image: IMG.looks[5], tags: ['casual', 'roomy'] },
        { id: 'df-bg3', name: 'Brocade Box Bag', brand: 'Nappa Dori', price: 2799, image: IMG.looks[3], tags: ['artisan', 'luxe'] },
      ],
    },
  ],
};

export const TRENDING_DROPS = [
  { rank: 1, title: 'Mirror Work Lehenga Set', user: 'Priya, 24 · Mumbai', vibe: 'celebrations', saves: '12.4k', image: IMG.looks[0] },
  { rank: 2, title: 'Linen Coord Set — Sage', user: 'Ananya, 22 · Delhi', vibe: 'new roots', saves: '9.8k', image: IMG.looks[1] },
  { rank: 3, title: 'Chanderi Saree Drape', user: 'Meera, 27 · Jaipur', vibe: 'old soul', saves: '8.2k', image: IMG.looks[2] },
  { rank: 4, title: 'Sequin Blazer + Dhoti', user: 'Shruti, 23 · Bangalore', vibe: 'after dark', saves: '7.5k', image: IMG.looks[3] },
  { rank: 5, title: 'Cotton Block Print Kurta', user: 'Naina, 26 · Lucknow', vibe: 'soft hour', saves: '6.9k', image: IMG.looks[4] },
  { rank: 6, title: 'Organza Cape + Pants', user: 'Divya, 25 · Pune', vibe: 'golden hour', saves: '6.1k', image: IMG.looks[5] },
  { rank: 7, title: 'Silk Sharara Set', user: 'Isha, 28 · Hyderabad', vibe: 'celebrations', saves: '5.4k', image: IMG.looks[6] },
  { rank: 8, title: 'Oversized Shirt Dress', user: 'Tara, 21 · Chennai', vibe: 'off-duty', saves: '4.8k', image: IMG.looks[7] },
  { rank: 9, title: 'Embroidered Anarkali', user: 'Kavya, 24 · Kolkata', vibe: 'old soul', saves: '4.2k', image: IMG.looks[8] },
  { rank: 10, title: 'Tie-Dye Palazzo Set', user: 'Rhea, 23 · Goa', vibe: 'wild thing', saves: '3.7k', image: IMG.looks[9] },
];

/* ─────────── Search hero rotating prompts ─────────── */
export const SEARCH_PROMPTS = [
  'comfy but put-together',
  "show me Deepika's red look",
  'sangeet fit under ₹3k',
  'office to drinks in one outfit',
  'feeling like a soft girl today',
  'beach wedding, no sweat',
];

/* ─────────── Influencer reels (separate from Pinterest) ─────────── */
export const INFLUENCER_REELS = [
  { id: 'ir-1', creator: 'Komal Pandey',     handle: '@komalpandeyofficial', vibe: 'main character' as VibeArchetype, thumb: IMG.looks[2], avatar: IMG.avatars[0], duration: '0:42', plays: '1.2M' },
  { id: 'ir-2', creator: 'Masoom Minawala',  handle: '@masoomminawala',      vibe: 'celebrations'   as VibeArchetype, thumb: IMG.looks[0], avatar: IMG.avatars[1], duration: '0:58', plays: '890k' },
  { id: 'ir-3', creator: 'Diipa Khosla',     handle: '@diipakhosla',          vibe: 'old soul'       as VibeArchetype, thumb: IMG.looks[1], avatar: IMG.avatars[2], duration: '1:08', plays: '640k' },
  { id: 'ir-4', creator: 'Kritika Khurana',  handle: '@thatbohogirl',         vibe: 'wild thing'     as VibeArchetype, thumb: IMG.looks[7], avatar: IMG.avatars[3], duration: '0:36', plays: '420k' },
  { id: 'ir-5', creator: 'Sejal Kumar',      handle: '@sejalkumar1195',       vibe: 'fresh pages'    as VibeArchetype, thumb: IMG.looks[10], avatar: IMG.avatars[4], duration: '0:51', plays: '380k' },
  { id: 'ir-6', creator: 'Aashna Shroff',    handle: '@aashnashroff',         vibe: 'after dark'     as VibeArchetype, thumb: IMG.looks[3], avatar: IMG.avatars[5], duration: '0:47', plays: '310k' },
];

/* ─────────── Pinterest-style boards (mosaic) ─────────── */
export const PINTEREST_BOARDS = [
  { id: 'pb-1', title: 'romantic · ethereal',        pins: 25, images: [IMG.looks[0], IMG.looks[2], IMG.looks[5], IMG.looks[8]] },
  { id: 'pb-2', title: 'quiet luxury · neutrals',    pins: 32, images: [IMG.looks[1], IMG.looks[10], IMG.looks[6], IMG.looks[4]] },
  { id: 'pb-3', title: 'sangeet color stories',      pins: 18, images: [IMG.looks[5], IMG.looks[0], IMG.looks[11], IMG.looks[3]] },
  { id: 'pb-4', title: 'co-ord set inspiration',     pins: 41, images: [IMG.looks[7], IMG.looks[9], IMG.looks[2], IMG.looks[1]] },
];

/* ─────────── Iconic Bollywood/OTT looks ─────────── */
export const ICONIC_LOOKS = [
  { id: 'ic-1', character: 'Poo',     film: 'K3G',                year: 2001, hook: 'maximalist y2k glam',     image: IMG.looks[4] },
  { id: 'ic-2', character: 'Geet',    film: 'Jab We Met',          year: 2007, hook: 'punjabi girl-next-door',  image: IMG.looks[0] },
  { id: 'ic-3', character: 'Naina',   film: 'YJHD',                year: 2013, hook: 'soft academia',           image: IMG.looks[1] },
  { id: 'ic-4', character: 'Shanaya', film: 'Student of the Year', year: 2012, hook: 'preppy main character',   image: IMG.looks[5] },
  { id: 'ic-5', character: 'Tara',    film: 'Tamasha',             year: 2015, hook: 'free-spirit boho',        image: IMG.looks[7] },
  { id: 'ic-6', character: 'Veronica',film: 'Cocktail',            year: 2012, hook: 'edgy after-dark',         image: IMG.looks[3] },
];

/* ─────────── Celeb 3-word aesthetic (style like icons) ─────────── */
export const CELEB_AESTHETICS = [
  { id: 'ca-1', name: 'Deepika',  aesthetic: 'structured · regal · clean',         image: IMG.personalities[0].image },
  { id: 'ca-2', name: 'Alia',     aesthetic: 'effortless · indo-western · soft',   image: IMG.personalities[1].image },
  { id: 'ca-3', name: 'Sonam',    aesthetic: 'maximalist · couture · daring',      image: IMG.personalities[2].image },
  { id: 'ca-4', name: 'Anushka',  aesthetic: 'minimal · clean · tailored',         image: IMG.personalities[3].image },
  { id: 'ca-5', name: 'Malaika',  aesthetic: 'bold · sculpted · monochrome',       image: IMG.personalities[5].image },
  { id: 'ca-6', name: 'Janhvi',   aesthetic: 'romantic · feminine · soft',         image: IMG.personalities[4].image },
];

/* ─────────── Amaaya's commerce-forward editorial ─────────── */
export const AMAAYA_TEA = [
  { id: 'at-1', hook: "Organza everywhere — 3 ways under ₹2,500",        take: "the sheer-but-not-naked moment of the season.",  vibe: 'soft hour'    as VibeArchetype, image: IMG.looks[2], price: 2500 },
  { id: 'at-2', hook: "Mirror work is back — Mumbai brides are obsessed", take: "small mirrors. big drama. wear it before saturday.", vibe: 'celebrations' as VibeArchetype, image: IMG.looks[0], price: 4299 },
  { id: 'at-3', hook: "The ₹899 earring on every Delhi feed right now",   take: "hammered gold, oversized, sold out twice already.",  vibe: 'after dark'   as VibeArchetype, image: IMG.looks[3], price: 899 },
  { id: 'at-4', hook: "Sage green kurta sets — the new beige",            take: "calm energy. photographs like a dream.",             vibe: 'new roots'    as VibeArchetype, image: IMG.looks[1], price: 1899 },
  { id: 'at-5', hook: "Dhoti pants for sangeet — yes, really",            take: "comfortable. movement-friendly. nobody else has it.", vibe: 'celebrations' as VibeArchetype, image: IMG.looks[5], price: 2199 },
];

/* ─────────── Continue & history ─────────── */
export const STYLING_SESSIONS = [
  { id: 'ss-1', query: "looks for Divya's wedding",     thumb: IMG.looks[0], when: 'yesterday',   matches: 12 },
  { id: 'ss-2', query: 'office to drinks one outfit',   thumb: IMG.looks[6], when: '2 days ago',  matches: 8 },
  { id: 'ss-3', query: 'soft girl daily wear',          thumb: IMG.looks[2], when: '4 days ago',  matches: 15 },
];

export const RECENTLY_VIEWED = [
  { id: 'rv-1', title: 'Mirror work lehenga set',  brand: 'Libas',         price: 4299, image: IMG.looks[0] },
  { id: 'rv-2', title: 'Sage linen co-ord',        brand: 'Global Desi',   price: 2199, image: IMG.looks[1] },
  { id: 'rv-3', title: 'Chanderi saree drape',     brand: 'W',             price: 3199, image: IMG.looks[2] },
  { id: 'rv-4', title: 'Sequin blazer set',        brand: 'Aurelia',       price: 3899, image: IMG.looks[3] },
  { id: 'rv-5', title: 'Block print kurta',        brand: 'Avaasa',        price: 1399, image: IMG.looks[4] },
  { id: 'rv-6', title: 'Organza cape + pants',     brand: 'Aks',           price: 2799, image: IMG.looks[5] },
];

/* ─────────── Event prep context ─────────── */
export const EVENT_PREP = {
  title: "Divya's wedding",
  daysAway: 11,
  occasions: [
    { name: 'Mehendi',  vibe: 'soft hour'    as VibeArchetype, image: IMG.looks[10] },
    { name: 'Sangeet',  vibe: 'celebrations' as VibeArchetype, image: IMG.looks[0] },
    { name: 'Wedding',  vibe: 'old soul'     as VibeArchetype, image: IMG.looks[1] },
    { name: 'Reception',vibe: 'after dark'   as VibeArchetype, image: IMG.looks[3] },
  ],
};

export { IMG };
