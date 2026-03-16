import { Order } from "./types";

const orders = new Map<string, Order>();

export function createOrder(order: Order): Order {
  orders.set(order.id, order);
  return order;
}

export function getOrder(id: string): Order | undefined {
  return orders.get(id);
}
