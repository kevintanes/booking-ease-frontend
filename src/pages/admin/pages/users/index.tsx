import SEO from "@/components/SEO";
import { getAllUsers } from "@/services/adminService";
import type { UserWithBookingCount } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import HeaderSection from "./sections/headerSection";
import TableSection from "./sections/tableSection";

const AdminUsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", page],
    queryFn: () => getAllUsers({ page, limit: 10 }),
  });

  const users: UserWithBookingCount[] = data?.data?.users || [];
  const pagination = data?.data?.pagination;

  const handlePageChange = (nextPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(nextPage));
      return next;
    });
  };

  return (
    <>
      <SEO title="Admin Users" description="Admin Users" />
      <HeaderSection />
      <TableSection
        pagination={pagination}
        users={users}
        isLoading={isLoading}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default AdminUsersPage;
