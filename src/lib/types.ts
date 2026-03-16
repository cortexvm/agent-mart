export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: "books" | "gadgets";
  subcategory: string;
  image: string;
  inStock: boolean;
  tags: string[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  paymentMethod: "COD";
  status: "confirmed" | "processing" | "shipped" | "delivered";
  customer: {
    name: string;
    email?: string;
    phone?: string;
    address: string;
    city: string;
    country: string;
  };
  createdAt: string;
  estimatedDelivery: string;
  agentId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    timestamp: string;
  };
}
