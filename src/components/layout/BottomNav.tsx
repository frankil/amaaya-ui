import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: '✦', label: 'Inspire' },
  { path: '/explore', icon: '◇', label: 'Iconic' },
  { path: '/mirror', icon: '◎', label: 'Stylist', center: true },
  { path: '/circle', icon: '◉', label: 'Closet' },
  { path: '/soul', icon: '❋', label: 'Profile' },
];

const BottomNav = () => {
  const location = useLocation();
  if (location.pathname === '/onboarding') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-[64px] max-w-[430px] mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          if (item.center) {
            return (
              <NavLink key={item.path} to={item.path} className="relative flex flex-col items-center justify-center -mt-6">
                <motion.div
                  className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow-ai"
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 2.8 }}
                >
                  <span className="text-xl">{item.icon}</span>
                </motion.div>
                <span className={`text-[10px] font-body mt-1 ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </NavLink>
            );
          }
          return (
            <NavLink key={item.path} to={item.path} className="relative flex flex-col items-center justify-center gap-0.5 w-14 h-14">
              <motion.span
                className={`text-lg transition-colors duration-200 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                whileTap={{ scale: 0.85 }}
              >
                {item.icon}
              </motion.span>
              <span className={`text-[10px] font-body transition-colors duration-200 ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-0.5 w-5 h-0.5 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
