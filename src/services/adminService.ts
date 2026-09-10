import api from "@/config/api";
import type { AdminBookingsResponse, BookingStatus } from "@/types/booking";

export const getDashboard = async () => {
  const result = await api.get(`/admin/dashboard-stats`);
  return result.data;
};

export const getBookings = async (params: {
  limit?: number;
  page?: number;
  status?: string;
  search?: string;
}) => {
  const result = await api.get<{ data: AdminBookingsResponse }>(
    "/admin/bookings",
    { params },
  );
  return result.data;
};

export const updateBookingStatus = async (
  id: string,
  status: BookingStatus,
) => {
  const result = await api.patch(`/admin/bookings/${id}/status`, { status });
  return result.data;
};
