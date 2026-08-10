import SEO from "@/components/SEO";
import HeaderSection from "./sections/headerSection";
import ServiceListSection from "./sections/serviceListSection";

const ServicesPage = () => {
  return (
    <>
      <SEO title="Services" description="BookEase - Services" />
      <div className="bg-surface-50 min-h-screen">
        <HeaderSection />
        <ServiceListSection />
      </div>
    </>
  );
};

export default ServicesPage;
