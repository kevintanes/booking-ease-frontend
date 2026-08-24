import type { Booking } from "./booking";

export interface Payment {
  id: string;
  bookingId: string;
  booking: Booking;

  xenditInvoiceId: string;
  xenditPaymentUrl: string;
  amount: number;
  status: "UNPAID" | "PAID" | "EXPIRED" | "FAILED";
  paymentMethod: string;
  paidAt: Date;
  expiredAt: Date;
}
