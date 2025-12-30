export interface Tenant {
  name: string;
  category: string;
  description: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  googleMapsUrl?: string;
  website?: string;
  phone?: string;
  hours?: string;
}

export interface Demographics {
  dailyTraffic: number;
  trafficSource: string;
  population1Mile: number;
  population3Mile: number;
  population5Mile: number;
  avgIncome1Mile: number;
  avgIncome3Mile: number;
  avgIncome5Mile: number;
  medianAge?: number;
  dataSource: string;
  lastUpdated: string;
}

export interface PropertyDetails {
  totalSF?: number;
  occupancy?: string;
  parkingSpaces?: number;
  yearBuilt?: number;
  anchor?: string;
  signage?: string;
}

export interface NearbyPlace {
  name: string;
  type: string;
  distance: string;
}

export interface PropertyData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  accentColor: string;
  hours?: string;
  phone?: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
  tenants: Tenant[];
  mapQuery: string;
  demographics: Demographics;
  propertyDetails: PropertyDetails;
  nearby?: NearbyPlace[];
}

export const properties: Record<string, PropertyData> = {
  palmharborplaza: {
    slug: "palmharborplaza",
    name: "Palm Harbor Plaza",
    tagline: "Your Local Shopping Destination",
    description: "Palm Harbor Plaza is a vibrant community shopping center on US Highway 19, featuring a diverse mix of home improvement stores, entertainment venues, and family-friendly businesses. From hardware supplies to dance classes, this plaza serves as a one-stop destination for Palm Harbor residents.",
    address: "35267 US Hwy 19 N",
    city: "Palm Harbor",
    state: "FL",
    zip: "34684",
    accentColor: "#0D9488",
    hours: "9AM - 9PM",
    features: [
      { icon: "🛍️", title: "Local Businesses", description: "11 unique shops and services" },
      { icon: "🏠", title: "Home Improvement", description: "Hardware, construction & renovations" },
      { icon: "🎭", title: "Arts & Entertainment", description: "Dance clubs, performing arts & recreation" },
      { icon: "📍", title: "Convenient Location", description: "Easy access on US Highway 19" },
    ],
    stats: [
      { label: "Total Tenants", value: "11" },
      { label: "Property Type", value: "Strip Center" },
      { label: "Location", value: "US Hwy 19" },
    ],
    tenants: [
      { category: "🥪 Food & Drink", name: "Chicken Salad Chick", description: "Sandwich shop with variety of chicken salad options", rating: 4.6, reviews: 1451, website: "https://www.chickensaladchick.com" },
      { category: "🏠 Home Improvement", name: "Ace Hardware Palm Harbor", description: "Tools, supplies, and expert advice", rating: 4.5, reviews: 538, website: "https://www.acehardware.com" },
      { category: "🏠 Home Improvement", name: "Renovations Home Center", description: "Kitchen remodeler specializing in home renovations", rating: 4.8, reviews: 80, website: "https://www.renovationshomecenter.com" },
      { category: "🏠 Home Improvement", name: "KAS Construction Inc", description: "Kitchen remodeling and home improvement services", rating: 4.6, reviews: 31, website: "https://www.kasconstructioninc.com" },
      { category: "💇‍♀️ Health & Beauty", name: "HAIRDAYZE Salon of Palm Harbor", description: "Full-service salon offering cuts, color, and styling", rating: 4.4, reviews: 18, website: "https://www.hairdayzepalmharbor.com" },
      { category: "⚽ Sports & Recreation", name: "Play It Again Sports", description: "New & used sporting goods and fitness gear", rating: 4.2, reviews: 142, website: "https://www.playitagainsports.com" },
      { category: "🎭 Arts & Entertainment", name: "Cabaret Dance Club", description: "Dance and social venue", rating: 4.6, reviews: 61 },
      { category: "🎭 Arts & Entertainment", name: "Starlight Ballroom Dance Club", description: "Dance classes and events", rating: 5.0, reviews: 5 },
      { category: "🎭 Arts & Entertainment", name: "Tampa Bay Performing Arts Academy", description: "Performing arts classes and productions", rating: 4.0, reviews: 51, website: "https://www.tampabaypaa.com" },
      { category: "👶 Kids & Family", name: "Little Explorers Palm Harbor", description: "Indoor playground with sensory play and music classes", rating: 4.9, reviews: 286, website: "https://www.littleexplorersph.com" },
      { category: "🏥 Health Services", name: "North Pinellas CBOC", description: "Community-based outpatient clinic", rating: 2.0, reviews: 1, website: "https://www.va.gov" },
    ],
    mapQuery: "35267+US+Hwy+19+N,+Palm+Harbor,+FL+34684",
    demographics: {
      dailyTraffic: 80000,
      trafficSource: "US Highway 19",
      population1Mile: 11692,
      population3Mile: 68864,
      population5Mile: 153801,
      avgIncome1Mile: 87983,
      avgIncome3Mile: 93947,
      avgIncome5Mile: 89653,
      medianAge: 45,
      dataSource: "LoopNet/ESRI",
      lastUpdated: "2024",
    },
    propertyDetails: {
      anchor: "Ace Hardware",
      signage: "Monument signage available",
    },
    nearby: [
      { name: "Palm Harbor Library", type: "library", distance: "0.5 mi" },
      { name: "John Chesnut Sr. Park", type: "park", distance: "2.1 mi" },
      { name: "Palm Harbor University High", type: "school", distance: "1.8 mi" },
    ],
  },
  corallandings: {
    slug: "corallandings",
    name: "Coral Landings Shopping Plaza",
    tagline: "Palm Harbor's Premier Shopping Destination",
    description: "Coral Landings is a Publix-anchored neighborhood shopping center in the heart of Palm Harbor's affluent trade area. With over 91,500 vehicles passing daily on US Highway 19, the plaza offers exceptional visibility and a dynamic mix of national retailers, dining, and professional services.",
    address: "33211 US Hwy 19 N",
    city: "Palm Harbor",
    state: "FL",
    zip: "34684",
    accentColor: "#F97316",
    hours: "7AM - 10PM",
    features: [
      { icon: "🛒", title: "Publix Anchored", description: "Full-service grocery with pharmacy" },
      { icon: "🚗", title: "High Visibility", description: "91,500+ daily traffic count" },
      { icon: "🏪", title: "Diverse Mix", description: "Retail, dining & services" },
      { icon: "📍", title: "Prime Location", description: "US Hwy 19 in Palm Harbor" },
    ],
    stats: [
      { label: "Daily Traffic", value: "91,500+" },
      { label: "Anchor Tenant", value: "Publix" },
      { label: "Hours", value: "7AM - 10PM" },
    ],
    tenants: [
      { category: "🛒 Grocery", name: "Publix Super Market", description: "Full-service supermarket with bakery, deli & pharmacy", rating: 4.5, reviews: 892, website: "https://www.publix.com" },
      { category: "🛍️ Retail", name: "Ross Dress for Less", description: "Off-price department store with designer brands", rating: 4.2, reviews: 634, website: "https://www.rossstores.com" },
      { category: "🌯 Food & Drink", name: "Chipotle Mexican Grill", description: "Fast-casual Mexican cuisine with customizable bowls & burritos", rating: 4.1, reviews: 412, website: "https://www.chipotle.com" },
      { category: "👗 Retail", name: "Plato's Closet", description: "Buy, sell & trade trendy teen & young adult clothing", rating: 4.0, reviews: 287, website: "https://www.platoscloset.com" },
      { category: "💇‍♀️ Health & Beauty", name: "Sola Salons", description: "Boutique salon studios for independent beauty professionals", rating: 4.7, reviews: 156, website: "https://www.solasalonstudios.com" },
      { category: "💼 Services", name: "H&R Block", description: "Tax preparation and financial services", rating: 4.3, reviews: 98, website: "https://www.hrblock.com" },
      { category: "📱 Technology", name: "AT&T Store", description: "Wireless services, phones & accessories", rating: 3.9, reviews: 203, website: "https://www.att.com" },
      { category: "📚 Education", name: "Huntington Learning Center", description: "Tutoring & test prep for K-12 students", rating: 4.8, reviews: 67, website: "https://www.huntingtonhelps.com" },
    ],
    mapQuery: "33211+US+Hwy+19+N,+Palm+Harbor,+FL+34684",
    demographics: {
      dailyTraffic: 91500,
      trafficSource: "US Highway 19",
      population1Mile: 11861,
      population3Mile: 82501,
      population5Mile: 173926,
      avgIncome1Mile: 87807,
      avgIncome3Mile: 97571,
      avgIncome5Mile: 79440,
      medianAge: 48,
      dataSource: "CommercialCafe/ESRI",
      lastUpdated: "2024",
    },
    propertyDetails: {
      totalSF: 102786,
      anchor: "Publix",
      signage: "Pylon signage available",
    },
    nearby: [
      { name: "AdventHealth Palm Harbor", type: "hospital", distance: "1.2 mi" },
      { name: "Palm Harbor Middle School", type: "school", distance: "0.8 mi" },
      { name: "Innisbrook Resort", type: "recreation", distance: "3.5 mi" },
    ],
  },
  highlandlakes: {
    slug: "highlandlakes",
    name: "Highland Lakes Plaza",
    tagline: "Prime Retail Space in Palm Harbor",
    description: "Highland Lakes Plaza is an established 79,528 SF retail center anchored by Barnes & Noble and Michaels, with Trader Joe's opening soon. Located on US Highway 19 with excellent visibility and 359 parking spaces, the plaza serves an affluent Palm Harbor community with a diverse tenant mix.",
    address: "33561 US Hwy 19 N",
    city: "Palm Harbor",
    state: "FL",
    zip: "34684",
    accentColor: "#6366F1",
    hours: "9AM - 9PM",
    features: [
      { icon: "🚗", title: "High Traffic", description: "US Hwy 19 visibility & access" },
      { icon: "🏪", title: "79,528 SF", description: "Established retail center" },
      { icon: "🅿️", title: "359 Spaces", description: "Ample customer parking" },
      { icon: "⭐", title: "Strong Anchors", description: "Trader Joe's, Michaels & more" },
    ],
    stats: [
      { label: "Total SF", value: "79,528" },
      { label: "Parking Spaces", value: "359" },
      { label: "Coming Soon", value: "Trader Joe's" },
    ],
    tenants: [
      { category: "🛒 Grocery", name: "Trader Joe's", description: "Coming Soon! Popular specialty grocery chain", badge: "Opening Soon", website: "https://www.traderjoes.com" },
      { category: "📚 Retail", name: "Barnes & Noble", description: "Books, gifts, toys & café", rating: 4.5, reviews: 687, website: "https://www.barnesandnoble.com" },
      { category: "🎨 Retail", name: "Michaels", description: "Arts, crafts & framing supplies", rating: 4.3, reviews: 412, website: "https://www.michaels.com" },
      { category: "💪 Fitness", name: "Orangetheory Fitness", description: "Heart-rate based interval training studio", rating: 4.8, reviews: 267, website: "https://www.orangetheory.com" },
      { category: "👟 Retail", name: "Famous Footwear", description: "Brand name shoes for the whole family", rating: 4.1, reviews: 189, website: "https://www.famousfootwear.com" },
      { category: "🍕 Food & Drink", name: "Five Guys", description: "Burgers and fries made to order", rating: 4.4, reviews: 521, website: "https://www.fiveguys.com" },
      { category: "💅 Health & Beauty", name: "Nail Salon", description: "Full-service nail care and spa treatments", rating: 4.5, reviews: 98 },
    ],
    mapQuery: "33561+US+Hwy+19+N,+Palm+Harbor,+FL+34684",
    demographics: {
      dailyTraffic: 74500,
      trafficSource: "US Highway 19",
      population1Mile: 11536,
      population3Mile: 94177,
      population5Mile: 195040,
      avgIncome1Mile: 99127,
      avgIncome3Mile: 84281,
      avgIncome5Mile: 83110,
      medianAge: 47,
      dataSource: "LoopNet/ESRI",
      lastUpdated: "2024",
    },
    propertyDetails: {
      totalSF: 79528,
      occupancy: "92%",
      parkingSpaces: 359,
      anchor: "Barnes & Noble, Michaels",
      signage: "Monument signage available",
    },
    nearby: [
      { name: "Curlew Creek Preserve", type: "park", distance: "1.5 mi" },
      { name: "Palm Harbor University High", type: "school", distance: "2.2 mi" },
      { name: "Tarpon Springs Sponge Docks", type: "attraction", distance: "4.5 mi" },
    ],
  },
  aldermanplaza: {
    slug: "aldermanplaza",
    name: "Alderman Plaza",
    tagline: "Palm Harbor's Premier Fitness & Dining Destination",
    description: "Alderman Plaza is a 93,000 SF retail center at the high-traffic intersection of US Highway 19 and Alderman Road. Anchored by Crunch Fitness and featuring the popular First Watch restaurant, the plaza serves health-conscious Palm Harbor residents with fitness, wellness, and dining options.",
    address: "35104 US Hwy 19 N",
    city: "Palm Harbor",
    state: "FL",
    zip: "34684",
    accentColor: "#0EA5E9",
    hours: "6AM - 10PM",
    features: [
      { icon: "💪", title: "Crunch Fitness Anchored", description: "Full-service gym with classes & amenities" },
      { icon: "🍳", title: "First Watch", description: "Award-winning breakfast & brunch" },
      { icon: "🚗", title: "High Traffic", description: "90,000+ vehicles daily" },
      { icon: "📍", title: "Prime Location", description: "US Hwy 19 at Alderman Road" },
    ],
    stats: [
      { label: "Daily Traffic", value: "90,000+" },
      { label: "Total SF", value: "93,000" },
      { label: "Anchor", value: "Crunch Fitness" },
    ],
    tenants: [
      { category: "💪 Fitness", name: "Crunch Fitness", description: "Full-service gym with classes, personal training & amenities", rating: 4.2, reviews: 324, website: "https://www.crunch.com" },
      { category: "🍳 Breakfast", name: "First Watch", description: "Award-winning breakfast, brunch & lunch spot", rating: 4.5, reviews: 2341, website: "https://www.firstwatch.com" },
      { category: "🦷 Dental", name: "Great Expressions Dental", description: "Comprehensive dental care for the whole family", rating: 4.0, reviews: 187, website: "https://www.greatexpressions.com" },
      { category: "🧘 Wellness", name: "StretchMed", description: "Professional assisted stretching services", rating: 4.8, reviews: 92, website: "https://www.stretchmed.com" },
      { category: "🏥 Health", name: "Living Young Center", description: "Health and wellness services", rating: 4.6, reviews: 45, website: "https://www.livingyoungcenter.com" },
      { category: "📱 Technology", name: "Total by Verizon", description: "Wireless services, phones & accessories", rating: 4.1, reviews: 156, website: "https://www.verizon.com" },
      { category: "📦 Services", name: "The UPS Store", description: "Shipping, printing & mailbox services", rating: 4.3, reviews: 98, website: "https://www.theupsstore.com" },
    ],
    mapQuery: "35104+US+Hwy+19+N,+Palm+Harbor,+FL+34684",
    demographics: {
      dailyTraffic: 90000,
      trafficSource: "US Highway 19 & Alderman Road",
      population1Mile: 11399,
      population3Mile: 75234,
      population5Mile: 154819,
      avgIncome1Mile: 67457,
      avgIncome3Mile: 75497,
      avgIncome5Mile: 72024,
      medianAge: 46,
      dataSource: "LoopNet/ESRI",
      lastUpdated: "2024",
    },
    propertyDetails: {
      totalSF: 93000,
      occupancy: "95%",
      anchor: "Crunch Fitness",
      signage: "Pylon signage available",
    },
    nearby: [
      { name: "Dunedin Causeway", type: "beach", distance: "4.2 mi" },
      { name: "Palm Harbor Elementary", type: "school", distance: "1.1 mi" },
      { name: "Mease Dunedin Hospital", type: "hospital", distance: "3.8 mi" },
    ],
  },
  palmharborshops: {
    slug: "palmharborshops",
    name: "Palm Harbor Shops",
    tagline: "International Flavors & Local Flair",
    description: "Palm Harbor Shops is a unique shopping destination featuring an eclectic mix of international dining and beauty services. From all-you-can-eat sushi to authentic Mediterranean cuisine, plus over 14 beauty salons and spas, this plaza offers a diverse experience for Palm Harbor residents.",
    address: "35857 US Hwy 19 N",
    city: "Palm Harbor",
    state: "FL",
    zip: "34684",
    accentColor: "#DC2626",
    hours: "10AM - 9PM",
    features: [
      { icon: "🍣", title: "Diverse Dining", description: "Sushi, Mediterranean, Mexican & more" },
      { icon: "💅", title: "Beauty Services", description: "14+ salons and spas" },
      { icon: "🛍️", title: "Local Shopping", description: "Unique boutiques & services" },
      { icon: "📍", title: "Prime Location", description: "High-visibility US Hwy 19" },
    ],
    stats: [
      { label: "Total Businesses", value: "30+" },
      { label: "Dining Options", value: "4" },
      { label: "Beauty Services", value: "14" },
    ],
    tenants: [
      { category: "🍣 Japanese", name: "Saki Endless Sushi & Hibachi", description: "All-you-can-eat sushi & hibachi dining", rating: 3.9, reviews: 1544, website: "https://www.sakiinfinite.com" },
      { category: "🥙 Mediterranean", name: "Alaturka Mediterranean Grill", description: "Authentic Turkish & Mediterranean cuisine with bakery", rating: 4.8, reviews: 714, website: "https://www.alaturkagrill.com" },
      { category: "🌮 Mexican", name: "El Texano Mexican Restaurant", description: "Traditional Tex-Mex favorites", rating: 3.9, reviews: 432 },
      { category: "💅 Beauty", name: "Glossy 130 Nails & Spa", description: "Full-service nail salon with spa treatments", rating: 4.4, reviews: 482 },
      { category: "💇‍♀️ Health & Beauty", name: "Multiple Beauty Services", description: "14+ salons and wellness providers" },
      { category: "🛍️ Shopping", name: "Local Boutiques", description: "6 unique retail stores" },
    ],
    mapQuery: "35857+US+Hwy+19+N,+Palm+Harbor,+FL+34684",
    demographics: {
      dailyTraffic: 85000,
      trafficSource: "US Highway 19",
      population1Mile: 11500,
      population3Mile: 70000,
      population5Mile: 155000,
      avgIncome1Mile: 75000,
      avgIncome3Mile: 80000,
      avgIncome5Mile: 78000,
      medianAge: 47,
      dataSource: "Estimated based on area data",
      lastUpdated: "2024",
    },
    propertyDetails: {
      signage: "Monument signage available",
    },
    nearby: [
      { name: "Wall Springs Park", type: "park", distance: "2.8 mi" },
      { name: "East Lake High School", type: "school", distance: "2.5 mi" },
      { name: "Honeymoon Island", type: "beach", distance: "5.2 mi" },
    ],
  },
};

export function getPropertyBySlug(slug: string): PropertyData | undefined {
  return properties[slug];
}

export function getAllProperties(): PropertyData[] {
  return Object.values(properties);
}

