export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  avatar: string | null;
  phone: string | null;
}
