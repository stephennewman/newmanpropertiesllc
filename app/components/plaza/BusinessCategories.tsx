"use client";

import { Tenant } from "@/data/properties";
import { getBusinessCategories, CategoryCount } from "@/app/utils/plazaStats";

interface BusinessCategoriesProps {
  tenants: Tenant[];
  accentColor: string;
  plazaName: string;
}

export default function BusinessCategories({
  tenants,
  accentColor,
  plazaName,
}: BusinessCategoriesProps) {
  const categories = getBusinessCategories(tenants);

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-2 text-[var(--foreground)]">
          What You&apos;ll Find at{" "}
          <span style={{ color: accentColor }}>{plazaName}</span>
        </h3>
        <p className="text-center text-[var(--foreground-muted)] mb-8 max-w-2xl mx-auto">
          Explore our diverse mix of businesses serving the Palm Harbor community
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat: CategoryCount, i: number) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-sm transition-all bg-[var(--background)] w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]"
            >
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <p className="font-semibold text-[var(--foreground)] text-sm">
                  {cat.category}
                </p>
                <p className="text-xs text-[var(--foreground-muted)]">
                  {cat.count} {cat.count === 1 ? "business" : "businesses"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

