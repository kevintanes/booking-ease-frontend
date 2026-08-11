import SEO from "@/components/SEO";
import HeroSection from "./sections/heroSection";

const ServiceDetailPage = () => {
  return (
    <>
      <SEO title="Sevice Detail" description="Sevice Detail" />
      <div className="bg-surface-50 min-h-screen">
        <HeroSection />
      </div>
    </>
  );
};

export default ServiceDetailPage;
