
// Sample hierarchical location data
export interface LocationType {
  id: string;
  name: string;
  type: string;
  parent: LocationType | null;
  children?: LocationType[];
}

// Create a nested structure of locations
const createLocationHierarchy = (): LocationType[] => {
  // Countries
  const usa: LocationType = { id: 'usa', name: 'United States', type: 'Country', parent: null };
  const canada: LocationType = { id: 'canada', name: 'Canada', type: 'Country', parent: null };
  
  // States/Provinces
  const california: LocationType = { id: 'ca', name: 'California', type: 'State', parent: usa };
  const newyork: LocationType = { id: 'ny', name: 'New York', type: 'State', parent: usa };
  const ontario: LocationType = { id: 'on', name: 'Ontario', type: 'Province', parent: canada };
  const quebec: LocationType = { id: 'qc', name: 'Quebec', type: 'Province', parent: canada };
  
  // Cities
  const sanfrancisco: LocationType = { id: 'sf', name: 'San Francisco', type: 'City', parent: california };
  const losangeles: LocationType = { id: 'la', name: 'Los Angeles', type: 'City', parent: california };
  const sandiego: LocationType = { id: 'sd', name: 'San Diego', type: 'City', parent: california };
  const nyc: LocationType = { id: 'nyc', name: 'New York City', type: 'City', parent: newyork };
  const buffalo: LocationType = { id: 'buf', name: 'Buffalo', type: 'City', parent: newyork };
  const toronto: LocationType = { id: 'tor', name: 'Toronto', type: 'City', parent: ontario };
  const ottawa: LocationType = { id: 'ott', name: 'Ottawa', type: 'City', parent: ontario };
  const montreal: LocationType = { id: 'mtl', name: 'Montreal', type: 'City', parent: quebec };
  const quebeccity: LocationType = { id: 'qcc', name: 'Quebec City', type: 'City', parent: quebec };
  
  // Districts
  const mission: LocationType = { id: 'mission', name: 'Mission District', type: 'District', parent: sanfrancisco };
  const soma: LocationType = { id: 'soma', name: 'SoMa', type: 'District', parent: sanfrancisco };
  const downtown: LocationType = { id: 'downtown', name: 'Downtown', type: 'District', parent: losangeles };
  const hollywood: LocationType = { id: 'hollywood', name: 'Hollywood', type: 'District', parent: losangeles };
  const manhattan: LocationType = { id: 'manhattan', name: 'Manhattan', type: 'District', parent: nyc };
  const brooklyn: LocationType = { id: 'brooklyn', name: 'Brooklyn', type: 'District', parent: nyc };
  const downtown_toronto: LocationType = { id: 'dt_tor', name: 'Downtown', type: 'District', parent: toronto };
  const plateau: LocationType = { id: 'plateau', name: 'Le Plateau', type: 'District', parent: montreal };
  
  // Localities/Neighborhoods
  const missionDolores: LocationType = { id: 'mission_dolores', name: 'Mission Dolores', type: 'Locality', parent: mission };
  const noeValley: LocationType = { id: 'noe_valley', name: 'Noe Valley', type: 'Locality', parent: mission };
  const financial: LocationType = { id: 'financial', name: 'Financial District', type: 'Locality', parent: soma };
  const beverly: LocationType = { id: 'beverly', name: 'Beverly Hills', type: 'Locality', parent: downtown };
  const venice: LocationType = { id: 'venice', name: 'Venice Beach', type: 'Locality', parent: downtown };
  const westHollywood: LocationType = { id: 'west_hollywood', name: 'West Hollywood', type: 'Locality', parent: hollywood };
  const upperEast: LocationType = { id: 'upper_east', name: 'Upper East Side', type: 'Locality', parent: manhattan };
  const chelsea: LocationType = { id: 'chelsea', name: 'Chelsea', type: 'Locality', parent: manhattan };
  const williamsburg: LocationType = { id: 'williamsburg', name: 'Williamsburg', type: 'Locality', parent: brooklyn };
  const yorkville: LocationType = { id: 'yorkville', name: 'Yorkville', type: 'Locality', parent: downtown_toronto };
  const mileEnd: LocationType = { id: 'mile_end', name: 'Mile End', type: 'Locality', parent: plateau };
  
  // Flatten the hierarchy for easy search
  const allLocations = [
    usa, canada,
    california, newyork, ontario, quebec,
    sanfrancisco, losangeles, sandiego, nyc, buffalo, toronto, ottawa, montreal, quebeccity,
    mission, soma, downtown, hollywood, manhattan, brooklyn, downtown_toronto, plateau,
    missionDolores, noeValley, financial, beverly, venice, westHollywood, upperEast, chelsea, williamsburg, yorkville, mileEnd
  ];
  
  return allLocations;
};

const locations = createLocationHierarchy();

export const fetchLocations = async (startPoint?: string, endPoint?: string): Promise<LocationType[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (startPoint && endPoint) {
    return locations.filter(loc => {
      // Find locations that match the type range
      let current = loc;
      let matchesEnd = current.type === endPoint;
      
      while (current.parent && !matchesEnd) {
        current = current.parent;
        matchesEnd = current.type === endPoint;
      }
      
      return matchesEnd;
    });
  }
  
  return locations;
};

export const searchLocations = (query: string): LocationType[] => {
  if (!query) return locations;
  
  const lowerQuery = query.toLowerCase();
  return locations.filter(location => 
    location.name.toLowerCase().includes(lowerQuery) ||
    location.type.toLowerCase().includes(lowerQuery)
  );
};
