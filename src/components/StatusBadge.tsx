export const StatusBadge = ({ status }) => {
  const map = {
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
  };
  const { label, cls } = map[status] || {
    label: status,
    cls: "bg-surface-100 text-surface-800",
  };

  return <span className={`badge ${cls}`}>{label}</span>;
};
