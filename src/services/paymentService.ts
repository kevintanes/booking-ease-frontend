import api from "@/config/api";

export const createPayment = async (bookingId: string) => {
  const result = await api.post(`/payments/${bookingId}/create`);
  return result.data;
};
