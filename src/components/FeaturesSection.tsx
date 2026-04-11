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
      </div>
    </section>
  );
}
