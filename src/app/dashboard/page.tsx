"use client";

import { useEffect, useState, useCallback } from "react";
import { Order } from "@/lib/types";

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: Record<string, number>;
  ordersByAgent: Record<string, number>;
  recentOrders: Order[];
}

const statusColors: Record<string, string> = {
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

const statusOptions: Order["status"][] = ["confirmed", "processing", "shipped", "delivered"];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard");
      const data = await res.json();
      if (data.success) setStats(data.data);
    } catch {
      console.error("Failed to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  async function handleStatusChange(orderId: string, newStatus: Order["status"]) {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/dashboard/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchStats();
      }
    } catch {
      console.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-red-600">Failed to load dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor orders and marketplace activity</p>
        </div>
        <button
          onClick={() => { setLoading(true); fetchStats(); }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
        >
          Refresh
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Avg Order Value</p>
          <p className="text-3xl font-bold text-gray-900">
            ${stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : "0.00"}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Active Agents</p>
          <p className="text-3xl font-bold text-gray-900">{Object.keys(stats.ordersByAgent).length}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Orders by status */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Orders by Status</h3>
          {Object.keys(stats.ordersByStatus).length === 0 ? (
            <p className="text-gray-400 text-sm">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(stats.ordersByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[status] || "bg-gray-100 text-gray-700"}`}>
                    {status}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${stats.totalOrders > 0 ? (count / stats.totalOrders) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Orders by agent */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Orders by Agent</h3>
          {Object.keys(stats.ordersByAgent).length === 0 ? (
            <p className="text-gray-400 text-sm">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(stats.ordersByAgent)
                .sort((a, b) => b[1] - a[1])
                .map(([agent, count]) => (
                  <div key={agent} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 font-medium truncate max-w-[120px]">
                      {agent}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${stats.totalOrders > 0 ? (count / stats.totalOrders) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Quick info */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Database Info</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Storage</span>
              <span className="font-medium text-gray-900">SQLite (persistent)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment</span>
              <span className="font-medium text-gray-900">Cash on Delivery</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">API Auth</span>
              <span className="font-medium text-gray-900">None (open)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">CORS</span>
              <span className="font-medium text-green-600">Enabled (*)</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Orders persist in SQLite database. Locally stored at <code>data/agentmart.db</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Recent orders table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Recent Orders</h3>
        </div>
        {stats.recentOrders.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400">
            <p className="text-lg mb-2">No orders yet</p>
            <p className="text-sm">Orders placed by AI agents will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">Order ID</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">Customer</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">Agent</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">Items</th>
                  <th className="text-right px-6 py-3 text-gray-600 font-medium">Total</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">Status</th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{order.id}</code>
                    </td>
                    <td className="px-6 py-3">
                      <div className="font-medium text-gray-900">{order.customer.name}</div>
                      <div className="text-xs text-gray-500">{order.customer.city}, {order.customer.country}</div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                        {order.agentId || "unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="text-gray-700">
                        {order.items.map((item, i) => (
                          <div key={i} className="text-xs">
                            {item.productName} x{item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right font-medium text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                        disabled={updatingId === order.id}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${statusColors[order.status]} ${updatingId === order.id ? "opacity-50" : ""}`}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-3 text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}<br />
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
