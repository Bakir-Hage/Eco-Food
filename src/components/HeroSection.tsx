import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthModal from "./AuthModal";

type Tab = "login" | "signup";

export default function HeroSection() {
  const user = useSelector((state: any) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("login");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="container mx-auto px-4 z-10 pt-20">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Rescue Surplus Food, Save Money, Reduce Waste
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
          Join thousands of food-conscious people saving money while fighting
          food waste. Connect with local restaurants and stores to rescue
          surplus meals before they go to waste.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => {
              setIsOpen(true);
              setTab("signup");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF8C00] px-8 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-[#e67e00]"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setIsOpen(true);
              setTab("login");
            }}
            className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/10 px-8 py-3 text-lg font-semibold text-white transition hover:bg-white/20"
          >
            Sign in
          </button>
        </div>
      </div>
      <AuthModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        tab={tab}
        setTab={setTab}
      />
    </div>
  );
}
