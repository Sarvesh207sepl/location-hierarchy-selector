
import { LocationType } from '@/services/locationService';

export interface LocationHierarchySelectorProps {
  startPoint?: string;
  endPoint?: string;
  onSelect?: (location: LocationType) => void;
  className?: string;
}
