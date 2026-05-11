import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { OCCASION_IMAGES, MOCK_FRIENDS } from '@/data/mock-data';

const peopleCounts: Record<string, number> = {
  'daily wear': 1247, 'date night': 892, 'wedding guest': 2341, 'office power': 567,
  'festive glow': 1890, 'girls night': 734, 'brunch vibes': 456, 'travel mood': 623,
};

const friendsInto: Record<string, string[]> = {
  'daily wear': ['Riya', 'Meera', 'Ananya'],
  'wedding guest': ['Riya', 'Divya', 'Naina', 'Ananya'],
  'date night': ['Meera', 'Shruti'],
  'festive glow': ['Ananya', 'Divya', 'Riya'],
};

const OccasionsPage = () => {
  const navigate = useNavigate();
  const occasions = Object.entries(OCCASION_IMAGES);

  return (
    <div className="pt-10 pb-6">
      <div className="px-5 mb-5">
        <button onClick={() => navigate(-1)} className="text-muted-foreground text-sm font-body mb-2">← back</button>
        <h1 className="font-display text-2xl text-foreground">dress for the moment</h1>
        <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wide">pick your occasion, we'll handle the rest</p>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-mono text-primary">4,230 people exploring right now</span>
        </div>
      </div>

      <div className="px-5 grid grid-cols-2 gap-3">
        {occasions.map(([name, image], i) => {
          const count = peopleCounts[name] || 300;
          const friends = friendsInto[name];
          return (
            <motion.button
              key={name}
              onClick={() => navigate(`/explore/occasion/${encodeURIComponent(name)}`)}
              className={`relative rounded-[20px] overflow-hidden group text-left ${i === 0 || i === 3 ? 'h-[220px]' : 'h-[180px]'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 350, damping: 22 }}
              whileTap={{ scale: 0.96 }}
            >
              <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              {/* Live count */}
              <div className="absolute top-3 right-3 flex items-center gap-1 pill bg-background/50 backdrop-blur-md text-[9px] px-2 py-1">
                <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-foreground font-bold">{count}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <p className="font-display text-xl text-primary-foreground leading-tight capitalize drop-shadow-lg">{name}</p>
                {friends && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <div className="flex -space-x-2">
                      {friends.slice(0, 3).map((f, fi) => {
                        const friend = MOCK_FRIENDS.find(mf => mf.name === f);
                        return friend ? (
                          <img key={fi} src={friend.avatar} alt="" className="w-4 h-4 rounded-full border border-background object-cover" />
                        ) : null;
                      })}
                    </div>
                    <span className="text-[9px] text-primary-foreground/80 font-body">{friends.join(', ')} are into this</span>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* AI suggestion */}
      <div className="px-5 mt-5">
        <motion.div
          className="rounded-[20px] p-4 bg-aura-ai-surface"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-2">
            <span className="text-accent text-sm">✦</span>
            <div>
              <p className="text-sm font-body text-foreground">
                Can't find your occasion? <span className="font-bold text-accent">Tell me what's coming up</span> and I'll create a custom lookbook for you.
              </p>
              <button className="pill bg-accent text-accent-foreground text-[11px] mt-2 font-semibold">describe my occasion ✦</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OccasionsPage;
