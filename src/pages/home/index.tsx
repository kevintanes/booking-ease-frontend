import SEO from "@/components/SEO";
import HeroSection from "./sections/heroSection";
import ServicesSection from "./sections/servicesSection";

const HomePage = () => {
  return (
    <>
      <SEO title="Homepage" description="BookEase - Homepage" />
      <div className="min-h-screen bg-surface-50">
        <HeroSection />
        <ServicesSection />
      </div>
    </>
  );
};

export default HomePage;
