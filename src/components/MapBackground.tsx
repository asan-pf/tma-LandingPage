import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapBackgroundProps {
  scrollProgress: number;
  isInteractive: boolean;
}

const MapBackground = ({ scrollProgress, isInteractive }: MapBackgroundProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initial center (San Francisco area)
  const initialCenter: [number, number] = [37.7749, -122.4194];
  const initialZoom = 12;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;
    
    setTimeout(() => setIsLoaded(true), 500);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Scroll-linked panning effect
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    
    // Calculate new center based on scroll progress
    // Pan from SF to slightly south-east as user scrolls
    const latOffset = scrollProgress * 0.15;
    const lngOffset = scrollProgress * 0.2;
    const zoomOffset = scrollProgress * 0.8;

    const newLat = initialCenter[0] - latOffset;
    const newLng = initialCenter[1] + lngOffset;
    const newZoom = initialZoom + zoomOffset;

    map.setView([newLat, newLng], newZoom, { animate: false });
  }, [scrollProgress]);

  // Toggle interactivity
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (isInteractive) {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.touchZoom.enable();
    } else {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.touchZoom.disable();
    }
  }, [isInteractive]);

  return (
    <div 
      className={`fixed inset-0 z-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <div ref={mapRef} className="w-full h-full" />
      {/* Dark gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, hsl(220 20% 6% / 0.7) 0%, hsl(220 20% 6% / 0.6) 50%, hsl(220 20% 6% / 0.85) 100%)'
        }}
      />
    </div>
  );
};

export default MapBackground;
