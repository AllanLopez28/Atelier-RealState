import Navbar from "@/components/public/Navbar";
import HeroSection from "@/components/public/HeroSection";
import InteractiveModule from "@/components/public/InteractiveModule";
import FeaturesTabs from "@/components/public/FeaturesTabs";
import Footer from "@/components/public/Footer";

export default function PublicPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <InteractiveModule />
      <FeaturesTabs />
      <Footer />
    </main>
  );
}
