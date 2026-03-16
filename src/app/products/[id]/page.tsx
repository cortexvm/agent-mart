import { products, getProductById } from "@/lib/data/products";
import Link from "next/link";
import { notFound } from "next/navigation";

const categoryBg: Record<string, string> = {
  programming: "from-amber-400 to-orange-500",
  ai: "from-purple-400 to-indigo-500",
  fiction: "from-rose-400 to-pink-500",
  cables: "from-cyan-400 to-blue-500",
  tools: "from-emerald-400 to-green-500",
  accessories: "from-slate-400 to-gray-500",
};

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} - Agent Mart`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/products" className="text-indigo-600 hover:text-indigo-700 font-medium mb-6 inline-block">
        &larr; Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className={`h-64 md:h-80 bg-gradient-to-br ${categoryBg[product.subcategory] || "from-gray-400 to-gray-500"} rounded-xl flex items-center justify-center`}>
          <span className="text-8xl opacity-80">
            {product.category === "books" ? "📚" : "🔧"}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              product.category === "books"
                ? "bg-amber-100 text-amber-800"
                : "bg-cyan-100 text-cyan-800"
            }`}>
              {product.subcategory}
            </span>
            {product.inStock ? (
              <span className="text-sm text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-sm text-red-500 font-medium">Out of Stock</span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <p className="text-3xl font-bold text-gray-900 mb-6">
            ${product.price.toFixed(2)} <span className="text-sm font-normal text-gray-500">USD</span>
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {product.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* API Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">API Endpoint</h3>
            <code className="text-sm text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
              GET /api/products/{product.id}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
