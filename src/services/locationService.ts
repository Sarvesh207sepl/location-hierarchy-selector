
// Types based on the provided JSON structure
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

// This function processes data in the format provided by the API
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

// Create a nested structure of locations based on the sample data
const createLocationHierarchy = (): LocationType[] => {
  // Sample data for development purposes
  const indiaData: LocationType[] = [
    {
      displayName: "INDIA",
      locCode: "IN",
      id: 15783,
      parentID: 15782,
      locIdnCode: "1",
      locCatId: 219,
      orgId: 130,
      locCategoryName: "Country",
      prodClassName: "",
      hierarchyId: {},
      location: [
        {
          displayName: "ANDHRA PRADESH",
          locCode: "AP",
          id: 15784,
          parentID: 15783,
          locIdnCode: "1",
          locCatId: 220,
          orgId: 130,
          locCategoryName: "State",
          prodClassName: "",
          hierarchyId: {},
          location: [
            {
              displayName: "Capital Region",
              locCode: "CR",
              id: 15785,
              parentID: 15784,
              locIdnCode: "1",
              locCatId: 221,
              orgId: 130,
              locCategoryName: "Region",
              prodClassName: "",
              hierarchyId: {},
              location: [
                {
                  displayName: "Krishna",
                  locCode: "Krishna",
                  id: 15786,
                  parentID: 15785,
                  locIdnCode: "1",
                  locCatId: 222,
                  orgId: 130,
                  locCategoryName: "District",
                  prodClassName: "",
                  hierarchyId: {},
                  location: [
                    {
                      displayName: "Vijayawada",
                      locCode: "Vijay",
                      id: 15796,
                      parentID: 15786,
                      locIdnCode: "",
                      locCatId: 223,
                      orgId: 130,
                      locCategoryName: "City",
                      prodClassName: "",
                      hierarchyId: {},
                      location: [
                        {
                          displayName: "Ward",
                          locCode: "Ward 1",
                          id: 15798,
                          parentID: 15796,
                          locIdnCode: "",
                          locCatId: 229,
                          orgId: 130,
                          locCategoryName: "Wards",
                          prodClassName: "",
                          hierarchyId: {},
                          location: []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        // Additional states
        {
          displayName: "MAHARASHTRA",
          locCode: "MH",
          id: 15800,
          parentID: 15783,
          locIdnCode: "2",
          locCatId: 220,
          orgId: 130,
          locCategoryName: "State",
          prodClassName: "",
          hierarchyId: {},
          location: [
            {
              displayName: "Mumbai Region",
              locCode: "MR",
              id: 15801,
              parentID: 15800,
              locIdnCode: "2",
              locCatId: 221,
              orgId: 130,
              locCategoryName: "Region",
              prodClassName: "",
              hierarchyId: {},
              location: [
                {
                  displayName: "Mumbai",
                  locCode: "MUM",
                  id: 15802,
                  parentID: 15801,
                  locIdnCode: "2",
                  locCatId: 223,
                  orgId: 130,
                  locCategoryName: "City",
                  prodClassName: "",
                  hierarchyId: {},
                  location: [
                    {
                      displayName: "Bandra",
                      locCode: "BAN",
                      id: 15803,
                      parentID: 15802,
                      locIdnCode: "",
                      locCatId: 228,
                      orgId: 130,
                      locCategoryName: "Locality",
                      prodClassName: "",
                      hierarchyId: {},
                      location: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  return processApiLocationData(indiaData);
};

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

// Export function to load location data from API response
export const loadLocationDataFromApi = (apiData: LocationType[]): LocationType[] => {
  return processApiLocationData(apiData);
};
