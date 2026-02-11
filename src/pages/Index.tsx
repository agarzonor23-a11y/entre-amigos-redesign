import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import ProductsSection from "@/components/landing/ProductsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import PaymentBanner from "@/components/landing/PaymentBanner";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ProductsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <PaymentBanner />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
