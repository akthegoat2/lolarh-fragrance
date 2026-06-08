"use client";

import { useState, useEffect, useMemo } from "react";
import { Product, Category, SortOption } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [sort, setSort] = useState<SortOption>("name-asc");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data as Product[]);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [products, category, search, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Our Collection</h1>
        <p className="text-gray-500 text-sm">
          Explore our premium range of fragrances and skincare products
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <FilterBar
        selectedCategory={category}
        onCategoryChange={setCategory}
        sortOption={sort}
        onSortChange={setSort}
      />

      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-pink-50 border border-pink-100 animate-pulse p-4">
                <div className="aspect-square bg-pink-100 rounded-xl mb-4" />
                <div className="h-3 bg-pink-100 rounded w-1/3 mb-2" />
                <div className="h-4 bg-pink-100 rounded w-2/3 mb-2" />
                <div className="h-3 bg-pink-100 rounded w-1/2 mb-3" />
                <div className="h-5 bg-pink-100 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No products found</p>
            <p className="text-gray-400 text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
