import SEO from "@/components/SEO";
import HeaderSection from "./sections/headerSection";

const ServicesPage = () => {
  return (
    <>
      <SEO title="Services" description="BookEase - Services" />
      <div className="bg-surface-50 min-h-screen">
        <HeaderSection />
      </div>
    </>
  );
};

export default ServicesPage;
