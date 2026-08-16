import api from "@/config/api";

export const getAllService = async (params: {
  limit?: number;
  search?: string;
  categoryId?: string;
  page?: number;
}) => {
  const result = await api.get(`/services/`, { params });
  return result.data;
};

export const getServiceById = async (id: string) => {
  const result = await api.get(`/services/${id}`);
  return result.data;
};
