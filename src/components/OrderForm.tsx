"use client";

import { useState } from "react";
import { Order } from "@/lib/types";

const statusSteps = ["confirmed", "processing", "shipped", "delivered"];

export default function OrderForm() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${orderId.trim()}`);
      const data = await res.json();

      if (data.success) {
        setOrder(data.data);
      } else {
        setError(data.error || "Order not found");
      }
    } catch {
      setError("Failed to fetch order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const currentStep = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter order ID (e.g. ORD-XXXXXXXX)"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Searching..." : "Track"}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {order && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Order {order.id}</h3>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {order.status}
            </span>
          </div>

          {/* Status steps */}
          <div className="flex items-center mb-8">
            {statusSteps.map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      i <= currentStep
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i <= currentStep ? "✓" : i + 1}
                  </div>
                  <span className="text-xs mt-1 capitalize text-gray-600">{step}</span>
                </div>
                {i < statusSteps.length - 1 && (
                  <div className={`h-0.5 flex-1 ${i < currentStep ? "bg-indigo-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Order details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Items</h4>
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">
                    {item.productName} x{item.quantity}
                  </span>
                  <span className="font-medium">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 font-bold text-gray-900">
                <span>Total (COD)</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Delivery Info</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium text-gray-900">Name:</span> {order.customer.name}</p>
                <p><span className="font-medium text-gray-900">Address:</span> {order.customer.address}</p>
                <p><span className="font-medium text-gray-900">City:</span> {order.customer.city}, {order.customer.country}</p>
                <p><span className="font-medium text-gray-900">Est. Delivery:</span> {order.estimatedDelivery}</p>
                {order.agentId && (
                  <p><span className="font-medium text-gray-900">Ordered by:</span> {order.agentId}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
