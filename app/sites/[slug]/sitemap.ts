import { MetadataRoute } from "next";
import { getPropertyBySlug, getAllProperties } from "@/data/properties";

export async function generateStaticParams() {
  const properties = getAllProperties();
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export default function sitemap({ params }: { params: { slug: string } }): MetadataRoute.Sitemap {
  const property = getPropertyBySlug(params.slug);
  
  if (!property) {
    return [];
  }

  const subdomainUrl = `https://${property.slug}.newmanpropertiesllc.com`;

  return [
    {
      url: subdomainUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${subdomainUrl}/inquire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://newmanpropertiesllc.com/terms",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://newmanpropertiesllc.com/privacy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://newmanpropertiesllc.com/disclaimer",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}

