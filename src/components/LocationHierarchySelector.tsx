
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, X, Search, MapPin, Check } from 'lucide-react';
import { fetchLocations, LocationType, searchLocations } from '../services/locationService';
import { cn } from '@/lib/utils';

interface LocationHierarchySelectorProps {
  startPoint?: string;
  endPoint?: string;
  onSelect?: (location: LocationType) => void;
  className?: string;
}

const LocationHierarchySelector: React.FC<LocationHierarchySelectorProps> = ({
  startPoint = 'District',
  endPoint = 'Locality',
  onSelect,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<LocationType[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const loadLocations = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLocations(startPoint, endPoint);
        setLocations(data);
        setFilteredLocations(searchTerm ? searchLocations(searchTerm) : data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadLocations();
  }, [startPoint, endPoint]);
  
  useEffect(() => {
    if (searchTerm) {
      setFilteredLocations(searchLocations(searchTerm));
    } else {
      setFilteredLocations(locations);
    }
  }, [searchTerm, locations]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Build the hierarchy path for a location
  const buildHierarchyPath = (location: LocationType): LocationType[] => {
    const path: LocationType[] = [];
    let current: LocationType | null = location;
    
    while (current) {
      path.unshift(current);
      current = current.parent;
    }
    
    return path;
  };
  
  // Generate a path string for display
  const getPathString = (location: LocationType): string => {
    const path = buildHierarchyPath(location);
    return path.map(item => item.name).join(' → ');
  };
  
  const handleSelectLocation = (location: LocationType) => {
    setSelectedLocation(location);
    // Update the search term to show the full hierarchical path
    setSearchTerm(getPathString(location));
    setIsOpen(false);
    if (onSelect) onSelect(location);
  };
  
  const clearSelection = () => {
    setSelectedLocation(null);
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <div className="relative flex items-center overflow-hidden bg-white dark:bg-black border border-input rounded-xl focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0 transition-all duration-200">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              onClick={() => setIsOpen(true)}
              placeholder="Search locations..."
              className="w-full px-10 py-3 bg-transparent border-none outline-none text-sm"
            />
            {searchTerm && (
              <button
                onClick={clearSelection}
                className="absolute right-10 p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Clear selection"
              >
                <X size={16} className="text-muted-foreground" />
              </button>
            )}
            <button
              type="button"
              className="absolute right-3 p-1 rounded-full hover:bg-muted transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close dropdown" : "Open dropdown"}
            >
              <ChevronDown 
                size={16} 
                className={cn(
                  "text-muted-foreground transition-transform duration-200",
                  isOpen && "transform rotate-180"
                )}
              />
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-1 bg-white dark:bg-black border border-input rounded-xl shadow-lg overflow-hidden"
            >
              <div className="max-h-80 overflow-auto p-1">
                {isLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                    <span className="ml-2 text-sm text-muted-foreground">Loading locations...</span>
                  </div>
                ) : filteredLocations.length > 0 ? (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.02
                        }
                      }
                    }}
                  >
                    {filteredLocations.map(location => (
                      <motion.div
                        key={location.id}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        className={cn(
                          "location-item group",
                          selectedLocation?.id === location.id && "bg-primary/5"
                        )}
                        onClick={() => handleSelectLocation(location)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-2 text-primary" />
                              <span className="font-medium">{location.name}</span>
                              <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground">
                                {location.type}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {getPathString(location)}
                            </div>
                          </div>
                          
                          {selectedLocation?.id === location.id && (
                            <Check size={16} className="text-primary" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <MapPin size={24} className="text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No locations found</p>
                    <p className="text-xs text-muted-foreground mt-1">Try adjusting your search</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 border rounded-xl bg-secondary/40 backdrop-blur-sm"
          >
            <div className="mb-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                Selected Hierarchy
              </div>
              <div className="space-y-2">
                {buildHierarchyPath(selectedLocation).map((item, index, arr) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "flex items-center",
                      index === arr.length - 1 && "text-primary font-medium"
                    )}
                    style={{ paddingLeft: `${index * 12}px` }}
                  >
                    {index > 0 && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                        <path d="M3 9L7 5L3 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <span className="text-muted-foreground mr-1.5">{item.type}:</span>
                    <span className="font-medium">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="pt-3 border-t border-border">
              <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-2">
                Location IDs
              </div>
              <div className="flex flex-wrap gap-2">
                {buildHierarchyPath(selectedLocation).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="location-chip"
                  >
                    {item.type}: {item.id}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationHierarchySelector;
