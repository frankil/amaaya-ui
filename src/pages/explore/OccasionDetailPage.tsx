import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { OCCASION_IMAGES, MOCK_FRIENDS, PERSONALITY_INSPO, LOOK_BUILDING_STEPS } from '@/data/mock-data';
import type { LookBuildingStep, LookBuildingOption } from '@/data/mock-data';
import { Progress } from '@/components/ui/progress';
import LookActions from '@/components/LookActions';

/* ── Occasion DNA data ── */
const OCCASION_DNA: Record<string, { dressCodes: string[]; donts: string[]; mood: string; icons: string[]; colors: string[] }> = {
  'daily wear': { dressCodes: ['Smart casual', 'Relaxed ethnic', 'Effortless layers'], donts: ['Heavy embroidery', 'Stilettos', 'Over-accessorizing'], mood: 'Comfortable confidence for everyday', icons: ['☀️', '🌿', '✨'], colors: ['#F5F5F0', '#C2B280', '#556B2F', '#9E9E9E'] },
  'date night': { dressCodes: ['Understated glamour', 'Statement piece', 'Mood lighting ready'], donts: ['Too casual', 'Overpowering fragrance', 'Uncomfortable shoes'], mood: 'Magnetic but approachable', icons: ['🌙', '💫', '🥂'], colors: ['#6A0D34', '#C2185B', '#FFD700', '#1A237E'] },
  'wedding guest': { dressCodes: ['Festive elegance', 'Rich fabrics', 'Coordinated accessories'], donts: ['White/red outfits', 'Outshining the bride', 'Casual footwear'], mood: 'Celebration-ready without stealing the show', icons: ['💍', '🪔', '✨'], colors: ['#C2185B', '#FFD700', '#E65100', '#6A0D34'] },
  'office power': { dressCodes: ['Structured silhouettes', 'Muted tones', 'Clean lines'], donts: ['Too much skin', 'Loud prints', 'Chunky jewelry'], mood: 'Authority with ease', icons: ['💼', '🏢', '⚡'], colors: ['#212121', '#9E9E9E', '#1A237E', '#F5F5F0'] },
  'festive glow': { dressCodes: ['Rich textures', 'Warm metallics', 'Layered jewelry'], donts: ['Minimalism', 'Western silhouettes', 'Matte fabrics'], mood: 'Luminous celebration energy', icons: ['🪔', '✨', '🎪'], colors: ['#FFD700', '#C2185B', '#E65100', '#6A0D34'] },
  'girls night': { dressCodes: ['Fun & flirty', 'Statement earrings', 'Dance-friendly'], donts: ['Too formal', 'Heavy sarees', 'Uncomfortable heels'], mood: 'Effortlessly hot with your squad', icons: ['💃', '🎶', '🍸'], colors: ['#C2185B', '#CE93D8', '#FFD700', '#1565C0'] },
  'brunch vibes': { dressCodes: ['Breezy silhouettes', 'Pastels & prints', 'Comfortable chic'], donts: ['Heavy fabrics', 'Too much bling', 'Dark colors'], mood: 'Sun-kissed and Instagram-ready', icons: ['🥞', '☀️', '🌸'], colors: ['#F8BBD0', '#FFCCBC', '#FFF8E1', '#556B2F'] },
  'travel mood': { dressCodes: ['Wrinkle-free fabrics', 'Layers', 'Mix & match pieces'], donts: ['White outfits', 'High maintenance fabrics', 'Too many pieces'], mood: 'Adventure-ready comfort', icons: ['✈️', '🗺️', '🌍'], colors: ['#556B2F', '#C2B280', '#1565C0', '#F5F5F0'] },
};

const OCCASION_LOOK_BUILDERS = [
  { name: 'Priya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', pieces: 6, lookImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200&h=260&fit=crop', caption: 'My sister\'s mehendi look 💛', votes: 47 },
  { name: 'Kavya', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', pieces: 5, lookImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&h=260&fit=crop', caption: 'Office to dinner transition ✨', votes: 31 },
  { name: 'Neha', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face', pieces: 7, lookImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=260&fit=crop', caption: 'Date night under ₹3k 💃', votes: 62 },
  { name: 'Isha', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face', pieces: 4, lookImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=200&h=260&fit=crop', caption: 'Kept it simple but statement', votes: 28 },
];

const OccasionDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const name = decodeURIComponent(slug || '');
  const image = OCCASION_IMAGES[name as keyof typeof OCCASION_IMAGES];
  const dna = OCCASION_DNA[name] || OCCASION_DNA['daily wear'];

  const steps: LookBuildingStep[] = useMemo(
    () => LOOK_BUILDING_STEPS['default'],
    []
  );

  const [activeStep, setActiveStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, LookBuildingOption>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [activeTab, setActiveTab] = useState<'explore' | 'build'>('explore');

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

  const goToStep = (i: number) => { setShowSummary(false); setActiveStep(i); };

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="relative h-[260px]">
        <img src={image || 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&h=600&fit=crop'} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-12 left-4 pill bg-background/60 backdrop-blur-md text-foreground text-sm">← back</button>
        <div className="absolute bottom-4 left-5 right-5">
          <div className="flex items-center gap-2 mb-1">
            {dna.icons.map((icon, i) => <span key={i} className="text-lg">{icon}</span>)}
          </div>
          <h1 className="font-display text-2xl text-foreground capitalize">{name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono text-primary">892 exploring now</span>
            <span className="pill bg-accent/20 text-accent text-[10px] font-semibold">#{Math.floor(Math.random() * 5) + 1} trending</span>
          </div>
        </div>
      </div>

      {/* Occasion DNA */}
      <div className="px-5 mt-5">
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-3">occasion DNA</p>
        <div className="rounded-[16px] bg-card shadow-card p-4 space-y-3">
          <p className="text-sm font-body text-foreground italic">"{dna.mood}"</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-[9px] font-mono text-muted-foreground uppercase mb-1.5">dress codes</p>
              {dna.dressCodes.map(d => <span key={d} className="block text-[11px] font-body text-foreground">{d}</span>)}
            </div>
            <div>
              <p className="text-[9px] font-mono text-muted-foreground uppercase mb-1.5">avoid</p>
              {dna.donts.map(d => <span key={d} className="block text-[11px] font-body text-destructive/70">✗ {d}</span>)}
            </div>
            <div>
              <p className="text-[9px] font-mono text-muted-foreground uppercase mb-1.5">palette</p>
              <div className="flex gap-1.5 flex-wrap">
                {dna.colors.map(c => <div key={c} className="w-6 h-6 rounded-full border border-border" style={{ backgroundColor: c }} />)}
              </div>
            </div>
          </div>
          <motion.button
            onClick={() => navigate('/mirror', { state: { context: `Help me dress for ${name}` } })}
            className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-aura-ai-surface hover:bg-accent/10 transition-colors"
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center shadow-glow-ai">
              <span className="text-accent-foreground text-xs">✦</span>
            </div>
            <span className="text-[11px] font-body text-foreground">Ask AI: <em>"What should I wear for {name}?"</em></span>
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mt-5">
        <div className="flex bg-secondary rounded-full p-0.5">
          {(['explore', 'build'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 text-sm font-body py-2 rounded-full transition-all ${activeTab === tab ? 'bg-card shadow-card text-foreground font-bold' : 'text-muted-foreground'}`}>
              {tab === 'explore' ? '🌍 Explore' : '🎨 Build a Look'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'explore' ? (
        <div className="px-5 mt-5 space-y-6">
          {/* Refine pills */}
          <div>
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wide mb-2">refine the vibe</p>
            <div className="flex flex-wrap gap-2">
              {['minimal', 'statement', 'traditional', 'fusion', 'budget-friendly', 'designer'].map(tag => (
                <button key={tag} className="pill bg-card border border-border text-foreground text-sm hover:bg-primary hover:text-primary-foreground transition-colors">{tag}</button>
              ))}
            </div>
          </div>

          {/* Community looks */}
          <div>
            <div className="flex items-end justify-between mb-3">
              <div>
                <h3 className="font-display text-lg text-foreground">looks from the community</h3>
                <p className="text-[10px] text-muted-foreground font-body">{OCCASION_LOOK_BUILDERS.length * 83} people styled for {name}</p>
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-2">
              {OCCASION_LOOK_BUILDERS.map((builder, i) => (
                <motion.div key={builder.name} className="min-w-[160px] rounded-[16px] overflow-hidden bg-card shadow-card flex-shrink-0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                  <div className="relative h-[180px]">
                    <img src={builder.lookImage} alt="" className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 pill bg-background/70 backdrop-blur-md py-0.5 px-2">
                      <img src={builder.avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
                      <span className="text-[10px] font-body font-bold text-foreground">{builder.name}</span>
                    </div>
                    <div className="absolute top-2 right-2 pill bg-background/50 backdrop-blur-md text-[9px] font-mono text-foreground px-1.5 py-0.5">{builder.pieces} pieces</div>
                    <div className="absolute bottom-2 right-2 pill bg-primary/80 text-primary-foreground text-[9px] font-bold">👍 {builder.votes}</div>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[11px] font-body text-foreground">{builder.caption}</p>
                    <div className="mt-2"><LookActions variant="inline" context={`${builder.name}'s ${name} look`} /></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Share & Vote */}
          <motion.div className="rounded-[16px] bg-card shadow-card p-4 space-y-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="font-display text-base text-foreground">get your circle's opinion</h3>
            <p className="text-xs text-muted-foreground font-body">Share your {name} look with friends for voting</p>
            <div className="flex gap-2">
              <motion.button className="flex-1 pill bg-primary text-primary-foreground text-xs font-bold py-2.5" whileTap={{ scale: 0.96 }}>📊 Share for voting</motion.button>
              <motion.button className="flex-1 pill bg-secondary text-foreground text-xs font-bold py-2.5" whileTap={{ scale: 0.96 }}>👯‍♀️ Group shopping</motion.button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">{MOCK_FRIENDS.slice(0, 3).map(f => <img key={f.id} src={f.avatar} alt="" className="w-5 h-5 rounded-full border-2 border-card object-cover" />)}</div>
              <span className="text-[10px] text-muted-foreground font-body">Riya, Meera + 8 are online now</span>
            </div>
          </motion.div>

          {/* Celeb inspo */}
          <div>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">celeb inspiration for {name}</p>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-2">
              {PERSONALITY_INSPO.slice(0, 4).map((p, i) => (
                <motion.div key={p.name} className="min-w-[100px] flex-shrink-0 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}>
                  <div className="w-16 h-16 rounded-full mx-auto overflow-hidden border-2 border-aura-celeb">
                    <img src={p.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <p className="text-[11px] font-body font-bold text-foreground mt-1">{p.name}</p>
                  <p className="text-[9px] text-muted-foreground">{p.tagline}</p>
                  <button onClick={() => navigate('/mirror', { state: { context: `Get me ${p.name}'s ${name} look` } })} className="text-[9px] text-accent font-semibold mt-0.5">ask AI ✦</button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA to build */}
          <motion.button onClick={() => setActiveTab('build')} className="w-full rounded-[16px] bg-accent text-accent-foreground p-4 text-center shadow-glow-ai" whileTap={{ scale: 0.97 }}>
            <span className="text-lg">🎨</span>
            <p className="font-display text-base mt-1">build your {name} look</p>
            <p className="text-xs font-body opacity-80 mt-0.5">Outfit → Hair → Makeup → Accessories</p>
          </motion.button>
        </div>
      ) : (
        /* BUILD TAB — same pattern as VibeDetailPage */
        <div className="mt-4">
          <div className="px-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono text-muted-foreground">{Object.keys(selections).length} of {steps.length} pieces chosen</span>
              {totalPrice > 0 && <span className="text-[10px] font-mono text-primary font-bold">₹{totalPrice.toLocaleString()} total</span>}
            </div>
            <Progress value={progress} className="h-1.5 bg-secondary" />
          </div>

          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide px-5 mt-3 pb-1">
            {steps.map((step, i) => {
              const isSelected = !!selections[step.id];
              const isCurrent = i === activeStep && !showSummary;
              return (
                <motion.button key={step.id} onClick={() => goToStep(i)} className={`pill text-[11px] font-body flex-shrink-0 flex items-center gap-1 transition-all ${isCurrent ? 'bg-primary text-primary-foreground font-bold shadow-glow-ai' : isSelected ? 'bg-accent/20 text-accent border border-accent/30' : 'bg-card border border-border text-muted-foreground'}`} whileTap={{ scale: 0.93 }}>
                  <span>{step.emoji}</span><span>{step.label}</span>{isSelected && <span className="text-[9px]">✓</span>}
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
                    <h2 className="font-display text-lg text-foreground mt-1">your {name} look is ready</h2>
                  </div>
                  <div className="rounded-[16px] bg-card shadow-card overflow-hidden">
                    {steps.map((step, i) => { const sel = selections[step.id]; if (!sel) return null; return (
                      <motion.button key={step.id} onClick={() => goToStep(i)} className="w-full flex items-center gap-3 p-3 text-left border-b border-border/50 last:border-0" whileTap={{ scale: 0.98 }}>
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-secondary"><img src={sel.image} alt="" className="w-full h-full object-cover" /></div>
                        <div className="flex-1 min-w-0"><p className="text-[10px] text-muted-foreground font-mono uppercase">{step.emoji} {step.label}</p><p className="text-sm font-body font-bold text-foreground truncate">{sel.name}</p></div>
                        {sel.price > 0 && <span className="text-xs font-mono text-primary font-semibold">₹{sel.price.toLocaleString()}</span>}
                        <span className="text-muted-foreground text-xs">↻</span>
                      </motion.button>
                    ); })}
                  </div>
                  <div className="rounded-[16px] bg-aura-ai-surface p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-body font-bold text-foreground">Complete look total</span>
                      <span className="text-lg font-display text-primary">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <LookActions variant="bar" context={`My ${name} complete look`} />
                  </div>
                  <div className="flex gap-2">
                    <motion.button className="flex-1 pill bg-primary text-primary-foreground text-xs font-bold py-2.5" whileTap={{ scale: 0.96 }}>📊 Share for voting</motion.button>
                    <motion.button className="flex-1 pill bg-secondary text-foreground text-xs font-bold py-2.5" whileTap={{ scale: 0.96 }}>👯‍♀️ Invite friends</motion.button>
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
                  <div className="space-y-2.5">
                    {currentStep.options.map((option, i) => {
                      const isChosen = selections[currentStep.id]?.id === option.id;
                      return (
                        <motion.button key={option.id} onClick={() => selectOption(option)} className={`w-full rounded-[16px] overflow-hidden text-left transition-all ${isChosen ? 'bg-primary/5 border-2 border-primary shadow-card' : 'bg-card border border-border shadow-card'}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileTap={{ scale: 0.97 }}>
                          <div className="flex gap-3 p-3">
                            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-secondary"><img src={option.image} alt="" className="w-full h-full object-cover" loading="lazy" /></div>
                            <div className="flex-1 min-w-0 py-0.5">
                              <p className="text-sm font-body font-bold text-foreground">{option.name}</p>
                              <p className="text-[11px] text-muted-foreground font-body mt-0.5">{option.brand}</p>
                              <div className="flex flex-wrap gap-1 mt-1.5">{option.tags.map(t => <span key={t} className="pill bg-secondary text-foreground text-[9px] py-0.5 px-2">{t}</span>)}</div>
                            </div>
                            <div className="flex flex-col items-end justify-between py-0.5">
                              {option.price > 0 ? <span className="text-sm font-mono text-primary font-bold">₹{option.price.toLocaleString()}</span> : <span className="pill bg-accent/20 text-accent text-[9px]">free tip</span>}
                              <LookActions variant="inline" context={`${option.name} by ${option.brand}`} />
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                  <motion.div className="rounded-[16px] bg-aura-ai-surface p-3 flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 shadow-glow-ai"><span className="text-accent-foreground text-sm">✦</span></div>
                    <div className="flex-1">
                      <p className="text-[11px] font-body text-foreground"><strong>Aura suggests:</strong> {currentStep.options[0].name} is perfect for {name}</p>
                      <button onClick={() => navigate('/mirror', { state: { context: `Help me pick ${currentStep.label.toLowerCase()} for ${name}` } })} className="text-[10px] text-accent font-semibold mt-1">ask AI for more ✦</button>
                    </div>
                  </motion.div>
                  <div className="flex gap-2 pt-2">
                    {activeStep > 0 && <motion.button onClick={() => setActiveStep(activeStep - 1)} className="pill bg-card border border-border text-foreground text-sm py-2 px-4" whileTap={{ scale: 0.95 }}>← prev</motion.button>}
                    {selections[currentStep.id] && <motion.button onClick={() => { if (activeStep < steps.length - 1) setActiveStep(activeStep + 1); else setShowSummary(true); }} className="pill bg-primary text-primary-foreground font-bold text-sm py-2 px-4 ml-auto" whileTap={{ scale: 0.95 }}>{activeStep === steps.length - 1 ? 'see my look ✨' : 'next →'}</motion.button>}
                  </div>
                  {!selections[currentStep.id] && <button onClick={() => { if (activeStep < steps.length - 1) setActiveStep(activeStep + 1); else setShowSummary(true); }} className="text-[11px] text-muted-foreground font-body underline w-full text-center">skip this step</button>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default OccasionDetailPage;
