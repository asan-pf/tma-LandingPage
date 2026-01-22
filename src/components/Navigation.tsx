import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Menu, X, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Preview', href: '#preview' },
  { label: 'Contribute', href: '#opensource' },
];

const TELEGRAM_LINK = `https://t.me/${import.meta.env.VITE_APP_TMA_URL}?startapp=foo`;
const GITHUB_LINK = 'https://github.com/asan-pf/tma-ofm-react-template';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Pill Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className={`glass-panel-strong rounded-full px-4 py-2.5 transition-all duration-300 ${
          isScrolled ? 'shadow-2xl' : ''
        }`}>
          <div className="flex items-center justify-center gap-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group shrink-0">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-display font-bold text-sm tracking-tight hidden sm:block">OpenFreeMap</span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full h-8 px-3 btn-ghost-glass"
                asChild
              >
                <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button
                size="sm"
                className="rounded-full h-8 btn-primary-gradient text-xs"
                asChild
              >
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                  Open in Telegram
                </a>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full btn-ghost-glass"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden"
          >
            <div className="glass-panel-strong rounded-2xl p-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-3 flex gap-2 border-t border-border/50">
                <Button className="flex-1 rounded-full btn-primary-gradient text-xs" size="sm" asChild>
                  <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                    Telegram
                  </a>
                </Button>
                <Button variant="ghost" className="rounded-full btn-ghost-glass" size="sm" asChild>
                  <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
