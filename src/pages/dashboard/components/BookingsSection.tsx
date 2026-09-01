import Card from "@/components/Card";
import PaginationControl from "@/components/PaginationControl";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import { getBookings } from "@/services/bookingService";
import type { Booking } from "@/types/booking";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const STATUS_TABS = [
  { value: "", label: "All" },
  { value: "WAITING_PAYMENT", label: "Waiting Payment" },
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const BookingsSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("status") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const setActiveTab = (status: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (status) next.set("status", status);
      else next.delete("status");
      next.set("page", "1");
      return next;
    });
  };

  const goToPage = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-bookings", activeTab, page],
    queryFn: () =>
      getBookings({ status: activeTab || undefined, page, limit: 5 }),
    placeholderData: keepPreviousData,
  });

  const bookings: Booking[] = data?.data?.bookings || [];
  const pagination = data?.data?.pagination;

  return (
    <>
      <Card className="overflow-hidden">
        <div className="p-5 border-b border-surface-100">
          <h2 className="font-semibold text-surface-900 mb-4">My Bookings</h2>
          <div className="flex gap-2 pb-1 overflow-x-auto scrollbar-none">
            {STATUS_TABS.map((tab) => (
              <Button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                }}
                className={`${tab.value === activeTab ? "bg-brand-600 text-white" : "bg-white text-surface-800 hover:bg-surface-100"}`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {isLoading && (
          <p className="p-5 text-sm text-surface-400">Loading bookings...</p>
        )}

        {isError && (
          <p className="p-5 text-sm text-red-500">Failed to load bookings.</p>
        )}

        {!isLoading && !isError && bookings.length === 0 && (
          <p className="p-5 text-sm text-surface-400">No bookings found.</p>
        )}

        {bookings.map((booking) => (
          <Link
            key={booking.id}
            to={`/bookings/${booking.id}`}
            className="flex items-center gap-4 p-4 sm:p-5 hover:bg-surface-50 transition-colors group"
          >
            <div className="size-10 rounded-xl bg-brand-50 flex items-center justify-center text-lg shrink-0">
              {booking.service.category.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium text-surface-900 truncate group-hover:text-brand-700 transition-colors">
                {booking.service.name}
              </p>
              <div className="flex items-center gap-3 text-xs text-surface-800 mt-0.5">
                <span>
                  {format(new Date(booking.bookingDate), "EEE, MMM d")}
                </span>
                <span>|</span>
                <span>{booking.timeSlot.startTime}</span>
                <span>|</span>
                <span className="font-semibold">
                  {formatCurrency(booking.totalAmount)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <StatusBadge status={booking.status} />
              <ChevronRight className="size-4 text-surface-400 group-hover:text-surface-800 transition-colors" />
            </div>
          </Link>
        ))}
      </Card>

      {pagination && (
        <PaginationControl
          page={page}
          totalPage={pagination.totalPage}
          onPageChange={goToPage}
        />
      )}
    </>
  );
};

export default BookingsSection;
