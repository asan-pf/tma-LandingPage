import { motion, AnimatePresence } from 'framer-motion';
import { Move, Lock } from 'lucide-react';

interface MapInteractToggleProps {
  isInteractive: boolean;
  onToggle: () => void;
}

const MapInteractToggle = ({ isInteractive, onToggle }: MapInteractToggleProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5 }}
      onClick={onToggle}
      className="fixed bottom-6 left-6 z-50 glass-panel rounded-full px-4 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors"
    >
      <AnimatePresence mode="wait">
        {isInteractive ? (
          <motion.div
            key="interactive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Move className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">Map Interactive</span>
          </motion.div>
        ) : (
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Lock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Interact with map</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default MapInteractToggle;
