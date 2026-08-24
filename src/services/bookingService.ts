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
