import FoodCard from "./FoodCard";

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

type FoodListProps = {
  filteredItems: FoodItem[];
  onAddToCart: (item: FoodItem) => void;
};

export default function FoodList({
  filteredItems,
  onAddToCart,
}: FoodListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {filteredItems.map((item) => (
        <FoodCard key={item.id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
