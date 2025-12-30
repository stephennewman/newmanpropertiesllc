import { Tenant, PropertyData } from "@/data/properties";

export interface PlazaStats {
  avgRating: number;
  totalReviews: number;
  businessCount: number;
  topRated: Tenant | null;
  mostReviewed: Tenant | null;
}

export interface CategoryCount {
  category: string;
  icon: string;
  count: number;
}

/**
 * Calculate aggregate stats from tenant data
 */
export function calculatePlazaStats(tenants: Tenant[]): PlazaStats {
  const tenantsWithRatings = tenants.filter((t) => t.rating !== undefined);
  const tenantsWithReviews = tenants.filter((t) => t.reviews !== undefined);

  const avgRating =
    tenantsWithRatings.length > 0
      ? tenantsWithRatings.reduce((sum, t) => sum + (t.rating || 0), 0) /
        tenantsWithRatings.length
      : 0;

  const totalReviews = tenantsWithReviews.reduce(
    (sum, t) => sum + (t.reviews || 0),
    0
  );

  const topRated =
    tenantsWithRatings.length > 0
      ? tenantsWithRatings.reduce((best, t) =>
          (t.rating || 0) > (best.rating || 0) ? t : best
        )
      : null;

  const mostReviewed =
    tenantsWithReviews.length > 0
      ? tenantsWithReviews.reduce((best, t) =>
          (t.reviews || 0) > (best.reviews || 0) ? t : best
        )
      : null;

  return {
    avgRating: Math.round(avgRating * 10) / 10,
    totalReviews,
    businessCount: tenants.length,
    topRated,
    mostReviewed,
  };
}

/**
 * Extract icon from category string (e.g., "🍕 Food & Drink" -> "🍕")
 */
function extractIcon(category: string): string {
  const match = category.match(/^(\p{Emoji})/u);
  return match ? match[1] : "🏪";
}

/**
 * Extract category name without icon (e.g., "🍕 Food & Drink" -> "Food & Drink")
 */
function extractCategoryName(category: string): string {
  return category.replace(/^\p{Emoji}\s*/u, "").trim();
}

/**
 * Normalize category names for grouping (e.g., "Food & Drink", "Breakfast", "Japanese" -> "Dining")
 */
function normalizeCategory(category: string): string {
  const name = extractCategoryName(category).toLowerCase();
  
  // Dining categories
  if (
    name.includes("food") ||
    name.includes("drink") ||
    name.includes("breakfast") ||
    name.includes("japanese") ||
    name.includes("mediterranean") ||
    name.includes("mexican") ||
    name.includes("grocery")
  ) {
    return "Dining & Grocery";
  }
  
  // Health & Beauty
  if (
    name.includes("health") ||
    name.includes("beauty") ||
    name.includes("salon") ||
    name.includes("nail") ||
    name.includes("wellness") ||
    name.includes("dental")
  ) {
    return "Health & Beauty";
  }
  
  // Fitness
  if (name.includes("fitness") || name.includes("sports") || name.includes("recreation")) {
    return "Fitness & Recreation";
  }
  
  // Retail
  if (name.includes("retail") || name.includes("shopping")) {
    return "Retail & Shopping";
  }
  
  // Services
  if (name.includes("service") || name.includes("technology") || name.includes("education")) {
    return "Services";
  }
  
  // Home
  if (name.includes("home") || name.includes("improvement")) {
    return "Home & Garden";
  }
  
  // Entertainment
  if (name.includes("entertainment") || name.includes("arts")) {
    return "Arts & Entertainment";
  }
  
  // Kids
  if (name.includes("kids") || name.includes("family")) {
    return "Kids & Family";
  }

  return "Other";
}

/**
 * Get icon for normalized category
 */
function getCategoryIcon(normalizedCategory: string): string {
  const icons: Record<string, string> = {
    "Dining & Grocery": "🍽️",
    "Health & Beauty": "💇",
    "Fitness & Recreation": "💪",
    "Retail & Shopping": "🛍️",
    "Services": "💼",
    "Home & Garden": "🏠",
    "Arts & Entertainment": "🎭",
    "Kids & Family": "👶",
    "Other": "🏪",
  };
  return icons[normalizedCategory] || "🏪";
}

/**
 * Group tenants by category with counts
 */
export function getBusinessCategories(tenants: Tenant[]): CategoryCount[] {
  const categoryMap = new Map<string, number>();

  tenants.forEach((tenant) => {
    const normalized = normalizeCategory(tenant.category);
    categoryMap.set(normalized, (categoryMap.get(normalized) || 0) + 1);
  });

  return Array.from(categoryMap.entries())
    .map(([category, count]) => ({
      category,
      icon: getCategoryIcon(category),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Generate Google Maps search URL for a tenant
 */
export function getTenantMapUrl(tenant: Tenant, property: PropertyData): string {
  const searchQuery = encodeURIComponent(
    `${tenant.name} ${property.address} ${property.city} ${property.state}`
  );
  return `https://www.google.com/maps/search/${searchQuery}`;
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Format currency
 */
export function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
}

