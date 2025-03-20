
import { LocationType } from '@/services/locationService';

// Build the hierarchy path for a location
export const buildHierarchyPath = (location: LocationType): LocationType[] => {
  const path: LocationType[] = [];
  let current: LocationType | null = location;
  
  while (current) {
    path.unshift(current);
    current = current.parent;
  }
  
  return path;
};

// Generate a path string for display - now displaying from parent to child
export const getPathString = (location: LocationType): string => {
  const path = buildHierarchyPath(location);
  return path.map(item => item.name).join(' → ');
};
