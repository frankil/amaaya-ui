import { motion } from 'framer-motion';
import { useStyleSoul } from '@/context/StyleSoulContext';
import { VIBE_IMAGES, COLOUR_PALETTE_SWATCHES, MOCK_FEED_LOOKS } from '@/data/mock-data';

const BADGES = [
  { icon: '🔥', name: 'Consistent', desc: '7-day streak', earned: true },
  { icon: '✦', name: 'Style Explorer', desc: 'Tried 5 different vibes', earned: true },
  { icon: '👑', name: 'Style Icon', desc: '30-day streak', earned: false },
  { icon: '🎯', name: 'Sharp Eye', desc: 'Created 10 polls', earned: false },
  { icon: '💫', name: 'Trendsetter', desc: 'Look saved 50+ times', earned: false },
];

const Soul = () => {
  const { profile } = useStyleSoul();

  const topVibes = profile.vibes.length > 0 ? profile.vibes : ['old soul', 'celebrations'];
  const palettes = profile.colourPalettes.length > 0 ? profile.colourPalettes : ['warm & earthy'];

  return (
    <div className="pt-10 pb-4 px-4">
      {/* Profile header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-aura-gold p-0.5">
          <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center">
            <span className="text-2xl">✦</span>
          </div>
        </div>
        <div>
          <h1 className="font-display text-xl text-foreground">{profile.name || 'You'}</h1>
          <div className="flex gap-1.5 mt-1">
            {topVibes.slice(0, 2).map((v) => (
              <span key={v} className="pill bg-secondary text-foreground text-xs">{v}</span>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-xs font-mono text-muted-foreground">🔥 14-day streak</span>
            <span className="text-xs font-mono text-muted-foreground">✦ 3 badges</span>
          </div>
        </div>
      </div>

      {/* Style DNA Card */}
      <motion.div
        className="bg-card rounded-card shadow-card p-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xs font-mono text-accent uppercase tracking-wider mb-3">style DNA</p>

        {/* Top vibes */}
        <div className="space-y-2 mb-4">
          {topVibes.map((vibe, i) => (
            <div key={vibe} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={VIBE_IMAGES[vibe as keyof typeof VIBE_IMAGES]} alt={vibe} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-body text-foreground flex-1">{vibe}</span>
              <span className="text-xs font-mono text-muted-foreground">{[60, 25, 15][i]}%</span>
              <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${[60, 25, 15][i]}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Colour instinct */}
        <p className="text-xs text-muted-foreground mb-2 font-body">your colour instinct</p>
        <div className="flex gap-1.5 mb-4">
          {(COLOUR_PALETTE_SWATCHES[palettes[0]] || COLOUR_PALETTE_SWATCHES['warm & earthy']).map((c, i) => (
            <div key={i} className="w-7 h-7 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>

        {/* AI personality */}
        <div className="bg-aura-ai-surface rounded-card p-3">
          <span className="text-accent text-xs">✦</span>
          <p className="text-sm font-body text-foreground mt-1 italic">
            "You dress like you're writing a slow poem — considered, warm, with one unexpected line."
          </p>
        </div>
      </motion.div>

      {/* Upcoming occasions */}
      <div className="mb-4">
        <p className="text-sm font-body font-medium text-foreground mb-3">upcoming occasions</p>
        <div className="space-y-2">
          {(profile.upcomingOccasions.length > 0 ? profile.upcomingOccasions : [
            { id: '1', name: "Divya's Wedding", date: new Date(Date.now() + 11 * 86400000) },
            { id: '2', name: "Office Party", date: new Date(Date.now() + 25 * 86400000) },
          ]).map((occ) => {
            const daysUntil = Math.ceil((new Date(occ.date).getTime() - Date.now()) / 86400000);
            return (
              <div key={occ.id} className="bg-card rounded-card shadow-card p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-sm font-mono text-primary font-semibold">{daysUntil}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-body font-medium text-foreground">{occ.name}</p>
                  <p className="text-xs text-muted-foreground">{daysUntil} days away</p>
                </div>
                <span className="pill bg-aura-ai-surface text-accent text-xs">3 looks ready</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Moodboards */}
      <div className="mb-4">
        <p className="text-sm font-body font-medium text-foreground mb-3">my moodboards</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: 'Chandni Nights', count: 12 },
            { title: 'The Warm Minimalist', count: 8 },
            { title: 'Quiet Riot', count: 15 },
            { title: 'Festive Freedom', count: 6 },
          ].map((board, i) => (
            <div key={board.title} className="bg-card rounded-card shadow-card overflow-hidden">
              <div className="grid grid-cols-2 gap-0.5 h-24">
                {MOCK_FEED_LOOKS.slice(i * 2, i * 2 + 2).map((look) => (
                  <img key={look.id} src={look.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                ))}
              </div>
              <div className="p-2">
                <p className="text-xs font-display text-foreground italic">{board.title}</p>
                <p className="text-[10px] font-mono text-muted-foreground">{board.count} pieces</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div>
        <p className="text-sm font-body font-medium text-foreground mb-3">badges & milestones</p>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {BADGES.map((badge) => (
            <div
              key={badge.name}
              className={`min-w-[100px] bg-card rounded-card shadow-card p-3 text-center ${!badge.earned && 'opacity-40'}`}
            >
              <span className="text-2xl">{badge.icon}</span>
              <p className="text-xs font-body font-medium text-foreground mt-1">{badge.name}</p>
              <p className="text-[10px] text-muted-foreground">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Soul;
