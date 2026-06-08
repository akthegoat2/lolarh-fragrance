export function formatPrice(price: number): string {
  return `₦${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function generateWhatsAppMessage(items: { name: string; quantity: number; price: number }[], total: number): string {
  const lines = items.map(
    (item) => `• ${item.name} × ${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}`
  );
  const message = [
    "🛍️ *New Order from LOLARH FRAGRANCE & SKINCARE*",
    "",
    ...lines,
    "",
    `*Total: ₦${total.toLocaleString()}*`,
    "",
    "Thank you for shopping with us! 💕",
  ].join("\n");
  return encodeURIComponent(message);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
