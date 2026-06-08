"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { Product, Category } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Plus, Edit2, Trash2, LogOut, Package, X, Star } from "lucide-react";
import toast from "react-hot-toast";

interface ProductForm {
  name: string;
  description: string;
  price: string;
  rating: string;
  category: Category;
  in_stock: boolean;
  is_editors_choice: boolean;
  image_url: string;
}

const emptyForm: ProductForm = {
  name: "",
  description: "",
  price: "",
  rating: "0",
  category: "Fragrance",
  in_stock: true,
  is_editors_choice: false,
  image_url: "",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!s) {
        router.push("/admin/login");
        return;
      }
      setSession(s);
      fetchProducts();
    });
  }, [router]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push("/admin/login");
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, [router]);

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProducts(data as Product[]);
    setLoading(false);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("product-images").upload(fileName, file);
    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading(false);
      return;
    }
    const { data: publicUrlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
    setForm((prev) => ({ ...prev, image_url: publicUrlData.publicUrl }));
    setUploading(false);
    toast.success("Image uploaded!");
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      rating: product.rating.toString(),
      category: product.category,
      in_stock: product.in_stock,
      is_editors_choice: product.is_editors_choice,
      image_url: product.image_url,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      rating: parseFloat(form.rating) || 0,
      category: form.category,
      in_stock: form.in_stock,
      is_editors_choice: form.is_editors_choice,
      image_url: form.image_url,
    };

    if (editingId) {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...payload }),
      });
      if (!res.ok) {
        toast.error("Update failed");
      } else {
        toast.success("Product updated!");
      }
    } else {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        toast.error("Add failed");
      } else {
        toast.success("Product added!");
      }
    }
    setSaving(false);
    setShowForm(false);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Delete failed");
    } else {
      toast.success("Product deleted!");
      fetchProducts();
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your product inventory</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openAddForm}
            className="flex items-center gap-1.5 bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-rose-600 transition-colors"
          >
            <Plus size={16} />
            Add Product
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-20 px-4 overflow-y-auto" onClick={() => setShowForm(false)}>
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 mb-20" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                {editingId ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="Product name"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
                  placeholder="Product description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Price (₦) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                    className="w-full px-3 py-2 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Rating (0-5)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={form.rating}
                      onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}
                      className="w-full px-3 py-2 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                    <Star size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as Category }))}
                    className="w-full px-3 py-2 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    <option value="Fragrance">Fragrance</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Set">Set</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Stock Status</label>
                  <select
                    value={form.in_stock ? "in" : "out"}
                    onChange={(e) => setForm((p) => ({ ...p, in_stock: e.target.value === "in" }))}
                    className="w-full px-3 py-2 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    <option value="in">In Stock</option>
                    <option value="out">Out of Stock</option>
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_editors_choice}
                  onChange={(e) => setForm((p) => ({ ...p, is_editors_choice: e.target.checked }))}
                  className="accent-rose-500"
                />
                <span className="text-sm text-gray-700">Editor&apos;s Choice</span>
              </label>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Image</label>
                <input
                  value={form.image_url}
                  onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))}
                  className="w-full px-3 py-2 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 mb-2"
                  placeholder="Paste image URL or upload below"
                />
                <label className="flex items-center justify-center gap-2 w-full px-3 py-2 border-2 border-dashed border-pink-200 rounded-lg text-sm text-gray-500 hover:border-rose-300 cursor-pointer transition-colors">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  {uploading ? "Uploading..." : "Upload Image to Supabase Storage"}
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-rose-500 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-rose-600 transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingId ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 border border-pink-200 rounded-lg text-sm text-gray-600 hover:bg-pink-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full mx-auto" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-pink-100">
          <Package size={48} className="mx-auto text-pink-200 mb-4" />
          <p className="text-gray-500 font-medium">No products yet</p>
          <p className="text-gray-400 text-sm mt-1 mb-4">Add your first product to get started</p>
          <button onClick={openAddForm} className="inline-flex items-center gap-1.5 bg-rose-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-rose-600 transition-colors">
            <Plus size={16} />
            Add Product
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-pink-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-pink-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700">Product</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Category</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Price</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Rating</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Stock</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Choice</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-pink-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-pink-100 overflow-hidden shrink-0 flex items-center justify-center">
                          {product.image_url ? (
                            <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-pink-300 text-xs font-bold">{product.name.charAt(0)}</span>
                          )}
                        </div>
                        <span className="font-medium text-gray-800 truncate max-w-[180px]">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{product.category}</td>
                    <td className="px-4 py-3 font-semibold text-rose-500">{formatPrice(product.price)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span className="text-gray-600">{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${product.in_stock ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {product.in_stock ? "In Stock" : "Out"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {product.is_editors_choice ? (
                        <span className="text-amber-500 text-xs font-medium">Featured</span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEditForm(product)} className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors" title="Edit">
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
