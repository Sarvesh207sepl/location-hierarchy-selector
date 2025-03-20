
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { fetchLocations, LocationType, searchLocations } from '@/services/locationService';
import { LocationHierarchySelectorProps } from './types';
import SearchInput from './SearchInput';
import LocationDropdown from './LocationDropdown';
import SelectedLocationDetails from './SelectedLocationDetails';
import { buildHierarchyPath, getPathString } from './locationUtils';

const LocationHierarchySelector: React.FC<LocationHierarchySelectorProps> = ({
  startPoint = 'District',
  endPoint = 'Village',
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
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <SearchInput
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            clearSelection={clearSelection}
            toggleDropdown={toggleDropdown}
            isOpen={isOpen}
            inputRef={inputRef}
          />
        </div>
        
        <LocationDropdown
          isOpen={isOpen}
          isLoading={isLoading}
          filteredLocations={filteredLocations}
          selectedLocation={selectedLocation}
          handleSelectLocation={handleSelectLocation}
          getPathString={getPathString}
        />
      </div>
      
      <SelectedLocationDetails
        selectedLocation={selectedLocation}
        buildHierarchyPath={buildHierarchyPath}
      />
    </div>
  );
};

export default LocationHierarchySelector;
