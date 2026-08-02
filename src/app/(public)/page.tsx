import Navbar from "@/components/public/Navbar";
import HeroSection from "@/components/public/HeroSection";
import ModelToggle from "@/components/public/ModelToggle";
import FeaturesTabs from "@/components/public/FeaturesTabs";

export default function PublicPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ModelToggle />
      <FeaturesTabs />
    </main>
  );
}
