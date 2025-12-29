import { MetadataRoute } from "next";
import { getAllProperties } from "@/data/properties";

export default function sitemap(): MetadataRoute.Sitemap {
  const properties = getAllProperties();
  const baseUrl = "https://newmanpropertiesllc.com";

  // Main site pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Property subdomain pages
  const propertyPages: MetadataRoute.Sitemap = properties.flatMap((property) => {
    const subdomainUrl = `https://${property.slug}.newmanpropertiesllc.com`;
    return [
      {
        url: subdomainUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${subdomainUrl}/inquire`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ];
  });

  return [...mainPages, ...propertyPages];
}

