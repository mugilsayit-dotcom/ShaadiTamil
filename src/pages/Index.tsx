import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import SearchSection from "@/components/SearchSection";
import ProfileCards from "@/components/ProfileCards";
import HowItWorks from "@/components/HowItWorks";
import SuccessStories from "@/components/SuccessStories";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import WelcomePopup from "@/components/WelcomePopup";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <SearchSection />
      <ProfileCards />
      <HowItWorks />
      <SuccessStories />
      <PricingSection />
      <Footer />
      <WelcomePopup />
      <ChatBot />
    </div>
  );
};

export default Index;
