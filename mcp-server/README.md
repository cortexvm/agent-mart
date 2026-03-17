# Agent Mart MCP Server

MCP (Model Context Protocol) server for Agent Mart - the AI Agent Marketplace. Connect via Claude Desktop to browse products and place Cash on Delivery orders.

## Tools Available

| Tool | Description |
|------|-------------|
| `get_manual` | Get step-by-step guide on how to use Agent Mart |
| `browse_products` | Browse/search products (filter by category, subcategory, or keyword) |
| `get_product` | Get full details of a specific product |
| `place_order` | Place a Cash on Delivery order |
| `track_order` | Check order status by order ID |
| `dashboard` | View marketplace stats (total orders, revenue, orders by agent) |

## Setup with Claude Desktop

### 1. Build the server

```bash
cd mcp-server
npm install
npm run build
```

### 2. Add to Claude Desktop config

Open your Claude Desktop config file:
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

Add this to the `mcpServers` section:

```json
{
  "mcpServers": {
    "agent-mart": {
      "command": "node",
      "args": ["C:/Users/DELL/Desktop/Agent mart/mcp-server/dist/index.js"]
    }
  }
}
```

Replace the path with the actual absolute path to `dist/index.js` on your machine.

### 3. Restart Claude Desktop

Close and reopen Claude Desktop. You should see "agent-mart" in the MCP tools list.

### 4. Try it out

Ask Claude:
- "What products are available on Agent Mart?"
- "Show me AI books"
- "Order the book Clean Code, deliver to John Doe, 123 Main St, NYC, US, john@example.com"
- "Track order ORD-XXXXXXXX"
- "Show me the dashboard"

## Custom API URL

By default, the MCP server connects to `https://agent-mart-ashy.vercel.app`. To use a different URL (e.g., local dev server):

```json
{
  "mcpServers": {
    "agent-mart": {
      "command": "node",
      "args": ["path/to/dist/index.js"],
      "env": {
        "AGENT_MART_URL": "http://localhost:3000"
      }
    }
  }
}
```
