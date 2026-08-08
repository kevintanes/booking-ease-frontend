import api from "@/config/api";

export const getAllService = async (params: {
  limit?: number;
  search?: string;
  categoryId?: string;
  page?: number;
}) => {
  const result = await api.get(`/service/`, { params });
  return result.data;
};
