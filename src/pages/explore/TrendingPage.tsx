import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TRENDING_VIBES, MOCK_FEED_LOOKS, PERSONALITY_INSPO, FASHION_NEWS } from '@/data/mock-data';

const TrendingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-10 pb-6">
      <div className="px-5 mb-5">
        <button onClick={() => navigate(-1)} className="text-muted-foreground text-sm font-body mb-2">← back</button>
        <h1 className="font-display text-2xl text-foreground">what's moving</h1>
        <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wide">trends, drops & what everyone's wearing</p>
      </div>

      {/* Featured trends */}
      <div className="px-5 space-y-3 mb-6">
        {TRENDING_VIBES.map((trend, i) => (
          <motion.button
            key={i}
            className="w-full relative h-[180px] rounded-[20px] overflow-hidden group text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileTap={{ scale: 0.97 }}
          >
            <img src={trend.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <div className="flex gap-1.5 mb-2">
                {trend.vibes.map(v => (
                  <span key={v} className="pill bg-primary/80 text-primary-foreground text-[10px] backdrop-blur-sm">{v}</span>
                ))}
              </div>
              <p className="font-display text-xl text-primary-foreground leading-snug drop-shadow-lg">{trend.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-mono text-primary-foreground/70">{(1200 + i * 800).toLocaleString()} exploring</span>
                <span className="pill bg-accent/90 text-accent-foreground text-[9px] font-bold">try this trend ✦</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Rising looks */}
      <div className="px-5 mb-6">
        <h2 className="font-display text-lg text-foreground mb-3">rising looks</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-2">
          {MOCK_FEED_LOOKS.slice(0, 6).map((look, i) => (
            <motion.div
              key={look.id}
              className="min-w-[140px] flex-shrink-0 rounded-[16px] overflow-hidden bg-card shadow-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="relative h-[180px]">
                <img src={look.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-2 left-2 pill bg-destructive/90 text-primary-foreground text-[9px] font-bold">🔥 trending</span>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-body font-bold text-foreground">{look.brand}</p>
                <p className="text-xs font-mono text-primary">₹{look.price?.toLocaleString()}</p>
                <p className="text-[9px] text-muted-foreground font-mono mt-0.5">+234% saves this week</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fashion pulse */}
      <div className="px-5">
        <h2 className="font-display text-lg text-foreground mb-3">fashion pulse</h2>
        <div className="space-y-2.5">
          {FASHION_NEWS.map((news, i) => (
            <motion.button
              key={i}
              className="w-full rounded-[16px] bg-card shadow-card p-4 text-left flex items-start gap-3 group"
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.06 }}
            >
              <div className="w-1.5 self-stretch rounded-full bg-gradient-to-b from-primary to-aura-gold flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-body text-foreground leading-snug font-medium group-hover:text-primary transition-colors">{news.headline}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] font-mono text-accent font-semibold">{news.source}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{news.time}</span>
                </div>
              </div>
              <span className="text-muted-foreground text-sm group-hover:text-primary transition-colors">→</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;
