"use client";

import { useCartStore } from "@/app/src/stores/cart.store";
import type { Product } from "@/app/src/types/cart.types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex-1">
        <h2>{product.name}</h2>

        <p className="mt-2 text-lg font-bold text-blue-600">
          {product.price.toLocaleString("pt-PT", {
            style: "currency",
            currency: "EUR",
          })}
        </p>

        <button
          type="button"
          onClick={() => addItem(product)}
          className="mt-5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white trasition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
