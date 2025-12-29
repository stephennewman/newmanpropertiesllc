"use client";

import Link from "next/link";
import { MapPin, Star, ChevronRight } from "lucide-react";
import { PropertyData } from "@/data/properties";
import { analytics } from "@/app/utils/analytics";

interface PlazaPageProps {
  property: PropertyData;
}

export default function PlazaPage({ property }: PlazaPageProps) {
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
          <span className="text-white/80">
            We respond within 24 hours
          </span>
        </div>
      </div>

      {/* Header */}
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
          <Link
            href="/inquire"
            onClick={() => analytics.tourClick(property.slug)}
            className="text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:opacity-90 flex items-center gap-2"
            style={{ backgroundColor: property.accentColor }}
          >
            Schedule a Tour
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-br from-white via-[var(--background)] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-6">
            Grow Your Business
            <br />
            <span style={{ color: property.accentColor }}>
              In a Thriving Location
            </span>
          </h2>
          <p className="text-xl text-[var(--foreground-muted)] mb-10 max-w-3xl mx-auto leading-relaxed">
            Join our community of successful businesses at {property.name}.
            Prime visibility on US Highway 19 with ample parking and foot
            traffic.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inquire"
              onClick={() => analytics.tourClick(property.slug)}
              className="text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: property.accentColor }}
            >
              Schedule a Tour
            </Link>
            <a
              href={`https://www.google.com/maps/place/${property.mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-[var(--background-muted)] border-2 px-10 py-4 rounded-full font-bold text-lg transition-all"
              style={{
                borderColor: property.accentColor,
                color: property.accentColor,
              }}
            >
              View on Map
            </a>
          </div>
        </div>
      </section>

      {/* Why Lease Here */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-[var(--foreground)]">
            Why Lease at{" "}
            <span style={{ color: property.accentColor }}>{property.name}?</span>
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {property.features.map((feature, i) => (
              <div key={i} className="text-center group">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${property.accentColor}15` }}
                >
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-[var(--foreground)] mb-2">
                  {feature.title}
                </h4>
                <p className="text-[var(--foreground-muted)] text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tenants */}
      <section className="py-16 px-4 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-4 text-[var(--foreground)]">
            Featured{" "}
            <span style={{ color: property.accentColor }}>Tenants</span>
          </h3>
          <p className="text-center text-[var(--foreground-muted)] mb-12 max-w-2xl mx-auto">
            Join these successful businesses already thriving at {property.name}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {property.tenants.map((tenant, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-[var(--border)] relative"
              >
                {tenant.badge && (
                  <span
                    className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: property.accentColor }}
                  >
                    {tenant.badge}
                  </span>
                )}
                <p
                  className="text-sm font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: property.accentColor }}
                >
                  {tenant.category}
                </p>
                <h4 className="text-lg font-bold mb-2 text-[var(--foreground)]">
                  {tenant.name}
                </h4>
                <p className="text-[var(--foreground-muted)] text-sm mb-3">
                  {tenant.description}
                </p>
                {tenant.rating && (
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-[var(--foreground)]">
                      {tenant.rating}
                    </span>
                    <span className="text-[var(--foreground-muted)] text-sm">
                      ({tenant.reviews?.toLocaleString()})
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Info */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="text-white p-8 rounded-2xl shadow-lg"
              style={{ backgroundColor: property.accentColor }}
            >
              <div className="text-4xl mb-4">🏢</div>
              <h4 className="text-2xl font-bold mb-4">Property Details</h4>
              <div className="space-y-2 text-white/90">
                {property.stats.map((stat, i) => (
                  <p key={i}>
                    <strong>{stat.label}:</strong> {stat.value}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-[var(--foreground)] text-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">📍</div>
              <h4 className="text-2xl font-bold mb-4">Location</h4>
              <div className="space-y-2 text-white/90">
                <p>{property.address}</p>
                <p>
                  {property.city}, {property.state} {property.zip}
                </p>
                <a
                  href={`https://www.google.com/maps/place/${property.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 underline hover:no-underline"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-16 px-4 text-white"
        style={{ backgroundColor: property.accentColor }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Grow Your Business?
          </h3>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Schedule a tour today and discover why {property.name} is the right
            choice for your business.
          </p>
          <Link
            href="/inquire"
            onClick={() => analytics.tourClick(property.slug)}
            className="inline-block bg-white hover:bg-[var(--background)] px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg"
            style={{ color: property.accentColor }}
          >
            Schedule a Tour
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--foreground)] text-white/70 py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: property.accentColor }}
          >
            {property.name}
          </h2>
          <p className="text-white/50 mb-4">{property.tagline}</p>
          <p className="text-sm text-white/50">
            {property.address}, {property.city}, {property.state} {property.zip}
          </p>
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="mb-4 space-x-4">
              <a href="/terms" className="text-white/50 hover:text-white/80 underline text-sm">Terms of Service</a>
              <a href="/privacy" className="text-white/50 hover:text-white/80 underline text-sm">Privacy Policy</a>
            </div>
            <p className="text-xs text-white/40 max-w-2xl mx-auto">
              This site is an independent directory operated by Newman Properties LLC. We are not affiliated with, 
              endorsed by, or connected to the property owner or management company. All information is aggregated 
              from publicly available sources. For official leasing inquiries, contact the property directly.
            </p>
            <p className="text-sm text-white/50 mt-4">
              © 2025 Newman Properties LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

