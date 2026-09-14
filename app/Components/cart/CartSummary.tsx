"use client";

import { useCartStore } from "../../src/stores/cart.store";

export function CartSummary() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <aside className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Cart</h2>

        <p className="mt-3 text-sm text-slate-500">Your cart is empty.</p>
      </aside>
    );
  }

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Cart</h2>

        <span className="text-sm text-slate-500">{totalItems} item(s)</span>
      </div>

      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item.id} className="border-b border-slate-100 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-slate-900">{item.name}</p>

                <p className="mt-1 text-sm text-slate-500">
                  {item.price.toLocaleString("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Remove
              </button>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => decreaseQuantity(item.id)}
                aria-label={`Decrease ${item.name} quantity`}
                className="flex size-8 items-center justify-center rounded-md border border-slate-300 text-slate-500"
              >
                −
              </button>

              <span className="min-w-6 text-center font-medium text-slate-500">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() => increaseQuantity(item.id)}
                aria-label={`Increase ${item.name} quantity`}
                className="flex size-8 items-center justify-center rounded-md border border-slate-300 text-slate-500"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-medium text-slate-700">Total</span>

        <span className="text-xl font-bold text-slate-900">
          {totalPrice.toLocaleString("pt-PT", {
            style: "currency",
            currency: "EUR",
          })}
        </span>
      </div>

      <button
        type="button"
        onClick={clearCart}
        className="mt-5 w-full rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        Clear cart
      </button>
    </aside>
  );
}
