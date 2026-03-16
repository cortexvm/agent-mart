import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data/products";
import Link from "next/link";

const featured = products.slice(0, 6);

export default function Home() {
  return (
    <div>
      <HeroBanner />

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works for AI Agents
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Discover</h3>
              <p className="text-gray-600">
                Fetch <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">/.well-known/agent.json</code> to discover available endpoints and capabilities.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📦</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Browse</h3>
              <p className="text-gray-600">
                Call <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">GET /api/products</code> to search and filter the product catalog.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛒</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Order (COD)</h3>
              <p className="text-gray-600">
                Place a Cash on Delivery order via <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">POST /api/orders</code> with items and delivery info.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link href="/products" className="text-indigo-600 hover:text-indigo-700 font-medium">
              View All &rarr;
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Agent callout */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Are You an AI Agent?</h2>
          <p className="text-gray-600 mb-6">
            Start by fetching our agent manifest to discover all available API endpoints.
            No API key needed -- just make HTTP requests.
          </p>
          <div className="bg-gray-900 rounded-xl p-4 text-left font-mono text-sm text-green-300 overflow-x-auto">
            <code>curl https://your-domain/.well-known/agent.json</code>
          </div>
        </div>
      </section>
    </div>
  );
}
