
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { LocationType } from '@/services/locationService';
import LocationItem from './LocationItem';

interface LocationDropdownProps {
  isOpen: boolean;
  isLoading: boolean;
  filteredLocations: LocationType[];
  selectedLocation: LocationType | null;
  handleSelectLocation: (location: LocationType) => void;
  getPathString: (location: LocationType) => string;
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  isOpen,
  isLoading,
  filteredLocations,
  selectedLocation,
  handleSelectLocation,
  getPathString
}) => {
  return (
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
                  <LocationItem
                    key={location.id}
                    location={location}
                    selectedLocation={selectedLocation}
                    onSelect={handleSelectLocation}
                    getPathString={getPathString}
                  />
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
  );
};

export default LocationDropdown;
