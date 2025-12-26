import Link from "next/link";
import { getAllProperties } from "@/data/properties";

export default function HomePage() {
  const properties = getAllProperties();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-6 px-4 border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            Newman Properties LLC
          </h1>
          <p className="text-[var(--foreground-muted)] text-sm">
            Digital Real Estate for Local Businesses
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-4">
              Find Your Next
              <span className="text-[var(--primary)]"> Business Location</span>
            </h2>
            <p className="text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto">
              Explore commercial spaces in Palm Harbor&apos;s premier shopping
              centers. Schedule tours and connect with property managers.
            </p>
          </div>

          {/* Properties Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Link
                key={property.slug}
                href={`https://${property.slug}.newmanpropertiesllc.com`}
                className="group bg-white rounded-2xl border border-[var(--border)] p-6 hover:shadow-lg hover:border-[var(--primary)] transition-all"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl mb-4"
                  style={{ backgroundColor: property.accentColor }}
                >
                  🏪
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {property.name}
                </h3>
                <p className="text-[var(--foreground-muted)] text-sm mb-3">
                  {property.tagline}
                </p>
                <p className="text-[var(--foreground-light)] text-sm">
                  {property.address}
                  <br />
                  {property.city}, {property.state} {property.zip}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {property.stats.slice(0, 2).map((stat, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[var(--background-muted)] px-2 py-1 rounded-full text-[var(--foreground-muted)]"
                    >
                      {stat.label}: {stat.value}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 py-12 bg-white rounded-2xl border border-[var(--border)]">
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
              Own a Commercial Property?
            </h3>
            <p className="text-[var(--foreground-muted)] mb-6 max-w-lg mx-auto">
              Let us build and manage your digital presence. Generate leads
              without the hassle.
            </p>
            <a
              href="mailto:stephen@krezzo.com"
              className="inline-block bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto text-center text-sm text-[var(--foreground-muted)]">
          <p>© 2025 Newman Properties LLC. All rights reserved.</p>
          <p className="mt-2">Digital Real Estate for Local Businesses</p>
        </div>
      </footer>
    </div>
  );
}
