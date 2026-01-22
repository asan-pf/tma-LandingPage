import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, MapPin, Heart, Bookmark, Search, Star, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

const TELEGRAM_LINK = `https://t.me/${import.meta.env.VITE_APP_TMA_URL}`;

const PreviewSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to animation phases
  // Phase 1: Map screen (0-0.33)
  // Phase 2: Place detail (0.33-0.66)
  // Phase 3: Saved locations (0.66-1)
  
  const mapOpacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
  const mapY = useTransform(scrollYProgress, [0.25, 0.33], [0, -50]);
  
  const detailOpacity = useTransform(scrollYProgress, [0.28, 0.35, 0.58, 0.66], [0, 1, 1, 0]);
  const detailY = useTransform(scrollYProgress, [0.28, 0.35, 0.58, 0.66], [50, 0, 0, -50]);
  
  const savedOpacity = useTransform(scrollYProgress, [0.60, 0.68, 1], [0, 1, 1]);
  const savedY = useTransform(scrollYProgress, [0.60, 0.68], [50, 0]);

  // Animated elements within screens
  const markerScale1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [0.5, 1.2, 1]);
  const markerScale2 = useTransform(scrollYProgress, [0.05, 0.15, 0.25], [0.5, 1.2, 1]);
  const markerScale3 = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0.5, 1.2, 1]);
  
  const bottomSheetY = useTransform(scrollYProgress, [0.33, 0.45], [100, 0]);
  
  const listItem1Y = useTransform(scrollYProgress, [0.68, 0.75], [30, 0]);
  const listItem2Y = useTransform(scrollYProgress, [0.72, 0.79], [30, 0]);
  const listItem3Y = useTransform(scrollYProgress, [0.76, 0.83], [30, 0]);
  const listItemOpacity = useTransform(scrollYProgress, [0.68, 0.75], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-10"
          >
            <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase mb-3">
              Try It
            </p>
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl">
              LIVE <span className="text-gradient-accent">PREVIEW</span>
            </h2>
          </motion.div>

          {/* Preview Container */}
          <div className="max-w-xs sm:max-w-sm mx-auto">
            {/* Phone Frame */}
            <div className="glass-panel-strong rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-3">
              {/* Phone Notch */}
              <div className="relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-5 bg-background rounded-full z-20" />
                
                {/* Screen Content */}
                <div className="bg-background rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden aspect-[9/16] relative">
                  
                  {/* Map Screen */}
                  <motion.div 
                    className="absolute inset-0 flex flex-col bg-background"
                    style={{ opacity: mapOpacity, y: mapY }}
                  >
                    {/* Top Nav */}
                    <div className="flex items-center gap-2 p-3 pt-8">
                      <div className="bg-primary/20 text-primary text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Explore
                      </div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        Favorites
                      </div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Bookmark className="w-3 h-3" />
                        Saved
                      </div>
                    </div>
                    
                    {/* Search */}
                    <div className="px-3 pb-2">
                      <div className="bg-secondary/50 rounded-lg px-3 py-2 flex items-center gap-2">
                        <Search className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">Search places...</span>
                      </div>
                    </div>
                    
                    {/* Category Pills */}
                    <div className="flex gap-2 px-3 pb-2">
                      <div className="bg-primary text-primary-foreground text-[8px] px-2 py-1 rounded-full">📍 All</div>
                      <div className="bg-secondary/50 text-[8px] px-2 py-1 rounded-full">🛒 Grocery</div>
                      <div className="bg-secondary/50 text-[8px] px-2 py-1 rounded-full">🍔 Food</div>
                    </div>
                    
                    {/* Map Area */}
                    <div className="flex-1 bg-secondary/30 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-secondary/20" />
                      {/* Fake map lines */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-1/4 left-0 right-0 h-px bg-muted-foreground" />
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-muted-foreground" />
                        <div className="absolute top-3/4 left-0 right-0 h-px bg-muted-foreground" />
                        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-muted-foreground" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-muted-foreground" />
                        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-muted-foreground" />
                      </div>
                      {/* Animated markers */}
                      <motion.div 
                        className="absolute top-1/3 left-1/4 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                        style={{ scale: markerScale1 }}
                      >
                        <MapPin className="w-3 h-3 text-primary-foreground" />
                      </motion.div>
                      <motion.div 
                        className="absolute top-1/2 left-1/2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg"
                        style={{ scale: markerScale2 }}
                      >
                        <MapPin className="w-3 h-3 text-accent-foreground" />
                      </motion.div>
                      <motion.div 
                        className="absolute top-2/3 right-1/4 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                        style={{ scale: markerScale3 }}
                      >
                        <MapPin className="w-3 h-3 text-primary-foreground" />
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Place Detail Screen */}
                  <motion.div 
                    className="absolute inset-0 flex flex-col bg-background"
                    style={{ opacity: detailOpacity, y: detailY }}
                  >
                    {/* Map preview at top */}
                    <div className="h-1/3 bg-secondary/30 relative pt-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-secondary/20" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <MapPin className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                    
                    {/* Bottom Sheet */}
                    <motion.div 
                      className="flex-1 bg-background rounded-t-2xl -mt-4 relative z-10 p-4"
                      style={{ y: bottomSheetY }}
                    >
                      <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-3" />
                      
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-sm font-semibold">Café de Flore</div>
                          <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <span className="w-3 h-3 bg-primary/20 rounded" />
                            Restaurant Bar
                          </div>
                        </div>
                        <Heart className="w-4 h-4 text-primary" />
                      </div>
                      
                      {/* Stars */}
                      <div className="flex gap-0.5 mb-3">
                        {[1,2,3,4].map(i => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground ml-1">(2)</span>
                      </div>
                      
                      {/* Tabs */}
                      <div className="flex gap-4 border-b border-border mb-3">
                        <div className="text-[10px] text-primary border-b-2 border-primary pb-2">Overview</div>
                        <div className="text-[10px] text-muted-foreground pb-2">Reviews (2)</div>
                      </div>
                      
                      {/* Content skeleton */}
                      <div className="space-y-2">
                        <div className="h-3 bg-secondary/50 rounded w-3/4" />
                        <div className="text-[10px] text-primary mt-2">Location</div>
                        <div className="h-3 bg-secondary/50 rounded w-1/2" />
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  {/* Saved Locations Screen */}
                  <motion.div 
                    className="absolute inset-0 flex flex-col bg-background p-3 pt-8"
                    style={{ opacity: savedOpacity, y: savedY }}
                  >
                    {/* Top Nav */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Explore
                      </div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        Favorites
                      </div>
                      <div className="bg-primary/20 text-primary text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1">
                        <Bookmark className="w-3 h-3" />
                        Saved
                      </div>
                    </div>
                    
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                        <MapPin className="w-3 h-3 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Saved Locations</div>
                        <div className="text-[10px] text-muted-foreground">4 locations</div>
                      </div>
                    </div>
                    
                    {/* Add CTA */}
                    <div className="bg-secondary/30 rounded-lg p-3 mb-3">
                      <div className="text-[10px] font-medium mb-1">Share your favorite place</div>
                      <div className="bg-primary text-primary-foreground text-[10px] text-center py-2 rounded-lg">
                        Add location
                      </div>
                    </div>
                    
                    {/* Search */}
                    <div className="bg-secondary/50 rounded-lg px-3 py-2 flex items-center gap-2 mb-3">
                      <Search className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">Search...</span>
                    </div>
                    
                    {/* Location items */}
                    <div className="space-y-2 flex-1">
                      <motion.div 
                        className="bg-secondary/20 rounded-lg p-2.5 flex items-center gap-2"
                        style={{ y: listItem1Y, opacity: listItemOpacity }}
                      >
                        <div className="w-6 h-6 bg-primary/30 rounded-lg" />
                        <div className="flex-1">
                          <div className="h-2.5 bg-secondary/50 rounded w-2/3 mb-1" />
                          <div className="h-2 bg-secondary/30 rounded w-1/3" />
                        </div>
                        <Navigation className="w-3 h-3 text-primary" />
                      </motion.div>
                      <motion.div 
                        className="bg-secondary/20 rounded-lg p-2.5 flex items-center gap-2"
                        style={{ y: listItem2Y, opacity: listItemOpacity }}
                      >
                        <div className="w-6 h-6 bg-primary/30 rounded-lg" />
                        <div className="flex-1">
                          <div className="h-2.5 bg-secondary/50 rounded w-2/3 mb-1" />
                          <div className="h-2 bg-secondary/30 rounded w-1/3" />
                        </div>
                        <Navigation className="w-3 h-3 text-primary" />
                      </motion.div>
                      <motion.div 
                        className="bg-secondary/20 rounded-lg p-2.5 flex items-center gap-2"
                        style={{ y: listItem3Y, opacity: listItemOpacity }}
                      >
                        <div className="w-6 h-6 bg-primary/30 rounded-lg" />
                        <div className="flex-1">
                          <div className="h-2.5 bg-secondary/50 rounded w-2/3 mb-1" />
                          <div className="h-2 bg-secondary/30 rounded w-1/3" />
                        </div>
                        <Navigation className="w-3 h-3 text-primary" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Bottom label */}
                  <div className="absolute bottom-4 inset-x-3 z-10">
                    <div className="glass-panel rounded-lg px-3 py-1.5">
                      <p className="text-[10px] text-center text-muted-foreground">
                        Requires Telegram to run
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-6 text-center"
            >
              <Button size="lg" className="btn-accent-gradient gap-2 rounded-full" asChild>
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                  <Send className="w-4 h-4" />
                  Open in Telegram
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;
