"use client";

import { Category, SortOption } from "@/lib/types";

interface Props {
  selectedCategory: Category | "All";
  onCategoryChange: (category: Category | "All") => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const categories: (Category | "All")[] = ["All", "Fragrance", "Skincare", "Set"];

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Name A-Z", value: "name-asc" },
  { label: "Name Z-A", value: "name-desc" },
  { label: "Price: Low", value: "price-asc" },
  { label: "Price: High", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
];

export default function FilterBar({ selectedCategory, onCategoryChange, sortOption, onSortChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === cat
                ? "bg-rose-500 text-white shadow-sm shadow-rose-200"
                : "bg-white text-gray-600 border border-pink-200 hover:border-rose-300 hover:text-rose-500"
            }`}
          >
            {cat === "All" ? "All Products" : cat}
          </button>
        ))}
      </div>

      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="text-xs border border-pink-200 rounded-full px-3 py-1.5 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-300 self-start sm:self-auto"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
