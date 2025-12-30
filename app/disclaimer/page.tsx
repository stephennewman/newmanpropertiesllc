import { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | Newman Properties LLC",
  description: "Important disclaimer regarding Newman Properties LLC independent directory service.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="py-6 px-4 border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-[var(--primary)] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Disclaimer</h1>
          <p className="text-[var(--foreground-muted)] mb-8">Last updated: December 30, 2025</p>

          {/* Main Disclaimer Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 sm:p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-800 mb-4">Independent Directory Notice</h2>
                <p className="text-amber-900 leading-relaxed">
                  This site is an independent directory operated by Newman Properties LLC. We are not 
                  affiliated with, endorsed by, or connected to the property owner or management company. 
                  All information is aggregated from publicly available sources. For official leasing 
                  inquiries, contact the property directly.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">About This Directory</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              Newman Properties LLC operates this website as a free community resource to help connect 
              local businesses with commercial spaces in the Palm Harbor, Florida area. Our goal is to 
              make it easier for entrepreneurs to discover available locations and for shopping plazas 
              to gain online visibility.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Information Sources</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              The property information, tenant listings, and other data displayed on this website is 
              compiled from publicly available sources, including:
            </p>
            <ul className="list-disc pl-6 text-[var(--foreground-muted)] mb-4 space-y-2">
              <li>Google Maps and Google Business listings</li>
              <li>Public business directories</li>
              <li>Commercial real estate listings</li>
              <li>County property records</li>
              <li>Other publicly accessible information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">No Guarantee of Accuracy</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              While we make reasonable efforts to keep information current, we cannot guarantee the 
              accuracy, completeness, or timeliness of any information on this site. Business tenants 
              may change, available spaces may be leased, and property details may differ from what 
              is displayed.
            </p>
            <p className="text-[var(--foreground-muted)]">
              Users should independently verify all information before making any business or leasing decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">No Authority to Lease</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              Newman Properties LLC does not have the authority to negotiate leases, set rental rates, 
              or make commitments on behalf of any property owner. Inquiries submitted through this 
              website are for informational purposes and do not constitute lease applications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Trademarks</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              All property names, business names, logos, and trademarks displayed on this website are 
              the property of their respective owners. Their inclusion does not imply any affiliation 
              with or endorsement of Newman Properties LLC.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Contact Us</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              If you are a property owner or manager and would like to update information about your 
              property, or if you have any concerns about content on this site, please contact us:
            </p>
            <p className="text-[var(--foreground-muted)]">
              <strong>Newman Properties LLC</strong><br />
              Email: <a href="mailto:stephen@krezzo.com" className="text-[var(--primary)] hover:underline">stephen@krezzo.com</a>
            </p>
          </section>

          {/* Links to Other Legal Pages */}
          <div className="bg-[var(--background-muted)] rounded-xl p-6 mt-10">
            <p className="text-sm text-[var(--foreground-muted)] mb-3">See also:</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/terms" className="text-[var(--primary)] hover:underline text-sm font-medium">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-[var(--primary)] hover:underline text-sm font-medium">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 px-4 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center text-sm text-[var(--foreground-muted)]">
          <p className="mb-2">
            <Link href="https://newmanpropertiesllc.com" className="text-[var(--primary)] hover:underline">
              Newman Properties LLC
            </Link>
          </p>
          <p>© 2025 Newman Properties LLC. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-[var(--foreground)]">Terms</Link>
            <Link href="/privacy" className="hover:text-[var(--foreground)]">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-[var(--foreground)]">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

