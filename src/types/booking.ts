import type { Payment } from "./payment";
import type { Service } from "./service";
import type { TimeSlot } from "./timeSlot";
import type { User } from "./user";

export type BookingStatus =
  | "WAITING_PAYMENT"
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export interface CreateBookingPayload {
  serviceId: string;
  timeSlotId: string;
  bookingDate: string;
  notes?: string;
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  timeSlotId: string;
  bookingDate: Date;
  status: BookingStatus;
  notes: string | null;
  totalAmount: number;
  createdAt: Date;
  payment: Payment;
  service: Service;
  timeSlot: TimeSlot;
  user: User;
}

export interface RecentBooking {
  id: string;
  bookingDate: Date;
  createdAt: Date;
  totalAmount: number;
  status: BookingStatus;
  user: Pick<User, "name" | "email">;
  service: Pick<Service, "name">;
}

export interface AdminBooking {
  id: string;
  bookingDate: string;
  status: BookingStatus;
  totalAmount: string;
  createdAt: string;
  user: { name: string; email: string };
  service: {
    name: string;
    category: { name: string; icon: string };
  };
  timeSlot: { startTime: string; endTime: string };
  payment: { status: string; method: string } | null;
}

export interface Pagination {
  page: number;
  limit: number;
  count: number;
  totalPage: number;
}

export interface AdminBookingsResponse {
  bookings: AdminBooking[];
  pagination: Pagination;
}
