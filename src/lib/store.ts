import { Order } from "./types";
import { getDb } from "./db";

export function createOrder(order: Order): Order {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO orders (id, items, total_amount, currency, payment_method, status, customer_name, customer_email, customer_phone, customer_address, customer_city, customer_country, agent_id, estimated_delivery, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    order.id,
    JSON.stringify(order.items),
    order.totalAmount,
    order.currency,
    order.paymentMethod,
    order.status,
    order.customer.name,
    order.customer.email || null,
    order.customer.phone || null,
    order.customer.address,
    order.customer.city,
    order.customer.country,
    order.agentId || null,
    order.estimatedDelivery,
    order.createdAt
  );
  return order;
}

export function getOrder(id: string): Order | undefined {
  const db = getDb();
  const row = db.prepare("SELECT * FROM orders WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  if (!row) return undefined;
  return rowToOrder(row);
}

export function getAllOrders(): Order[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all() as Record<string, unknown>[];
  return rows.map(rowToOrder);
}

export function getOrderStats(): {
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: Record<string, number>;
  ordersByAgent: Record<string, number>;
  recentOrders: Order[];
} {
  const db = getDb();

  const totalOrders = (db.prepare("SELECT COUNT(*) as count FROM orders").get() as { count: number }).count;
  const totalRevenue = (db.prepare("SELECT COALESCE(SUM(total_amount), 0) as total FROM orders").get() as { total: number }).total;

  const statusRows = db.prepare("SELECT status, COUNT(*) as count FROM orders GROUP BY status").all() as { status: string; count: number }[];
  const ordersByStatus: Record<string, number> = {};
  for (const row of statusRows) {
    ordersByStatus[row.status] = row.count;
  }

  const agentRows = db.prepare("SELECT COALESCE(agent_id, 'unknown') as agent, COUNT(*) as count FROM orders GROUP BY agent_id").all() as { agent: string; count: number }[];
  const ordersByAgent: Record<string, number> = {};
  for (const row of agentRows) {
    ordersByAgent[row.agent] = row.count;
  }

  const recentRows = db.prepare("SELECT * FROM orders ORDER BY created_at DESC LIMIT 10").all() as Record<string, unknown>[];
  const recentOrders = recentRows.map(rowToOrder);

  return { totalOrders, totalRevenue, ordersByStatus, ordersByAgent, recentOrders };
}

export function updateOrderStatus(id: string, status: Order["status"]): boolean {
  const db = getDb();
  const result = db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
  return result.changes > 0;
}

function rowToOrder(row: Record<string, unknown>): Order {
  return {
    id: row.id as string,
    items: JSON.parse(row.items as string),
    totalAmount: row.total_amount as number,
    currency: row.currency as string,
    paymentMethod: row.payment_method as "COD",
    status: row.status as Order["status"],
    customer: {
      name: row.customer_name as string,
      email: (row.customer_email as string) || undefined,
      phone: (row.customer_phone as string) || undefined,
      address: row.customer_address as string,
      city: row.customer_city as string,
      country: row.customer_country as string,
    },
    agentId: (row.agent_id as string) || undefined,
    estimatedDelivery: row.estimated_delivery as string,
    createdAt: row.created_at as string,
  };
}
