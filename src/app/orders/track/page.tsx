import OrderForm from "@/components/OrderForm";

export const metadata = {
  title: "Track Order - Agent Mart",
  description: "Track your Agent Mart order status.",
};

export default function TrackOrderPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
      <p className="text-gray-600 mb-8">
        Enter your order ID to check its current status. Orders can also be tracked via{" "}
        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">GET /api/orders/&#123;id&#125;</code>
      </p>
      <OrderForm />
    </div>
  );
}
