
import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import { fetchLocations, LocationType, searchLocations } from '@/services/locationService';
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
}) => {
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
        setFilteredLocations(data);
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
  
  // Only allow selecting leaf nodes
  const handleSelectLocation = (location: LocationType) => {
    // Check if this is a leaf node
    if (!location.children || location.children.length === 0) {
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
    const searchResults = searchTerm 
      ? searchLocations(searchTerm) 
      : locations;
      
    // Only return leaf nodes (locations without children)
    return searchResults.filter(loc => !loc.children || loc.children.length === 0);
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
