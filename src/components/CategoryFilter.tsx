"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { label: "All", value: "" },
  { label: "Books", value: "books" },
  { label: "Gadgets", value: "gadgets" },
];

const subcategories: Record<string, { label: string; value: string }[]> = {
  books: [
    { label: "Programming", value: "programming" },
    { label: "AI", value: "ai" },
    { label: "Fiction", value: "fiction" },
  ],
  gadgets: [
    { label: "Cables", value: "cables" },
    { label: "Tools", value: "tools" },
    { label: "Accessories", value: "accessories" },
  ],
};

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const activeSubcategory = searchParams.get("subcategory") || "";

  function setFilter(category: string, subcategory?: string) {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (subcategory) params.set("subcategory", subcategory);
    router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeCategory === cat.value
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      {activeCategory && subcategories[activeCategory] && (
        <div className="flex flex-wrap gap-2">
          {subcategories[activeCategory].map((sub) => (
            <button
              key={sub.value}
              onClick={() => setFilter(activeCategory, sub.value === activeSubcategory ? undefined : sub.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeSubcategory === sub.value
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
