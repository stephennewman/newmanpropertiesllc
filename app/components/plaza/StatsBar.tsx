"use client";

import { Car, Users, DollarSign, ParkingSquare } from "lucide-react";
import { Demographics, PropertyDetails } from "@/data/properties";
import { formatNumber, formatCurrency } from "@/app/utils/plazaStats";

interface StatsBarProps {
  demographics: Demographics;
  propertyDetails: PropertyDetails;
  accentColor: string;
}

export default function StatsBar({
  demographics,
  propertyDetails,
  accentColor,
}: StatsBarProps) {
  const stats = [
    {
      icon: Car,
      label: "Daily Traffic",
      value: formatNumber(demographics.dailyTraffic),
      suffix: "vehicles",
    },
    {
      icon: Users,
      label: "3-Mile Population",
      value: formatNumber(demographics.population3Mile),
      suffix: "residents",
    },
    {
      icon: DollarSign,
      label: "Avg. Household Income",
      value: formatCurrency(demographics.avgIncome3Mile),
      suffix: "3-mile radius",
    },
    ...(propertyDetails.parkingSpaces
      ? [
          {
            icon: ParkingSquare,
            label: "Parking",
            value: formatNumber(propertyDetails.parkingSpaces),
            suffix: "spaces",
          },
        ]
      : []),
  ];

  return (
    <section className="py-8 px-4 bg-white border-y border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-4 rounded-xl bg-[var(--background)] hover:shadow-md transition-shadow w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <div
                className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}15` }}
              >
                <stat.icon
                  className="w-6 h-6"
                  style={{ color: accentColor }}
                />
              </div>
              <p
                className="text-2xl font-bold"
                style={{ color: accentColor }}
              >
                {stat.value}
              </p>
              <p className="text-sm text-[var(--foreground-muted)] mt-1">
                {stat.label}
              </p>
              <p className="text-xs text-[var(--foreground-light)]">
                {stat.suffix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

