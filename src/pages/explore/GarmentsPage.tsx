import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GARMENT_TYPES, MOCK_FEED_LOOKS } from '@/data/mock-data';

const popIn = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 22 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

const GarmentsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-10 pb-6">
      <div className="px-5 mb-5">
        <button onClick={() => navigate(-1)} className="text-muted-foreground text-sm font-body mb-2">← back</button>
        <h1 className="font-display text-2xl text-foreground">shop by type</h1>
        <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wide">browse by garment · find exactly what you need</p>
      </div>

      <div className="px-5">
        <motion.div className="grid grid-cols-2 gap-3" variants={stagger} initial="hidden" animate="show">
          {GARMENT_TYPES.map((g, i) => (
            <motion.button
              key={g.name}
              variants={popIn}
              whileTap={{ scale: 0.95 }}
              className="rounded-[20px] bg-card shadow-card p-4 text-left border border-border/30 hover:border-primary/30 transition-colors"
            >
              <span className="text-3xl block mb-2">{g.icon}</span>
              <p className="text-sm font-body font-bold text-foreground">{g.name}</p>
              <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{g.count} pieces</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] font-mono text-primary">{Math.floor(g.count * 0.3)} new this week</span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Quick picks preview */}
        <div className="mt-6">
          <h2 className="font-display text-lg text-foreground mb-3">popular right now</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-2">
            {MOCK_FEED_LOOKS.slice(0, 5).map((look, i) => (
              <motion.div
                key={look.id}
                className="min-w-[130px] flex-shrink-0 rounded-[16px] overflow-hidden bg-card shadow-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="relative h-[160px]">
                  <img src={look.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                  <span className="absolute bottom-2 right-2 pill bg-accent/90 text-accent-foreground text-[8px] font-bold">try on ✦</span>
                </div>
                <div className="p-2">
                  <p className="text-xs font-body font-bold text-foreground">{look.brand}</p>
                  <p className="text-xs font-mono text-primary">₹{look.price?.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarmentsPage;
