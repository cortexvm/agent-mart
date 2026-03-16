import { Order } from "./types";
import { getDb, initializeDb } from "./db";

let initialized = false;

async function ensureDb() {
  if (!initialized) {
    await initializeDb();
    initialized = true;
  }
}

export async function createOrder(order: Order): Promise<Order> {
  await ensureDb();
  const sql = getDb();
  await sql`
    INSERT INTO orders (id, items, total_amount, currency, payment_method, status, customer_name, customer_email, customer_phone, customer_address, customer_city, customer_country, agent_id, estimated_delivery, created_at)
    VALUES (${order.id}, ${JSON.stringify(order.items)}, ${order.totalAmount}, ${order.currency}, ${order.paymentMethod}, ${order.status}, ${order.customer.name}, ${order.customer.email || null}, ${order.customer.phone || null}, ${order.customer.address}, ${order.customer.city}, ${order.customer.country}, ${order.agentId || null}, ${order.estimatedDelivery}, ${order.createdAt})
  `;
  return order;
}

export async function getOrder(id: string): Promise<Order | undefined> {
  await ensureDb();
  const sql = getDb();
  const rows = await sql`SELECT * FROM orders WHERE id = ${id}`;
  if (rows.length === 0) return undefined;
  return rowToOrder(rows[0]);
}

export async function getAllOrders(): Promise<Order[]> {
  await ensureDb();
  const sql = getDb();
  const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
  return rows.map(rowToOrder);
}

export async function getOrderStats(): Promise<{
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: Record<string, number>;
  ordersByAgent: Record<string, number>;
  recentOrders: Order[];
}> {
  await ensureDb();
  const sql = getDb();

  const countResult = await sql`SELECT COUNT(*) as count FROM orders`;
  const totalOrders = Number(countResult[0].count) || 0;

  const revenueResult = await sql`SELECT COALESCE(SUM(total_amount), 0) as total FROM orders`;
  const totalRevenue = Number(revenueResult[0].total) || 0;

  const statusResult = await sql`SELECT status, COUNT(*) as count FROM orders GROUP BY status`;
  const ordersByStatus: Record<string, number> = {};
  for (const row of statusResult) {
    ordersByStatus[row.status as string] = Number(row.count);
  }

  const agentResult = await sql`SELECT COALESCE(agent_id, 'unknown') as agent, COUNT(*) as count FROM orders GROUP BY agent_id`;
  const ordersByAgent: Record<string, number> = {};
  for (const row of agentResult) {
    ordersByAgent[row.agent as string] = Number(row.count);
  }

  const recentResult = await sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 10`;
  const recentOrders = recentResult.map(rowToOrder);

  return { totalOrders, totalRevenue, ordersByStatus, ordersByAgent, recentOrders };
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<boolean> {
  await ensureDb();
  const sql = getDb();
  const result = await sql`UPDATE orders SET status = ${status} WHERE id = ${id}`;
  return result.length !== undefined;
}

function rowToOrder(row: Record<string, unknown>): Order {
  return {
    id: row.id as string,
    items: JSON.parse(row.items as string),
    totalAmount: Number(row.total_amount),
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
