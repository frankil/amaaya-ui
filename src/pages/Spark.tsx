import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MOCK_FRIENDS, VIBE_IMAGES, VIBE_DESCRIPTIONS, COMPLETE_LOOKS, LOOK_PIECES,
  OCCASION_IMAGES, GARMENT_TYPES,
  STORY_EVENTS, LIVE_SOCIAL_PROOF, TRENDING_DROPS,
  SEARCH_PROMPTS, INFLUENCER_REELS, PINTEREST_BOARDS,
  ICONIC_LOOKS, CELEB_AESTHETICS, AMAAYA_TEA,
  STYLING_SESSIONS, RECENTLY_VIEWED, EVENT_PREP,
} from '@/data/mock-data';
import { VibeArchetype } from '@/types/style-soul';

/* ─────────────────── shared bits ─────────────────── */

const SectionHeader = ({ eyebrow, title, action, onAction }: {
  eyebrow?: string; title: string; action?: string; onAction?: () => void;
}) => (
  <div className="flex items-start justify-between mb-3 gap-3">
    <div className="min-w-0">
      <h2 className="font-display text-[22px] tracking-tight text-foreground leading-tight">{title}</h2>
      {eyebrow && <p className="text-[11px] font-body text-muted-foreground mt-0.5 leading-snug">{eyebrow}</p>}
    </div>
    {action && (
      <button onClick={onAction} className="text-[11px] font-body text-primary font-semibold whitespace-nowrap mt-1.5 flex-shrink-0">
        {action.toLowerCase()} →
      </button>
    )}
  </div>
);

const Section = ({ eyebrow, title, action, onAction, children }: {
  eyebrow?: string; title: string; action?: string; onAction?: () => void; children: React.ReactNode;
}) => (
  <section className="mb-8">
    <SectionHeader eyebrow={eyebrow} title={title} action={action} onAction={onAction} />
    {children}
  </section>
);

const Tag = ({ children, accent }: { children: React.ReactNode; accent?: boolean }) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-body backdrop-blur-md ${
    accent ? 'bg-primary/85 text-primary-foreground' : 'bg-background/75 text-foreground'
  }`}>
    {children}
  </span>
);

const ShimmerImg = ({ src, alt, className }: { src: string; alt?: string; className?: string }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      {!loaded && <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-secondary/30 to-secondary/60 animate-pulse" />}
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

/* ═══════════════════ 1. Header (Amaaya block) ═══════════════════ */
const AmaayaHeader = () => (
  <div
    className="px-5 pt-12 pb-5 rounded-b-[28px]"
    style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.92))' }}
  >
    <div className="flex items-center gap-3">
      <motion.div
        className="w-11 h-11 rounded-full bg-primary-foreground/15 backdrop-blur-md flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <span className="text-primary-foreground text-lg">✦</span>
      </motion.div>
      <div>
        <h1 className="font-display text-2xl text-primary-foreground leading-none">Amaaya</h1>
        <p className="text-[11px] font-body text-primary-foreground/70 mt-0.5">fashion that reads you</p>
      </div>
    </div>
    <p className="font-display italic text-[22px] text-primary-foreground mt-4 leading-snug">
      I know your vibe. I'll find the look.
    </p>
  </div>
);

/* ═══════════════════ 2. Hero Search (chat entry) ═══════════════════ */
const HeroSearch = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [hint, setHint] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) return;
    const t = setInterval(() => setHint(p => (p + 1) % SEARCH_PROMPTS.length), 2800);
    return () => clearInterval(t);
  }, [value]);

  const submit = () => {
    if (!value.trim()) return;
    navigate('/mirror', { state: { query: value } });
  };

  return (
    <div className="-mt-7 px-5">
      <div className="rounded-[28px] bg-card border border-border shadow-elevated p-2 flex items-center gap-2">
        <div className="flex-1 relative h-14 flex items-center px-4">
          {!value && (
            <AnimatePresence mode="wait">
              <motion.span
                key={hint}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="absolute left-4 right-4 text-[15px] font-body italic text-muted-foreground pointer-events-none truncate"
              >
                {SEARCH_PROMPTS[hint]}
              </motion.span>
            </AnimatePresence>
          )}
          <input
            ref={inputRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            className="w-full bg-transparent text-[15px] font-body text-foreground outline-none overflow-x-auto whitespace-nowrap"
            style={{ scrollbarWidth: 'none' }}
          />
        </div>
        <button
          aria-label="camera"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground"
        >
          <span className="text-base">📷</span>
        </button>
        <motion.button
          aria-label="voice"
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-glow-ai"
        >
          <span className="text-base">🎙️</span>
        </motion.button>
        <motion.button
          aria-label="send"
          whileTap={{ scale: 0.9 }}
          onClick={submit}
          className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
        >
          <span className="text-lg">→</span>
        </motion.button>
      </div>
      <p className="text-[10px] font-mono text-muted-foreground mt-2 px-2 tracking-wider uppercase">
        not a search bar · your stylist chat
      </p>
    </div>
  );
};

/* ═══════════════════ 3. Continue your session ═══════════════════ */
const ContinueSession = () => {
  const navigate = useNavigate();
  return (
    <Section eyebrow="pick up where you left" title="continue styling" action="all sessions" onAction={() => navigate('/mirror')}>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
        {STYLING_SESSIONS.map((s, i) => (
          <motion.button
            key={s.id}
            onClick={() => navigate('/mirror')}
            className="min-w-[240px] flex-shrink-0 rounded-2xl bg-card border border-border shadow-card overflow-hidden text-left"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex">
              <ShimmerImg src={s.thumb} className="w-[88px] h-[88px] flex-shrink-0" />
              <div className="p-3 flex-1 min-w-0">
                <p className="text-[10px] font-mono text-accent uppercase">{s.when}</p>
                <p className="text-[13px] font-body text-foreground font-semibold mt-0.5 line-clamp-2">{s.query}</p>
                <p className="text-[10px] font-body text-muted-foreground mt-1">{s.matches} looks ready · resume →</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </Section>
  );
};

/* ═══════════════════ 4. Event prep (Divya's wedding) ═══════════════════ */
const EventPrep = () => {
  const navigate = useNavigate();
  return (
    <Section eyebrow={`coming up · ${EVENT_PREP.daysAway} days away`} title={`prep for ${EVENT_PREP.title}`} action="all looks" onAction={() => navigate('/explore/occasions')}>
      <div className="grid grid-cols-4 gap-2">
        {EVENT_PREP.occasions.map((o, i) => (
          <motion.button
            key={o.name}
            onClick={() => navigate(`/explore/occasion/${encodeURIComponent(o.name.toLowerCase())}`)}
            className="rounded-2xl overflow-hidden border border-border bg-card text-left"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <div className="relative h-[110px]">
              <ShimmerImg src={o.image} className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 to-transparent" />
              <p className="absolute bottom-1.5 left-2 text-[11px] font-display text-primary-foreground drop-shadow">{o.name}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </Section>
  );
};

/* ═══════════════════ 5. Style Reels (real creators, 9:16) ═══════════════════ */
const StyleReels = () => {
  const navigate = useNavigate();
  return (
    <Section title="style from the feed" eyebrow="tap any reel — we'll match the exact pieces to shop" action="watch all" onAction={() => navigate('/explore/reels')}>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
        {INFLUENCER_REELS.map((r, i) => (
          <motion.button
            key={r.id}
            onClick={() => navigate('/explore/reels')}
            className="min-w-[170px] flex-shrink-0 text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative w-[170px] h-[300px] rounded-2xl overflow-hidden bg-card border border-border">
              <ShimmerImg src={r.thumb} className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-background/30 backdrop-blur-md flex items-center justify-center">
                  <span className="text-primary-foreground text-base ml-0.5">▶</span>
                </div>
              </div>
              {/* Highlight chip on top reels */}
              {i === 0 && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-mono font-bold uppercase tracking-wider">🔥 trending</span>
              )}
              {i === 1 && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[9px] font-mono font-bold uppercase tracking-wider">new today</span>
              )}
              <span className="absolute top-2 right-2 text-[9px] font-mono text-primary-foreground bg-foreground/35 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                {r.duration}
              </span>
              <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                <img src={r.avatar} alt="" className="w-6 h-6 rounded-full object-cover border border-primary-foreground/40" />
                <div className="min-w-0">
                  <p className="text-[11px] font-body font-semibold text-primary-foreground truncate">{r.creator}</p>
                  <p className="text-[9px] font-mono text-primary-foreground/70">{r.plays} plays</p>
                </div>
              </div>
            </div>
            {/* Shop CTA below card */}
            <p className="text-[10px] font-body text-primary font-semibold mt-1.5 px-1">shop this look ✦</p>
          </motion.button>
        ))}
      </div>
    </Section>
  );
};

/* ═══════════════════ 6. Pinterest-style boards (mosaic) ═══════════════════ */
const PinterestBoards = () => {
  const navigate = useNavigate();
  return (
    <Section title="boards we love" eyebrow="pinterest aesthetics → shoppable looks. tap to find matching pieces." action="all boards" onAction={() => navigate('/explore/moodboards')}>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
        {PINTEREST_BOARDS.map((b, i) => (
          <motion.button
            key={b.id}
            onClick={() => navigate('/explore/moodboards')}
            className="min-w-[200px] flex-shrink-0 rounded-2xl bg-card border border-border overflow-hidden text-left"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative">
              <div className="grid grid-cols-2 grid-rows-2 gap-[2px] h-[200px] bg-border">
                {b.images.map((src, j) => <ShimmerImg key={j} src={src} className="w-full h-full" />)}
              </div>
              {i === 0 && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-mono font-bold uppercase tracking-wider">most saved</span>
              )}
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-body font-semibold text-foreground truncate">{b.title}</p>
                <p className="text-[10px] font-mono text-muted-foreground ml-2">{b.pins} pins</p>
              </div>
              <p className="text-[10px] font-body text-primary font-semibold mt-1">find matching outfits ✦</p>
            </div>
          </motion.button>
        ))}
      </div>
    </Section>
  );
};

/* ═══════════════════ 7. Story Strip (style icons) ═══════════════════ */
const StoryStrip = () => {
  const navigate = useNavigate();
  const friends = MOCK_FRIENDS.slice(0, 6);

  return (
    <Section title="whose looks dropped today" eyebrow="celebs & friends who posted in the last 24h — tap to recreate">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
        {/* You */}
        <button onClick={() => navigate('/circle')} className="flex flex-col items-center min-w-[64px]">
          <div className="w-[60px] h-[60px] rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center bg-secondary/30">
            <span className="text-primary text-xl">+</span>
          </div>
          <span className="text-[10px] text-primary mt-1.5 font-body font-semibold">you</span>
        </button>

        {STORY_EVENTS.filter(e => e.type === 'celeb').map((e, i) => {
          const fresh = i % 2 === 0;
          return (
            <motion.button
              key={e.id}
              className="flex flex-col items-center min-w-[64px]"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              <div className={`w-[60px] h-[60px] rounded-full p-[2.5px] ${fresh ? 'bg-gradient-to-br from-primary via-aura-gold to-accent' : 'bg-border'}`}>
                <img src={e.image} alt={e.label} className="w-full h-full rounded-full object-cover border-2 border-background" />
              </div>
              <span className="text-[10px] text-foreground mt-1.5 font-body font-medium truncate max-w-[68px]">{e.label}</span>
            </motion.button>
          );
        })}

        {friends.filter(f => f.hasPostedToday).map((f, i) => (
          <motion.button
            key={f.id}
            className="flex flex-col items-center min-w-[64px]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.04 }}
          >
            <div className="w-[60px] h-[60px] rounded-full p-[2.5px] bg-gradient-to-br from-aura-rose to-primary">
              <img src={f.avatar} alt={f.name} className="w-full h-full rounded-full object-cover border-2 border-background" />
            </div>
            <span className="text-[10px] text-foreground mt-1.5 font-body">{f.name}</span>
          </motion.button>
        ))}
      </div>
    </Section>
  );
};

/* ═══════════════════ 8. Looks for you (revamped) ═══════════════════ */
const LooksForYou = () => {
  const navigate = useNavigate();
  const looks = COMPLETE_LOOKS.slice(0, 6);

  return (
    <Section title="looks for you" eyebrow="complete combos curated for your vibe — not single items" action="see all" onAction={() => navigate('/explore/looks')}>
      <div className="grid grid-cols-2 gap-3">
        {looks.map((look, i) => {
          const pieces = LOOK_PIECES[look.id] || [];
          // Cycle through combo sizes: 2, 3, 4, 2, 3, 4
          const comboSize = [2, 3, 4, 2, 3, 4][i % 6];
          // Piece thumbnails: pull from other looks for visual variety
          const thumbPool = COMPLETE_LOOKS.filter(l => l.id !== look.id).map(l => l.image);
          const pieceThumbs = Array.from({ length: comboSize }, (_, k) => thumbPool[(i * 2 + k) % thumbPool.length]);

          return (
            <motion.div
              key={look.id}
              className="rounded-2xl bg-card border border-border shadow-card overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <div className="relative aspect-[3/4] bg-secondary/40">
                <ShimmerImg src={look.image} className="absolute inset-0" />
                <div className="absolute top-2 left-2"><Tag>{look.vibes[0]}</Tag></div>
                <button
                  onClick={() => navigate(`/explore/looks`)}
                  aria-label="zoom"
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-foreground"
                >
                  <span className="text-xs">⤢</span>
                </button>
                {/* combo size badge */}
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-background/85 backdrop-blur-md text-[9px] font-mono text-foreground font-bold">
                  {comboSize}-piece combo
                </span>
              </div>
              {/* Piece thumbnails strip */}
              <div className="flex gap-1 p-2 bg-secondary/25 border-t border-border/40">
                {pieceThumbs.map((src, k) => (
                  <div key={k} className="flex-1 aspect-square rounded-md overflow-hidden bg-card border border-border/50">
                    <ShimmerImg src={src} className="w-full h-full" />
                  </div>
                ))}
              </div>
              <div className="p-3">
                <p className="text-[12px] font-body font-semibold text-foreground leading-snug min-h-[32px] line-clamp-2">{look.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[12px] font-mono text-foreground font-bold">₹{look.price?.toLocaleString()}</span>
                  <button
                    onClick={() => navigate('/mirror')}
                    className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-body font-semibold"
                  >
                    style this ✦
                  </button>
                </div>
                <button
                  onClick={() => navigate('/mirror')}
                  className="w-full mt-2 text-[10px] font-body text-primary font-semibold text-left"
                >
                  customize this combo →
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

/* ═══════════════════ 9. Occasions ═══════════════════ */
const OccasionGrid = () => {
  const navigate = useNavigate();
  const occasions = Object.entries(OCCASION_IMAGES).slice(0, 7);
  return (
    <Section title="what does your moment look like?" eyebrow="pick your occasion or describe it — we'll style it for you" action="all moments" onAction={() => navigate('/explore/occasions')}>
      {/* Custom moment input */}
      <motion.button
        onClick={() => navigate('/mirror', { state: { query: 'styling for ' } })}
        className="w-full mb-3 rounded-2xl bg-aura-ai-surface border border-accent/30 p-3 flex items-center gap-3 text-left"
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
          <span className="text-accent-foreground text-base">✦</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-body font-semibold text-foreground">tell amaaya your moment</p>
          <p className="text-[10px] font-body italic text-muted-foreground mt-0.5 truncate">"college fest in 3 days, mid-budget, low-key"</p>
        </div>
        <span className="text-primary text-base">→</span>
      </motion.button>
      <div className="grid grid-cols-3 gap-2">
        {occasions.map(([name, img], i) => (
          <motion.button
            key={name}
            onClick={() => navigate(`/explore/occasion/${encodeURIComponent(name)}`)}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            whileTap={{ scale: 0.96 }}
          >
            <ShimmerImg src={img} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 to-transparent" />
            <p className="absolute bottom-2 left-2 right-2 font-display text-sm text-primary-foreground capitalize drop-shadow leading-tight">{name}</p>
          </motion.button>
        ))}
        <motion.button
          onClick={() => navigate('/explore/occasions')}
          className="relative aspect-[3/4] rounded-2xl border border-dashed border-primary/40 bg-card flex flex-col items-center justify-center gap-1 text-center px-2"
          whileTap={{ scale: 0.96 }}
        >
          <span className="text-xl text-primary">＋</span>
          <span className="text-[10px] font-body text-primary font-semibold leading-tight">add your<br/>own moment</span>
        </motion.button>
      </div>
    </Section>
  );
};

/* ═══════════════════ 10. The Tea (Amaaya commerce-forward editorial) ═══════════════════ */
const AmaayaTea = () => {
  const navigate = useNavigate();
  // Personalized "for you" tags rotated per card
  const personalTags = ['for you', 'matches your vibe', 'in your budget', 'your size in stock', 'your circle saved this'];
  return (
    <Section
      title="the tea ☕"
      eyebrow="amaaya's take · what's worth buying right now"
      action="more"
      onAction={() => navigate('/explore/trending')}
    >
      <div className="grid grid-cols-2 gap-3">
        {AMAAYA_TEA.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => navigate('/explore/trending')}
            className="rounded-2xl overflow-hidden bg-card border border-border text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative aspect-[4/5]">
              <ShimmerImg src={item.image} className="absolute inset-0" />
              {/* LOUD personalized tag — top, full-width band */}
              <div className="absolute top-0 left-0 right-0 px-2.5 py-1.5 bg-gradient-to-b from-foreground/55 to-transparent flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-mono font-bold uppercase tracking-wider">
                  ✦ {personalTags[i % personalTags.length]}
                </span>
                <span className="text-[9px] font-mono text-primary-foreground/90 font-semibold">{item.vibe}</span>
              </div>
              {/* Tap nudge */}
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-background/85 backdrop-blur-md text-[9px] font-mono text-primary font-bold">
                tap to read →
              </div>
            </div>
            <div className="p-3">
              <p className="text-[12px] font-body font-semibold text-foreground leading-snug line-clamp-2">{item.hook}</p>
              <p className="text-[10px] font-body italic text-muted-foreground mt-1 line-clamp-2">
                <span className="text-accent mr-0.5">✦</span>{item.take}
              </p>
              <p className="text-[10px] font-mono text-primary font-bold mt-1.5">from ₹{item.price.toLocaleString()}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </Section>
  );
};

/* ═══════════════════ 11. Vibes (bento) ═══════════════════ */
const VibeBrowse = () => {
  const navigate = useNavigate();
  const vibes = Object.entries(VIBE_IMAGES).slice(0, 6) as [VibeArchetype, string][];
  return (
    <Section title="explore a vibe" eyebrow="emotional discovery — pick a mood, get a wardrobe" action="all vibes" onAction={() => navigate('/explore/vibes')}>
      <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[280px]">
        <motion.button
          onClick={() => navigate(`/explore/vibe/${encodeURIComponent(vibes[0][0])}`)}
          className="col-span-1 row-span-2 relative rounded-2xl overflow-hidden border border-border"
          whileTap={{ scale: 0.97 }}
        >
          <ShimmerImg src={vibes[0][1]} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-2">
            <p className="font-display text-2xl text-primary-foreground leading-none">{vibes[0][0]}</p>
            <p className="text-[10px] text-primary-foreground/70 font-body mt-1 line-clamp-2">{VIBE_DESCRIPTIONS[vibes[0][0]]}</p>
          </div>
        </motion.button>
        {vibes.slice(1, 5).map(([v, img], i) => (
          <motion.button
            key={v}
            onClick={() => navigate(`/explore/vibe/${encodeURIComponent(v)}`)}
            className="relative rounded-2xl overflow-hidden border border-border"
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.04 + i * 0.03 }}
          >
            <ShimmerImg src={img} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 to-transparent" />
            <p className="absolute bottom-2 left-2 font-display text-sm text-primary-foreground drop-shadow">{v}</p>
          </motion.button>
        ))}
      </div>
    </Section>
  );
};

/* ═══════════════════ 12. Style like icons (3-word celebs) ═══════════════════ */
const StyleLikeIcons = () => {
  const navigate = useNavigate();
  const extras = ['42 looks', '38 looks', '51 looks', '29 looks', '46 looks', '33 looks'];
  const signatures = ['signature: structured saree', 'signature: indo-fusion', 'signature: couture drama', 'signature: minimal blazer', 'signature: monochrome bodycon', 'signature: floral lehenga'];
  return (
    <Section title="style like icons" eyebrow="whose style speaks to you? tap to shop their signature pieces" action="more" onAction={() => navigate('/explore/personalities')}>
      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
        {CELEB_AESTHETICS.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={() => navigate('/explore/personalities')}
            className="min-w-[118px] flex-shrink-0 rounded-2xl overflow-hidden border border-border bg-card text-left"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative h-[150px]">
              <ShimmerImg src={c.image} className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 to-transparent" />
              <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-background/85 backdrop-blur-md text-[8px] font-mono text-foreground font-semibold">
                {extras[i % extras.length]}
              </span>
              <p className="absolute bottom-1.5 left-2 font-display text-[15px] text-primary-foreground drop-shadow leading-none">{c.name}</p>
            </div>
            <div className="p-2">
              <p className="text-[10px] font-body italic text-muted-foreground leading-snug line-clamp-2">{c.aesthetic}</p>
              <p className="text-[9px] font-mono text-primary font-bold mt-1 line-clamp-1">{signatures[i % signatures.length]}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </Section>
  );
};

/* ═══════════════════ 13. Iconic Bollywood looks ═══════════════════ */
const IconicLooksGrid = () => {
  const navigate = useNavigate();
  return (
    <Section eyebrow="bollywood classics, your wardrobe" title="co-create your iconic look" action="all">
      <div className="grid grid-cols-2 gap-3">
        {ICONIC_LOOKS.map((l, i) => (
          <motion.button
            key={l.id}
            onClick={() => navigate('/mirror')}
            className="rounded-2xl overflow-hidden border border-border bg-card text-left"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative aspect-[3/4]">
              <ShimmerImg src={l.image} className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-md text-[9px] font-mono text-foreground">{l.year}</span>
              <div className="absolute bottom-2 left-2 right-2">
                <p className="font-display text-lg text-primary-foreground leading-none drop-shadow">{l.character}</p>
                <p className="text-[10px] font-body text-primary-foreground/75 mt-0.5">{l.film}</p>
              </div>
            </div>
            <div className="p-3">
              <p className="text-[11px] font-body italic text-muted-foreground">{l.hook}</p>
              <p className="text-[11px] font-body text-accent font-semibold mt-1.5">recreate this look ✦</p>
            </div>
          </motion.button>
        ))}
      </div>
    </Section>
  );
};

/* ═══════════════════ 14. Top 10 drops (Netflix) ═══════════════════ */
const TopDrops = () => {
  const navigate = useNavigate();
  return (
    <Section title="top drops by people like you" eyebrow="ranked this week — what your style twins are loving">
      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
        {TRENDING_DROPS.map((drop, i) => (
          <motion.button
            key={drop.rank}
            onClick={() => navigate('/explore/trending')}
            className="min-w-[112px] flex-shrink-0 text-left"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <div className="relative h-[160px] rounded-2xl overflow-hidden border border-border">
              <ShimmerImg src={drop.image} className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-transparent to-transparent" />
              <span
                className="absolute -bottom-2 -left-1 font-display text-[64px] leading-none text-primary-foreground/30 italic font-bold select-none"
                style={{ WebkitTextStroke: '1.5px hsl(var(--primary-foreground) / 0.5)' }}
              >
                {drop.rank}
              </span>
              <div className="absolute bottom-1.5 left-2 right-2 pl-9">
                <p className="text-[10px] font-display text-primary-foreground leading-snug drop-shadow line-clamp-2">{drop.title}</p>
              </div>
            </div>
            <p className="text-[9px] font-body text-muted-foreground mt-1 truncate">{drop.user}</p>
            <p className="text-[9px] font-mono text-accent mt-0.5">{drop.saves} saves</p>
          </motion.button>
        ))}
      </div>
    </Section>
  );
};

/* ═══════════════════ 15. Recently viewed ═══════════════════ */
const RecentlyViewed = () => {
  const navigate = useNavigate();
  return (
    <Section eyebrow="back to where you were" title="recently viewed" action="all" onAction={() => navigate('/explore/looks')}>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
        {RECENTLY_VIEWED.map((p, i) => (
          <motion.button
            key={p.id}
            className="min-w-[130px] flex-shrink-0 text-left"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative h-[170px] rounded-2xl overflow-hidden border border-border bg-card">
              <ShimmerImg src={p.image} className="absolute inset-0" />
            </div>
            <p className="text-[11px] font-body font-semibold text-foreground mt-1.5 line-clamp-1">{p.title}</p>
            <p className="text-[10px] font-mono text-primary font-bold mt-0.5">₹{p.price.toLocaleString()}</p>
          </motion.button>
        ))}
      </div>
    </Section>
  );
};

/* ═══════════════════ 16. Friend ticker ═══════════════════ */
const FriendTicker = () => (
  <motion.div className="rounded-2xl bg-card border border-border px-4 py-3 overflow-hidden mb-8">
    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">live · your circle</p>
    <motion.div
      className="flex gap-6 whitespace-nowrap"
      animate={{ x: [0, -400] }}
      transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
    >
      {[...LIVE_SOCIAL_PROOF.friendsBought, ...LIVE_SOCIAL_PROOF.friendsBought].map((item, i) => (
        <span key={i} className="flex items-center gap-2 text-[11px] font-body">
          <img src={item.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
          <span className="text-foreground font-semibold">{item.name}</span>
          <span className="text-muted-foreground">just bought</span>
          <span className="text-primary font-semibold">{item.item}</span>
        </span>
      ))}
    </motion.div>
  </motion.div>
);

/* ═══════════════════ 17. Daily tip ═══════════════════ */
const DailyTip = () => (
  <motion.div className="rounded-2xl p-4 mb-8 border border-border" style={{ background: 'hsl(var(--aura-ai-surface))' }}>
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
        <span className="text-accent-foreground text-base">✦</span>
      </div>
      <div>
        <p className="text-[10px] font-mono text-accent uppercase tracking-wider mb-1">amaaya's tip · today</p>
        <p className="text-[14px] font-body text-foreground leading-relaxed">
          <span className="font-semibold">earth tones over black.</span> with your warm undertone, terracotta and olive will photograph richer than basic black this week.
        </p>
      </div>
    </div>
  </motion.div>
);

/* ═══════════════════ 18. Garments ═══════════════════ */
const GarmentBrowse = () => {
  const navigate = useNavigate();
  return (
    <Section eyebrow="know what you're looking for?" title="shop by type" action="all" onAction={() => navigate('/explore/garments')}>
      <div className="flex flex-wrap gap-2">
        {GARMENT_TYPES.map(g => (
          <motion.button
            key={g.name}
            onClick={() => navigate('/explore/garments')}
            className="px-3.5 py-2 rounded-full bg-card border border-border text-foreground text-sm font-body"
            whileTap={{ scale: 0.94 }}
          >
            {g.icon} {g.name}
          </motion.button>
        ))}
      </div>
    </Section>
  );
};

/* ═══════════════════ Footer message ═══════════════════ */
const FashionFooter = () => (
  <div className="mt-6 mb-6 px-2">
    <div className="border-t border-border/60 pt-6 text-center">
      <p className="font-display italic text-[18px] text-foreground leading-snug">
        "fashion isn't what you wear.<br/>it's how you tell the world who you are today."
      </p>
      <div className="flex items-center justify-center gap-2 mt-3 text-muted-foreground">
        <span className="text-accent">✦</span>
        <span className="text-[11px] font-mono uppercase tracking-[0.2em]">amaaya</span>
        <span className="text-accent">✦</span>
      </div>
      <p className="text-[10px] font-body text-muted-foreground/70 mt-4 max-w-[280px] mx-auto leading-relaxed">
        every recommendation is curated for your body, your budget, and your vibe. nothing else.
      </p>
    </div>
  </div>
);

/* ═══════════════════════ HOME ═══════════════════════ */
const Spark = () => {
  return (
    <div className="pb-8 bg-background">
      <AmaayaHeader />
      <HeroSearch />

      <div className="px-5 pt-8">
        <ContinueSession />
        <EventPrep />
        <StoryStrip />
        <StyleReels />
        <PinterestBoards />
        <LooksForYou />
        <OccasionGrid />
        <AmaayaTea />
        <VibeBrowse />
        <StyleLikeIcons />
        <IconicLooksGrid />
        <TopDrops />
        <RecentlyViewed />
        <FriendTicker />
        <DailyTip />
        <GarmentBrowse />
        <FashionFooter />
      </div>
    </div>
  );
};

export default Spark;
