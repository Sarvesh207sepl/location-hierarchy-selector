
// Sample hierarchical location data with Indian names
export interface LocationType {
  id: string;
  name: string;
  type: string;
  parent: LocationType | null;
  children?: LocationType[];
}

// Create a nested structure of locations with Indian names
const createLocationHierarchy = (): LocationType[] => {
  // Countries
  const india: LocationType = { id: 'india', name: 'India', type: 'Country', parent: null };
  
  // States/UTs
  const maharashtra: LocationType = { id: 'mh', name: 'Maharashtra', type: 'State', parent: india };
  const delhi: LocationType = { id: 'dl', name: 'Delhi', type: 'Union Territory', parent: india };
  const karnataka: LocationType = { id: 'ka', name: 'Karnataka', type: 'State', parent: india };
  const tamilnadu: LocationType = { id: 'tn', name: 'Tamil Nadu', type: 'State', parent: india };
  
  // Cities
  const mumbai: LocationType = { id: 'mumbai', name: 'Mumbai', type: 'City', parent: maharashtra };
  const pune: LocationType = { id: 'pune', name: 'Pune', type: 'City', parent: maharashtra };
  const nagpur: LocationType = { id: 'nagpur', name: 'Nagpur', type: 'City', parent: maharashtra };
  const newdelhi: LocationType = { id: 'newdelhi', name: 'New Delhi', type: 'City', parent: delhi };
  const bangalore: LocationType = { id: 'bangalore', name: 'Bangalore', type: 'City', parent: karnataka };
  const mysore: LocationType = { id: 'mysore', name: 'Mysore', type: 'City', parent: karnataka };
  const chennai: LocationType = { id: 'chennai', name: 'Chennai', type: 'City', parent: tamilnadu };
  const coimbatore: LocationType = { id: 'coimbatore', name: 'Coimbatore', type: 'City', parent: tamilnadu };
  
  // Districts/Areas
  const bandra: LocationType = { id: 'bandra', name: 'Bandra', type: 'District', parent: mumbai };
  const andheri: LocationType = { id: 'andheri', name: 'Andheri', type: 'District', parent: mumbai };
  const dadar: LocationType = { id: 'dadar', name: 'Dadar', type: 'District', parent: mumbai };
  const koregaon: LocationType = { id: 'koregaon', name: 'Koregaon Park', type: 'District', parent: pune };
  const aundh: LocationType = { id: 'aundh', name: 'Aundh', type: 'District', parent: pune };
  const chandni: LocationType = { id: 'chandni', name: 'Chandni Chowk', type: 'District', parent: newdelhi };
  const connaught: LocationType = { id: 'connaught', name: 'Connaught Place', type: 'District', parent: newdelhi };
  const indiranagar: LocationType = { id: 'indiranagar', name: 'Indiranagar', type: 'District', parent: bangalore };
  const koramangala: LocationType = { id: 'koramangala', name: 'Koramangala', type: 'District', parent: bangalore };
  const mylapore: LocationType = { id: 'mylapore', name: 'Mylapore', type: 'District', parent: chennai };
  const adyar: LocationType = { id: 'adyar', name: 'Adyar', type: 'District', parent: chennai };
  
  // Localities/Neighborhoods
  const pali: LocationType = { id: 'pali', name: 'Pali Hill', type: 'Locality', parent: bandra };
  const bandraW: LocationType = { id: 'bandraW', name: 'Bandra West', type: 'Locality', parent: bandra };
  const lokhandwala: LocationType = { id: 'lokhandwala', name: 'Lokhandwala Complex', type: 'Locality', parent: andheri };
  const versova: LocationType = { id: 'versova', name: 'Versova', type: 'Locality', parent: andheri };
  const shivaji: LocationType = { id: 'shivaji', name: 'Shivaji Park', type: 'Locality', parent: dadar };
  const lane7: LocationType = { id: 'lane7', name: 'Lane 7', type: 'Locality', parent: koregaon };
  const centralBizDistrict: LocationType = { id: 'cbd', name: 'Central Business District', type: 'Locality', parent: koregaon };
  const baner: LocationType = { id: 'baner', name: 'Baner Road', type: 'Locality', parent: aundh };
  const rajiv: LocationType = { id: 'rajiv', name: 'Rajiv Chowk', type: 'Locality', parent: connaught };
  const janpath: LocationType = { id: 'janpath', name: 'Janpath', type: 'Locality', parent: connaught };
  const HAL: LocationType = { id: 'HAL', name: 'HAL Old Airport Road', type: 'Locality', parent: indiranagar };
  const forumMall: LocationType = { id: 'forumMall', name: 'Forum Mall Area', type: 'Locality', parent: koramangala };
  const mandaveli: LocationType = { id: 'mandaveli', name: 'Mandaveli', type: 'Locality', parent: mylapore };
  const besant: LocationType = { id: 'besant', name: 'Besant Nagar', type: 'Locality', parent: adyar };
  
  // Flatten the hierarchy for easy search
  const allLocations = [
    india,
    maharashtra, delhi, karnataka, tamilnadu,
    mumbai, pune, nagpur, newdelhi, bangalore, mysore, chennai, coimbatore,
    bandra, andheri, dadar, koregaon, aundh, chandni, connaught, indiranagar, koramangala, mylapore, adyar,
    pali, bandraW, lokhandwala, versova, shivaji, lane7, centralBizDistrict, baner, rajiv, janpath, HAL, forumMall, mandaveli, besant
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
