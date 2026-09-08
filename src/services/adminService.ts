import api from "@/config/api";

export const getDashboard = async () => {
  const result = await api.get(`/admin/dashboard-stats`);
  return result.data;
};
