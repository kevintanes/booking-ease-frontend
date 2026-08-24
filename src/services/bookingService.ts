import api from "@/config/api";

export const createBooking = async (booking) => {
  const result = await api.post(`/bookings`, booking);
  return result.data;
};

export const getBookingById = async (id: string) => {
  const result = await api.get(`/bookings/${id}`);
  return result.data;
};
