import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StyleSoulProfile, VibeArchetype, OccasionTag, BodyShape, HeightRange, ColourPalette, UpcomingOccasion } from '@/types/style-soul';

const defaultProfile: StyleSoulProfile = {
  name: '',
  vibes: [],
  occasions: [],
  colourPalettes: [],
  comfortZone: 50,
  upcomingOccasions: [],
  onboardingComplete: false,
};

interface StyleSoulContextType {
  profile: StyleSoulProfile;
  setName: (name: string) => void;
  toggleVibe: (vibe: VibeArchetype) => void;
  toggleOccasion: (occasion: OccasionTag) => void;
  setBodyShape: (shape: BodyShape) => void;
  setHeight: (height: HeightRange) => void;
  setSkinTone: (index: number) => void;
  toggleColourPalette: (palette: ColourPalette) => void;
  setComfortZone: (value: number) => void;
  addOccasion: (occasion: UpcomingOccasion) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const StyleSoulContext = createContext<StyleSoulContextType | null>(null);

export const useStyleSoul = () => {
  const ctx = useContext(StyleSoulContext);
  if (!ctx) throw new Error('useStyleSoul must be used within StyleSoulProvider');
  return ctx;
};

export const StyleSoulProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<StyleSoulProfile>(defaultProfile);

  const toggleVibe = (vibe: VibeArchetype) => {
    setProfile(p => ({
      ...p,
      vibes: p.vibes.includes(vibe)
        ? p.vibes.filter(v => v !== vibe)
        : p.vibes.length < 4 ? [...p.vibes, vibe] : p.vibes,
    }));
  };

  const toggleOccasion = (occasion: OccasionTag) => {
    setProfile(p => ({
      ...p,
      occasions: p.occasions.includes(occasion)
        ? p.occasions.filter(o => o !== occasion)
        : [...p.occasions, occasion],
    }));
  };

  const toggleColourPalette = (palette: ColourPalette) => {
    setProfile(p => ({
      ...p,
      colourPalettes: p.colourPalettes.includes(palette)
        ? p.colourPalettes.filter(c => c !== palette)
        : p.colourPalettes.length < 2 ? [...p.colourPalettes, palette] : p.colourPalettes,
    }));
  };

  return (
    <StyleSoulContext.Provider value={{
      profile,
      setName: (name) => setProfile(p => ({ ...p, name })),
      toggleVibe,
      toggleOccasion,
      setBodyShape: (bodyShape) => setProfile(p => ({ ...p, bodyShape })),
      setHeight: (height) => setProfile(p => ({ ...p, height })),
      setSkinTone: (skinToneIndex) => setProfile(p => ({ ...p, skinToneIndex })),
      toggleColourPalette,
      setComfortZone: (comfortZone) => setProfile(p => ({ ...p, comfortZone })),
      addOccasion: (occasion) => setProfile(p => ({ ...p, upcomingOccasions: [...p.upcomingOccasions, occasion] })),
      completeOnboarding: () => setProfile(p => ({ ...p, onboardingComplete: true })),
      resetOnboarding: () => setProfile(defaultProfile),
    }}>
      {children}
    </StyleSoulContext.Provider>
  );
};
