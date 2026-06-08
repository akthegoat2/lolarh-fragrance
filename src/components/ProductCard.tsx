"use client";

import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Stars from "./Stars";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product.in_stock) return;
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl border ${
        product.in_stock ? "border-pink-100 hover:border-pink-200 hover:shadow-lg hover:shadow-pink-100" : "border-gray-200 opacity-60"
      } transition-all duration-300 flex flex-col overflow-hidden`}
    >
      {product.is_editors_choice && (
        <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
          Editor&apos;s Choice
        </span>
      )}
      {!product.in_stock && (
        <span className="absolute top-3 right-3 z-10 bg-gray-800/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
          Out of Stock
        </span>
      )}

      <div className="aspect-square bg-gradient-to-br from-pink-50 to-rose-50 p-4 flex items-center justify-center">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full rounded-xl bg-pink-100 flex items-center justify-center text-pink-300 text-4xl font-bold">
            {product.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] font-medium text-pink-400 uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>
        <Stars rating={product.rating} />
        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-pink-50">
          <span className="font-bold text-rose-500 text-base">
            {formatPrice(product.price)}
          </span>
          {product.in_stock ? (
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-colors"
            >
              <ShoppingBag size={14} />
              Add
            </button>
          ) : (
            <span className="text-xs text-gray-400 font-medium">Unavailable</span>
          )}
        </div>
      </div>
    </div>
  );
}
