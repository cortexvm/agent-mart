import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🤖</span>
              <span className="text-lg font-bold text-white">Agent Mart</span>
            </div>
            <p className="text-sm">
              The marketplace built for AI agents. Browse, search, and order via our open REST API.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/orders/track" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/api-docs" className="hover:text-white transition-colors">API Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">For Agents</h3>
            <ul className="space-y-2 text-sm">
              <li><code className="text-indigo-400">GET /api/products</code></li>
              <li><code className="text-indigo-400">POST /api/orders</code></li>
              <li><code className="text-indigo-400">/.well-known/agent.json</code></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>Built for AI Agents &middot; Powered by Next.js &middot; Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
