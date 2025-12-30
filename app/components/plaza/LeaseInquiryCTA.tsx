"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Users, DollarSign, Car } from "lucide-react";
import { Demographics, PropertyDetails } from "@/data/properties";
import { formatNumber, formatCurrency } from "@/app/utils/plazaStats";
import { analytics } from "@/app/utils/analytics";

interface LeaseInquiryCTAProps {
  demographics: Demographics;
  propertyDetails: PropertyDetails;
  plazaName: string;
  plazaSlug: string;
  accentColor: string;
}

export default function LeaseInquiryCTA({
  demographics,
  propertyDetails,
  plazaName,
  plazaSlug,
  accentColor,
}: LeaseInquiryCTAProps) {
  const pathname = usePathname();
  // Build inquiry URL that works both on subdomains (/inquire) and local paths (/sites/[slug]/inquire)
  const inquireUrl = pathname === "/" ? "/inquire" : `${pathname}/inquire`;
  const highlights = [
    {
      icon: Car,
      value: formatNumber(demographics.dailyTraffic),
      label: "Daily Traffic",
    },
    {
      icon: Users,
      value: formatNumber(demographics.population3Mile),
      label: "3-Mile Population",
    },
    {
      icon: DollarSign,
      value: formatCurrency(demographics.avgIncome3Mile),
      label: "Avg. Income",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[var(--background)] to-white">
      <div className="max-w-4xl mx-auto">
        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-[var(--border)]"></div>
          <span className="text-[var(--foreground-muted)] text-sm uppercase tracking-wider">
            For Business Owners
          </span>
          <div className="flex-1 h-px bg-[var(--border)]"></div>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold text-[var(--foreground)] mb-4">
            Interested in This Location?
          </h3>
          <p className="text-lg text-[var(--foreground-muted)] mb-8 max-w-2xl mx-auto">
            Join the thriving business community at {plazaName}. Prime visibility,
            strong demographics, and excellent co-tenancy opportunities.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-8">
            {highlights.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon
                  className="w-5 h-5 mx-auto mb-2"
                  style={{ color: accentColor }}
                />
                <p className="font-bold text-[var(--foreground)]">{stat.value}</p>
                <p className="text-xs text-[var(--foreground-muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {propertyDetails.occupancy && (
            <p className="text-sm text-[var(--foreground-muted)] mb-6">
              Currently <strong>{propertyDetails.occupancy}</strong> occupied
              {propertyDetails.anchor && (
                <> • Anchored by <strong>{propertyDetails.anchor}</strong></>
              )}
            </p>
          )}

          <Link
            href={inquireUrl}
            onClick={() => analytics.tourClick(plazaSlug)}
            className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:opacity-90 shadow-lg cursor-pointer"
            style={{ backgroundColor: accentColor }}
          >
            Learn About Leasing
            <ChevronRight className="w-5 h-5" />
          </Link>

          <p className="text-sm text-[var(--foreground-light)] mt-4">
            We respond within 24 hours
          </p>
        </div>
      </div>
    </section>
  );
}

