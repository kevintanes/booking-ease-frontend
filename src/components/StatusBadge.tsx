import type { BookingStatus } from "@/types/booking";
import type { PaymentStatus } from "@/types/payment";

type Status = BookingStatus | PaymentStatus;

const STATUS_MAP: Record<Status, { label: string; cls: string }> = {
  WAITING_PAYMENT: {
    label: "Waiting Payment",
    cls: "bg-yellow-100 text-yellow-700",
  },
  PENDING: { label: "Pending", cls: "bg-blue-100 text-blue-700" },
  CONFIRMED: { label: "Confirmed", cls: "bg-green-100 text-green-700" },
  COMPLETED: { label: "Completed", cls: "bg-surface-100 text-surface-600" },
  CANCELLED: { label: "Cancelled", cls: "bg-red-100 text-red-600" },
  UNPAID: { label: "Unpaid", cls: "bg-yellow-100 text-yellow-700" },
  PAID: { label: "Paid", cls: "bg-green-100 text-green-700" },
  EXPIRED: { label: "Expired", cls: "bg-red-100 text-red-600" },
  FAILED: { label: "Failed", cls: "" },
};

export const StatusBadge = ({ status }: { status: Status }) => {
  const { label, cls } = STATUS_MAP[status] ?? {
    label: status,
    cls: "bg-surface-100 text-surface-800",
  };

  return <span className={`badge ${cls}`}>{label}</span>;
};
