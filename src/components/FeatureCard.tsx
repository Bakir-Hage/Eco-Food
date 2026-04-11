import { TrendingDown, Users, Utensils } from "lucide-react";

export default function FeatureCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded-xl p-8 shadow-sm border hover:shadow-md transition-shadow">
        <div className="bg-[#2D5A27]/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
          <TrendingDown className="w-7 h-7 text-[#2D5A27]" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Save Up to 70%</h3>
        <p className="text-muted-foreground">
          Get high-quality surplus food at incredible discounts. Save money
          while making a positive impact on the environment.
        </p>
      </div>
      <div className="bg-white rounded-xl p-8 shadow-sm border hover:shadow-md transition-shadow">
        <div className="bg-[#FF8C00]/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
          <Utensils className="w-7 h-7 text-[#FF8C00]" />
        </div>
        <h3 className="text-xl font-semibold mb-3">
          Dual-Purpose Social Impact
        </h3>
        <p className="text-muted-foreground">
          Food Waste Mitigation: It prevents perfectly edible food from ending
          up in landfills, where it would otherwise produce methane (a potent
          greenhouse gas).
        </p>
      </div>
      <div className="bg-white rounded-xl p-8 shadow-sm border hover:shadow-md transition-shadow">
        <div className="bg-[#2D5A27]/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
          <Users className="w-7 h-7 text-[#2D5A27]" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Join Our Community</h3>
        <p className="text-muted-foreground">
          Be part of a growing community committed to sustainability. Together,
          we're making a real difference.
        </p>
      </div>
    </div>
  );
}
