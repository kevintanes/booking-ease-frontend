import type { Booking } from "./booking";

export type PaymentStatus = "UNPAID" | "PAID" | "EXPIRED" | "FAILED";

export interface Payment {
  id: string;
  bookingId: string;
  booking: Booking;

  xenditInvoiceId: string;
  xenditPaymentUrl: string;
  amount: number;
  status: PaymentStatus;
  paymentMethod: string;
  paidAt: Date;
  expiredAt: Date;
}
