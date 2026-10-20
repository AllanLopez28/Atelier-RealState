import PublicShell from "@/components/public/PublicShell";
import Navbar from "@/components/public/Navbar";
import HeroSection from "@/components/public/HeroSection";
import Manifesto from "@/components/public/Manifesto";
import Franja from "@/components/public/Franja";
import InteractiveModule from "@/components/public/InteractiveModule";
import FeaturesTabs from "@/components/public/FeaturesTabs";
import LocationSection from "@/components/public/LocationSection";
import Footer from "@/components/public/Footer";

export default function PublicPage() {
  return (
    <PublicShell>
      <Navbar />
      <HeroSection />
      <LocationSection />
      {/* <Manifesto /> */}
      <Franja />
      <InteractiveModule />
      <FeaturesTabs />
      <Footer />
    </PublicShell>
  );
}
