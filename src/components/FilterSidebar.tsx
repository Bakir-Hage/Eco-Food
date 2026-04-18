type FilterOptions = {
  category: string[];
  priceRange: [number, number];
};

type FilterSidebarProps = {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
};

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...filters.category, category];
    onFilterChange({ ...filters, category: newCategories });
  };

  const clearFilters = () => {
    onFilterChange({
      category: [],
      priceRange: [0, 50],
    });
  };

  const categories = [
    "Sandwiches",
    "Bakery",
    "Pizza",
    "Salads",
    "Sushi",
    "Desserts",
    "Burgers",
    "Soups",
  ];
  console.log("Rendering FilterSidebar with filters:", filters);
  return (
    <aside className="w-full max-w-sm rounded-4xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40">
      <div className="flex items-center justify-between pb-5">
        <h3 className="text-xl font-semibold text-slate-900">Filters</h3>
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            Categories
          </p>
          <div className="space-y-3">
            {categories.map((category) => (
              <label
                key={category}
                htmlFor={`category-${category}`}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-emerald-300"
              >
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={filters.category.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-400"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Price Range
            </p>
            <span className="text-xs text-slate-400">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </span>
          </div>
          <div className="space-y-4">
            <input
              type="range"
              min={0}
              max={50}
              value={filters.priceRange[1]}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  priceRange: [filters.priceRange[0], Number(e.target.value)],
                })
              }
              className="w-full cursor-pointer appearance-none rounded-full range-slider"
            />
            <div className="flex justify-between text-sm font-medium text-slate-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}
