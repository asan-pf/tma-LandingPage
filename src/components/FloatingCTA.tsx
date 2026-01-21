import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TELEGRAM_LINK = 'https://t.me/YOUR_BOT_USERNAME/YOUR_APP?startapp=1';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 1 viewport height)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        >
          <Button
            size="lg"
            className="btn-accent-gradient gap-2 shadow-lg animate-pulse-glow rounded-full"
            asChild
          >
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Explore in Telegram</span>
              <span className="sm:hidden">Open</span>
            </a>
          </Button>
          <button
            onClick={() => setIsDismissed(true)}
            className="w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
