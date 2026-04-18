import { ShoppingBag, Clock, Minus, Plus, X } from "lucide-react";

type FoodItem = {
  id: string;
  title: string;
  vendor?: string;
  image?: string;
  discountedPrice: number;
  originalPrice: number;
  quantity: number;
};

type CartItem = {
  foodItem: FoodItem;
  quantity: number;
};

type CartProps = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
};

function formatPickupTime() {
  const pickupDate = new Date();
  pickupDate.setHours(pickupDate.getHours() + 2);
  return pickupDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getPickupProgress() {
  return 60;
}

export default function Cart({
  open,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
}: CartProps) {
  if (!open) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.foodItem.discountedPrice * item.quantity,
    0,
  );
  const savedAmount = items.reduce(
    (sum, item) =>
      sum +
      (item.foodItem.originalPrice - item.foodItem.discountedPrice) *
        item.quantity,
    0,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center sm:p-8">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-4xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <ShoppingBag className="h-5 w-5 text-[#2D5A27]" />
              Cart ({items.length})
            </div>
            <p className="text-sm text-slate-500">
              Add food items to your cart and proceed to checkout to rescue them
              from waste.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {items.length > 0 && (
            <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Clock className="h-4 w-4 text-[#FF8C00]" />
                <span>Pickup by {formatPickupTime()}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-700"
                  style={{ width: `${getPickupProgress()}%` }}
                />
              </div>
            </div>
          )}

          {items.length === 0 ? (
            <div className="flex min-h-10 flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
              <div className="rounded-full bg-slate-200 p-6">
                <ShoppingBag className="h-12 w-12 text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                Your cart is empty
              </h3>
              <p className="text-sm text-slate-500">
                Start rescuing food to make a difference!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="max-h-[25vh] space-y-4 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                {items.map((item) => (
                  <div
                    key={item.foodItem.id}
                    className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:flex-row"
                  >
                    <img
                      src={item.foodItem.image}
                      alt={item.foodItem.title}
                      className="h-24 w-full rounded-2xl object-cover sm:w-24"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-base font-semibold text-slate-900">
                            {item.foodItem.title}
                          </h4>
                          <p className="mt-1 text-sm text-slate-500">
                            {item.foodItem.vendor}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.foodItem.id)}
                          className="rounded-full p-2 text-slate-500 transition hover:bg-slate-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <span className="text-lg font-bold text-emerald-700">
                          ${item.foodItem.discountedPrice.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1">
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
                            onClick={() =>
                              onUpdateQuantity(
                                item.foodItem.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
                            onClick={() =>
                              onUpdateQuantity(
                                item.foodItem.id,
                                Math.min(
                                  item.foodItem.quantity,
                                  item.quantity + 1,
                                ),
                              )
                            }
                            disabled={item.quantity >= item.foodItem.quantity}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>You're saving</span>
                    <span className="font-semibold">
                      -${savedAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-3 font-semibold">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-6 w-full rounded-full bg-[#2D5A27] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#234519]"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
