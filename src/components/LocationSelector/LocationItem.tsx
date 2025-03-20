
import React from 'react';
import { MapPin, Check } from 'lucide-react';
import { LocationType } from '@/services/locationService';
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
  return (
    <div 
      className="location-item fade-in"
      onClick={() => onSelect(location)}
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
