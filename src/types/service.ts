import type { Category } from "./category";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: number;
  location: string | null;
  images: string | null;
  rating: string | null;
  totalReviews: number;
  isActive: boolean;
  categoryId: string;
  category: Category;
}
