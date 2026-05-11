import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface LookActionsProps {
  /** Display as a compact row (inline with cards) or full bar */
  variant?: 'inline' | 'bar';
  /** Context label for AI stylist prompt */
  context?: string;
  /** Callback when save to moodboard is tapped */
  onSave?: () => void;
  /** Whether item is already saved */
  isSaved?: boolean;
}

const LookActions = ({ variant = 'inline', context, onSave, isSaved = false }: LookActionsProps) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(isSaved);
  const [showSaveToast, setShowSaveToast] = useState(false);

  const handleSave = () => {
    setSaved(!saved);
    onSave?.();
    if (!saved) {
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 2000);
    }
  };

  const actions = [
    {
      id: 'stylist',
      label: 'Ask AI',
      icon: '✦',
      action: () => navigate('/mirror', { state: { context } }),
      accent: true,
    },
    {
      id: 'tryon',
      label: 'Try on',
      icon: '🪞',
      action: () => navigate('/mirror', { state: { context: `Virtual try-on: ${context}` } }),
      accent: false,
    },
    {
      id: 'save',
      label: saved ? 'Saved' : 'Save',
      icon: saved ? '♥' : '♡',
      action: handleSave,
      accent: false,
    },
  ];

  if (variant === 'bar') {
    return (
      <div className="relative">
        <div className="flex gap-2">
          {actions.map((a) => (
            <motion.button
              key={a.id}
              onClick={a.action}
              className={`flex-1 pill text-xs font-body font-semibold py-2 flex items-center justify-center gap-1.5 transition-colors ${
                a.id === 'stylist'
                  ? 'bg-accent text-accent-foreground shadow-glow-ai'
                  : a.id === 'save' && saved
                  ? 'bg-aura-rose/20 text-aura-rose border border-aura-rose/30'
                  : 'bg-card border border-border text-foreground hover:bg-secondary'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <span>{a.icon}</span>
              <span>{a.label}</span>
            </motion.button>
          ))}
        </div>
        {showSaveToast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 pill bg-foreground text-background text-[10px] px-3 py-1 whitespace-nowrap"
          >
            Added to moodboard ✨
          </motion.div>
        )}
      </div>
    );
  }

  // Inline: compact icon buttons
  return (
    <div className="relative flex items-center gap-1.5">
      {actions.map((a) => (
        <motion.button
          key={a.id}
          onClick={(e) => { e.stopPropagation(); a.action(); }}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors ${
            a.id === 'stylist'
              ? 'bg-accent text-accent-foreground shadow-glow-ai'
              : a.id === 'save' && saved
              ? 'bg-aura-rose/20 text-aura-rose'
              : 'bg-secondary text-foreground hover:bg-border'
          }`}
          whileTap={{ scale: 0.85 }}
          title={a.label}
        >
          {a.icon}
        </motion.button>
      ))}
      {showSaveToast && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 pill bg-foreground text-background text-[10px] px-2 py-0.5 whitespace-nowrap"
        >
          Saved ✨
        </motion.div>
      )}
    </div>
  );
};

export default LookActions;
