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
