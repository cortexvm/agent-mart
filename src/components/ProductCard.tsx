import Link from "next/link";
import { Product } from "@/lib/types";

const categoryColors: Record<string, string> = {
  books: "bg-amber-100 text-amber-800",
  gadgets: "bg-cyan-100 text-cyan-800",
};

const categoryBg: Record<string, string> = {
  programming: "from-amber-400 to-orange-500",
  ai: "from-purple-400 to-indigo-500",
  fiction: "from-rose-400 to-pink-500",
  cables: "from-cyan-400 to-blue-500",
  tools: "from-emerald-400 to-green-500",
  accessories: "from-slate-400 to-gray-500",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className={`h-40 bg-gradient-to-br ${categoryBg[product.subcategory] || "from-gray-400 to-gray-500"} flex items-center justify-center`}>
          <span className="text-5xl opacity-80">
            {product.category === "books" ? "📚" : "🔧"}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[product.category]}`}>
              {product.subcategory}
            </span>
            {product.inStock ? (
              <span className="text-xs text-green-600">In Stock</span>
            ) : (
              <span className="text-xs text-red-500">Out of Stock</span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-gray-900 mt-2">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
