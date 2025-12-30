import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Newman Properties LLC",
  description: "Terms of Service and legal disclaimers for Newman Properties LLC website and services.",
};

export default function TermsPage() {
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
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Terms of Service</h1>
          <p className="text-[var(--foreground-muted)] mb-8">Last updated: December 29, 2025</p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">1. Acceptance of Terms</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              By accessing or using the Newman Properties LLC website and any associated subdomain sites 
              (collectively, the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you 
              do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-amber-800 mb-4">⚠️ 2. Important Disclaimer - No Affiliation</h2>
            <p className="text-amber-900 mb-4">
              <strong>Newman Properties LLC is an independent directory and information service.</strong> We are 
              <strong> NOT affiliated with, endorsed by, or officially connected to</strong> any of the shopping 
              centers, plazas, property owners, property management companies, or landlords featured on this website.
            </p>
            <p className="text-amber-900 mb-4">
              The property information, tenant listings, and other data displayed on this website is aggregated 
              from publicly available sources, including but not limited to Google Maps, public business directories, 
              commercial real estate listings, and other public records. We do not claim ownership or management 
              authority over any properties listed.
            </p>
            <p className="text-amber-900">
              For official leasing inquiries, property management concerns, or authoritative information about 
              any property, please contact the property owner or management company directly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">3. Purpose of Service</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              Newman Properties LLC provides an information aggregation and lead generation service designed to:
            </p>
            <ul className="list-disc pl-6 text-[var(--foreground-muted)] mb-4 space-y-2">
              <li>Help prospective business tenants discover commercial retail spaces in the Palm Harbor, Florida area</li>
              <li>Aggregate and present publicly available information about local shopping centers and plazas</li>
              <li>Facilitate connections between interested parties and commercial properties</li>
              <li>Provide a directory of businesses located at various shopping centers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">4. Accuracy of Information</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              While we strive to provide accurate and up-to-date information, Newman Properties LLC makes no 
              warranties or representations regarding the accuracy, completeness, or reliability of any information 
              displayed on this website. Information about properties, tenants, available spaces, and other details 
              may change without notice.
            </p>
            <p className="text-[var(--foreground-muted)] mb-4">
              Users should independently verify all information before making any business or leasing decisions. 
              We are not responsible for any errors, omissions, or outdated information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">5. No Leasing Authority</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              Newman Properties LLC does not have the authority to enter into lease agreements, negotiate rental 
              terms, or make any binding commitments on behalf of any property owner or management company. Any 
              inquiry submitted through this website is for informational purposes only and does not constitute 
              a lease application or binding agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">6. User Submissions</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              When you submit an inquiry through our website, you consent to Newman Properties LLC collecting 
              and using the information you provide to facilitate potential connections with property representatives 
              or to provide you with relevant information about commercial spaces.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">7. Intellectual Property</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              The names, logos, and trademarks of shopping centers, businesses, and other entities displayed on 
              this website are the property of their respective owners. Their inclusion on this website does not 
              imply any affiliation with or endorsement by Newman Properties LLC.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">8. Limitation of Liability</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              To the fullest extent permitted by law, Newman Properties LLC shall not be liable for any direct, 
              indirect, incidental, consequential, or punitive damages arising from your use of or inability to 
              use the Service, or from any information obtained through the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">9. Changes to Terms</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective 
              immediately upon posting to this website. Your continued use of the Service after any changes 
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">10. Contact Information</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-[var(--foreground-muted)]">
              <strong>Newman Properties LLC</strong><br />
              Email: stephen@krezzo.com
            </p>
          </section>
        </div>
      </main>

      <footer className="py-8 px-4 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center text-sm text-[var(--foreground-muted)]">
          <p>© 2025 Newman Properties LLC. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-[var(--foreground)]">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-[var(--foreground)]">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


