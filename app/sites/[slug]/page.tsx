import { Metadata } from "next";
import { notFound } from "next/navigation";
import PlazaPage from "@/app/components/PlazaPage";
import LocalBusinessSchema from "@/app/components/LocalBusinessSchema";
import { getPropertyBySlug, getAllProperties } from "@/data/properties";

// Generate static params for all known properties
export function generateStaticParams() {
  const properties = getAllProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

// Dynamic metadata based on property - optimized for local SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  
  if (!property) {
    return { title: "Property Not Found" };
  }

  const title = `${property.name} | Retail Space for Lease in ${property.city}, FL`;
  const description = `Find retail & commercial space at ${property.name}, ${property.address}, ${property.city} FL. ${property.tagline}. High-traffic US Highway 19 location. Schedule a tour today!`;
  const url = `https://${property.slug}.newmanpropertiesllc.com`;

  // Extract top tenant names for keywords
  const tenantNames = property.tenants.slice(0, 3).map(t => t.name).join(", ");

  return {
    title,
    description,
    keywords: [
      `${property.name}`,
      `retail space ${property.city}`,
      `commercial lease ${property.city} FL`,
      `shopping center ${property.city}`,
      `US Highway 19 retail`,
      `Palm Harbor shopping plaza`,
      `office space ${property.city}`,
      `store for rent ${property.city}`,
      tenantNames,
    ].join(", "),
    authors: [{ name: "Newman Properties LLC" }],
    creator: "Newman Properties LLC",
    publisher: "Newman Properties LLC",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: property.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${url}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${property.name} - Shopping Center in ${property.city}, FL`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${url}/og-image.jpg`],
    },
    other: {
      "geo.region": "US-FL",
      "geo.placename": property.city,
      "geo.position": "28.0836;-82.7537",
      "ICBM": "28.0836, -82.7537",
    },
  };
}

export default async function PlazaLandingPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <>
      <LocalBusinessSchema property={property} />
      <PlazaPage property={property} />
    </>
  );
}

