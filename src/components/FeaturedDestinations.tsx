import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { MapPin, Coffee, Camera, ShoppingBag, Utensils, Music, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

// API base URL
const API_BASE_URL = 'https://tma-ofm-react-template.vercel.app';

// Default placeholder image
const DEFAULT_THUMBNAIL = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&h=150&fit=crop';

const categoryIcons: Record<string, { icon: typeof MapPin; color: string }> = {
  landmark: { icon: Camera, color: '#f59e0b' },
  cafe: { icon: Coffee, color: '#8b5cf6' },
  shopping: { icon: ShoppingBag, color: '#ec4899' },
  restaurant: { icon: Utensils, color: '#10b981' },
  'restaurant-bar': { icon: Utensils, color: '#10b981' },
  grocery: { icon: ShoppingBag, color: '#ec4899' },
  entertainment: { icon: Music, color: '#3b82f6' },
  other: { icon: MapPin, color: '#6b7280' },
};

// Custom marker icon creator
const createCustomIcon = (category: string, isActive: boolean) => {
  const { color } = categoryIcons[category] || categoryIcons.other;
  const size = isActive ? 40 : 32;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px ${color}66;
        transition: all 0.2s ease;
        ${isActive ? 'animation: bounce 0.5s ease;' : ''}
      ">
        <div style="transform: rotate(45deg); color: white; font-size: ${isActive ? 18 : 14}px;">●</div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  description: string;
  thumbnailUrl: string;
}

// Map controller component for programmatic control
const MapController = ({ activeLocation, locations }: { activeLocation: string | null; locations: Location[] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (activeLocation) {
      const location = locations.find(l => l.id === activeLocation);
      if (location) {
        map.panTo([location.latitude, location.longitude], { animate: true, duration: 0.5 });
      }
    }
  }, [activeLocation, locations, map]);
  
  return null;
};

// API response interface
interface ApiLocation {
  id: number;
  user_id: number | null;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  category: string;
  image_url: string | null;
  website_url: string | null;
  schedules: string | null;
  is_approved: boolean;
  created_at: string;
}

const FeaturedDestinations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Fetch locations from real API with caching
  const fetchLocations = async () => {
    setIsLoading(true);
    setError(null);
    
    // Check cache
    const cached = sessionStorage.getItem('featured_locations');
    const cacheTime = sessionStorage.getItem('featured_locations_time');
    
    if (cached && cacheTime && Date.now() - parseInt(cacheTime) < 5 * 60 * 1000) {
      setLocations(JSON.parse(cached));
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/locations`);
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      
      const apiLocations: ApiLocation[] = await response.json();
      
      // Transform API response to our Location interface
      const transformedLocations: Location[] = apiLocations.map((loc) => ({
        id: String(loc.id),
        name: loc.name,
        latitude: loc.latitude,
        longitude: loc.longitude,
        category: loc.category,
        description: loc.description,
        thumbnailUrl: loc.image_url || DEFAULT_THUMBNAIL,
      }));
      
      setLocations(transformedLocations);
      sessionStorage.setItem('featured_locations', JSON.stringify(transformedLocations));
      sessionStorage.setItem('featured_locations_time', Date.now().toString());
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError('Failed to load destinations');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleLocationHover = (id: string | null) => {
    setActiveLocation(id);
  };

  const scrollToListItem = (id: string) => {
    const element = document.getElementById(`location-${id}`);
    if (element && listRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const CategoryIcon = ({ category }: { category: string }) => {
    const IconComponent = categoryIcons[category]?.icon || MapPin;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Destinations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore curated locations saved by our community. From iconic landmarks to hidden gems.
          </p>
        </motion.div>

        {/* Map + List Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-[1fr,400px] gap-6"
        >
          {/* Map Container */}
          <div className="relative rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm border border-white/10 h-[500px] lg:h-[600px]">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-4 w-full h-full p-4">
                  <Skeleton className="w-full h-full rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                      <span className="text-muted-foreground text-sm">Loading map...</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex items-center justify-center bg-card/80">
                <div className="text-center space-y-4">
                  <p className="text-destructive">{error}</p>
                  <Button onClick={fetchLocations} variant="outline" className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Retry
                  </Button>
                </div>
              </div>
            ) : (
              <MapContainer
                center={[48.8566, 2.3522]}
                zoom={13}
                scrollWheelZoom={true}
                zoomControl={false}
                className="w-full h-full z-0"
                style={{ background: 'hsl(var(--background))' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />
                <MapController activeLocation={activeLocation} locations={locations} />
                
                {locations.map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.latitude, location.longitude]}
                    icon={createCustomIcon(location.category, activeLocation === location.id)}
                    eventHandlers={{
                      click: () => {
                        setActiveLocation(location.id);
                        scrollToListItem(location.id);
                      },
                      popupopen: () => {
                        // Analytics tracking would go here
                        console.log('Popup opened:', location.name);
                      },
                    }}
                  >
                    <Popup>
                      <div className="p-1 min-w-[200px]">
                        <img 
                          src={location.thumbnailUrl} 
                          alt={location.name}
                          className="w-full h-24 object-cover rounded-lg mb-2"
                        />
                        <h3 className="font-semibold text-foreground">{location.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{location.description}</p>
                        <a 
                          href={`/locations/${location.id}`}
                          className="text-primary text-sm font-medium hover:underline"
                        >
                          View details →
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>

          {/* Scrollable List */}
          <div 
            ref={listRef}
            className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4 max-h-[60vh] lg:max-h-[600px] overflow-y-auto custom-scrollbar"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4 sticky top-0 bg-card/80 backdrop-blur-sm py-2 -mt-2 -mx-2 px-2">
              {locations.length} Locations
            </h3>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl">
                    <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8 text-muted-foreground">
                Unable to load locations
              </div>
            ) : (
              <div className="space-y-3">
                {locations.map((location) => (
                  <motion.div
                    key={location.id}
                    id={`location-${location.id}`}
                    className={`
                      flex gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
                      ${activeLocation === location.id 
                        ? 'bg-primary/20 border border-primary/40' 
                        : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }
                    `}
                    onMouseEnter={() => handleLocationHover(location.id)}
                    onMouseLeave={() => handleLocationHover(null)}
                    onFocus={() => handleLocationHover(location.id)}
                    onBlur={() => handleLocationHover(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View ${location.name} on map`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img 
                      src={location.thumbnailUrl} 
                      alt={location.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span 
                          className="p-1 rounded-full"
                          style={{ backgroundColor: categoryIcons[location.category]?.color + '33' }}
                        >
                          <CategoryIcon category={location.category} />
                        </span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {location.category.replace('-', ' ')}
                        </span>
                      </div>
                      <h4 className="font-medium text-foreground truncate">{location.name}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {location.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.5);
        }
        
        @keyframes bounce {
          0%, 100% { transform: rotate(-45deg) translateY(0); }
          50% { transform: rotate(-45deg) translateY(-8px); }
        }
        
        .leaflet-popup-content-wrapper {
          background: hsl(var(--card));
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .leaflet-popup-tip {
          background: hsl(var(--card));
        }
        .leaflet-popup-content {
          margin: 8px;
        }
      `}</style>
    </section>
  );
};

export default FeaturedDestinations;