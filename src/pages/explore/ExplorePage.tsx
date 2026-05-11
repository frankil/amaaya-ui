import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { VIBE_IMAGES, VIBE_DESCRIPTIONS, OCCASION_IMAGES, PERSONALITY_INSPO, COMPLETE_LOOKS, GOSSIP_EDITORIAL } from '@/data/mock-data';
import { VibeArchetype } from '@/types/style-soul';

const TABS = [
  { id: 'foryou', label: 'For You' },
  { id: 'vibes', label: 'Vibes' },
  { id: 'looks', label: 'Looks' },
  { id: 'celebs', label: 'Celebs' },
  { id: 'editorial', label: 'Tea ☕' },
];

const ExplorePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('foryou');

  return (
    <div className="pt-10 pb-6">
      {/* Header */}
      <div className="px-5 mb-4">
        <h1 className="font-display text-2xl text-foreground">explore</h1>
        <p className="text-xs text-muted-foreground font-body mt-0.5">curated inspiration, just for you</p>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <motion.button
          onClick={() => navigate('/mirror')}
          className="w-full rounded-2xl bg-card border border-border p-3 flex items-center gap-3 shadow-card"
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-glow-ai">
            <span className="text-accent-foreground text-sm">✦</span>
          </div>
          <span className="text-sm font-body text-muted-foreground italic flex-1 text-left truncate">"boho looks for a beach wedding under ₹5k"</span>
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border/30">
        <div className="flex overflow-x-auto scrollbar-hide px-5">
          {TABS.map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 text-sm font-body whitespace-nowrap transition-colors ${activeTab === tab.id ? 'text-primary font-bold' : 'text-muted-foreground'}`}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="explore-tab"
                  className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'foryou' && <ForYouTab />}
            {activeTab === 'vibes' && <VibesTab />}
            {activeTab === 'looks' && <LooksTab />}
            {activeTab === 'celebs' && <CelebsTab />}
            {activeTab === 'editorial' && <EditorialTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ── For You ── */
const ForYouTab = () => {
  const navigate = useNavigate();
  const vibes = Object.entries(VIBE_IMAGES).slice(0, 4) as [VibeArchetype, string][];

  return (
    <div className="space-y-6">
      {/* Vibes row */}
      <div>
        <h3 className="font-display text-lg text-foreground mb-2">trending vibes</h3>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-5 px-5">
          {vibes.map(([vibe, image], i) => (
            <motion.button
              key={vibe}
              onClick={() => navigate(`/explore/vibe/${encodeURIComponent(vibe)}`)}
              className="min-w-[130px] h-[180px] rounded-2xl overflow-hidden relative flex-shrink-0 group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <img src={image} alt={vibe} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />
              <p className="absolute bottom-2.5 left-2.5 font-display text-base text-primary-foreground capitalize drop-shadow">{vibe}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Editorial */}
      <div>
        <h3 className="font-display text-lg text-foreground mb-2">the tea ☕</h3>
        <div className="space-y-2">
          {GOSSIP_EDITORIAL.slice(0, 3).map((item, i) => (
            <motion.button
              key={item.id}
              className="w-full flex rounded-2xl overflow-hidden bg-card shadow-card text-left"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src={item.image} alt="" className="w-[90px] h-[80px] object-cover flex-shrink-0" loading="lazy" />
              <div className="p-2.5 flex-1 min-w-0">
                <span className="text-[9px] font-mono text-accent uppercase">{item.source}</span>
                <p className="text-[12px] font-body font-semibold text-foreground leading-snug mt-0.5 line-clamp-2">{item.headline}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Occasions */}
      <div>
        <h3 className="font-display text-lg text-foreground mb-2">occasions</h3>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-5 px-5">
          {Object.entries(OCCASION_IMAGES).slice(0, 5).map(([name, image], i) => (
            <motion.button
              key={name}
              onClick={() => navigate(`/explore/occasion/${encodeURIComponent(name)}`)}
              className="min-w-[120px] h-[150px] rounded-2xl overflow-hidden relative flex-shrink-0 group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />
              <p className="absolute bottom-2 left-2 font-display text-sm text-primary-foreground capitalize drop-shadow">{name}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Looks */}
      <div>
        <h3 className="font-display text-lg text-foreground mb-2">complete looks</h3>
        <div className="grid grid-cols-2 gap-2">
          {COMPLETE_LOOKS.slice(0, 4).map((look, i) => (
            <motion.div
              key={look.id}
              className="rounded-2xl overflow-hidden bg-card shadow-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <div className="relative h-[150px]">
                <img src={look.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-2 left-2 pill bg-background/60 backdrop-blur-md text-foreground text-[9px]">{look.vibes[0]}</span>
              </div>
              <div className="p-2.5">
                <p className="text-[11px] font-body font-semibold text-foreground truncate">{look.title}</p>
                <span className="text-[11px] font-mono text-primary font-bold">₹{look.price?.toLocaleString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI CTA */}
      <motion.div className="rounded-2xl p-4 bg-aura-ai-surface">
        <div className="flex items-start gap-2.5">
          <span className="text-accent text-sm">✦</span>
          <div>
            <p className="text-sm font-body text-foreground"><strong>Not sure what you're looking for?</strong> Describe a feeling, a character, or a color.</p>
            <button onClick={() => navigate('/mirror')} className="pill bg-accent text-accent-foreground text-[11px] mt-2 font-semibold">discover my style ✦</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ── Vibes Tab ── */
const VibesTab = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-2">
      {(Object.entries(VIBE_IMAGES) as [VibeArchetype, string][]).map(([vibe, image], i) => (
        <motion.button
          key={vibe}
          onClick={() => navigate(`/explore/vibe/${encodeURIComponent(vibe)}`)}
          className={`rounded-2xl overflow-hidden relative group ${i % 3 === 0 ? 'h-[200px]' : 'h-[160px]'}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.03 }}
          whileTap={{ scale: 0.96 }}
        >
          <img src={image} alt={vibe} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />
          <div className="absolute bottom-2.5 left-2.5 right-2">
            <p className="font-display text-lg text-primary-foreground capitalize drop-shadow">{vibe}</p>
            <p className="text-[9px] text-primary-foreground/70 font-body line-clamp-1">{VIBE_DESCRIPTIONS[vibe]}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

/* ── Looks Tab ── */
const LooksTab = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-2">
      {COMPLETE_LOOKS.map((look, i) => (
        <motion.div
          key={look.id}
          className="rounded-2xl overflow-hidden bg-card shadow-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
        >
          <div className={`relative ${i % 3 === 0 ? 'h-[190px]' : 'h-[155px]'}`}>
            <img src={look.image} alt="" className="w-full h-full object-cover" loading="lazy" />
            <span className="absolute top-2 left-2 pill bg-background/60 backdrop-blur-md text-foreground text-[9px]">{look.vibes[0]}</span>
          </div>
          <div className="p-2.5">
            <p className="text-[11px] font-body font-semibold text-foreground truncate">{look.title}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[11px] font-mono text-primary font-bold">₹{look.price?.toLocaleString()}</span>
              <button onClick={() => navigate('/mirror')} className="text-[10px] text-accent font-semibold font-body">try on ✦</button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ── Celebs Tab ── */
const CelebsTab = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {PERSONALITY_INSPO.map((p, i) => (
        <motion.button
          key={p.name}
          onClick={() => navigate('/explore/personalities')}
          className="rounded-2xl overflow-hidden relative group h-[210px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
          <div className="absolute bottom-2.5 left-2.5 right-2">
            <p className="font-display text-lg text-primary-foreground drop-shadow">{p.name}</p>
            <p className="text-[9px] text-primary-foreground/70 font-body">{p.tagline}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

/* ── Editorial Tab ── */
const EditorialTab = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-3">
      {GOSSIP_EDITORIAL.map((item, i) => (
        <motion.button
          key={item.id}
          className={`w-full rounded-2xl overflow-hidden bg-card shadow-card text-left`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          whileTap={{ scale: 0.98 }}
        >
          {i === 0 ? (
            <div className="relative h-[200px]">
              <img src={item.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[9px] font-mono text-primary-foreground/60 uppercase">{item.source}</span>
                <p className="font-display text-lg text-primary-foreground leading-tight mt-0.5">{item.headline}</p>
                <p className="text-[11px] text-primary-foreground/70 font-body mt-1">{item.subtitle}</p>
              </div>
            </div>
          ) : (
            <div className="flex">
              <img src={item.image} alt="" className="w-[100px] h-[85px] object-cover flex-shrink-0" loading="lazy" />
              <div className="p-3 flex-1 min-w-0">
                <span className="text-[9px] font-mono text-accent uppercase">{item.source}</span>
                <p className="text-[12px] font-body font-semibold text-foreground leading-snug mt-0.5 line-clamp-2">{item.headline}</p>
                <span className="text-[9px] font-mono text-muted-foreground mt-1 block">{item.time}</span>
              </div>
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default ExplorePage;
