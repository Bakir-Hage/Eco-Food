import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import { logout } from "../features/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function LandingPage() {
  localStorage.setItem("isLoggedIn", "false");
  localStorage.setItem("uid", "");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);
  return (
    <div>
      <section className="relative pt-16 min-h-600px md:min-h-700px flex items-center bg-[url(/LandingPage.png)] bg-fixed bg-cover bg-center">
        <Header />
        <HeroSection />
      </section>
      <FeaturesSection />
    </div>
  );
}
