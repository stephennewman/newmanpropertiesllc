import Link from "next/link";
import { getAllProperties } from "@/data/properties";
import { MapPin, Building2, Users, Handshake, ArrowRight, Sparkles, Store } from "lucide-react";

export default function HomePage() {
  const properties = getAllProperties();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-5 px-4 border-b border-[var(--border)] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--foreground)]">
              Newman Properties LLC
            </h1>
            <p className="text-[var(--foreground-muted)] text-xs">
              Connecting Palm Harbor&apos;s Business Community
            </p>
          </div>
          <a
            href="mailto:stephen@krezzo.com"
            className="text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(13,148,136,0.06),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.05),transparent_50%)]"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--primary)]/8 text-[var(--primary)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            A Free Community Resource
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-5 leading-tight">
            Discover Local Shopping Plazas
            <br />
            <span className="text-[var(--primary)]">Find Your Next Business Home</span>
          </h2>
          
          <p className="text-lg text-[var(--foreground-muted)] mb-10 max-w-2xl mx-auto leading-relaxed">
            We&apos;re building a digital directory of Palm Harbor&apos;s commercial spaces — 
            helping local entrepreneurs find the right location and giving plazas the online presence they deserve.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#plazas"
              className="inline-flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-7 py-3.5 rounded-full font-semibold transition-colors"
            >
              <Store className="w-5 h-5" />
              Browse Plazas
            </a>
            <a
              href="mailto:stephen@krezzo.com?subject=Add My Plaza to the Directory"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[var(--background)] text-[var(--foreground)] px-7 py-3.5 rounded-full font-semibold border border-[var(--border)] transition-colors"
            >
              <Building2 className="w-5 h-5" />
              List Your Property
            </a>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* For Business Owners */}
            <div className="bg-white rounded-2xl p-8 border border-[var(--border)]">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center mb-5">
                <Users className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Looking for Commercial Space?
              </h3>
              <p className="text-[var(--foreground-muted)] mb-5">
                Browse available locations, see what businesses are already there, 
                and schedule tours — all in one place. No fees, no hassle.
              </p>
              <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full"></span>
                  See tenant mix before you visit
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full"></span>
                  Schedule tours online
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full"></span>
                  Connect directly with property managers
                </li>
              </ul>
            </div>
            
            {/* For Plaza Owners */}
            <div className="bg-white rounded-2xl p-8 border border-[var(--border)]">
              <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6 text-[var(--secondary)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Own a Commercial Property?
              </h3>
              <p className="text-[var(--foreground-muted)] mb-5">
                Get your plaza online with a professional landing page. 
                Showcase your tenants, attract new businesses, and receive qualified inquiries.
              </p>
              <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--secondary)] rounded-full"></span>
                  Free digital presence for your plaza
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--secondary)] rounded-full"></span>
                  Lead generation built-in
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[var(--secondary)] rounded-full"></span>
                  No maintenance required
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Plazas Section */}
      <section id="plazas" className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-3">
              Palm Harbor Shopping Plazas
            </h3>
            <p className="text-[var(--foreground-muted)] max-w-xl mx-auto">
              Explore local commercial centers and find the perfect spot for your business.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {properties.map((property) => (
              <Link
                key={property.slug}
                href={`https://${property.slug}.newmanpropertiesllc.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[var(--background)] rounded-xl border border-[var(--border)] p-5 hover:shadow-lg hover:border-[var(--primary)]/20 transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg flex-shrink-0"
                    style={{ backgroundColor: property.accentColor }}
                  >
                    🏪
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-tight">
                      {property.name}
                    </h4>
                    <p className="text-xs text-[var(--foreground-light)] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {property.city}, {property.state}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-[var(--foreground-muted)] mb-3 line-clamp-2">
                  {property.tagline}
                </p>
                
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                  <div className="flex gap-2">
                    {property.stats.slice(0, 1).map((stat, i) => (
                      <span
                        key={i}
                        className="text-xs text-[var(--foreground-muted)]"
                      >
                        {stat.value} {stat.label.toLowerCase()}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-[var(--primary)] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    View
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-sm text-[var(--foreground-muted)]">
              Don&apos;t see your plaza? {" "}
              <a 
                href="mailto:stephen@krezzo.com?subject=Add My Plaza to the Directory" 
                className="text-[var(--primary)] hover:underline font-medium"
              >
                Let us add it for free
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--primary)]/10 rounded-full mb-6">
            <Handshake className="w-7 h-7 text-[var(--primary)]" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-4">
            Supporting Local Business
          </h3>
          <p className="text-lg text-[var(--foreground-muted)] leading-relaxed">
            Palm Harbor has amazing shopping plazas that often go unnoticed online. 
            We&apos;re on a mission to change that — giving every local plaza a digital home 
            and making it easier for entrepreneurs to find their next location.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl p-8 sm:p-10 text-white text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Have a Plaza or Know of One?
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              We&apos;re always looking to expand our directory. Help us connect more businesses with great locations.
            </p>
            <a
              href="mailto:stephen@krezzo.com?subject=Plaza Suggestion for Newman Properties"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-[var(--primary)] px-7 py-3 rounded-full font-semibold transition-colors"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-bold text-[var(--foreground)]">Newman Properties LLC</p>
              <p className="text-sm text-[var(--foreground-muted)]">Connecting Palm Harbor&apos;s Business Community</p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors">
                Privacy
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
            <p className="text-sm text-[var(--foreground-muted)]">
              © 2025 Newman Properties LLC
            </p>
            <p className="mt-3 text-xs text-[var(--foreground-light)] max-w-xl mx-auto">
              An independent community directory. Not affiliated with property owners or management companies. 
              Information aggregated from public sources.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
