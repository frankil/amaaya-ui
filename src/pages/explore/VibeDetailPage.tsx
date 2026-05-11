import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { VIBE_IMAGES, VIBE_DESCRIPTIONS, MOCK_FRIENDS, PERSONALITY_INSPO, COLOUR_PALETTE_SWATCHES, LOOK_BUILDING_STEPS } from '@/data/mock-data';
import type { LookBuildingStep, LookBuildingOption } from '@/data/mock-data';
import { VibeArchetype } from '@/types/style-soul';
import { Progress } from '@/components/ui/progress';
import LookActions from '@/components/LookActions';

/* ── Vibe DNA data ── */
const VIBE_DNA: Record<string, { silhouettes: string[]; fabrics: string[]; colors: string[]; mood: string; icons: string[] }> = {
  'old soul': { silhouettes: ['A-line', 'Straight fit', 'Draped'], fabrics: ['Chanderi', 'Silk', 'Linen'], colors: ['#C2B280', '#556B2F', '#A0522D', '#F5F5F0'], mood: 'Understated elegance with heritage warmth', icons: ['🪷', '📿', '🕊️'] },
  'celebrations': { silhouettes: ['Flared', 'Layered', 'Volume'], fabrics: ['Organza', 'Brocade', 'Sequin'], colors: ['#C2185B', '#E65100', '#FFD700', '#6A0D34'], mood: 'Maximalist joy meets Indian grandeur', icons: ['🎪', '✨', '🪔'] },
  'soft hour': { silhouettes: ['Flowy', 'Tiered', 'Wrap'], fabrics: ['Chiffon', 'Mulmul', 'Georgette'], colors: ['#F8BBD0', '#FFCCBC', '#CE93D8', '#FFF8E1'], mood: 'Dreamy femininity in motion', icons: ['🌸', '☁️', '🦋'] },
  'loud & proud': { silhouettes: ['Oversized', 'Cropped', 'Deconstructed'], fabrics: ['Denim', 'Leather', 'Cotton'], colors: ['#C2185B', '#1565C0', '#FFD700', '#212121'], mood: 'Bold statements, zero apologies', icons: ['⚡', '🎤', '🖤'] },
  'default': { silhouettes: ['Relaxed', 'Structured', 'Fluid'], fabrics: ['Cotton', 'Linen', 'Silk blend'], colors: ['#9E9E9E', '#F5F5F0', '#556B2F', '#C2B280'], mood: 'Find your own frequency', icons: ['🌀', '✦', '🌿'] },
};

/* ── Social look builders ── */
const LOOK_BUILDERS = [
  { name: 'Riya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', pieces: 5, lookImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&h=260&fit=crop', caption: 'My take on old soul for Diwali 🪔' },
  { name: 'Ananya', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face', pieces: 7, lookImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200&h=260&fit=crop', caption: 'Went full celebrations energy 💃' },
  { name: 'Meera', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', pieces: 4, lookImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=260&fit=crop', caption: 'Minimalist but make it festive' },
  { name: 'Shruti', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face', pieces: 6, lookImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200&h=260&fit=crop', caption: 'Office vibe with a twist ✨' },
];

const VibeDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const vibe = decodeURIComponent(slug || '') as VibeArchetype;
  const image = VIBE_IMAGES[vibe];
  const desc = VIBE_DESCRIPTIONS[vibe];
  const dna = VIBE_DNA[vibe] || VIBE_DNA['default'];

  const steps: LookBuildingStep[] = useMemo(
    () => LOOK_BUILDING_STEPS[vibe] || LOOK_BUILDING_STEPS['default'],
    [vibe]
  );

  const [activeStep, setActiveStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, LookBuildingOption>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [activeTab, setActiveTab] = useState<'build' | 'explore'>('explore');

  const currentStep = steps[activeStep];
  const progress = ((Object.keys(selections).length) / steps.length) * 100;
  const totalPrice = Object.values(selections).reduce((sum, s) => sum + s.price, 0);

  const selectOption = (option: LookBuildingOption) => {
    setSelections(prev => ({ ...prev, [currentStep.id]: option }));
    setTimeout(() => {
      if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
      else setShowSummary(true);
    }, 400);
  };

  const goToStep = (i: number) => {
    setShowSummary(false);
    setActiveStep(i);
  };

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="relative h-[260px]">
        <img src={image} alt={vibe} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-12 left-4 pill bg-background/60 backdrop-blur-md text-foreground text-sm">← back</button>
        <div className="absolute bottom-4 left-5 right-5">
          <div className="flex items-center gap-2 mb-1">
            {dna.icons.map((icon, i) => <span key={i} className="text-lg">{icon}</span>)}
          </div>
          <h1 className="font-display text-2xl text-foreground capitalize">{vibe}</h1>
          <p className="text-xs text-muted-foreground font-body italic">{desc}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="pill bg-background/50 backdrop-blur-md text-[10px] font-mono text-foreground">
              {(Math.floor(Math.random() * 15) + 3)}k followers
            </span>
            <span className="pill bg-accent/20 text-accent text-[10px] font-semibold">
              #{Math.floor(Math.random() * 5) + 1} trending
            </span>
          </div>
        </div>
      </div>

      {/* Vibe DNA Section */}
      <div className="px-5 mt-5">
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-3">vibe DNA</p>
        <div className="rounded-[16px] bg-card shadow-card p-4 space-y-3">
          <p className="text-sm font-body text-foreground italic">"{dna.mood}"</p>
          
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-[9px] font-mono text-muted-foreground uppercase mb-1.5">silhouettes</p>
              <div className="space-y-1">
                {dna.silhouettes.map(s => (
                  <span key={s} className="block text-[11px] font-body text-foreground">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[9px] font-mono text-muted-foreground uppercase mb-1.5">fabrics</p>
              <div className="space-y-1">
                {dna.fabrics.map(f => (
                  <span key={f} className="block text-[11px] font-body text-foreground">{f}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[9px] font-mono text-muted-foreground uppercase mb-1.5">palette</p>
              <div className="flex gap-1.5 flex-wrap">
                {dna.colors.map(c => (
                  <div key={c} className="w-6 h-6 rounded-full border border-border" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>

          {/* AI Stylist CTA inline */}
          <motion.button
            onClick={() => navigate('/mirror', { state: { context: `Tell me more about ${vibe} vibe` } })}
            className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-aura-ai-surface hover:bg-accent/10 transition-colors"
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center shadow-glow-ai">
              <span className="text-accent-foreground text-xs">✦</span>
            </div>
            <span className="text-[11px] font-body text-foreground">Ask AI: <em>"What makes {vibe} different from similar vibes?"</em></span>
          </motion.button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="px-5 mt-5">
        <div className="flex bg-secondary rounded-full p-0.5">
          {(['explore', 'build'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-sm font-body py-2 rounded-full transition-all ${
                activeTab === tab ? 'bg-card shadow-card text-foreground font-bold' : 'text-muted-foreground'
              }`}
            >
              {tab === 'explore' ? '🌍 Explore' : '🎨 Build a Look'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'explore' ? (
        /* ═══ EXPLORE TAB ═══ */
        <div className="px-5 mt-5 space-y-6">
          {/* Community looks */}
          <div>
            <div className="flex items-end justify-between mb-3">
              <div>
                <h3 className="font-display text-lg text-foreground">looks from the community</h3>
                <p className="text-[10px] text-muted-foreground font-body">{LOOK_BUILDERS.length * 47} people built this vibe</p>
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-2">
              {LOOK_BUILDERS.map((builder, i) => (
                <motion.div
                  key={builder.name}
                  className="min-w-[160px] rounded-[16px] overflow-hidden bg-card shadow-card flex-shrink-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="relative h-[180px]">
                    <img src={builder.lookImage} alt="" className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 pill bg-background/70 backdrop-blur-md py-0.5 px-2">
                      <img src={builder.avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
                      <span className="text-[10px] font-body font-bold text-foreground">{builder.name}</span>
                    </div>
                    <div className="absolute top-2 right-2 pill bg-background/50 backdrop-blur-md text-[9px] font-mono text-foreground px-1.5 py-0.5">
                      {builder.pieces} pieces
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[11px] font-body text-foreground">{builder.caption}</p>
                    <div className="flex items-center justify-between mt-2">
                      <LookActions variant="inline" context={`${builder.name}'s ${vibe} look`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Share & Vote */}
          <motion.div
            className="rounded-[16px] bg-card shadow-card p-4 space-y-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-display text-base text-foreground">get your circle's opinion</h3>
            <p className="text-xs text-muted-foreground font-body">Share your look with friends and let them vote on it</p>
            <div className="flex gap-2">
              <motion.button
                className="flex-1 pill bg-primary text-primary-foreground text-xs font-bold py-2.5"
                whileTap={{ scale: 0.96 }}
              >
                📊 Share for voting
              </motion.button>
              <motion.button
                className="flex-1 pill bg-secondary text-foreground text-xs font-bold py-2.5"
                whileTap={{ scale: 0.96 }}
              >
                👯‍♀️ Group shopping
              </motion.button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {MOCK_FRIENDS.slice(0, 3).map(f => (
                  <img key={f.id} src={f.avatar} alt="" className="w-5 h-5 rounded-full border-2 border-card object-cover" />
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground font-body">Riya, Meera + 8 are online now</span>
            </div>
          </motion.div>

          {/* Celeb inspo for this vibe */}
          <div>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">who nails {vibe}</p>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-2">
              {PERSONALITY_INSPO.slice(0, 4).map((p, i) => (
                <motion.div
                  key={p.name}
                  className="min-w-[100px] flex-shrink-0 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="w-16 h-16 rounded-full mx-auto overflow-hidden border-2 border-aura-celeb">
                    <img src={p.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <p className="text-[11px] font-body font-bold text-foreground mt-1">{p.name}</p>
                  <p className="text-[9px] text-muted-foreground">{p.tagline}</p>
                  <button
                    onClick={() => navigate('/mirror', { state: { context: `Get me ${p.name}'s ${vibe} look` } })}
                    className="text-[9px] text-accent font-semibold mt-0.5"
                  >
                    ask AI to style me like this ✦
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Start building CTA */}
          <motion.button
            onClick={() => setActiveTab('build')}
            className="w-full rounded-[16px] bg-accent text-accent-foreground p-4 text-center shadow-glow-ai"
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-lg">🎨</span>
            <p className="font-display text-base mt-1">ready to build your {vibe} look?</p>
            <p className="text-xs font-body opacity-80 mt-0.5">Step through outfit → hair → makeup → accessories</p>
          </motion.button>
        </div>
      ) : (
        /* ═══ BUILD TAB ═══ */
        <div className="mt-4">
          {/* Progress bar */}
          <div className="px-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono text-muted-foreground">
                {Object.keys(selections).length} of {steps.length} pieces chosen
              </span>
              {totalPrice > 0 && (
                <span className="text-[10px] font-mono text-primary font-bold">₹{totalPrice.toLocaleString()} total</span>
              )}
            </div>
            <Progress value={progress} className="h-1.5 bg-secondary" />
          </div>

          {/* Step pills */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide px-5 mt-3 pb-1">
            {steps.map((step, i) => {
              const isSelected = !!selections[step.id];
              const isCurrent = i === activeStep && !showSummary;
              return (
                <motion.button
                  key={step.id}
                  onClick={() => goToStep(i)}
                  className={`pill text-[11px] font-body flex-shrink-0 flex items-center gap-1 transition-all ${
                    isCurrent ? 'bg-primary text-primary-foreground font-bold shadow-glow-ai'
                    : isSelected ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'bg-card border border-border text-muted-foreground'
                  }`}
                  whileTap={{ scale: 0.93 }}
                >
                  <span>{step.emoji}</span>
                  <span>{step.label}</span>
                  {isSelected && <span className="text-[9px]">✓</span>}
                </motion.button>
              );
            })}
          </div>

          <div className="px-5 mt-4">
            <AnimatePresence mode="wait">
              {showSummary ? (
                <motion.div key="summary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
                  <div className="text-center mb-2">
                    <span className="text-2xl">✨</span>
                    <h2 className="font-display text-lg text-foreground mt-1">your {vibe} look is ready</h2>
                    <p className="text-xs text-muted-foreground font-body">Tap any piece to swap it out</p>
                  </div>

                  <div className="rounded-[16px] bg-card shadow-card overflow-hidden">
                    {steps.map((step, i) => {
                      const sel = selections[step.id];
                      if (!sel) return null;
                      return (
                        <motion.button key={step.id} onClick={() => goToStep(i)} className="w-full flex items-center gap-3 p-3 text-left border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors" whileTap={{ scale: 0.98 }}>
                          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-secondary">
                            <img src={sel.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-muted-foreground font-mono uppercase">{step.emoji} {step.label}</p>
                            <p className="text-sm font-body font-bold text-foreground truncate">{sel.name}</p>
                            <p className="text-[10px] text-muted-foreground font-body">{sel.brand}</p>
                          </div>
                          {sel.price > 0 && <span className="text-xs font-mono text-primary font-semibold">₹{sel.price.toLocaleString()}</span>}
                          <span className="text-muted-foreground text-xs">↻</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Actions bar */}
                  <div className="space-y-3">
                    <div className="rounded-[16px] bg-aura-ai-surface p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-body font-bold text-foreground">Complete look total</span>
                        <span className="text-lg font-display text-primary">₹{totalPrice.toLocaleString()}</span>
                      </div>
                      <LookActions variant="bar" context={`My ${vibe} complete look`} />
                    </div>

                    {/* Share & social */}
                    <div className="flex gap-2">
                      <motion.button className="flex-1 pill bg-primary text-primary-foreground text-xs font-bold py-2.5" whileTap={{ scale: 0.96 }}>
                        📊 Share for voting
                      </motion.button>
                      <motion.button className="flex-1 pill bg-secondary text-foreground text-xs font-bold py-2.5" whileTap={{ scale: 0.96 }}>
                        👯‍♀️ Invite friends
                      </motion.button>
                    </div>

                    <div className="rounded-[16px] bg-card shadow-card p-4">
                      <p className="text-sm font-body font-bold text-foreground mb-2">friends building {vibe} looks</p>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {MOCK_FRIENDS.slice(0, 4).map(f => (
                            <img key={f.id} src={f.avatar} alt="" className="w-7 h-7 rounded-full border-2 border-card object-cover" />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground font-body">Riya, Meera + 12 others</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key={currentStep.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{currentStep.emoji}</span>
                      <h2 className="font-display text-lg text-foreground">{currentStep.label}</h2>
                      <span className="text-[10px] font-mono text-muted-foreground ml-auto">step {activeStep + 1}/{steps.length}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-body">{currentStep.description}</p>
                  </div>

                  {selections[currentStep.id] && (
                    <div className="rounded-xl bg-accent/10 border border-accent/20 p-2.5 flex items-center gap-2">
                      <span className="text-accent text-sm">✓</span>
                      <span className="text-xs font-body text-foreground">Selected: <strong>{selections[currentStep.id].name}</strong></span>
                      <span className="text-[10px] text-muted-foreground ml-auto">tap below to change</span>
                    </div>
                  )}

                  <div className="space-y-2.5">
                    {currentStep.options.map((option, i) => {
                      const isChosen = selections[currentStep.id]?.id === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          onClick={() => selectOption(option)}
                          className={`w-full rounded-[16px] overflow-hidden text-left transition-all ${
                            isChosen ? 'bg-primary/5 border-2 border-primary shadow-card' : 'bg-card border border-border shadow-card hover:border-primary/30'
                          }`}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <div className="flex gap-3 p-3">
                            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-secondary">
                              <img src={option.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                            </div>
                            <div className="flex-1 min-w-0 py-0.5">
                              <p className="text-sm font-body font-bold text-foreground">{option.name}</p>
                              <p className="text-[11px] text-muted-foreground font-body mt-0.5">{option.brand}</p>
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {option.tags.map(t => (
                                  <span key={t} className="pill bg-secondary text-foreground text-[9px] py-0.5 px-2">{t}</span>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-between py-0.5">
                              {option.price > 0 ? (
                                <span className="text-sm font-mono text-primary font-bold">₹{option.price.toLocaleString()}</span>
                              ) : (
                                <span className="pill bg-accent/20 text-accent text-[9px]">free tip</span>
                              )}
                              <LookActions variant="inline" context={`${option.name} by ${option.brand}`} />
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* AI suggestion */}
                  <motion.div className="rounded-[16px] bg-aura-ai-surface p-3 flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 shadow-glow-ai">
                      <span className="text-accent-foreground text-sm">✦</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-body text-foreground">
                        <strong>Aura suggests:</strong> Based on your {vibe} vibe, <em>{currentStep.options[0].name}</em> would look stunning
                      </p>
                      <button
                        onClick={() => navigate('/mirror', { state: { context: `Help me pick the best ${currentStep.label.toLowerCase()} for my ${vibe} look` } })}
                        className="text-[10px] text-accent font-semibold mt-1"
                      >
                        ask AI for more options ✦
                      </button>
                    </div>
                  </motion.div>

                  {/* Nav */}
                  <div className="flex gap-2 pt-2">
                    {activeStep > 0 && (
                      <motion.button onClick={() => setActiveStep(activeStep - 1)} className="pill bg-card border border-border text-foreground text-sm py-2 px-4" whileTap={{ scale: 0.95 }}>← prev</motion.button>
                    )}
                    {selections[currentStep.id] && (
                      <motion.button
                        onClick={() => { if (activeStep < steps.length - 1) setActiveStep(activeStep + 1); else setShowSummary(true); }}
                        className="pill bg-primary text-primary-foreground font-bold text-sm py-2 px-4 ml-auto"
                        whileTap={{ scale: 0.95 }}
                      >
                        {activeStep === steps.length - 1 ? 'see my look ✨' : 'next →'}
                      </motion.button>
                    )}
                  </div>

                  {!selections[currentStep.id] && (
                    <button onClick={() => { if (activeStep < steps.length - 1) setActiveStep(activeStep + 1); else setShowSummary(true); }} className="text-[11px] text-muted-foreground font-body underline w-full text-center">
                      skip this step
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default VibeDetailPage;
