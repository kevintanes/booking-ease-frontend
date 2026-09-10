import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import BookingSection from "./sections/bookingSection";
import FilterSection from "./sections/filterSection";
import HeaderSection from "./sections/headerSection";
import { getBookings, updateBookingStatus } from "@/services/adminService";
import type { BookingStatus } from "@/types/booking";
import { toast } from "@/components/ui/toast";

const AdminBookingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";
  const page = Number(searchParams.get("page")) || 1;
  const hasFilter = Boolean(search || status);

  const { data, isPending } = useQuery({
    queryKey: ["admin-bookings", { search, status, page }],
    queryFn: () =>
      getBookings({
        search: search || undefined,
        status: status || undefined,
        page,
        limit: 10,
      }),
    placeholderData: keepPreviousData,
  });

  const { mutate: changeStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) =>
      updateBookingStatus(id, status),
    onSuccess: () => {
      toast.add({ type: "success", description: "Booking status updated" });
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
    },
    onError: () => {
      toast.add({ type: "error", description: "Failed to update status" });
    },
  });

  const handleFilterChange = (updates: {
    search?: string;
    status?: string;
  }) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (updates.search !== undefined) {
        if (updates.search) {
          next.set("search", updates.search);
        } else {
          next.delete("search");
        }
      }
      if (updates.status !== undefined) {
        if (updates.status) {
          next.set("status", updates.status);
        } else {
          next.delete("status");
        }
      }
      next.set("page", "1");
      return next;
    });
  };

  const handlePageChange = (nextPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(nextPage));
      return next;
    });
  };

  const handleClearFilter = () => setSearchParams({});

  return (
    <>
      <HeaderSection />
      <FilterSection
        search={search}
        status={status}
        hasFilters={hasFilter}
        onSearch={(value) => handleFilterChange({ search: value })}
        onStatusChange={(value) => handleFilterChange({ status: value })}
        onClear={handleClearFilter}
      />
      <BookingSection
        data={data?.data}
        isLoading={isPending}
        onPageChange={handlePageChange}
        onStatusChange={(id, nextStatus) =>
          changeStatus({ id, status: nextStatus })
        }
      />
    </>
  );
};

export default AdminBookingsPage;
