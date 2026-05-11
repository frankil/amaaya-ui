import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_PRODUCTS, MOCK_FEED_LOOKS } from '@/data/mock-data';

const CLOSET_FILTERS = ['all', 'ethnic', 'western', 'festive', 'casual', 'work'];

const Wardrobe = () => {
  const [tab, setTab] = useState<'closet' | 'discover'>('discover');
  const [closetFilter, setClosetFilter] = useState('all');

  return (
    <div className="pt-10 pb-4">
      {/* Header */}
      <div className="px-4 mb-4">
        <h1 className="font-display text-xl text-foreground italic">wardrobe</h1>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setTab('closet')}
            className={`pill transition-all ${tab === 'closet' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground shadow-card'}`}
          >
            my closet
          </button>
          <button
            onClick={() => setTab('discover')}
            className={`pill transition-all ${tab === 'discover' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground shadow-card'}`}
          >
            discover
          </button>
        </div>
      </div>

      {tab === 'closet' ? (
        <div className="px-4">
          {/* Closet Intelligence */}
          <div className="bg-aura-ai-surface rounded-card p-4 mb-4">
            <span className="text-accent text-xs">✦</span>
            <p className="text-sm font-body text-foreground mt-1">
              You have 7 festive pieces but only 2 have been worn recently. Want me to restyle them?
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4">
            {CLOSET_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setClosetFilter(f)}
                className={`pill whitespace-nowrap ${closetFilter === f ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground shadow-card'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Closet Grid */}
          <div className="grid grid-cols-3 gap-2">
            {MOCK_FEED_LOOKS.slice(0, 9).map((look, i) => (
              <motion.div
                key={look.id}
                className="aspect-[3/4] rounded-card overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <img src={look.image} alt={look.title} className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>

          {/* Add piece */}
          <button className="w-full mt-4 py-3 rounded-pill bg-secondary text-foreground text-sm font-body flex items-center justify-center gap-2">
            <span className="text-lg">+</span> add a piece
          </button>
        </div>
      ) : (
        <div className="px-4">
          {/* Conversational entry */}
          <div className="bg-card rounded-card shadow-card p-4 mb-4">
            <p className="text-sm font-body text-muted-foreground italic mb-3">
              what are you looking to add to your wardrobe?
            </p>
            <div className="flex gap-2">
              <input
                placeholder="a festive coord set under ₹3000..."
                className="flex-1 px-4 py-2.5 rounded-pill bg-secondary text-sm font-body text-foreground border-0 outline-none placeholder:text-muted-foreground"
              />
              <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">📷</button>
            </div>
          </div>

          {/* AI context */}
          <div className="bg-aura-ai-surface rounded-card p-3 mb-4">
            <span className="text-accent text-xs">✦</span>
            <p className="text-sm font-body text-foreground mt-1">
              Based on your closet, you already have 2 coord sets. I'll show you things that fill actual gaps.
            </p>
          </div>

          {/* Product cards */}
          <div className="space-y-3">
            {MOCK_PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                className="bg-card rounded-card shadow-card overflow-hidden flex"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <img src={product.image} alt={product.name} className="w-28 h-36 object-cover" loading="lazy" />
                <div className="flex-1 p-3">
                  <p className="text-sm font-body font-medium text-foreground">{product.brand}</p>
                  <p className="text-xs text-muted-foreground">{product.name}</p>
                  <p className="text-sm font-mono text-foreground mt-1">₹{product.price.toLocaleString()}</p>

                  {/* Match score */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-8 h-8 rounded-full border-2 border-aura-sage flex items-center justify-center">
                      <span className="text-xs font-mono text-aura-sage font-semibold">{product.matchScore}</span>
                    </div>
                    <div className="flex-1">
                      {product.matchReasons.slice(0, 1).map((r, j) => (
                        <p key={j} className="text-[10px] text-muted-foreground">✓ {r}</p>
                      ))}
                      {product.caveat && (
                        <p className="text-[10px] text-aura-gold">~ {product.caveat}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-1.5 mt-2">
                    <button className="pill bg-secondary text-foreground text-[10px]">should I buy this?</button>
                    <button className="pill bg-accent/10 text-accent text-[10px]">try for me</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wardrobe;
