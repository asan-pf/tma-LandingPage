import { motion } from 'framer-motion';
import { ArrowDown, Github, Send, MapPin, Star, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

const TELEGRAM_LINK = `https://t.me/${import.meta.env.VITE_APP_TMA_URL}?startapp=foo`;
const GITHUB_LINK = 'https://github.com/asan-pf/tma-ofm-react-template';

const chips = ['Vite + React', 'Leaflet', 'Telegram Mini App', 'Supabase'];

const heroFeatures: { icon: LucideIcon; label: string }[] = [
  { icon: MapPin, label: 'Discover' },
  { icon: Star, label: 'Favorites' },
  { icon: Share2, label: 'Share' },
];

const HeroSection = () => {
  const scrollToPreview = () => {
    document.querySelector('#preview')?.scrollIntoView({ behavior: 'smooth' });
  };
  const title = import.meta.env.VITE_APP_TITLE || "FREE"; 
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-28 px-4">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-panel-strong rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 text-center"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[10px] sm:text-xs font-medium tracking-[0.15em] text-primary uppercase mb-4"
          >
            Open Source • Telegram Mini App
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4"
          >
            <span className="text-gradient-primary">{title}</span>
            <span className="text-foreground">FREE</span>
            <span className="text-gradient-accent">MAP</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-8"
          >
            Leaflet maps in Telegram. Discover, save & share POIs with synced profiles.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
          >
            <Button size="lg" className="w-full sm:w-auto btn-primary-gradient gap-2 rounded-full" asChild>
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                <Send className="w-4 h-4" />
                Explore in Telegram
              </a>
            </Button>
            <Button size="lg" variant="ghost" className="w-full sm:w-auto btn-ghost-glass gap-2 rounded-full" asChild>
              <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </Button>
          </motion.div>

          {/* Jump to Preview */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={scrollToPreview}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 mx-auto mb-6"
          >
            See Preview
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </motion.button>

          {/* Tech Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {chips.map((chip, index) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.08 }}
                className="chip text-[10px] sm:text-xs"
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Feature Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute bottom-6 left-4 right-4"
      >
        <div className="max-w-md mx-auto">
          <div className="glass-panel rounded-full py-3 px-4">
            <div className="flex items-center justify-around">
              {heroFeatures.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-center gap-1.5 text-xs sm:text-sm"
                >
                  <feature.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="text-muted-foreground font-medium">{feature.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
