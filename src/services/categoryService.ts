import api from "@/config/api";

export const getAllCategories = async () => {
  const result = await api.get("/categories");

  return result.data;
};
