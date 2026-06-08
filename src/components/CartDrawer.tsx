"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, generateWhatsAppMessage } from "@/lib/utils";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isOpen, closeCart, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;
    const message = generateWhatsAppMessage(
      items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total
    );
    window.open(`https://wa.me/2349079115855?text=${message}`, "_blank");
    clearCart();
    closeCart();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-pink-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-rose-500" />
            <h2 className="font-semibold text-gray-800 text-lg">Your Cart</h2>
            {itemCount > 0 && (
              <span className="bg-rose-100 text-rose-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 hover:bg-pink-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 px-6">
            <ShoppingBag size={48} className="mb-4 text-pink-200" />
            <p className="text-base font-medium text-gray-500 mb-1">Your cart is empty</p>
            <p className="text-sm mb-6">Add some products to get started!</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="bg-rose-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-rose-600 transition-colors"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-xl bg-pink-50/50 border border-pink-100"
                >
                  <div className="w-16 h-16 rounded-lg bg-pink-100 shrink-0 flex items-center justify-center overflow-hidden">
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-pink-300 font-bold">{item.product.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-800 truncate">{item.product.name}</h4>
                    <p className="text-xs text-rose-500 font-semibold mt-0.5">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-pink-200 rounded-full bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-rose-500 text-gray-500 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2.5 text-sm font-medium text-gray-700 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-rose-500 text-gray-500 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-gray-800">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-pink-100 px-5 py-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold text-gray-800">{formatPrice(total)}</span>
              </div>
              <p className="text-[10px] text-gray-400">
                Shipping calculated at checkout via WhatsApp
              </p>
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-rose-200 transition-all"
              >
                Checkout via WhatsApp
              </button>
              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-gray-400 hover:text-red-400 transition-colors py-1"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
