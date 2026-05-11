import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_FEED_LOOKS, MOCK_PRODUCTS } from '@/data/mock-data';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  products?: typeof MOCK_PRODUCTS;
}

const GUIDED_PROMPTS = [
  "I have my cousin's sangeet and I want to look stunning but still dance",
  "I want to feel powerful at work without trying too hard",
  "I'm going on a first date and I want to feel like myself but also a little unexpected",
  "I don't know what I want — just show me something that feels right for me",
];

const AI_RESPONSES: Record<string, string[]> = {
  default: [
    "Okay, I'm reading this as: you want something that makes you feel put-together but not overdone. Knowing your style — you'll want something with warmth and a little unexpected detail. Does this feel right?",
    "I've pulled together a vibe I'm calling \"Effortless Edge\" — here's what I think works for you:",
  ],
  sangeet: [
    "Okay, I'm reading this as: you want something festive enough to feel dressed up, but free enough to actually dance in. You want to be remembered but not outshine the bride. Does this feel right?",
    "I'm thinking \"Festive Freedom\" — a sharara or dhoti silhouette that gives you movement. Here are my picks:",
  ],
};

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-accent"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
        transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </div>
);

const Mirror = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDefault, setShowDefault] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setShowDefault(false);
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    const responses = text.toLowerCase().includes('sangeet') ? AI_RESPONSES.sangeet : AI_RESPONSES.default;
    
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg1: ChatMessage = { id: `a-${Date.now()}`, role: 'ai', text: responses[0] };
      setMessages(prev => [...prev, aiMsg1]);

      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const aiMsg2: ChatMessage = {
            id: `a2-${Date.now()}`,
            role: 'ai',
            text: responses[1],
            products: MOCK_PRODUCTS.slice(0, 4),
          };
          setMessages(prev => [...prev, aiMsg2]);
        }, 1200);
      }, 800);
    }, 900);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] pt-10">
      {/* Header */}
      <div className="px-4 pb-3">
        <h1 className="font-display text-xl text-foreground italic">mirror</h1>
        <p className="text-sm text-muted-foreground font-body mt-1">your personal stylist</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Default state */}
        {showDefault && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Stylist greeting */}
            <div className="bg-aura-ai-surface rounded-sheet p-4 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-accent text-sm mt-0.5">✦</span>
                <div>
                  <p className="text-sm font-body text-foreground">
                    You have <span className="font-semibold">Divya's wedding</span> in 11 days. I've been thinking about what would work for you — want to see?
                  </p>
                </div>
              </div>
            </div>

            {/* Daily tip */}
            <div className="bg-card rounded-card shadow-card p-4 mb-4">
              <p className="text-xs text-accent font-mono uppercase tracking-wider mb-1">today's mirror</p>
              <p className="text-sm font-body text-foreground">
                Your navy silk kurta set works with copper jewellery — you haven't tried this combo yet. Give it today.
              </p>
            </div>

            {/* Quick entry */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['style an occasion', 'explore a vibe', 'outfit from my wardrobe', 'find something to buy'].map((pill) => (
                <button
                  key={pill}
                  onClick={() => sendMessage(pill)}
                  className="pill bg-secondary text-foreground text-sm"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Vibe explorer prompt */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground font-body mb-3 italic">
                tell me what you're looking for. a feeling, an occasion, a vibe — anything.
              </p>
              <div className="space-y-2">
                {GUIDED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="w-full text-left px-4 py-3 rounded-card bg-card shadow-card text-sm font-body text-foreground hover:bg-secondary transition-colors"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Chat messages */}
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-sheet text-sm font-body ${
                  msg.role === 'user'
                    ? 'bg-secondary text-foreground rounded-br-sm'
                    : 'bg-aura-ai-surface text-foreground rounded-bl-sm'
                }`}
              >
                {msg.role === 'ai' && <span className="text-accent text-xs mr-1">✦</span>}
                {msg.text}
                {msg.products && (
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-3 -mx-2 px-2 pb-1">
                    {msg.products.map((p) => (
                      <div key={p.id} className="min-w-[120px] bg-card rounded-card overflow-hidden shadow-card">
                        <img src={p.image} alt={p.name} className="w-full h-32 object-cover" />
                        <div className="p-2">
                          <p className="text-xs font-medium truncate">{p.brand}</p>
                          <p className="text-xs text-muted-foreground truncate">{p.name}</p>
                          <p className="text-xs font-mono mt-1">₹{p.price.toLocaleString()}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-6 h-6 rounded-full border-2 border-aura-sage flex items-center justify-center">
                              <span className="text-[9px] font-mono text-aura-sage">{p.matchScore}</span>
                            </div>
                            <span className="text-[10px] text-muted-foreground">match</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && <TypingIndicator />}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-card/90 backdrop-blur-lg">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="tell me what you're feeling..."
            className="flex-1 px-4 py-2.5 rounded-pill bg-secondary text-sm font-body text-foreground border-0 outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground"
          />
          <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
            🎤
          </button>
          <button
            onClick={() => sendMessage(input)}
            className="pill bg-accent text-accent-foreground text-sm px-4"
          >
            ✦
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mirror;
