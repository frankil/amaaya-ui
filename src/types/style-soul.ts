export type VibeArchetype =
  | 'old soul' | 'celebrations' | 'soft hour' | 'loud & proud'
  | 'new roots' | 'boardroom' | 'wild thing' | 'after dark'
  | 'main character' | 'golden hour' | 'fresh pages' | 'off-duty';

export type OccasionTag =
  | 'daily wear' | 'work' | 'dates' | 'friend hangouts'
  | 'weddings' | 'sangeet / mehendi' | 'festive puja' | 'travel'
  | 'girls\' nights' | 'parties' | 'gym / active' | 'formal events';

export type BodyShape = 'pear' | 'hourglass' | 'rectangle' | 'inverted-triangle' | 'apple';
export type HeightRange = 'petite' | 'average' | 'tall';

export type ColourPalette =
  | 'warm & earthy' | 'cool & calm' | 'bold & vibrant'
  | 'soft & romantic' | 'rich & dark' | 'neutral & minimal';

export interface UpcomingOccasion {
  id: string;
  name: string;
  date: Date;
  vibeNote?: string;
}

export interface StyleSoulProfile {
  name: string;
  ageRange?: string;
  city?: string;
  vibes: VibeArchetype[];
  occasions: OccasionTag[];
  bodyShape?: BodyShape;
  height?: HeightRange;
  skinToneIndex?: number; // 0-7
  colourPalettes: ColourPalette[];
  comfortZone: number; // 0-100, conservative to experimental
  lifestyle?: string;
  upcomingOccasions: UpcomingOccasion[];
  onboardingComplete: boolean;
}

export interface LookCard {
  id: string;
  image: string;
  vibes: string[];
  matchTag?: string;
  brand?: string;
  price?: number;
  title?: string;
}

export interface VibeWorldData {
  slug: VibeArchetype;
  title: string;
  tagline: string;
  heroImage: string;
  description: string;
  ingredients: {
    silhouettes: string[];
    fabrics: string[];
    palette: string[];
    avoid: string[];
    accessories: string;
  };
  looks: LookCard[];
}

export interface ProductCard {
  id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
  matchScore: number;
  matchReasons: string[];
  caveat?: string;
  vibes: string[];
}

export interface FriendProfile {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  todayVibe?: string;
  hasPostedToday: boolean;
}
