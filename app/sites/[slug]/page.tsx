import { Metadata } from "next";
import { notFound } from "next/navigation";
import PlazaPage from "@/app/components/PlazaPage";
import { getPropertyBySlug, getAllProperties } from "@/data/properties";

// Generate static params for all known properties
export function generateStaticParams() {
  const properties = getAllProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

// Dynamic metadata based on property
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

  return {
    title: `${property.name} | Shopping Center in ${property.city}, ${property.state}`,
    description: `Discover retail and office space at ${property.name} on US Highway 19. ${property.tagline}. Schedule a tour today.`,
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

  return <PlazaPage property={property} />;
}

