import { Search } from "lucide-react";

type MarketPlaceHeaderProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};
export default function MarketPlaceHeader({
  searchQuery,
  setSearchQuery,
}: MarketPlaceHeaderProps) {
  return (
    <div className="bg-linear-to-r from-[#2D5A27] to-[#3d7336] text-white">
      <div className="container mx-auto px-4 py-20 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-6 text-4xl md:text-5xl font-bold text-white leading-tight">
            Rescue Surplus Food Today
          </h1>
          <p className="text-base md:text-lg text-white/95 mb-8 leading-relaxed">
            Save money while reducing food waste. Browse local restaurants and
            stores offering surplus food at discounted prices.
          </p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for food, restaurants, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 md:py-4 bg-white text-gray-700 placeholder-gray-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
