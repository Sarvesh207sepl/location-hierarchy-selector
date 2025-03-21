
import React from 'react';
import { MapPin, Check } from 'lucide-react';
import { LocationType } from '@/services/types/locationTypes';
import './LocationSelector.css';

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
  // A leaf node has no children or location array
  const isLeafNode = (!location.children || location.children.length === 0) && 
                     (!location.location || location.location.length === 0);
  
  return (
    <div 
      className={`location-item fade-in ${isLeafNode ? 'leaf-node' : 'non-leaf-node'}`}
      onClick={() => isLeafNode && onSelect(location)}
    >
      <div className="location-item-content">
        <div>
          <div className="location-item-left">
            <MapPin size={16} className="location-pin-icon" />
            <span className="location-name">{location.displayName}</span>
            <span className="location-category">
              {location.locCategoryName}
            </span>
          </div>
          <div className="location-path">
            {getPathString(location)}
          </div>
        </div>
        
        {selectedLocation?.id === location.id && (
          <Check size={16} className="check-icon" />
        )}
      </div>
    </div>
  );
};

export default LocationItem;
