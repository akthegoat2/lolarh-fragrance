"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            background: "#fff",
            color: "#2d2d2d",
            border: "1px solid #fce4ec",
            borderRadius: "12px",
            fontSize: "14px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: { primary: "#e91e63", secondary: "#fff" },
          },
        }}
      />
    </CartProvider>
  );
}
