"use client";

import { NearbyPlace } from "@/data/properties";

interface NearbySectionProps {
  nearby: NearbyPlace[];
  accentColor: string;
}

const typeIcons: Record<string, string> = {
  hospital: "🏥",
  school: "🏫",
  park: "🌳",
  beach: "🏖️",
  library: "📚",
  recreation: "⛳",
  attraction: "🎯",
};

export default function NearbySection({
  nearby,
  accentColor,
}: NearbySectionProps) {
  if (!nearby || nearby.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-2 text-[var(--foreground)]">
          What&apos;s <span style={{ color: accentColor }}>Nearby</span>
        </h3>
        <p className="text-center text-[var(--foreground-muted)] mb-8">
          Conveniently located near schools, parks, and attractions
        </p>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {nearby.map((place, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[var(--border)] w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
            >
              <span className="text-2xl">
                {typeIcons[place.type] || "📍"}
              </span>
              <div>
                <p className="font-semibold text-[var(--foreground)]">
                  {place.name}
                </p>
                <p className="text-sm text-[var(--foreground-muted)]">
                  {place.distance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

