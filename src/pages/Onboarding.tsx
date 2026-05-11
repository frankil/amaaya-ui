import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStyleSoul } from '@/context/StyleSoulContext';
import { VibeArchetype, OccasionTag, BodyShape, HeightRange, ColourPalette } from '@/types/style-soul';
import { VIBE_DESCRIPTIONS, VIBE_IMAGES, SKIN_TONE_COLORS, COLOUR_PALETTE_SWATCHES } from '@/data/mock-data';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const VIBES: VibeArchetype[] = [
  'old soul', 'celebrations', 'soft hour', 'loud & proud',
  'new roots', 'boardroom', 'wild thing', 'after dark',
  'main character', 'golden hour', 'fresh pages', 'off-duty',
];

const OCCASIONS: OccasionTag[] = [
  'daily wear', 'work', 'dates', 'friend hangouts',
  'weddings', 'sangeet / mehendi', 'festive puja', 'travel',
  "girls' nights", 'parties', 'gym / active', 'formal events',
];

const OCCASION_ICONS: Record<string, string> = {
  'daily wear': '☀️', 'work': '💼', 'dates': '💕', 'friend hangouts': '🫂',
  'weddings': '💍', 'sangeet / mehendi': '🪷', 'festive puja': '🪔', 'travel': '✈️',
  "girls' nights": '🌙', 'parties': '🎉', 'gym / active': '🏃‍♀️', 'formal events': '👔',
};

const BODY_SHAPES: { shape: BodyShape; icon: string }[] = [
  { shape: 'pear', icon: '🍐' },
  { shape: 'hourglass', icon: '⏳' },
  { shape: 'rectangle', icon: '▬' },
  { shape: 'inverted-triangle', icon: '🔻' },
  { shape: 'apple', icon: '🍎' },
];

const HEIGHTS: { value: HeightRange; label: string }[] = [
  { value: 'petite', label: 'under 5\'3"' },
  { value: 'average', label: '5\'3" – 5\'6"' },
  { value: 'tall', label: '5\'6"+' },
];

const COLOUR_PALETTES: ColourPalette[] = [
  'warm & earthy', 'cool & calm', 'bold & vibrant',
  'soft & romantic', 'rich & dark', 'neutral & minimal',
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showTransition, setShowTransition] = useState(false);
  const [occasionName, setOccasionName] = useState('');
  const [occasionDate, setOccasionDate] = useState<Date>();
  const navigate = useNavigate();
  const { profile, toggleVibe, toggleOccasion, setBodyShape, setHeight, setSkinTone, toggleColourPalette, addOccasion, completeOnboarding } = useStyleSoul();

  const next = () => {
    if (step === 5) {
      // Add occasion if filled
      if (occasionName && occasionDate) {
        addOccasion({ id: 'occ-1', name: occasionName, date: occasionDate });
      }
      setShowTransition(true);
      setTimeout(() => {
        completeOnboarding();
        navigate('/');
      }, 3000);
      return;
    }
    setDirection(1);
    setStep(s => s + 1);
  };

  const canProceed = () => {
    if (step === 1) return profile.vibes.length >= 1;
    if (step === 2) return profile.occasions.length >= 1;
    if (step === 3) return !!profile.bodyShape;
    if (step === 4) return profile.colourPalettes.length >= 1;
    return true;
  };

  if (showTransition) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.32, 0, 0.67, 0] }}
        >
          <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-[280px] mx-auto">
            {profile.vibes.map((vibe, i) => (
              <motion.div
                key={vibe}
                className="w-16 h-16 rounded-full overflow-hidden"
                initial={{ opacity: 0, scale: 0, x: (i - 1.5) * 80, y: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8, type: 'spring' }}
              >
                <img src={VIBE_IMAGES[vibe]} alt={vibe} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
          <motion.p
            className="font-display text-xl text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            your style soul is ready.
          </motion.p>
          <motion.p
            className="font-display text-2xl text-primary mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            meet your aura.
          </motion.p>
        </motion.div>
      </div>
    );
  }

  const screens = [
    // Screen 0 — Welcome
    <div key="welcome" className="flex flex-col items-center justify-center min-h-screen px-6 relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-30">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-cover bg-center"
            style={{ backgroundImage: `url(${VIBE_IMAGES[VIBES[i]]})` }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, delay: i * 2 }}
          />
        ))}
      </div>
      <div className="relative z-10 text-center">
        <motion.h1
          className="font-display text-3xl font-light tracking-wider text-foreground lowercase italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          aura
        </motion.h1>
        <motion.p
          className="text-sm text-muted-foreground mt-3 font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          your style, alive.
        </motion.p>
        <motion.div
          className="flex flex-col gap-3 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={next}
            className="pill bg-primary text-primary-foreground px-8 py-3 text-base font-medium shadow-glow-fire"
          >
            discover your aura
          </button>
          <button className="pill text-muted-foreground text-sm">
            i already have an account
          </button>
        </motion.div>
      </div>
    </div>,

    // Screen 1 — Vibe World
    <div key="vibes" className="px-4 pt-12 pb-24">
      <h2 className="font-display text-xl text-center text-foreground italic">which worlds feel like you?</h2>
      <p className="text-sm text-muted-foreground text-center mt-2 mb-6 px-4">
        pick the ones that make you feel something — even if you've never dressed that way yet.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {VIBES.map((vibe, i) => {
          const selected = profile.vibes.includes(vibe);
          return (
            <motion.button
              key={vibe}
              onClick={() => toggleVibe(vibe)}
              className={cn(
                "relative rounded-card overflow-hidden aspect-[4/5] group",
                selected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
              whileTap={{ scale: 0.97 }}
            >
              <img src={VIBE_IMAGES[vibe]} alt={vibe} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="font-display text-lg text-primary-foreground leading-tight">{vibe}</p>
                <p className="text-xs text-primary-foreground/70 mt-0.5 font-body">{VIBE_DESCRIPTIONS[vibe]}</p>
              </div>
              {selected && (
                <motion.div
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <span className="text-primary-foreground text-xs">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-4">
        {profile.vibes.length}/4 selected
      </p>
    </div>,

    // Screen 2 — Moments
    <div key="moments" className="px-4 pt-12 pb-24">
      <h2 className="font-display text-xl text-center text-foreground italic">what do you dress for?</h2>
      <p className="text-sm text-muted-foreground text-center mt-2 mb-6">we'll make sure you're always ready.</p>
      <div className="grid grid-cols-2 gap-3">
        {OCCASIONS.map((occ, i) => {
          const selected = profile.occasions.includes(occ);
          return (
            <motion.button
              key={occ}
              onClick={() => toggleOccasion(occ)}
              className={cn(
                "flex items-center gap-3 px-4 py-4 rounded-card bg-card shadow-card text-left transition-all",
                selected && "ring-2 ring-primary bg-secondary"
              )}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-lg">{OCCASION_ICONS[occ] || '✦'}</span>
              <span className="text-sm font-body text-foreground capitalize">{occ}</span>
            </motion.button>
          );
        })}
      </div>
    </div>,

    // Screen 3 — Body
    <div key="body" className="px-4 pt-12 pb-24">
      <h2 className="font-display text-xl text-center text-foreground italic">let's make sure everything fits — actually.</h2>
      <p className="text-sm text-muted-foreground text-center mt-2 mb-8 px-2">
        this stays private. aura's stylist uses it to recommend cuts and silhouettes that genuinely work for you.
      </p>

      <div className="mb-8">
        <p className="text-sm font-medium text-foreground mb-3 font-body">your shape</p>
        <div className="flex justify-around">
          {BODY_SHAPES.map(({ shape, icon }) => (
            <button
              key={shape}
              onClick={() => setBodyShape(shape)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-card transition-all",
                profile.bodyShape === shape && "bg-secondary ring-2 ring-primary"
              )}
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-xs text-muted-foreground capitalize font-body">{shape}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm font-medium text-foreground mb-3 font-body">your height</p>
        <div className="flex gap-3">
          {HEIGHTS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setHeight(value)}
              className={cn(
                "flex-1 py-3 rounded-pill text-sm font-body transition-all",
                profile.height === value
                  ? "bg-primary text-primary-foreground shadow-glow-fire"
                  : "bg-card shadow-card text-foreground"
              )}
            >
              <span className="capitalize font-medium">{value}</span>
              <span className="block text-xs mt-0.5 opacity-70">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground mb-3 font-body">your skin tone</p>
        <div className="flex justify-around">
          {SKIN_TONE_COLORS.map((color, i) => (
            <button
              key={i}
              onClick={() => setSkinTone(i)}
              className={cn(
                "w-9 h-9 rounded-full transition-all",
                profile.skinToneIndex === i && "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>,

    // Screen 4 — Colours
    <div key="colours" className="px-4 pt-12 pb-24">
      <h2 className="font-display text-xl text-center text-foreground italic">what palette feels like home?</h2>
      <p className="text-sm text-muted-foreground text-center mt-2 mb-6">pick 1–2 that speak to you.</p>
      <div className="grid grid-cols-2 gap-3">
        {COLOUR_PALETTES.map((palette) => {
          const selected = profile.colourPalettes.includes(palette);
          const swatches = COLOUR_PALETTE_SWATCHES[palette];
          return (
            <motion.button
              key={palette}
              onClick={() => toggleColourPalette(palette)}
              className={cn(
                "flex flex-col items-center p-4 rounded-card bg-card shadow-card transition-all",
                selected && "ring-2 ring-primary bg-secondary"
              )}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex gap-1.5 mb-3">
                {swatches.map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border border-border/30" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="text-sm font-body text-foreground capitalize">{palette}</span>
            </motion.button>
          );
        })}
      </div>
    </div>,

    // Screen 5 — First Occasion
    <div key="occasion" className="px-4 pt-12 pb-24">
      <h2 className="font-display text-xl text-center text-foreground italic">anything coming up?</h2>
      <p className="text-sm text-muted-foreground text-center mt-2 mb-8">
        add an occasion and your stylist starts preparing looks for you today.
      </p>
      <div className="bg-card rounded-card shadow-card p-5 space-y-4">
        <div>
          <label className="text-sm font-body text-foreground font-medium mb-1.5 block">what's the occasion?</label>
          <input
            type="text"
            value={occasionName}
            onChange={(e) => setOccasionName(e.target.value)}
            placeholder="e.g. Divya's wedding, office party..."
            className="w-full px-4 py-3 rounded-pill bg-secondary text-foreground text-sm font-body border-0 outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
          />
        </div>
        <div>
          <label className="text-sm font-body text-foreground font-medium mb-1.5 block">when is it?</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full px-4 py-3 rounded-pill bg-secondary text-sm font-body text-left text-foreground">
                {occasionDate ? format(occasionDate, 'PPP') : 'pick a date'}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={occasionDate}
                onSelect={setOccasionDate}
                className="p-3 pointer-events-auto"
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <button onClick={next} className="w-full mt-4 text-sm text-muted-foreground font-body">
        skip for now
      </button>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto relative overflow-hidden">
      {/* Progress dots */}
      {step > 0 && (
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center gap-1.5 max-w-[430px] mx-auto">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                s <= step ? "bg-primary w-6" : "bg-border"
              )}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {screens[step]}
        </motion.div>
      </AnimatePresence>

      {/* CTA button */}
      {step > 0 && step < 5 && (
        <div className="fixed bottom-6 left-4 right-4 max-w-[430px] mx-auto z-40">
          <motion.button
            onClick={next}
            disabled={!canProceed()}
            className={cn(
              "w-full py-3.5 rounded-pill text-base font-body font-semibold transition-all",
              canProceed()
                ? "bg-primary text-primary-foreground shadow-glow-fire"
                : "bg-muted text-muted-foreground"
            )}
            whileTap={{ scale: 0.98 }}
          >
            {step === 4 ? 'almost there →' : 'yes, this is me →'}
          </motion.button>
        </div>
      )}

      {step === 5 && occasionName && (
        <div className="fixed bottom-6 left-4 right-4 max-w-[430px] mx-auto z-40">
          <motion.button
            onClick={next}
            className="w-full py-3.5 rounded-pill bg-primary text-primary-foreground text-base font-body font-semibold shadow-glow-fire"
            whileTap={{ scale: 0.98 }}
          >
            meet your aura ✦
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
