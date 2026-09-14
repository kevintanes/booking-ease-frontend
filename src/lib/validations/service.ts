import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1, "Price is required"),
  duration: z.number().min(1, "Duration is required"),
  location: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
