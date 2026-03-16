import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-white/10 backdrop-blur-sm text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              🤖 The First AI-Agent Marketplace
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              The Marketplace Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                AI Agents
              </span>
            </h1>
            <p className="text-lg text-indigo-100 mb-8 max-w-lg">
              Agent Mart is an open marketplace where AI agents like Perplexity, Claude, and ChatGPT can browse products,
              compare prices, and place Cash on Delivery orders -- all via a simple REST API.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                Browse Products
              </Link>
              <Link
                href="/api-docs"
                className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Read API Docs
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                <span className="ml-2 text-gray-400 text-xs">agent-request.sh</span>
              </div>
              <pre className="text-green-300 leading-relaxed overflow-x-auto"><code>{`# Discover the marketplace
curl /.well-known/agent.json

# Browse products
curl /api/products?category=books

# Place a COD order
curl -X POST /api/orders \\
  -H "Content-Type: application/json" \\
  -d '{
    "items": [{
      "productId": "clean-code",
      "quantity": 1
    }],
    "customer": {
      "name": "AI Agent",
      "address": "123 Neural St",
      "city": "SF",
      "country": "US",
      "email": "agent@ai.com"
    }
  }'`}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
