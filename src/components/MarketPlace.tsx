import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import Navbar from "./Navbar";
import MarketPlaceHeader from "./MarketPlaceHeader";
import { FilterSidebar } from "./FilterSidebar";
import FoodList from "./FoodList";
import { fetchFoodItems } from "../features/FoodThunk";
import type { RootState, AppDispatch } from "../store";

type FilterOptions = {
  category: string[];
  priceRange: [number, number];
};

export default function MarketPlace() {
  const { handleAddToCart, cartItemCount, onOpenCart } = useOutletContext<{
    handleAddToCart: (item: any) => void;
    cartItemCount: number;
    onOpenCart: () => void;
  }>();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.food,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: [],
    priceRange: [0, 50],
  });

  useEffect(() => {
    dispatch(fetchFoodItems());
  }, [dispatch]);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filters.category.length === 0 || filters.category.includes(item.category);
    const matchesPrice =
      item.discountedPrice >= filters.priceRange[0] &&
      item.discountedPrice <= filters.priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="bg-slate-50 min-h-screen">
      <Navbar cartItemCount={cartItemCount} onOpenCart={onOpenCart} />
      <MarketPlaceHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <FilterSidebar filters={filters} onFilterChange={setFilters} />

          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Showing {filteredItems.length} of {items.length} items
                </p>
              </div>
            </div>
            <FoodList
              filteredItems={filteredItems}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
