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
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: property.accentColor }}
        >
          {property.name}
        </h2>
        <p className="text-white/50 mb-4">{property.tagline}</p>
        <p className="text-sm text-white/50 mb-6">
          {property.address}, {property.city}, {property.state} {property.zip}
        </p>

        <div className="mb-4 space-x-4">
          <Link
            href="/terms"
            className="text-white/50 hover:text-white/80 text-sm"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-white/50 hover:text-white/80 text-sm"
          >
            Privacy
          </Link>
          <Link
            href="/disclaimer"
            className="text-white/50 hover:text-white/80 text-sm"
          >
            Disclaimer
          </Link>
        </div>

        <p className="text-sm text-white/50">
          © 2025{" "}
          <Link
            href="https://newmanpropertiesllc.com"
            className="hover:text-white/80 underline"
          >
            Newman Properties LLC
          </Link>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
