
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LocationType } from '@/services/locationService';

interface LocationItemProps {
  location: LocationType;
  selectedLocation: LocationType | null;
  onSelect: (location: LocationType) => void;
  getPathString: (location: LocationType) => string;
}

const LocationItem: React.FC<LocationItemProps> = ({
  location,
  selectedLocation,
  onSelect,
  getPathString
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
      className={cn(
        "location-item group",
        selectedLocation?.id === location.id && "bg-primary/5"
      )}
      onClick={() => onSelect(location)}
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
  );
};

export default LocationItem;
