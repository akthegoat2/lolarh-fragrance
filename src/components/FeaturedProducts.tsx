"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/products");
        const data: Product[] = await res.json();
        const featured = data.filter((p) => p.is_editors_choice && p.in_stock);
        setProducts(featured.length >= 4 ? featured : data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-10 md:mb-14">
        <p className="text-rose-500 font-medium text-sm tracking-wider uppercase mb-2">
          Curated for You
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Featured Products
        </h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
          Handpicked favorites loved by our community
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-pink-50 border border-pink-100 animate-pulse p-4">
              <div className="aspect-square bg-pink-100 rounded-xl mb-4" />
              <div className="h-3 bg-pink-100 rounded w-1/3 mb-2" />
              <div className="h-4 bg-pink-100 rounded w-2/3 mb-2" />
              <div className="h-3 bg-pink-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-sm">
            Products coming soon. Check back later!
          </p>
        </div>
      )}
    </section>
  );
}
