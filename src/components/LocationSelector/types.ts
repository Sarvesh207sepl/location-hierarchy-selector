import { LocationType } from '@/services/types/locationTypes';

export interface LocationHierarchySelectorProps {
  startPoint?: string;
  endPoint?: string;
  onSelect?: (location: LocationType) => void;
  className?: string;
  initialLocation?: LocationType | null;
}
