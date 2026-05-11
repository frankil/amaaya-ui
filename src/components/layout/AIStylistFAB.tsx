import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const AIStylistFAB = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/onboarding' || location.pathname === '/mirror') return null;

  return (
    <motion.button
      onClick={() => navigate('/mirror')}
      className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-glow-ai"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      whileTap={{ scale: 0.9 }}
      aria-label="Open AI Stylist"
    >
      <span className="text-lg">✦</span>
    </motion.button>
  );
};

export default AIStylistFAB;
