"use client";

import { Star, ExternalLink } from "lucide-react";
import { Tenant, PropertyData } from "@/data/properties";

interface TenantCardProps {
  tenant: Tenant;
  property: PropertyData;
  accentColor: string;
}

export default function TenantCard({
  tenant,
  property,
  accentColor,
}: TenantCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-[var(--border)] relative group">
      {tenant.badge && (
        <span
          className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: accentColor }}
        >
          {tenant.badge}
        </span>
      )}
      
      <p
        className="text-sm font-semibold mb-2 uppercase tracking-wider"
        style={{ color: accentColor }}
      >
        {tenant.category}
      </p>
      
      <h4 className="text-lg font-bold mb-2 text-[var(--foreground)]">
        {tenant.name}
      </h4>
      
      <p className="text-[var(--foreground-muted)] text-sm mb-4">
        {tenant.description}
      </p>
      
      {tenant.rating && (
        <div className="flex items-center gap-1 text-amber-500 mb-4">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-bold text-[var(--foreground)]">
            {tenant.rating}
          </span>
          <span className="text-[var(--foreground-muted)] text-sm">
            ({tenant.reviews?.toLocaleString()} reviews)
          </span>
        </div>
      )}
      
      {tenant.website && (
        <div className="flex gap-2 mt-auto">
          <a
            href={tenant.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Visit Website
          </a>
        </div>
      )}
    </div>
  );
}

