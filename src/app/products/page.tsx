import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { getProductsByCategory } from "@/lib/data/products";
import { Suspense } from "react";

export const metadata = {
  title: "Products - Agent Mart",
  description: "Browse books and tech gadgets available on Agent Mart.",
};

function ProductGrid({ category, subcategory }: { category?: string; subcategory?: string }) {
  const products = getProductsByCategory(category, subcategory);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {products.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-500">
          No products found for this filter.
        </div>
      )}
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; subcategory?: string }>;
}) {
  const { category, subcategory } = await searchParams;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">
          Browse our catalog of books and tech gadgets. Also available via{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">GET /api/products</code>
        </p>
      </div>

      <div className="mb-6">
        <Suspense fallback={null}>
          <CategoryFilter />
        </Suspense>
      </div>

      <ProductGrid category={category} subcategory={subcategory} />
    </div>
  );
}
