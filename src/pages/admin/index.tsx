import { useQuery } from "@tanstack/react-query";
import HeaderSection from "./sections/headerSection";
import RecentBookingsSection from "./sections/recentBookingsSection";
import TotalSection from "./sections/totalSection";
import { getDashboard } from "@/services/adminService";

const AdminDashboardPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => getDashboard(),
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="text-center py-32">
        <p className="text-surface-800">Loading...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="text-center py-32">
        <p className="text-red-600">Failed to load dashboard data.</p>
      </div>
    );
  }

  const dashboardData = data.data;

  return (
    <div>
      <HeaderSection />
      <TotalSection stats={dashboardData.total} />
      <RecentBookingsSection recentBookings={dashboardData.recentBookings} />
    </div>
  );
};

export default AdminDashboardPage;
