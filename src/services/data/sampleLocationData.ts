
import { LocationType } from '../types/locationTypes';
import { processApiLocationData } from '../utils/locationDataProcessor';

// Create a nested structure of locations based on the sample data
export const createLocationHierarchy = (): LocationType[] => {
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
