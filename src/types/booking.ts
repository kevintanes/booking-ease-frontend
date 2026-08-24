import type { TimeSlot } from "./timeSlot";
import type { Service } from "./service";
import type { Category } from "./category";
import type { Payment } from "./payment";

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  service: Service;
  timeSlotId: string;
  timeSlot: TimeSlot;
  bookingDate: Date;
  status:
    | "WAITING_PAYMENT"
    | "PENDING"
    | "CONFIRMED"
    | "COMPLETED"
    | "CANCELLED";
  notes?: string;
  totalAmount: number;
  category: Category;
  payment: Payment;
}
