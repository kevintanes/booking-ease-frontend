import api from "@/config/api";
import type { AdminBookingsResponse, BookingStatus } from "@/types/booking";

export interface TimeSlotPayload {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface ServicePayload {
  name: string;
  description?: string;
  price: number;
  duration: number;
  location?: string;
  categoryId: string;
  slots?: TimeSlotPayload[];
}

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

export const createService = async (payload: ServicePayload) => {
  const result = await api.post(`/admin/services`, payload);
  return result.data;
};

export const updateService = async (
  id: string,
  payload: Partial<ServicePayload>,
) => {
  const result = await api.patch(`/admin/services/${id}`, payload);
  return result.data;
};

export const deleteService = async (id: string) => {
  const result = await api.delete(`/admin/services/${id}`);
  return result.data;
};
