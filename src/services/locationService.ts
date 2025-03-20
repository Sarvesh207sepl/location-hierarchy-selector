
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

// Create a nested structure of locations with Indian names based on the provided JSON
const createLocationHierarchy = (): LocationType[] => {
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
                      displayName: "THULLUR",
                      locCode: "THULLUR1",
                      id: 15787,
                      parentID: 15786,
                      locIdnCode: "123",
                      locCatId: 224,
                      orgId: 130,
                      locCategoryName: "Mandal",
                      prodClassName: "",
                      hierarchyId: {},
                      location: [
                        {
                          displayName: "ABBARAJUPALEM",
                          locCode: "ABBARAJUPALEM",
                          id: 15788,
                          parentID: 15787,
                          locIdnCode: "1",
                          locCatId: 225,
                          orgId: 130,
                          locCategoryName: "Gram Panchayat",
                          prodClassName: "",
                          hierarchyId: {},
                          location: []
                        },
                        {
                          displayName: "ABBARAJUPALEM",
                          locCode: "ABB",
                          id: 15789,
                          parentID: 15787,
                          locIdnCode: "1",
                          locCatId: 226,
                          orgId: 130,
                          locCategoryName: "Village",
                          prodClassName: "",
                          hierarchyId: {},
                          location: []
                        },
                        {
                          displayName: "Eluru",
                          locCode: "ELU",
                          id: 15794,
                          parentID: 15787,
                          locIdnCode: "005",
                          locCatId: 225,
                          orgId: 130,
                          locCategoryName: "Gram Panchayat",
                          prodClassName: "",
                          hierarchyId: {},
                          location: [
                            {
                              displayName: "eluru",
                              locCode: "1",
                              id: 15795,
                              parentID: 15794,
                              locIdnCode: "1",
                              locCatId: 226,
                              orgId: 130,
                              locCategoryName: "Village",
                              prodClassName: "",
                              hierarchyId: {},
                              location: []
                            }
                          ]
                        }
                      ]
                    },
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
                          displayName: "Locality 1",
                          locCode: "Loc 1",
                          id: 15797,
                          parentID: 15796,
                          locIdnCode: "",
                          locCatId: 228,
                          orgId: 130,
                          locCategoryName: "Locality",
                          prodClassName: "",
                          hierarchyId: {},
                          location: []
                        },
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
        // Additional states for more data to make the dropdown more useful
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
                    },
                    {
                      displayName: "Andheri",
                      locCode: "AND",
                      id: 15804,
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

  // Process the data to add parent references and flatten the structure
  const flattenedLocations: LocationType[] = [];
  
  const processLocation = (location: LocationType, parent: LocationType | null = null) => {
    const locationWithParent = { ...location, parent };
    
    // Add to flattened array
    flattenedLocations.push(locationWithParent);
    
    // Process children if any
    if (location.location && location.location.length > 0) {
      locationWithParent.children = location.location.map(child => {
        return processLocation(child, locationWithParent);
      });
    }
    
    return locationWithParent;
  };
  
  // Process each root location
  indiaData.forEach(location => {
    processLocation(location);
  });
  
  return flattenedLocations;
};

const locations = createLocationHierarchy();

export const fetchLocations = async (startPoint?: string, endPoint?: string): Promise<LocationType[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (startPoint && endPoint) {
    return locations.filter(loc => {
      // Find locations that match the type range
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

export const searchLocations = (query: string): LocationType[] => {
  if (!query) return locations;
  
  const lowerQuery = query.toLowerCase();
  return locations.filter(location => 
    location.displayName.toLowerCase().includes(lowerQuery) ||
    location.locCategoryName.toLowerCase().includes(lowerQuery) ||
    location.locCode.toLowerCase().includes(lowerQuery)
  );
};
