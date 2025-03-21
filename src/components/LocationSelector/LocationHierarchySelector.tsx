
import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import { fetchLocations, searchLocations } from '@/services/locationService';
import { LocationType } from '@/services/types/locationTypes';
import { LocationHierarchySelectorProps } from './types';
import SearchInput from './SearchInput';
import LocationDropdown from './LocationDropdown';
import SelectedLocationDetails from './SelectedLocationDetails';
import { buildHierarchyPath, getPathString } from './locationUtils';
import './LocationSelector.css';

interface LocationSearchFormValues {
  searchTerm: string;
}

const LocationHierarchySelector: React.FC<LocationHierarchySelectorProps> = ({
  startPoint = 'District',
  endPoint = 'Village',
  onSelect,
  className,
  initialLocation = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<LocationType[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(initialLocation);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Effect to update selectedLocation when initialLocation changes
  useEffect(() => {
    setSelectedLocation(initialLocation);
  }, [initialLocation]);
  
  useEffect(() => {
    const loadLocations = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLocations(startPoint, endPoint);
        
        // Filter to only include leaf nodes 
        const leafNodes = data.filter(loc => 
          (!loc.children || loc.children.length === 0) &&
          (!loc.location || loc.location.length === 0)
        );
        
        setLocations(leafNodes);
        setFilteredLocations(leafNodes);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadLocations();
  }, [startPoint, endPoint]);
  
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
  
  const handleSelectLocation = (location: LocationType) => {
    // Only allow selecting leaf nodes (this check is redundant now since we're filtering for leaf nodes)
    if ((!location.children || location.children.length === 0) && 
        (!location.location || location.location.length === 0)) {
      setSelectedLocation(location);
      setIsOpen(false);
      if (onSelect) onSelect(location);
    }
  };
  
  const clearSelection = (resetForm: () => void) => {
    setSelectedLocation(null);
    resetForm();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // Filter locations to only show leaf nodes for search results
  const filterLeafNodes = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    if (!searchTerm) return locations;
    
    return searchLocations(searchTerm);
  };
  
  return (
    <div className={`location-selector-container ${className || ''}`}>
      <Formik
        initialValues={{ searchTerm: selectedLocation ? getPathString(selectedLocation) : '' }}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form>
            <div className="relative" ref={dropdownRef}>
              <div className="relative">
                <SearchInput
                  formik={formik}
                  clearSelection={() => clearSelection(formik.resetForm)}
                  toggleDropdown={toggleDropdown}
                  isOpen={isOpen}
                  inputRef={inputRef}
                />
              </div>
              
              <LocationDropdown
                isOpen={isOpen}
                isLoading={isLoading}
                filteredLocations={filterLeafNodes(formik.values.searchTerm)}
                selectedLocation={selectedLocation}
                handleSelectLocation={(location) => {
                  handleSelectLocation(location);
                  formik.setFieldValue('searchTerm', getPathString(location));
                }}
                getPathString={getPathString}
                searchTerm={formik.values.searchTerm}
              />
            </div>
            
            <SelectedLocationDetails
              selectedLocation={selectedLocation}
              buildHierarchyPath={buildHierarchyPath}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LocationHierarchySelector;
