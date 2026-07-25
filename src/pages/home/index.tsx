import SEO from "@/components/SEO";
import HeroSection from "./sections/heroSection";
import ServicesSection from "./sections/servicesSection";
import WhySection from "./sections/whySection";
import BookSection from "./sections/bookSection";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <>
      <SEO title="Homepage" description="BookEase - Homepage" />
      <div className="min-h-screen bg-surface-50 ">
        <HeroSection />
        <ServicesSection />
        <WhySection />
        <BookSection />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
