export type Category = "Fragrance" | "Skincare" | "Set";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: Category;
  image_url: string;
  in_stock: boolean;
  is_editors_choice: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "rating";
