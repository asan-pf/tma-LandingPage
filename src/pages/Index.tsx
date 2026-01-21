import { useState, useEffect } from 'react';
import MapBackground from '@/components/MapBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PreviewSection from '@/components/PreviewSection';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import OpenSourceSection from '@/components/OpenSourceSection';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import MapInteractToggle from '@/components/MapInteractToggle';

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMapInteractive, setIsMapInteractive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background Map Layer */}
      <MapBackground 
        scrollProgress={scrollProgress} 
        isInteractive={isMapInteractive} 
      />

      {/* Content Layer */}
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <FeaturesSection />
        <PreviewSection />
        <FeaturedDestinations />
        <OpenSourceSection />
        <Footer />
      </div>

      {/* Floating Elements */}
      <FloatingCTA />
      <MapInteractToggle 
        isInteractive={isMapInteractive}
        onToggle={() => setIsMapInteractive(!isMapInteractive)}
      />
    </div>
  );
};

export default Index;
