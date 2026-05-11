import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { VIBE_IMAGES, VIBE_DESCRIPTIONS } from '@/data/mock-data';
import { VibeArchetype } from '@/types/style-soul';

const vibeFollowers: Record<string, number> = {
  'old soul': 12400, 'celebrations': 18900, 'soft hour': 8200, 'loud & proud': 6700,
  'new roots': 15200, 'boardroom': 4300, 'wild thing': 5600, 'after dark': 9100,
  'main character': 11800, 'golden hour': 7800, 'fresh pages': 6200, 'off-duty': 13500,
};

const VibesPage = () => {
  const navigate = useNavigate();
  const vibes = Object.entries(VIBE_IMAGES) as [VibeArchetype, string][];

  return (
    <div className="pt-10 pb-6">
      <div className="px-5 mb-5">
        <button onClick={() => navigate(-1)} className="text-muted-foreground text-sm font-body mb-2">← back</button>
        <h1 className="font-display text-2xl text-foreground">explore vibes</h1>
        <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wide">find your energy · follow a vibe · get curated looks</p>
      </div>

      <div className="px-5 grid grid-cols-2 gap-3">
        {vibes.map(([vibe, image], i) => {
          const followers = vibeFollowers[vibe] || 3000;
          return (
            <motion.button
              key={vibe}
              onClick={() => navigate(`/explore/vibe/${encodeURIComponent(vibe)}`)}
              className={`relative rounded-[20px] overflow-hidden group text-left ${i % 3 === 0 ? 'h-[200px]' : 'h-[170px]'}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 350, damping: 22 }}
              whileTap={{ scale: 0.96 }}
            >
              <img src={image} alt={vibe} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute top-3 right-3 pill bg-background/50 backdrop-blur-md text-[9px] px-2 py-1">
                <span className="font-mono text-foreground font-bold">{(followers / 1000).toFixed(1)}k</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <p className="font-display text-xl text-primary-foreground leading-tight capitalize drop-shadow-lg">{vibe}</p>
                <p className="text-[9px] text-primary-foreground/70 font-body mt-0.5">{VIBE_DESCRIPTIONS[vibe]}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="px-5 mt-5">
        <motion.div
          className="rounded-[20px] p-4 bg-aura-ai-surface"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-start gap-2">
            <span className="text-accent text-sm">✦</span>
            <div>
              <p className="text-sm font-body text-foreground">
                <span className="font-bold">Can't pick one?</span> Describe how you're feeling and I'll find your vibe.
              </p>
              <button onClick={() => navigate('/mirror')} className="pill bg-accent text-accent-foreground text-[11px] mt-2 font-semibold">find my vibe ✦</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VibesPage;
