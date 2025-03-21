
import { LocationType } from './types/locationTypes';
import { createLocationHierarchy } from './data/sampleLocationData';
import { processApiLocationData } from './utils/locationDataProcessor';

// Create the locations array using the sample data
const locations = createLocationHierarchy();

// This would be an actual API call in production
export const fetchLocations = async (startPoint?: string, endPoint?: string): Promise<LocationType[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (startPoint && endPoint) {
    return locations.filter(loc => {
      // Find locations that match the type range (from startPoint to endPoint)
      let current = loc;
      let matchesEndpoint = current.locCategoryName === endPoint;
      
      while (current.parent && !matchesEndpoint) {
        current = current.parent;
        matchesEndpoint = current.locCategoryName === endPoint;
      }
      
      return matchesEndpoint;
    });
  }
  
  return locations;
};

// Function to search locations - focus only on leaf nodes
export const searchLocations = (query: string): LocationType[] => {
  if (!query) return locations;
  
  const lowerQuery = query.toLowerCase();
  
  // First, filter to find all matching locations
  const allMatchingLocations = locations.filter(location => 
    location.displayName.toLowerCase().includes(lowerQuery) ||
    location.locCategoryName.toLowerCase().includes(lowerQuery) ||
    location.locCode.toLowerCase().includes(lowerQuery)
  );
  
  // Then filter to only include leaf nodes (locations without children)
  const leafNodes = allMatchingLocations.filter(loc => 
    (!loc.children || loc.children.length === 0) &&
    (!loc.location || loc.location.length === 0)
  );
  
  return leafNodes;
};

// Re-export the types and utilities for easier importing by consumers
export { LocationType } from './types/locationTypes';
export { processApiLocationData, loadLocationDataFromApi } from './utils/locationDataProcessor';
