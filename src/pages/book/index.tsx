import SEO from "@/components/SEO";
import HeroSection from "./sections/heroSection";

const BookPage = () => {
  return (
    <>
      <SEO title="Booking" description="Booking" />
      <div className="bg-surface-50 min-h-screen">
        <HeroSection />
      </div>
    </>
  );
};

export default BookPage;
