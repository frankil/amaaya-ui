import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MOODBOARD_PREVIEWS, MOCK_FEED_LOOKS, MOCK_FRIENDS } from '@/data/mock-data';

const MoodboardsPage = () => {
  const navigate = useNavigate();

  const allBoards = [
    ...MOODBOARD_PREVIEWS,
    { title: 'Quiet Riot', count: 15, images: [MOCK_FEED_LOOKS[2].image, MOCK_FEED_LOOKS[5].image, MOCK_FEED_LOOKS[8].image, MOCK_FEED_LOOKS[3].image] },
    { title: 'Festive Freedom', count: 6, images: [MOCK_FEED_LOOKS[4].image, MOCK_FEED_LOOKS[7].image, MOCK_FEED_LOOKS[0].image, MOCK_FEED_LOOKS[9].image] },
  ];

  return (
    <div className="pt-10 pb-6">
      <div className="px-5 mb-5">
        <button onClick={() => navigate(-1)} className="text-muted-foreground text-sm font-body mb-2">← back</button>
        <h1 className="font-display text-2xl text-foreground">your moodboards</h1>
        <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wide">worlds you're building · co-create with friends & AI</p>
      </div>

      <div className="px-5">
        {/* Create new board CTA */}
        <motion.button
          className="w-full rounded-[20px] border-2 border-dashed border-border/60 p-6 flex flex-col items-center gap-2 mb-5 hover:border-primary/40 transition-colors"
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-primary text-2xl">+</span>
          </div>
          <p className="text-sm font-body font-bold text-foreground">create new moodboard</p>
          <p className="text-[10px] text-muted-foreground font-body">start from a vibe, an image, or let AI inspire you</p>
        </motion.button>

        {/* Boards grid */}
        <div className="grid grid-cols-2 gap-3">
          {allBoards.map((board, i) => (
            <motion.button
              key={board.title}
              className="rounded-[18px] overflow-hidden bg-card shadow-card text-left"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="grid grid-cols-2 gap-0.5 h-[120px]">
                {board.images.slice(0, 4).map((img, j) => (
                  <img key={j} src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                ))}
              </div>
              <div className="p-3">
                <p className="text-sm font-display text-foreground italic">{board.title}</p>
                <p className="text-[10px] font-mono text-muted-foreground">{board.count} saves</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="flex -space-x-1.5">
                    {MOCK_FRIENDS.slice(0, 2).map(f => (
                      <img key={f.id} src={f.avatar} alt="" className="w-4 h-4 rounded-full border border-card object-cover" />
                    ))}
                  </div>
                  <span className="text-[9px] text-muted-foreground font-body">co-creating with friends</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* AI suggestion */}
        <motion.div
          className="rounded-[20px] p-4 bg-aura-ai-surface mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-2">
            <span className="text-accent text-sm">✦</span>
            <div>
              <p className="text-sm font-body text-foreground">
                Based on your saves, I think you'd love a <span className="font-bold text-accent">"Midnight Baroque"</span> board. Want me to start one?
              </p>
              <button className="pill bg-accent text-accent-foreground text-[11px] mt-2 font-semibold">yes, create it ✦</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MoodboardsPage;
