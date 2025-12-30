"use client";

import Link from "next/link";
import { PropertyData } from "@/data/properties";

interface DataSourceFooterProps {
  property: PropertyData;
}

export default function DataSourceFooter({ property }: DataSourceFooterProps) {
  return (
    <footer className="bg-[var(--foreground)] text-white/70 py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <Link 
          href="https://newmanpropertiesllc.com" 
          className="inline-block text-white/40 hover:text-white/60 text-xs mb-4 transition-colors"
        >
          ← Back to Newman Properties LLC
        </Link>
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

        {/* Data Sources */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-white/40 mb-2">
            Traffic & demographic data: {property.demographics.dataSource} (
            {property.demographics.lastUpdated})
          </p>
          <p className="text-xs text-white/30 mb-4">
            Business ratings from Google Maps. Last verified December 2024.
          </p>

          <div className="mb-4 space-x-4">
            <Link
              href="/terms"
              className="text-white/50 hover:text-white/80 underline text-sm"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-white/50 hover:text-white/80 underline text-sm"
            >
              Privacy
            </Link>
            <Link
              href="/disclaimer"
              className="text-white/50 hover:text-white/80 underline text-sm"
            >
              Disclaimer
            </Link>
          </div>

          <p className="text-xs text-white/40 max-w-2xl mx-auto">
            This site is an independent directory operated by Newman Properties
            LLC. We are not affiliated with, endorsed by, or connected to the
            property owner or management company. All information is aggregated
            from publicly available sources. For official leasing inquiries,
            contact the property directly.
          </p>

          <p className="text-sm text-white/50 mt-4">
            © 2025 Newman Properties LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

