import { TrendingDown, Users, Utensils } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Eco-Food ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the movement to reduce food waste while enjoying delicious
            meals at amazing prices
          </p>
        </div>
        <FeatureCard />

        {/* <FeatureCard
          icon={TrendingDown}
          title="Save Up to 70%"
          description=" Get high-quality surplus food at incredible discounts. Save money
              while making a positive impact on the environment."
        />
        <FeatureCard
          icon={Utensils}
          title="Dual-Purpose Social Impact"
          description=" Food Waste Mitigation: It prevents perfectly edible food from ending
          up in landfills, where it would otherwise produce methane (a potent
          greenhouse gas)."
        />
        <FeatureCard
          icon={Users}
          title="Join Our Community"
          description=" Be part of a growing community committed to sustainability. Together,
          we're making a real difference."
        /> */}
      </div>
    </section>
  );
}
