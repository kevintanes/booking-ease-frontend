import SEO from "@/components/SEO";
import { useAuth } from "@/context/authContext";
import BookingStatCards from "./components/BookingStatCards";
import BookingsSection from "./components/BookingsSection";
import DashboardHeader from "./components/DashboardHeader";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <>
      <SEO title="Dashboard" description="Dashboard" />
      <div className="min-h-screen bg-surface-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardHeader name={user?.name} email={user?.email} />
          <BookingStatCards />
          <BookingsSection />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
