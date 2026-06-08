"use client";

import { Search, X } from "lucide-react";
import { useRef } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full md:max-w-md">
      <Search
        size={18}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-10 pr-10 py-2.5 bg-white border border-pink-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
