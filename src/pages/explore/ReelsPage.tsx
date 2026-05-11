import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { VIBE_IMAGES } from '@/data/mock-data';
import { VibeArchetype } from '@/types/style-soul';

const REELS = [
  { id: 'reel-1', user: 'Riya', vibe: 'old soul' as VibeArchetype, caption: 'My everyday old soul look 🪷', likes: 2340, duration: '0:45' },
  { id: 'reel-2', user: 'Ananya', vibe: 'celebrations' as VibeArchetype, caption: 'Getting ready for Diwali party 🪔', likes: 5670, duration: '1:12' },
  { id: 'reel-3', user: 'Meera', vibe: 'soft hour' as VibeArchetype, caption: 'Pastel day, pastel mood 🌸', likes: 1890, duration: '0:32' },
  { id: 'reel-4', user: 'Shruti', vibe: 'loud & proud' as VibeArchetype, caption: 'Bold is my baseline 🔥', likes: 3450, duration: '0:58' },
  { id: 'reel-5', user: 'Naina', vibe: 'boardroom' as VibeArchetype, caption: 'Power dressing on Monday 💼', likes: 1230, duration: '0:38' },
  { id: 'reel-6', user: 'Divya', vibe: 'after dark' as VibeArchetype, caption: 'Date night transformation 🌙', likes: 4120, duration: '1:05' },
  { id: 'reel-7', user: 'StyleGuru', vibe: 'new roots' as VibeArchetype, caption: 'How to drape a dupatta 5 ways', likes: 8900, duration: '2:15' },
  { id: 'reel-8', user: 'FashionFix', vibe: 'golden hour' as VibeArchetype, caption: 'Under ₹3000 sangeet look 💃', likes: 6780, duration: '1:30' },
];

const FILTERS = ['all', 'old soul', 'celebrations', 'soft hour', 'loud & proud', 'new roots', 'after dark'];

const ReelsPage = () => {
  const navigate = useNavigate();
  const [activeVibe, setActiveVibe] = useState('all');
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());

  const filtered = activeVibe === 'all' ? REELS : REELS.filter(r => r.vibe === activeVibe);

  const toggleLike = (id: string) => {
    setLikedReels(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <div className="pt-10 pb-6">
      <div className="px-5 mb-4">
        <button onClick={() => navigate(-1)} className="text-muted-foreground text-sm font-body mb-2">← back</button>
        <h1 className="font-display text-2xl text-foreground">style reels</h1>
        <p className="text-xs text-muted-foreground font-body mt-1">real people, real style inspiration</p>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide px-5 pb-3">
        {FILTERS.map(v => (
          <button
            key={v}
            onClick={() => setActiveVibe(v)}
            className={`pill text-[11px] font-body flex-shrink-0 transition-all ${activeVibe === v ? 'bg-primary text-primary-foreground font-semibold' : 'bg-card border border-border text-muted-foreground'}`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-5 grid grid-cols-2 gap-2">
        {filtered.map((reel, i) => (
          <motion.div
            key={reel.id}
            className="relative rounded-2xl overflow-hidden bg-card shadow-card group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
          >
            <div className="relative h-[230px]">
              <img src={VIBE_IMAGES[reel.vibe]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-transparent to-transparent" />

              {/* Play */}
              <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="w-11 h-11 rounded-full bg-background/30 backdrop-blur-md flex items-center justify-center">
                  <span className="text-primary-foreground text-base ml-0.5">▶</span>
                </div>
              </div>

              <span className="absolute top-2 right-2 text-[9px] font-mono text-primary-foreground bg-foreground/30 backdrop-blur-sm rounded-full px-2 py-0.5">{reel.duration}</span>

              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <p className="text-[11px] font-body font-bold text-primary-foreground">{reel.user}</p>
                <p className="text-[9px] text-primary-foreground/70 line-clamp-1">{reel.caption}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-2.5 flex items-center justify-between">
              <button onClick={() => toggleLike(reel.id)} className="flex items-center gap-1">
                <span className={`text-sm ${likedReels.has(reel.id) ? 'text-primary' : 'text-muted-foreground'}`}>
                  {likedReels.has(reel.id) ? '♥' : '♡'}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {((likedReels.has(reel.id) ? reel.likes + 1 : reel.likes) / 1000).toFixed(1)}k
                </span>
              </button>
              <button onClick={() => navigate('/mirror')} className="text-[10px] font-body text-accent font-semibold">
                try on ✦
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReelsPage;
