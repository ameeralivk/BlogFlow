
import Navbar from "../Components/Reusable/Navbar";
import { Footer } from "../Components/Reusable/Footer";
import { HeroSection } from "../Components/LandingPage/heroSection";
import { FeaturesSection } from "../Components/LandingPage/FeactureSection";
import { StatsBar } from "../Components/LandingPage/StateBar";
import { CTASection } from "../Components/LandingPage/CTASection";


export default function LandingPage() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Playfair+Display:ital,wght@1,700&display=swap');

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="min-h-screen bg-white antialiased">
        <Navbar />
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
