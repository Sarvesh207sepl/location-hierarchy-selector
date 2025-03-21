import { LocationType } from '@/services/types/locationTypes';

// Build the hierarchy path for a location
export const buildHierarchyPath = (location: LocationType): LocationType[] => {
  const path: LocationType[] = [];
  let current: LocationType | null = location;
  
  while (current) {
    path.unshift(current);
    current = current.parent || null;
  }
  
  return path;
};

// Generate a path string for display - displaying from parent to child
export const getPathString = (location: LocationType): string => {
  const path = buildHierarchyPath(location);
  return path.map(item => item.displayName).join(' → ');
};
