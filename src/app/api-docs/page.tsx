export const metadata = {
  title: "API Documentation - Agent Mart",
  description: "Complete API documentation for Agent Mart. Learn how AI agents can browse and order products.",
};

function Endpoint({
  method,
  path,
  description,
  params,
  body,
  example,
  response,
}: {
  method: "GET" | "POST";
  path: string;
  description: string;
  params?: { name: string; type: string; required: boolean; description: string }[];
  body?: string;
  example: string;
  response: string;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-md text-sm font-bold ${
              method === "GET" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
            }`}
          >
            {method}
          </span>
          <code className="text-lg font-semibold text-gray-900">{path}</code>
        </div>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
      <div className="p-6 space-y-4">
        {params && params.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Query Parameters</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">Name</th>
                  <th className="text-left py-2 text-gray-600 font-medium">Type</th>
                  <th className="text-left py-2 text-gray-600 font-medium">Required</th>
                  <th className="text-left py-2 text-gray-600 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {params.map((p) => (
                  <tr key={p.name} className="border-b border-gray-100">
                    <td className="py-2"><code className="text-indigo-600">{p.name}</code></td>
                    <td className="py-2 text-gray-600">{p.type}</td>
                    <td className="py-2">{p.required ? "Yes" : "No"}</td>
                    <td className="py-2 text-gray-600">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {body && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Request Body</h4>
            <pre className="bg-gray-900 text-green-300 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{body}</code>
            </pre>
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Example Request</h4>
          <pre className="bg-gray-900 text-green-300 rounded-lg p-4 overflow-x-auto text-sm">
            <code>{example}</code>
          </pre>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Example Response</h4>
          <pre className="bg-gray-900 text-gray-300 rounded-lg p-4 overflow-x-auto text-sm">
            <code>{response}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function ApiDocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">API Documentation</h1>
      <p className="text-gray-600 mb-8">
        Agent Mart exposes a simple REST API for AI agents to browse products and place orders.
        No authentication required. All endpoints return JSON and support CORS.
      </p>

      {/* Agent Manual */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-green-900 mb-2">New Here? Start with the Agent Manual</h2>
        <p className="text-green-700 mb-3">
          If you are an AI agent and not sure where to begin, fetch the step-by-step manual:
        </p>
        <pre className="bg-green-900 text-green-200 rounded-lg p-4 overflow-x-auto text-sm">
          <code>curl /api/agent-manual</code>
        </pre>
        <p className="text-green-700 mt-3 text-sm">
          This returns a complete guide with every step explained, required fields, examples, and product summaries.
        </p>
      </div>

      {/* Agent Discovery */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold text-indigo-900 mb-2">Agent Discovery</h2>
        <p className="text-indigo-700 mb-3">
          AI agents can also fetch the agent manifest for a machine-readable endpoint listing:
        </p>
        <pre className="bg-indigo-900 text-indigo-200 rounded-lg p-4 overflow-x-auto text-sm">
          <code>curl /.well-known/agent.json</code>
        </pre>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Endpoints</h2>

      <div className="space-y-6">
        <Endpoint
          method="GET"
          path="/api/products"
          description="List all products with optional filtering by category, subcategory, or search term."
          params={[
            { name: "category", type: "string", required: false, description: '"books" or "gadgets"' },
            { name: "subcategory", type: "string", required: false, description: '"programming", "ai", "fiction", "cables", "tools", "accessories"' },
            { name: "search", type: "string", required: false, description: "Free-text search across name, description, and tags" },
          ]}
          example='curl /api/products?category=books&subcategory=ai'
          response={`{
  "success": true,
  "data": [
    {
      "id": "ai-modern-approach",
      "name": "Artificial Intelligence: A Modern Approach",
      "price": 69.99,
      "category": "books",
      "subcategory": "ai",
      "inStock": true,
      ...
    }
  ],
  "meta": { "total": 3, "timestamp": "2026-03-16T..." }
}`}
        />

        <Endpoint
          method="GET"
          path="/api/products/{id}"
          description="Get full details of a specific product by its ID."
          example="curl /api/products/clean-code"
          response={`{
  "success": true,
  "data": {
    "id": "clean-code",
    "name": "Clean Code",
    "description": "A Handbook of Agile Software Craftsmanship...",
    "price": 34.99,
    "currency": "USD",
    "category": "books",
    "subcategory": "programming",
    "inStock": true,
    "tags": ["software", "best-practices", "agile"]
  },
  "meta": { "timestamp": "2026-03-16T..." }
}`}
        />

        <Endpoint
          method="POST"
          path="/api/orders"
          description="Place a new Cash on Delivery order. Provide items (product IDs + quantities) and customer delivery information."
          body={`{
  "items": [
    { "productId": "clean-code", "quantity": 1 },
    { "productId": "usb-c-cable", "quantity": 2 }
  ],
  "customer": {
    "name": "Agent User",
    "email": "agent@example.com",
    "address": "123 AI Street",
    "city": "San Francisco",
    "country": "US"
  },
  "agentId": "perplexity-agent"
}`}
          example={`curl -X POST /api/orders \\
  -H "Content-Type: application/json" \\
  -d '{"items":[{"productId":"clean-code","quantity":1}],"customer":{"name":"Test","address":"123 St","city":"SF","country":"US","email":"t@t.com"}}'`}
          response={`{
  "success": true,
  "message": "Order confirmed! Your order ORD-A1B2C3D4 has been placed successfully. Payment: Cash on Delivery ($34.99 USD). Estimated delivery: 2026-03-21. Track your order anytime at GET /api/orders/ORD-A1B2C3D4",
  "confirmation": {
    "order_id": "ORD-A1B2C3D4",
    "status": "confirmed",
    "total": "$34.99 USD",
    "payment_method": "Cash on Delivery (pay when it arrives)",
    "estimated_delivery": "2026-03-21",
    "items_ordered": ["Clean Code x1 ($34.99)"],
    "delivering_to": "Agent User, 123 AI Street, San Francisco, US",
    "track_order": "GET /api/orders/ORD-A1B2C3D4"
  },
  "data": { ... full order object ... }
}`}
        />

        <Endpoint
          method="GET"
          path="/api/orders/{id}"
          description="Check the status and details of an existing order. Note: orders are stored in-memory and may not persist across server restarts."
          example="curl /api/orders/ORD-A1B2C3D4"
          response={`{
  "success": true,
  "data": {
    "id": "ORD-A1B2C3D4",
    "status": "confirmed",
    "items": [...],
    "totalAmount": 34.99,
    "paymentMethod": "COD",
    "customer": { ... },
    "estimatedDelivery": "2026-03-21"
  }
}`}
        />
      </div>

      {/* Error responses */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Responses</h2>
        <p className="text-gray-600 mb-4">All errors follow a consistent format:</p>
        <pre className="bg-gray-900 text-gray-300 rounded-lg p-4 overflow-x-auto text-sm">
          <code>{`{
  "success": false,
  "error": "Description of what went wrong",
  "meta": { "timestamp": "2026-03-16T..." }
}`}</code>
        </pre>
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p><strong>400</strong> - Bad request (missing or invalid fields)</p>
          <p><strong>404</strong> - Product or order not found</p>
        </div>
      </div>
    </div>
  );
}
