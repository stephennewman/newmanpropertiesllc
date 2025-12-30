import Link from "next/link";
import { getAllProperties } from "@/data/properties";
import { MapPin, Users, Calendar, TrendingUp, Zap, Globe, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const properties = getAllProperties();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-6 px-4 border-b border-[var(--border)] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Newman Properties LLC
            </h1>
            <p className="text-[var(--foreground-muted)] text-sm">
              Digital Presence for Local Plazas
            </p>
          </div>
          <a
            href="mailto:stephen@krezzo.com"
            className="hidden sm:inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-5 py-2.5 rounded-full font-medium transition-colors text-sm"
          >
            <Mail className="w-4 h-4" />
            Get Started
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--secondary)]/5"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--primary)]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[var(--secondary)]/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[var(--primary)]/10 text-[var(--primary)] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Built for Local Commercial Properties
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6 leading-tight">
              Transform Your Plaza Into a
              <span className="text-[var(--primary)]"> Lead-Generating Machine</span>
            </h2>
            
            <p className="text-xl text-[var(--foreground-muted)] mb-8 leading-relaxed max-w-2xl">
              We build beautiful, conversion-optimized digital experiences for shopping plazas and local businesses. 
              Get found online, showcase your tenants, and fill vacancies faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:stephen@krezzo.com?subject=Digital Presence for My Plaza"
                className="inline-flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-[var(--primary)]/25"
              >
                Get Your Plaza Online
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[var(--background-muted)] text-[var(--foreground)] px-8 py-4 rounded-full font-semibold border border-[var(--border)] transition-colors"
              >
                See Our Work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
              Everything Your Plaza Needs to Thrive Online
            </h3>
            <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
              A complete digital solution designed specifically for commercial property owners and managers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-[var(--background)] rounded-2xl p-8 border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors">
              <div className="w-14 h-14 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center mb-5">
                <Globe className="w-7 h-7 text-[var(--primary)]" />
              </div>
              <h4 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Custom Landing Pages
              </h4>
              <p className="text-[var(--foreground-muted)]">
                Beautiful, branded pages that showcase your plaza, tenants, and available spaces. Mobile-optimized and SEO-ready.
              </p>
            </div>
            
            {/* Service 2 */}
            <div className="bg-[var(--background)] rounded-2xl p-8 border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors">
              <div className="w-14 h-14 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mb-5">
                <Users className="w-7 h-7 text-[var(--secondary)]" />
              </div>
              <h4 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Smart Lead Generation
              </h4>
              <p className="text-[var(--foreground-muted)]">
                Multi-step inquiry forms that qualify leads automatically. Know who&apos;s serious before you spend time on calls.
              </p>
            </div>
            
            {/* Service 3 */}
            <div className="bg-[var(--background)] rounded-2xl p-8 border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-5">
                <Calendar className="w-7 h-7 text-indigo-500" />
              </div>
              <h4 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Tour Scheduling
              </h4>
              <p className="text-[var(--foreground-muted)]">
                Priority-based scheduling shows the right availability to the right prospects. High-value leads get first picks.
              </p>
            </div>
            
            {/* Service 4 */}
            <div className="bg-[var(--background)] rounded-2xl p-8 border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors">
              <div className="w-14 h-14 bg-rose-500/10 rounded-xl flex items-center justify-center mb-5">
                <TrendingUp className="w-7 h-7 text-rose-500" />
              </div>
              <h4 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Lead Scoring
              </h4>
              <p className="text-[var(--foreground-muted)]">
                Our algorithm scores every inquiry based on business type, space needs, timeline, and budget. Focus on what matters.
              </p>
            </div>
            
            {/* Service 5 */}
            <div className="bg-[var(--background)] rounded-2xl p-8 border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5">
                <Mail className="w-7 h-7 text-emerald-500" />
              </div>
              <h4 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Instant Notifications
              </h4>
              <p className="text-[var(--foreground-muted)]">
                Get email alerts the moment someone inquires. Complete lead details delivered straight to your inbox.
              </p>
            </div>
            
            {/* Service 6 */}
            <div className="bg-[var(--background)] rounded-2xl p-8 border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors">
              <div className="w-14 h-14 bg-violet-500/10 rounded-xl flex items-center justify-center mb-5">
                <MapPin className="w-7 h-7 text-violet-500" />
              </div>
              <h4 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Tenant Showcase
              </h4>
              <p className="text-[var(--foreground-muted)]">
                Highlight your existing businesses with categories, contact info, and links. Drive foot traffic to your tenants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[var(--background)] to-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[var(--primary)] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative">
              <h3 className="text-3xl sm:text-4xl font-bold mb-8">
                What You Get
              </h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Your Own Subdomain</p>
                    <p className="text-white/70 text-sm">yourplaza.newmanpropertiesllc.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Mobile Optimized</p>
                    <p className="text-white/70 text-sm">Perfect on any device</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">SEO Ready</p>
                    <p className="text-white/70 text-sm">Get found on Google</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">No Maintenance</p>
                    <p className="text-white/70 text-sm">We handle everything</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
              Plazas We&apos;ve Brought Online
            </h3>
            <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
              Real shopping centers in Palm Harbor, FL with live landing pages and lead generation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Link
                key={property.slug}
                href={`https://${property.slug}.newmanpropertiesllc.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[var(--background)] rounded-2xl border border-[var(--border)] p-6 hover:shadow-xl hover:shadow-black/5 hover:border-[var(--primary)]/30 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl"
                    style={{ backgroundColor: property.accentColor }}
                  >
                    🏪
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                      {property.name}
                    </h4>
                    <p className="text-sm text-[var(--foreground-light)]">
                      {property.city}, {property.state}
                    </p>
                  </div>
                </div>
                
                <p className="text-[var(--foreground-muted)] text-sm mb-4">
                  {property.tagline}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {property.stats.slice(0, 2).map((stat, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white px-3 py-1.5 rounded-full text-[var(--foreground-muted)] border border-[var(--border)]"
                    >
                      {stat.label}: {stat.value}
                    </span>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="text-xs text-[var(--foreground-light)]">View Live Site</span>
                  <ArrowRight className="w-4 h-4 text-[var(--primary)] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-3xl border border-[var(--border)] p-8 sm:p-12 shadow-xl shadow-black/5">
            <h3 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
              Ready to Fill Your Vacancies?
            </h3>
            <p className="text-lg text-[var(--foreground-muted)] mb-8 max-w-lg mx-auto">
              Let&apos;s talk about how we can bring your plaza online and start generating qualified leads.
            </p>
            <a
              href="mailto:stephen@krezzo.com?subject=Digital Presence for My Plaza"
              className="inline-flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-[var(--primary)]/25 text-lg"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
            <p className="mt-6 text-sm text-[var(--foreground-light)]">
              stephen@krezzo.com
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[var(--border)] bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-[var(--foreground)]">Newman Properties LLC</p>
              <p className="text-sm text-[var(--foreground-muted)]">Digital Presence for Local Plazas</p>
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
          <div className="mt-8 pt-8 border-t border-[var(--border)] text-center">
            <p className="text-sm text-[var(--foreground-muted)]">
              © 2025 Newman Properties LLC. All rights reserved.
            </p>
            <p className="mt-3 text-xs text-[var(--foreground-light)] max-w-2xl mx-auto">
              Newman Properties LLC is an independent directory service. We are not affiliated with, endorsed by, 
              or connected to any property owners or management companies. All property information is aggregated 
              from public sources.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
