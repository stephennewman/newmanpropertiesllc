import { PropertyData } from "@/data/properties";

interface LocalBusinessSchemaProps {
  property: PropertyData;
}

export default function LocalBusinessSchema({ property }: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ShoppingCenter",
    name: property.name,
    description: `${property.tagline}. Commercial retail space available for lease on US Highway 19 in ${property.city}, ${property.state}.`,
    url: `https://${property.slug}.newmanpropertiesllc.com`,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.state,
      postalCode: property.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Palm Harbor approximate coordinates
      latitude: 28.0836,
      longitude: -82.7537,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "22:00",
    },
    hasMap: `https://www.google.com/maps/place/${property.mapQuery}`,
    image: `https://${property.slug}.newmanpropertiesllc.com/og-image.jpg`,
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: property.city,
      containedInPlace: {
        "@type": "State",
        name: property.state,
      },
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://${property.slug}.newmanpropertiesllc.com/inquire`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: "Schedule a Tour",
      },
    },
    // List tenants as departments/containedInPlace
    containsPlace: property.tenants.slice(0, 5).map((tenant) => ({
      "@type": "LocalBusiness",
      name: tenant.name,
      description: tenant.description,
      ...(tenant.rating && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: tenant.rating,
          reviewCount: tenant.reviews || 0,
        },
      }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


