import { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Newman Properties LLC",
  description: "Privacy Policy for Newman Properties LLC - how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Privacy Policy</h1>
          <p className="text-[var(--foreground-muted)] mb-8">Last updated: December 30, 2025</p>

          {/* Disclaimer Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 not-prose">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">
                <strong>Important:</strong> This site is an independent directory operated by Newman Properties LLC. 
                We are not affiliated with, endorsed by, or connected to the property owner or management company. 
                All information is aggregated from publicly available sources. For official leasing inquiries, 
                contact the property directly. <Link href="/disclaimer" className="text-amber-700 underline hover:text-amber-900">Read full disclaimer</Link>
              </p>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">1. Introduction</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              Newman Properties LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to 
              protecting your personal information. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">2. Information We Collect</h2>
            
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Personal Information</h3>
            <p className="text-[var(--foreground-muted)] mb-4">
              When you submit an inquiry through our website, we may collect:
            </p>
            <ul className="list-disc pl-6 text-[var(--foreground-muted)] mb-4 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business name</li>
              <li>Information about your space requirements (business type, size needs, timeline, budget)</li>
              <li>Any additional information you choose to provide</li>
            </ul>

            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Automatically Collected Information</h3>
            <p className="text-[var(--foreground-muted)] mb-4">
              When you visit our website, we may automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 text-[var(--foreground-muted)] mb-4 space-y-1">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website</li>
              <li>Geographic location (city/region level)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">3. How We Use Your Information</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-[var(--foreground-muted)] mb-4 space-y-2">
              <li><strong>To respond to inquiries:</strong> Contact you about commercial space opportunities</li>
              <li><strong>To facilitate connections:</strong> Share your inquiry information with relevant property representatives</li>
              <li><strong>To improve our services:</strong> Analyze usage patterns and optimize our website</li>
              <li><strong>To send communications:</strong> Provide updates about properties or services you&apos;ve expressed interest in</li>
              <li><strong>To comply with legal obligations:</strong> Respond to legal requests or prevent fraud</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">4. Information Sharing</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-[var(--foreground-muted)] mb-4 space-y-2">
              <li><strong>With property contacts:</strong> When you submit an inquiry, we may share your information with property owners, managers, or brokers</li>
              <li><strong>With service providers:</strong> Third-party services that help us operate our website (e.g., email services, analytics)</li>
              <li><strong>For legal purposes:</strong> When required by law or to protect our rights</li>
            </ul>
            <p className="text-[var(--foreground-muted)] mb-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">5. Analytics and Tracking</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              We use Google Analytics to understand how visitors interact with our website. Google Analytics 
              collects information such as how often users visit the site, what pages they visit, and what 
              other sites they used prior to coming to our site. We use this information to improve our 
              website and services.
            </p>
            <p className="text-[var(--foreground-muted)] mb-4">
              You can opt out of Google Analytics by installing the 
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline"> Google Analytics Opt-out Browser Add-on</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">6. Data Security</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              We implement reasonable security measures to protect your personal information from unauthorized 
              access, alteration, disclosure, or destruction. However, no method of transmission over the 
              Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">7. Data Retention</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes for which 
              it was collected, or as required by law. Inquiry data is typically retained for up to 24 months 
              unless you request deletion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">8. Your Rights</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-[var(--foreground-muted)] mb-4 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="text-[var(--foreground-muted)] mb-4">
              To exercise these rights, please contact us using the information below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">9. Third-Party Links</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              Our website may contain links to third-party websites (such as Google Maps or business websites). 
              We are not responsible for the privacy practices of these external sites. We encourage you to 
              review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect 
              personal information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">11. Changes to This Policy</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with 
              an updated revision date. Your continued use of the website after any changes constitutes 
              acceptance of the new policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">12. Contact Us</h2>
            <p className="text-[var(--foreground-muted)] mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
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
            <Link href="/terms" className="hover:text-[var(--foreground)]">Terms</Link>
            <Link href="/privacy" className="hover:text-[var(--foreground)]">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-[var(--foreground)]">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


