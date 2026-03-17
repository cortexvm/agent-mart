#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
const API_BASE = process.env.AGENT_MART_URL || "https://agent-mart-ashy.vercel.app";
async function apiCall(path, options) {
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });
    return res.json();
}
const server = new McpServer({
    name: "agent-mart",
    version: "1.0.0",
});
// Tool: Get the agent manual (how to use the marketplace)
server.tool("get_manual", "Get the step-by-step guide on how to use Agent Mart. Start here if you're new.", {}, async () => {
    const data = await apiCall("/api/agent-manual");
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(data.data, null, 2),
            },
        ],
    };
});
// Tool: Browse products
server.tool("browse_products", "Browse products available on Agent Mart. Filter by category (books/gadgets), subcategory, or search term.", {
    category: z
        .enum(["books", "gadgets"])
        .optional()
        .describe("Filter by category: 'books' or 'gadgets'"),
    subcategory: z
        .enum(["programming", "ai", "fiction", "cables", "tools", "accessories"])
        .optional()
        .describe("Filter by subcategory"),
    search: z
        .string()
        .optional()
        .describe("Free-text search across product names, descriptions, and tags"),
}, async ({ category, subcategory, search }) => {
    const params = new URLSearchParams();
    if (category)
        params.set("category", category);
    if (subcategory)
        params.set("subcategory", subcategory);
    if (search)
        params.set("search", search);
    const query = params.toString() ? `?${params.toString()}` : "";
    const data = await apiCall(`/api/products${query}`);
    const products = data.data.map((p) => `- **${p.name}** (ID: ${p.id}) - $${p.price.toFixed(2)} [${p.category}/${p.subcategory}] ${p.inStock ? "In Stock" : "OUT OF STOCK"}\n  ${p.description}`);
    return {
        content: [
            {
                type: "text",
                text: `Found ${data.meta.total} products:\n\n${products.join("\n\n")}`,
            },
        ],
    };
});
// Tool: Get product details
server.tool("get_product", "Get full details of a specific product by its ID.", {
    product_id: z
        .string()
        .describe("The product ID (e.g. 'clean-code', 'laptop-stand', 'dune')"),
}, async ({ product_id }) => {
    const data = await apiCall(`/api/products/${product_id}`);
    if (!data.success) {
        return {
            content: [{ type: "text", text: `Product not found: ${data.error}` }],
            isError: true,
        };
    }
    const p = data.data;
    return {
        content: [
            {
                type: "text",
                text: `**${p.name}**\nPrice: $${p.price.toFixed(2)} ${p.currency}\nCategory: ${p.category}/${p.subcategory}\nIn Stock: ${p.inStock ? "Yes" : "No"}\nTags: ${p.tags.join(", ")}\n\n${p.description}\n\nProduct ID: ${p.id}`,
            },
        ],
    };
});
// Tool: Place an order
server.tool("place_order", "Place a Cash on Delivery (COD) order on Agent Mart. You need product IDs, quantities, and customer delivery info.", {
    items: z
        .array(z.object({
        productId: z.string().describe("Product ID from browse_products"),
        quantity: z.number().min(1).describe("Quantity to order"),
    }))
        .min(1)
        .describe("List of products to order"),
    customer_name: z.string().describe("Customer's full name"),
    customer_address: z.string().describe("Delivery street address"),
    customer_city: z.string().describe("City"),
    customer_country: z.string().describe("Country code (e.g. US, IN, UK)"),
    customer_email: z
        .string()
        .email()
        .optional()
        .describe("Customer email (provide email or phone)"),
    customer_phone: z
        .string()
        .optional()
        .describe("Customer phone (provide email or phone)"),
}, async ({ items, customer_name, customer_address, customer_city, customer_country, customer_email, customer_phone, }) => {
    const body = {
        items,
        customer: {
            name: customer_name,
            address: customer_address,
            city: customer_city,
            country: customer_country,
            email: customer_email,
            phone: customer_phone,
        },
        agentId: "claude-desktop",
    };
    const data = await apiCall("/api/orders", {
        method: "POST",
        body: JSON.stringify(body),
    });
    if (!data.success) {
        return {
            content: [{ type: "text", text: `Order failed: ${data.error}` }],
            isError: true,
        };
    }
    const c = data.confirmation;
    return {
        content: [
            {
                type: "text",
                text: `Order Confirmed!\n\nOrder ID: ${c.order_id}\nStatus: ${c.status}\nTotal: ${c.total}\nPayment: ${c.payment_method}\nItems: ${c.items_ordered.join(", ")}\nDelivering to: ${c.delivering_to}\nEstimated Delivery: ${c.estimated_delivery}\n\nTrack this order with the track_order tool using ID: ${c.order_id}`,
            },
        ],
    };
});
// Tool: Track an order
server.tool("track_order", "Check the status of an existing order by its order ID.", {
    order_id: z
        .string()
        .describe("The order ID (e.g. 'ORD-XXXXXXXX')"),
}, async ({ order_id }) => {
    const data = await apiCall(`/api/orders/${order_id}`);
    if (!data.success) {
        return {
            content: [{ type: "text", text: `Order not found: ${data.error}` }],
            isError: true,
        };
    }
    const o = data.data;
    const items = o.items
        .map((i) => `${i.productName} x${i.quantity} ($${(i.unitPrice * i.quantity).toFixed(2)})`)
        .join(", ");
    return {
        content: [
            {
                type: "text",
                text: `Order ${o.id}\n\nStatus: ${o.status.toUpperCase()}\nItems: ${items}\nTotal: $${o.totalAmount.toFixed(2)} ${o.currency} (${o.paymentMethod})\nCustomer: ${o.customer.name}\nDelivery: ${o.customer.address}, ${o.customer.city}, ${o.customer.country}\nEstimated Delivery: ${o.estimatedDelivery}\nOrdered: ${new Date(o.createdAt).toLocaleString()}`,
            },
        ],
    };
});
// Tool: View dashboard stats
server.tool("dashboard", "View marketplace dashboard - total orders, revenue, orders by agent, recent orders.", {}, async () => {
    const data = await apiCall("/api/dashboard");
    if (!data.success) {
        return {
            content: [{ type: "text", text: "Failed to load dashboard" }],
            isError: true,
        };
    }
    const d = data.data;
    const agentList = Object.entries(d.ordersByAgent)
        .map(([agent, count]) => `  ${agent}: ${count}`)
        .join("\n");
    const statusList = Object.entries(d.ordersByStatus)
        .map(([status, count]) => `  ${status}: ${count}`)
        .join("\n");
    const recent = d.recentOrders
        .map((o) => `  ${o.id} | ${o.customer.name} | $${o.totalAmount.toFixed(2)} | ${o.status} | ${o.agentId || "unknown"}`)
        .join("\n");
    return {
        content: [
            {
                type: "text",
                text: `Agent Mart Dashboard\n\nTotal Orders: ${d.totalOrders}\nTotal Revenue: $${d.totalRevenue.toFixed(2)}\nAvg Order Value: $${d.totalOrders > 0 ? (d.totalRevenue / d.totalOrders).toFixed(2) : "0.00"}\n\nOrders by Status:\n${statusList || "  (none)"}\n\nOrders by Agent:\n${agentList || "  (none)"}\n\nRecent Orders:\n${recent || "  (none)"}`,
            },
        ],
    };
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main().catch(console.error);
