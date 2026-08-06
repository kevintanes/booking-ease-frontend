import api from "@/config/api";

export const getAllService = async () => {
  const result = await api.get(`/service/`);
  return result.data;
};
