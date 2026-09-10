import type { BookingStatus } from "@/types/booking";

export const STATUS_LABELS: Record<BookingStatus, string> = {
  WAITING_PAYMENT: "Waiting Payment",
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const STATUS_FILTER_OPTIONS = [
  { value: "", label: "All" },
  ...(Object.keys(STATUS_LABELS) as BookingStatus[]).map((value) => ({
    value,
    label: STATUS_LABELS[value],
  })),
];

export const NEXT_STATUSES: Record<BookingStatus, BookingStatus[]> = {
  WAITING_PAYMENT: ["PENDING", "CANCELLED"],
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
};
