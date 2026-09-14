import SEO from "@/components/SEO";
import HeaderSection from "./sections/headerSection";
import TableSection from "./sections/tableSection";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllUsers } from "@/services/adminService";
import type { User } from "@/types/user";

const AdminUsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", page],
    queryFn: () => getAllUsers({ page, limit: 10 }),
  });

  const users: User[] = data?.data?.users || [];
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
