
import { LocationType } from '../types/locationTypes';

// Process data in the format provided by the API
export const processApiLocationData = (data: LocationType[]): LocationType[] => {
  const flattenedLocations: LocationType[] = [];
  
  const processLocation = (location: LocationType, parent: LocationType | null = null) => {
    const locationWithParent = { ...location, parent };
    
    // Add to flattened array
    flattenedLocations.push(locationWithParent);
    
    // Process children if any (using location property from API)
    if (location.location && location.location.length > 0) {
      locationWithParent.children = location.location.map(child => {
        return processLocation(child, locationWithParent);
      });
    }
    
    return locationWithParent;
  };
  
  // Process each root location
  data.forEach(location => {
    processLocation(location);
  });
  
  return flattenedLocations;
};

// Export function to load location data from API response
export const loadLocationDataFromApi = (apiData: LocationType[]): LocationType[] => {
  return processApiLocationData(apiData);
};
