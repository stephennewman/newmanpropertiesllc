export interface Tenant {
  name: string;
  category: string;
  description: string;
  rating?: number;
  reviews?: number;
  badge?: string;
}

export interface PropertyData {
  slug: string;
  name: string;
  tagline: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  accentColor: string;
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
}

export const properties: Record<string, PropertyData> = {
  palmharborplaza: {
    slug: "palmharborplaza",
    name: "Palm Harbor Plaza",
    tagline: "Your Local Shopping Destination",
    address: "35267 US Hwy 19 N",
    city: "Palm Harbor",
    state: "FL",
    zip: "34684",
    accentColor: "#0D9488",
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
      { category: "🥪 Food & Drink", name: "Chicken Salad Chick", description: "Sandwich shop with variety of chicken salad options", rating: 4.6, reviews: 1451 },
      { category: "🏠 Home Improvement", name: "Ace Hardware Palm Harbor", description: "Tools, supplies, and expert advice", rating: 4.5, reviews: 538 },
      { category: "🏠 Home Improvement", name: "Renovations Home Center", description: "Kitchen remodeler specializing in home renovations", rating: 4.8, reviews: 80 },
      { category: "🏠 Home Improvement", name: "KAS Construction Inc", description: "Kitchen remodeling and home improvement services", rating: 4.6, reviews: 31 },
      { category: "💇‍♀️ Health & Beauty", name: "HAIRDAYZE Salon of Palm Harbor", description: "Full-service salon offering cuts, color, and styling", rating: 4.4, reviews: 18 },
      { category: "⚽ Sports & Recreation", name: "Play It Again Sports", description: "New & used sporting goods and fitness gear", rating: 4.2, reviews: 142 },
      { category: "🎭 Arts & Entertainment", name: "Cabaret Dance Club", description: "Dance and social venue", rating: 4.6, reviews: 61 },
      { category: "🎭 Arts & Entertainment", name: "Starlight Ballroom Dance Club", description: "Dance classes and events", rating: 5.0, reviews: 5 },
      { category: "🎭 Arts & Entertainment", name: "Tampa Bay Performing Arts Academy", description: "Performing arts classes and productions", rating: 4.0, reviews: 51 },
      { category: "👶 Kids & Family", name: "Little Explorers Palm Harbor", description: "Indoor playground with sensory play and music classes", rating: 4.9, reviews: 286 },
      { category: "🏥 Health Services", name: "North Pinellas CBOC", description: "Community-based outpatient clinic", rating: 2.0, reviews: 1 },
    ],
    mapQuery: "35267+US+Hwy+19+N,+Palm+Harbor,+FL+34684",
  },
  corallandings: {
    slug: "corallandings",
    name: "Coral Landings Shopping Plaza",
    tagline: "Palm Harbor's Premier Shopping Destination",
    address: "33211 US Hwy 19 N",
    city: "Palm Harbor",
    state: "FL",
    zip: "34684",
    accentColor: "#F97316",
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
      { category: "🛒 Grocery", name: "Publix Super Market", description: "Full-service supermarket with bakery, deli & pharmacy", rating: 4.5, reviews: 892 },
      { category: "🛍️ Retail", name: "Ross Dress for Less", description: "Off-price department store with designer brands", rating: 4.2, reviews: 634 },
      { category: "🌯 Food & Drink", name: "Chipotle Mexican Grill", description: "Fast-casual Mexican cuisine with customizable bowls & burritos", rating: 4.1, reviews: 412 },
      { category: "👗 Retail", name: "Plato's Closet", description: "Buy, sell & trade trendy teen & young adult clothing", rating: 4.0, reviews: 287 },
      { category: "💇‍♀️ Health & Beauty", name: "Sola Salons", description: "Boutique salon studios for independent beauty professionals", rating: 4.7, reviews: 156 },
      { category: "💼 Services", name: "H&R Block", description: "Tax preparation and financial services", rating: 4.3, reviews: 98 },
      { category: "📱 Technology", name: "AT&T Store", description: "Wireless services, phones & accessories", rating: 3.9, reviews: 203 },
      { category: "📚 Education", name: "Huntington Learning Center", description: "Tutoring & test prep for K-12 students", rating: 4.8, reviews: 67 },
    ],
    mapQuery: "33211+US+Hwy+19+N,+Palm+Harbor,+FL+34684",
  },
  highlandlakes: {
    slug: "highlandlakes",
    name: "Highland Lakes Plaza",
    tagline: "Prime Retail Space in Palm Harbor",
    address: "33561 US Hwy 19 N",
    city: "Palm Harbor",
    state: "FL",
    zip: "34684",
    accentColor: "#6366F1",
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
      { category: "🛒 Grocery", name: "Trader Joe's", description: "Coming Soon! Popular specialty grocery chain", badge: "Opening Soon" },
      { category: "📚 Retail", name: "Barnes & Noble", description: "Books, gifts, toys & café", rating: 4.5, reviews: 687 },
      { category: "🎨 Retail", name: "Michaels", description: "Arts, crafts & framing supplies", rating: 4.3, reviews: 412 },
      { category: "💪 Fitness", name: "Orangetheory Fitness", description: "Heart-rate based interval training studio", rating: 4.8, reviews: 267 },
      { category: "👟 Retail", name: "Famous Footwear", description: "Brand name shoes for the whole family", rating: 4.1, reviews: 189 },
      { category: "🍕 Food & Drink", name: "Five Guys", description: "Burgers and fries made to order", rating: 4.4, reviews: 521 },
      { category: "💅 Health & Beauty", name: "Nail Salon", description: "Full-service nail care and spa treatments", rating: 4.5, reviews: 98 },
    ],
    mapQuery: "33561+US+Hwy+19+N,+Palm+Harbor,+FL+34684",
  },
  aldermanplaza: {
    slug: "aldermanplaza",
    name: "Alderman Plaza",
    tagline: "Palm Harbor's Premier Fitness & Dining Destination",
    address: "35104 US Hwy 19 N",
    city: "Palm Harbor",
    state: "FL",
    zip: "34684",
    accentColor: "#0EA5E9",
    features: [
      { icon: "💪", title: "LA Fitness Anchored", description: "Full-service gym with classes & pool" },
      { icon: "🍳", title: "First Watch", description: "Award-winning breakfast & brunch" },
      { icon: "🚗", title: "High Traffic", description: "90,000+ vehicles daily" },
      { icon: "📍", title: "Prime Location", description: "US Hwy 19 at Alderman Road" },
    ],
    stats: [
      { label: "Daily Traffic", value: "90,000+" },
      { label: "Total SF", value: "43,408" },
      { label: "Anchor", value: "LA Fitness" },
    ],
    tenants: [
      { category: "💪 Fitness", name: "LA Fitness", description: "Full-service gym with pool, classes & personal training", rating: 4.0, reviews: 892 },
      { category: "🍳 Breakfast", name: "First Watch", description: "Award-winning breakfast, brunch & lunch spot", rating: 4.5, reviews: 2341 },
      { category: "📱 Technology", name: "Verizon", description: "Wireless services, phones & accessories", rating: 4.1, reviews: 156 },
      { category: "📦 Services", name: "The UPS Store", description: "Shipping, printing & mailbox services", rating: 4.3, reviews: 98 },
      { category: "🏪 Retail", name: "Various Retailers", description: "Mix of local shops and services" },
    ],
    mapQuery: "35104+US+Hwy+19+N,+Palm+Harbor,+FL+34684",
  },
  palmharborshops: {
    slug: "palmharborshops",
    name: "Palm Harbor Shops",
    tagline: "International Flavors & Local Flair",
    address: "35857 US Hwy 19 N",
    city: "Palm Harbor",
    state: "FL",
    zip: "34684",
    accentColor: "#DC2626",
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
      { category: "🍣 Japanese", name: "Saki Endless Sushi & Hibachi", description: "All-you-can-eat sushi & hibachi dining", rating: 3.9, reviews: 1544 },
      { category: "🥙 Mediterranean", name: "Alaturka Mediterranean Grill", description: "Authentic Turkish & Mediterranean cuisine with bakery", rating: 4.8, reviews: 714 },
      { category: "🌮 Mexican", name: "El Texano Mexican Restaurant", description: "Traditional Tex-Mex favorites", rating: 3.9, reviews: 432 },
      { category: "💅 Beauty", name: "Glossy 130 Nails & Spa", description: "Full-service nail salon with spa treatments", rating: 4.4, reviews: 482 },
      { category: "💇‍♀️ Health & Beauty", name: "Multiple Beauty Services", description: "14+ salons and wellness providers" },
      { category: "🛍️ Shopping", name: "Local Boutiques", description: "6 unique retail stores" },
    ],
    mapQuery: "35857+US+Hwy+19+N,+Palm+Harbor,+FL+34684",
  },
};

export function getPropertyBySlug(slug: string): PropertyData | undefined {
  return properties[slug];
}

export function getAllProperties(): PropertyData[] {
  return Object.values(properties);
}

