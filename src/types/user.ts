export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  avatar: string | null;
  phone: string | null;
  googleId: string;
  createdAt: Date;
}

export interface UserWithBookingCount extends User {
  _count: {
    bookings: number;
  };
}
