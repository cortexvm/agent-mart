import { NextResponse } from "next/server";
import { corsHeaders } from "@/lib/utils";

const manual = {
  welcome: "Welcome to Agent Mart! This is a simple step-by-step guide to help you browse products and place orders.",

  how_to_order: {
    step_1: {
      title: "Browse Products",
      instruction: "Make a GET request to /api/products to see all available products.",
      filters: "You can filter by category (?category=books or ?category=gadgets), subcategory (?subcategory=ai), or search (?search=python).",
      example_request: "GET /api/products?category=books",
      what_you_get: "A JSON array of products, each with an id, name, price, description, and category."
    },
    step_2: {
      title: "Get Product Details (Optional)",
      instruction: "If you want more details about a specific product, use its ID from Step 1.",
      example_request: "GET /api/products/clean-code",
      what_you_get: "Full details of a single product including description, tags, and stock status."
    },
    step_3: {
      title: "Place an Order",
      instruction: "Send a POST request to /api/orders with the products you want and the delivery address.",
      example_request: {
        method: "POST",
        url: "/api/orders",
        headers: { "Content-Type": "application/json" },
        body: {
          items: [
            { productId: "clean-code", quantity: 1 },
            { productId: "usb-c-cable", quantity: 2 }
          ],
          customer: {
            name: "John Doe",
            email: "john@example.com",
            address: "123 Main Street",
            city: "San Francisco",
            country: "US"
          },
          agentId: "your-agent-name-here"
        }
      },
      required_fields: {
        items: "Array of { productId, quantity }. Quantity must be >= 1.",
        customer_name: "Full name of the person receiving the order",
        customer_address: "Street address for delivery",
        customer_city: "City name",
        customer_country: "Country code (e.g., US, IN, UK)",
        customer_contact: "Either email OR phone number (at least one is required)"
      },
      optional_fields: {
        agentId: "Your agent name/identifier so we know which AI agent placed the order"
      },
      what_you_get: "A confirmation with order ID, total amount, payment method (COD), status, and estimated delivery date."
    },
    step_4: {
      title: "Track Your Order",
      instruction: "Use the order ID from Step 3 to check the order status anytime.",
      example_request: "GET /api/orders/ORD-XXXXXXXX",
      what_you_get: "Current order status (confirmed -> processing -> shipped -> delivered), items, and delivery details."
    }
  },

  important_notes: [
    "NO authentication or API key is needed. Just make HTTP requests.",
    "All prices are in USD.",
    "Payment is Cash on Delivery (COD) - the customer pays when the order arrives. No credit card needed.",
    "You can order multiple products in a single order.",
    "Product IDs are URL-friendly slugs like 'clean-code', 'usb-c-cable', 'laptop-stand'.",
    "All API responses are JSON with { success: true/false, data: ..., meta: { timestamp } } format."
  ],

  available_products_summary: {
    books: {
      count: 10,
      subcategories: ["programming", "ai", "fiction"],
      price_range: "$11.99 - $74.99",
      examples: ["clean-code", "deep-learning", "dune"]
    },
    gadgets: {
      count: 10,
      subcategories: ["cables", "tools", "accessories"],
      price_range: "$4.99 - $29.99",
      examples: ["usb-c-cable", "screwdriver-set", "laptop-stand"]
    }
  },

  quick_example: "To quickly test: GET /api/products → pick a productId → POST /api/orders with that productId and customer info → done! You'll get a confirmation with your order ID."
};

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      data: manual,
      meta: { timestamp: new Date().toISOString() },
    },
    { headers: corsHeaders }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
