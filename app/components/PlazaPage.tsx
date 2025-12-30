"use client";

import { MapPin, Clock, Star } from "lucide-react";
import { PropertyData } from "@/data/properties";
import { calculatePlazaStats } from "@/app/utils/plazaStats";
import StatsBar from "./plaza/StatsBar";
import BusinessCategories from "./plaza/BusinessCategories";
import TenantCard from "./plaza/TenantCard";
import NearbySection from "./plaza/NearbySection";
import LeaseInquiryCTA from "./plaza/LeaseInquiryCTA";
import DataSourceFooter from "./plaza/DataSourceFooter";

interface PlazaPageProps {
  property: PropertyData;
}

export default function PlazaPage({ property }: PlazaPageProps) {
  const plazaStats = calculatePlazaStats(property.tenants);

  return (
    <div
      className="min-h-screen bg-[var(--background)]"
      style={{ "--accent": property.accentColor } as React.CSSProperties}
    >
      {/* Top Bar */}
      <div
        className="py-3 px-4 text-white"
        style={{ backgroundColor: property.accentColor }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm gap-2">
          <span className="font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {property.address}, {property.city}, {property.state} {property.zip}
          </span>
          {property.hours && (
            <span className="flex items-center gap-2 text-white/90">
              <Clock className="w-4 h-4" />
              Open {property.hours}
            </span>
          )}
        </div>
      </div>

      {/* Header - No Tour CTA, just branding */}
      <header className="bg-white shadow-sm py-5 px-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: property.accentColor }}
            >
              {property.name}
            </h1>
            <p className="text-[var(--foreground-muted)] text-sm">
              {property.tagline}
            </p>
          </div>
          {/* Aggregate Rating Badge */}
          {plazaStats.avgRating > 0 && (
            <div className="flex items-center gap-2 bg-[var(--background)] px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-amber-500 fill-current" />
              <span className="font-bold text-[var(--foreground)]">
                {plazaStats.avgRating}
              </span>
              <span className="text-[var(--foreground-muted)] text-sm hidden sm:inline">
                ({plazaStats.totalReviews.toLocaleString()} reviews)
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Hero - Welcome Message */}
      <section className="py-16 px-4 bg-gradient-to-br from-white via-[var(--background)] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-6">
            Welcome to
            <br />
            <span style={{ color: property.accentColor }}>
              {property.name}
            </span>
          </h2>
          <p className="text-xl text-[var(--foreground-muted)] max-w-3xl mx-auto leading-relaxed">
            {property.description}
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar
        demographics={property.demographics}
        propertyDetails={property.propertyDetails}
        accentColor={property.accentColor}
      />

      {/* Business Categories */}
      <BusinessCategories
        tenants={property.tenants}
        accentColor={property.accentColor}
        plazaName={property.name}
      />

      {/* Featured Tenants */}
      <section className="py-16 px-4 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-4 text-[var(--foreground)]">
            Businesses at{" "}
            <span style={{ color: property.accentColor }}>{property.name}</span>
          </h3>
          <p className="text-center text-[var(--foreground-muted)] mb-4 max-w-2xl mx-auto">
            Discover {plazaStats.businessCount} businesses serving the Palm Harbor community
          </p>
          
          {/* Highlight top businesses */}
          {plazaStats.topRated && plazaStats.mostReviewed && (
            <p className="text-center text-sm text-[var(--foreground-light)] mb-8">
              Featuring{" "}
              <strong className="text-[var(--foreground)]">
                {plazaStats.topRated.name}
              </strong>{" "}
              ({plazaStats.topRated.rating}★) and{" "}
              <strong className="text-[var(--foreground)]">
                {plazaStats.mostReviewed.name}
              </strong>{" "}
              ({plazaStats.mostReviewed.reviews?.toLocaleString()} reviews)
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-6">
            {property.tenants.map((tenant, i) => (
              <div key={i} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <TenantCard
                  tenant={tenant}
                  property={property}
                  accentColor={property.accentColor}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 text-[var(--foreground)]">
            Visit <span style={{ color: property.accentColor }}>Us</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Map Embed */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-64 md:h-auto">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${property.mapQuery}`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "250px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Location Details */}
            <div className="flex flex-col justify-center">
              <div className="bg-[var(--background)] p-6 rounded-2xl">
                <h4 className="text-xl font-bold mb-4 text-[var(--foreground)]">
                  Location & Hours
                </h4>
                <div className="space-y-3 text-[var(--foreground-muted)]">
                  <p className="flex items-start gap-3">
                    <MapPin
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      style={{ color: property.accentColor }}
                    />
                    <span>
                      {property.address}
                      <br />
                      {property.city}, {property.state} {property.zip}
                    </span>
                  </p>
                  {property.hours && (
                    <p className="flex items-center gap-3">
                      <Clock
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: property.accentColor }}
                      />
                      <span>{property.hours}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Section */}
      {property.nearby && property.nearby.length > 0 && (
        <NearbySection
          nearby={property.nearby}
          accentColor={property.accentColor}
        />
      )}

      {/* Lease Inquiry CTA (B2B conversion - at the end) */}
      <LeaseInquiryCTA
        demographics={property.demographics}
        propertyDetails={property.propertyDetails}
        plazaName={property.name}
        plazaSlug={property.slug}
        accentColor={property.accentColor}
      />

      {/* Footer with Data Sources */}
      <DataSourceFooter property={property} />
    </div>
  );
}
