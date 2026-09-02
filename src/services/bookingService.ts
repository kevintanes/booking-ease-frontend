import api from "@/config/api";
import type { CreateBookingPayload } from "@/types/booking";

export const createBooking = async (booking: CreateBookingPayload) => {
  const result = await api.post(`/bookings`, booking);
  return result.data;
};

export const getBookingById = async (id: string) => {
  const result = await api.get(`/bookings/${id}`);
  return result.data;
};

export const getBookings = async (params: {
  limit?: number;
  page?: number;
  status?: string;
}) => {
  const result = await api.get(`/bookings`, { params });
  return result.data;
};

export const cancelBooking = async (id: string) => {
  const result = await api.patch(`/bookings/${id}/cancel`);
  return result.data;
};

export const getBookingStat = async () => {
  const result = await api.get(`/bookings/stats`);
  return result.data;
};
