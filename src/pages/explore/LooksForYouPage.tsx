import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { COMPLETE_LOOKS, LOOK_PIECES, MOCK_FRIENDS, VIBE_DESCRIPTIONS } from '@/data/mock-data';
import { VibeArchetype } from '@/types/style-soul';
import LookActions from '@/components/LookActions';

const FILTER_VIBES = ['all', 'old soul', 'celebrations', 'soft hour', 'loud & proud', 'new roots', 'boardroom', 'off-duty', 'after dark'];
const FILTER_OCCASIONS = ['all', 'daily', 'festive', 'office', 'date', 'brunch', 'wedding'];
const SORT_OPTIONS = ['recommended', 'trending', 'new arrivals', 'price: low', 'price: high'];

const LooksForYouPage = () => {
  const navigate = useNavigate();
  const [activeVibe, setActiveVibe] = useState('all');
  const [activeOccasion, setActiveOccasion] = useState('all');
  const [activeSort, setActiveSort] = useState('recommended');
  const [expandedLook, setExpandedLook] = useState<string | null>(null);

  // Generate more looks
  const allLooks = [...COMPLETE_LOOKS, ...COMPLETE_LOOKS.map((l, i) => ({
    ...l,
    id: `${l.id}-dup-${i}`,
    title: l.title?.replace('The ', 'Another ') || `Look ${i + 9}`,
  }))];

  const filteredLooks = allLooks.filter(l => {
    if (activeVibe !== 'all' && !l.vibes.includes(activeVibe)) return false;
    return true;
  });

  const left = filteredLooks.filter((_, i) => i % 2 === 0);
  const right = filteredLooks.filter((_, i) => i % 2 === 1);
  const heights = ['h-56', 'h-64', 'h-52', 'h-60'];

  const renderCard = (look: typeof COMPLETE_LOOKS[0], idx: number) => {
    const pieces = LOOK_PIECES[look.id.replace(/-dup-\d+/, '')] || [];
    const isExpanded = expandedLook === look.id;

    return (
      <motion.div
        key={look.id}
        className="rounded-[18px] overflow-hidden bg-card mb-3 shadow-card group"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.05, type: 'spring', stiffness: 280, damping: 24 }}
      >
        <div className={`relative ${heights[idx % heights.length]} overflow-hidden`}>
          <img src={look.image} alt={look.title || ''} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute top-2.5 left-2.5 flex gap-1.5">
            {look.vibes.slice(0, 2).map(v => (
              <span key={v} className="pill bg-background/60 backdrop-blur-md text-foreground text-[10px] font-semibold border border-border/20">{v}</span>
            ))}
          </div>
          {look.matchTag && (
            <span className="absolute bottom-2.5 left-2.5 pill bg-aura-sage text-primary-foreground text-[10px] font-semibold">✓ {look.matchTag}</span>
          )}
          <div className="absolute bottom-2.5 right-2.5">
            <span className="pill bg-accent/90 text-accent-foreground text-[9px] font-bold backdrop-blur-sm">👗 {pieces.length} pieces</span>
          </div>
        </div>
        <div className="p-3">
          <p className="text-xs font-display text-foreground leading-snug">{look.title}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[11px] font-mono text-primary font-bold">₹{look.price?.toLocaleString()}</span>
            <LookActions variant="inline" context={look.title || 'This look'} />
          </div>

          <motion.button onClick={() => setExpandedLook(isExpanded ? null : look.id)} className="w-full mt-2 text-left">
            <span className="text-[10px] font-body text-primary font-semibold">{isExpanded ? 'hide pieces ▴' : 'see all pieces ▾'}</span>
          </motion.button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="flex flex-wrap gap-1 mt-2">
                  {pieces.map((piece, pi) => <span key={pi} className="pill bg-secondary text-foreground text-[9px] font-body">{piece}</span>)}
                </div>
                <div className="flex gap-2 mt-2">
                  <motion.button onClick={() => navigate(`/explore/vibe/${encodeURIComponent(look.vibes[0])}`)} className="pill bg-primary text-primary-foreground text-[10px] font-bold" whileTap={{ scale: 0.92 }}>build this look →</motion.button>
                  <motion.button className="pill bg-secondary text-foreground text-[10px]" whileTap={{ scale: 0.92 }}>swap a piece 🔄</motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social proof */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex -space-x-1">
              {MOCK_FRIENDS.slice(0, 2).map(f => <img key={f.id} src={f.avatar} alt="" className="w-4 h-4 rounded-full border border-card object-cover" />)}
            </div>
            <span className="text-[9px] text-muted-foreground font-body">{MOCK_FRIENDS[idx % MOCK_FRIENDS.length].name} + {Math.floor(Math.random() * 40) + 5} saved this</span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="pt-10 pb-6">
      <div className="px-5 mb-4">
        <button onClick={() => navigate(-1)} className="text-muted-foreground text-sm font-body mb-2">← back</button>
        <h1 className="font-display text-2xl text-foreground">looks for you</h1>
        <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wide">complete outfits curated for your vibe · not just pieces</p>
      </div>

      {/* Vibe filter */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide px-5 pb-2">
        {FILTER_VIBES.map(v => (
          <motion.button
            key={v}
            onClick={() => setActiveVibe(v)}
            className={`pill text-[11px] font-body flex-shrink-0 transition-all ${activeVibe === v ? 'bg-primary text-primary-foreground font-bold' : 'bg-card border border-border text-muted-foreground'}`}
            whileTap={{ scale: 0.93 }}
          >
            {v}
          </motion.button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide px-5 pb-3 mt-1">
        {SORT_OPTIONS.map(s => (
          <button
            key={s}
            onClick={() => setActiveSort(s)}
            className={`text-[10px] font-mono transition-all ${activeSort === s ? 'text-primary font-bold underline underline-offset-4' : 'text-muted-foreground'}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* AI CTA */}
      <div className="px-5 mb-4">
        <motion.button
          onClick={() => navigate('/mirror')}
          className="w-full flex items-center gap-3 p-3 rounded-[16px] bg-aura-ai-surface"
          whileTap={{ scale: 0.97 }}
        >
          <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shadow-glow-ai"><span className="text-accent-foreground text-sm">✦</span></div>
          <div className="flex-1">
            <p className="text-[11px] font-body text-foreground"><strong>Can't find what you want?</strong> Tell AI your vibe and occasion</p>
          </div>
        </motion.button>
      </div>

      {/* Masonry grid */}
      <div className="px-5">
        <p className="text-[10px] font-mono text-muted-foreground mb-3">{filteredLooks.length} looks found</p>
        <div className="grid grid-cols-2 gap-2.5">
          <div>{left.map((l, i) => renderCard(l, i))}</div>
          <div className="mt-6">{right.map((l, i) => renderCard(l, i + left.length))}</div>
        </div>
      </div>
    </div>
  );
};

export default LooksForYouPage;
