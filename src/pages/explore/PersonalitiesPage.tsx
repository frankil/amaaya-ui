import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PERSONALITY_INSPO, VIBE_IMAGES, MOCK_FRIENDS } from '@/data/mock-data';
import { useState } from 'react';
import LookActions from '@/components/LookActions';

const MORE_PERSONALITIES = [
  { name: 'The Kiara', tagline: 'Glam goddess, festive queen', image: VIBE_IMAGES['celebrations'], vibe: 'celebrations' },
  { name: 'The Masaba', tagline: 'Print maximalist, design rebel', image: VIBE_IMAGES['loud & proud'], vibe: 'loud & proud' },
  { name: 'The Samantha', tagline: 'Ethnic minimalism, south charm', image: VIBE_IMAGES['new roots'], vibe: 'new roots' },
  { name: 'The Priyanka', tagline: 'Global power dressing', image: VIBE_IMAGES['boardroom'], vibe: 'boardroom' },
];

const CELEB_LOOKS: Record<string, { pieces: string[]; occasion: string; totalPrice: number; image: string }[]> = {
  'The Deepika': [
    { pieces: ['Ivory silk saree', 'Gold cuff', 'Nude heels', 'Sleek bun', 'Berry lip'], occasion: 'Red carpet', totalPrice: 12499, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop' },
    { pieces: ['Black anarkali', 'Statement earrings', 'Pointed flats', 'Centre-part waves'], occasion: 'Festive dinner', totalPrice: 8999, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop' },
  ],
  'The Alia': [
    { pieces: ['Cropped kurta', 'Flared pants', 'Chunky sneakers', 'Messy bun', 'Gloss lip'], occasion: 'Casual outing', totalPrice: 4299, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop' },
    { pieces: ['Pastel lehenga', 'Minimal jewelry', 'Embroidered juttis', 'Soft curls'], occasion: 'Mehendi', totalPrice: 7599, image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&h=400&fit=crop' },
  ],
};

const allPersonalities = [...PERSONALITY_INSPO, ...MORE_PERSONALITIES];

const PersonalitiesPage = () => {
  const navigate = useNavigate();
  const [expandedCeleb, setExpandedCeleb] = useState<string | null>(null);

  return (
    <div className="pt-10 pb-6">
      <div className="px-5 mb-5">
        <button onClick={() => navigate(-1)} className="text-muted-foreground text-sm font-body mb-2">← back</button>
        <h1 className="font-display text-2xl text-foreground">steal their energy</h1>
        <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wide">get inspired · see their looks broken down · build your version</p>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-aura-celeb animate-pulse" />
          <span className="text-[10px] font-mono text-aura-gold">24.5k people recreating celeb looks today</span>
        </div>
      </div>

      <div className="px-5 space-y-4">
        {allPersonalities.map((p, i) => {
          const isExpanded = expandedCeleb === p.name;
          const looks = CELEB_LOOKS[p.name] || CELEB_LOOKS['The Deepika'];

          return (
            <motion.div
              key={p.name}
              className="rounded-[22px] overflow-hidden bg-card shadow-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              {/* Hero image */}
              <motion.button
                onClick={() => setExpandedCeleb(isExpanded ? null : p.name)}
                className="w-full relative h-[200px] text-left group"
                whileTap={{ scale: 0.97 }}
              >
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/30 to-transparent" />
                <span className="absolute top-4 left-4 pill bg-aura-celeb/90 text-foreground text-[10px] font-bold">⭐ style icon</span>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-display text-2xl text-primary-foreground leading-none drop-shadow-lg">{p.name}</p>
                  <p className="text-sm text-primary-foreground/80 font-body mt-1">{p.tagline}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="pill bg-background/40 backdrop-blur-md text-foreground text-[10px]">{p.vibe}</span>
                    <span className="text-[9px] font-mono text-primary-foreground/70">{(3200 + i * 1100).toLocaleString()} recreated</span>
                  </div>
                </div>
              </motion.button>

              {/* Action bar always visible */}
              <div className="p-3 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <LookActions variant="inline" context={`${p.name}'s signature look`} />
                  <motion.button
                    onClick={() => navigate('/mirror', { state: { context: `Style me like ${p.name}` } })}
                    className="ml-auto pill bg-accent text-accent-foreground text-[10px] font-bold"
                    whileTap={{ scale: 0.95 }}
                  >
                    style me like this ✦
                  </motion.button>
                  <button onClick={() => setExpandedCeleb(isExpanded ? null : p.name)} className="text-[10px] font-body text-primary font-semibold">
                    {isExpanded ? 'hide looks ▴' : 'see looks ▾'}
                  </button>
                </div>
              </div>

              {/* Expanded: look breakdowns */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="px-3 pb-3 space-y-3"
                >
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">iconic looks broken down</p>
                  {looks?.map((look, li) => (
                    <div key={li} className="rounded-[14px] border border-border/50 p-3 flex gap-3">
                      <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-secondary">
                        <img src={look.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-body font-bold text-foreground">{look.occasion}</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {look.pieces.map((piece, pi) => (
                            <span key={pi} className="pill bg-secondary text-foreground text-[9px] py-0.5 px-2">{piece}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[11px] font-mono text-primary font-bold">₹{look.totalPrice.toLocaleString()}</span>
                          <LookActions variant="inline" context={`${p.name}'s ${look.occasion} look`} />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Social */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex -space-x-1.5">
                      {MOCK_FRIENDS.slice(0, 3).map(f => <img key={f.id} src={f.avatar} alt="" className="w-5 h-5 rounded-full border-2 border-card object-cover" />)}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-body">Riya + 23 friends recreated {p.name}'s looks</span>
                  </div>

                  {/* Navigate to vibe */}
                  <motion.button
                    onClick={() => navigate(`/explore/vibe/${encodeURIComponent(p.vibe)}`)}
                    className="w-full pill bg-secondary text-foreground text-xs font-body py-2.5"
                    whileTap={{ scale: 0.96 }}
                  >
                    explore the full {p.vibe} vibe →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalitiesPage;
