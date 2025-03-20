
import React from 'react';
import { MapPin } from 'lucide-react';
import { LocationType } from '@/services/locationService';
import LocationItem from './LocationItem';
import './LocationSelector.css';

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
  if (!isOpen) return null;

  return (
    <div className="location-dropdown fade-in">
      <div className="dropdown-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span className="loading-text">Loading locations...</span>
          </div>
        ) : filteredLocations.length > 0 ? (
          <div>
            {filteredLocations.map(location => (
              <LocationItem
                key={location.id}
                location={location}
                selectedLocation={selectedLocation}
                onSelect={handleSelectLocation}
                getPathString={getPathString}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <MapPin size={24} className="empty-icon" />
            <p className="empty-text">No locations found</p>
            <p className="empty-text-sub">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationDropdown;
