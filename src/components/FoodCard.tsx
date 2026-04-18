type FoodItem = {
  id: string;
  title: string;
  vendor?: string;
  image?: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  expiresAt: string;
  category: string;
  description: string;
};

type FoodCardProps = {
  item: FoodItem;
  onAddToCart: (item: FoodItem) => void;
};

export default function FoodCard({ item, onAddToCart }: FoodCardProps) {
  const discountPercent = item.originalPrice
    ? Math.max(
        0,
        Math.round(
          ((item.originalPrice - item.discountedPrice) / item.originalPrice) *
            100,
        ),
      )
    : 0;

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/40">
      <div className="relative h-56 overflow-hidden bg-slate-100">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            No image available
          </div>
        )}
        {discountPercent > 0 && (
          <span className="absolute right-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            -{discountPercent}%
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {item.vendor ?? "Local vendor"}
            </p>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {item.quantity} available
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600 line-clamp-2">
          {item.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xl font-bold text-emerald-700">
              ${item.discountedPrice.toFixed(2)}
            </p>
            <p className="text-sm text-slate-400 line-through">
              ${item.originalPrice.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => onAddToCart(item)}
            className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
