"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back, admin!");
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="LOLARH"
            width={56}
            height={56}
            className="rounded-full w-14 h-14 object-cover mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-pink-100 p-6 space-y-4 shadow-sm">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@lolarh.com"
              className="w-full px-4 py-2.5 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 pr-10 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-rose-200 transition-all disabled:opacity-50"
          >
            <Lock size={16} />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
