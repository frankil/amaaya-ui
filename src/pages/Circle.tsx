import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_FRIENDS, VIBE_IMAGES, TRENDING_VIBES } from '@/data/mock-data';

const Circle = () => {
  const [hasPostedToday] = useState(false);

  return (
    <div className="pt-10 pb-4">
      <div className="px-4 mb-4">
        <h1 className="font-display text-xl text-foreground italic">circle</h1>
      </div>

      {/* Streak bar */}
      <div className="px-4 mb-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {/* Add your own */}
          {!hasPostedToday && (
            <div className="flex flex-col items-center min-w-[60px]">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-primary flex items-center justify-center bg-secondary">
                <span className="text-lg text-primary">+</span>
              </div>
              <span className="text-[10px] text-muted-foreground mt-1 font-body">you</span>
            </div>
          )}
          {MOCK_FRIENDS.map((friend) => (
            <motion.div
              key={friend.id}
              className="flex flex-col items-center min-w-[60px]"
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-14 h-14 rounded-full p-0.5 ${friend.hasPostedToday ? 'bg-gradient-to-br from-primary to-aura-gold' : ''}`}>
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-full h-full rounded-full object-cover border-2 border-background"
                />
              </div>
              <span className="text-[10px] text-foreground mt-1 font-body">{friend.name}</span>
              <span className="text-[9px] font-mono text-muted-foreground">🔥 {friend.streak}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Post CTA */}
      {!hasPostedToday && (
        <div className="mx-4 mb-4 bg-secondary rounded-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            📸
          </div>
          <div className="flex-1">
            <p className="text-sm font-body font-medium text-foreground">post today's look</p>
            <p className="text-xs text-muted-foreground">keep your streak alive!</p>
          </div>
          <button className="pill bg-primary text-primary-foreground text-xs">post</button>
        </div>
      )}

      {/* Circle Feed */}
      <div className="px-4 space-y-3">
        {/* Friend OOTD */}
        {MOCK_FRIENDS.filter(f => f.hasPostedToday).map((friend, i) => (
          <motion.div
            key={friend.id}
            className="bg-card rounded-card shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="relative h-64">
              <img
                src={VIBE_IMAGES[friend.todayVibe as keyof typeof VIBE_IMAGES] || VIBE_IMAGES['off-duty']}
                alt={`${friend.name}'s look`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3 flex items-center gap-2">
              <img src={friend.avatar} alt={friend.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-sm font-body font-medium text-foreground">{friend.name}</p>
                {friend.todayVibe && (
                  <span className="pill bg-aura-rose/20 text-aura-rose text-xs">{friend.todayVibe}</span>
                )}
              </div>
              <div className="ml-auto flex gap-2">
                <button className="pill bg-secondary text-foreground text-xs">🔥</button>
                <button className="pill bg-secondary text-foreground text-xs">💬</button>
                <button className="pill bg-secondary text-foreground text-xs">ask about this look</button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Poll card */}
        <div className="bg-card rounded-card shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <img src={MOCK_FRIENDS[1].avatar} alt="Meera" className="w-7 h-7 rounded-full object-cover" />
            <p className="text-sm font-body text-foreground"><span className="font-medium">Meera</span> needs your help</p>
          </div>
          <p className="text-sm font-body text-foreground mb-3">which one for the sangeet? 💃</p>
          <div className="grid grid-cols-2 gap-2">
            {[0, 1].map((i) => (
              <div key={i} className="relative aspect-[3/4] rounded-card overflow-hidden">
                <img src={VIBE_IMAGES[i === 0 ? 'celebrations' : 'golden hour']} alt="Option" className="w-full h-full object-cover" />
                <button className="absolute bottom-2 left-2 right-2 pill bg-card/80 backdrop-blur-sm text-foreground text-xs text-center">
                  vote
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fashion Pulse */}
        <div className="mt-4">
          <p className="text-sm font-body font-medium text-foreground mb-3">fashion pulse 📰</p>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
            {TRENDING_VIBES.map((trend, i) => (
              <div key={i} className="min-w-[200px] bg-card rounded-card shadow-card overflow-hidden">
                <img
                  src={VIBE_IMAGES[trend.vibes[0] as keyof typeof VIBE_IMAGES]}
                  alt={trend.title}
                  className="w-full h-28 object-cover"
                  loading="lazy"
                />
                <div className="p-3">
                  <p className="text-xs font-body text-foreground font-medium">{trend.title}</p>
                  <button className="pill bg-secondary text-foreground text-[10px] mt-2">shop the vibe</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Circle;
