import { motion } from 'framer-motion';
import { 
  MapPin, 
  Heart, 
  Star, 
  Share2, 
  User, 
  Smartphone
} from 'lucide-react';

const features = [
  { icon: MapPin, title: 'Nearby POIs', description: 'Discover places around you.' },
  { icon: Heart, title: 'Favorites Sync', description: 'Save across devices.' },
  { icon: Star, title: 'Ratings', description: 'Community-driven reviews.' },
  { icon: Share2, title: 'Share Links', description: 'Send places in Telegram.' },
  { icon: User, title: 'Profile & Auth', description: 'Seamless Telegram login.' },
  { icon: Smartphone, title: 'Native UI', description: 'Telegram design patterns.' },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-16 sm:py-20 md:py-24">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase mb-3">
            Capabilities
          </p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl">
            FEATURE <span className="text-gradient-primary">GRID</span>
          </h2>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="feature-card group p-4 sm:p-5"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-sm sm:text-base mb-1 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
