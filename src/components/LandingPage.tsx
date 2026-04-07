import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";

export default function LandingPage() {
  return (
    <div>
      <section className="relative pt-16 min-h-[600px] md:min-h-[700px] flex items-center bg-[url(/LandingPage.png)] bg-fixed bg-cover bg-center">
        <Header />
        <HeroSection />
      </section>
      <FeaturesSection />
    </div>
  );
}
