
// Types for location data structure
export interface LocationType {
  id: string | number;
  displayName: string;
  locCode: string;
  parentID?: string | number | null;
  locIdnCode?: string;
  locCatId?: number;
  orgId?: number;
  locCategoryName: string;
  prodClassName?: string;
  hierarchyId?: any;
  parent?: LocationType | null;
  location?: LocationType[];
  children?: LocationType[];
}
