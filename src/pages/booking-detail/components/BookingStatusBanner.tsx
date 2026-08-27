import Card from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import type { Booking } from "@/types/booking";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";

interface Props {
  status: Booking["status"];
}

const statusIcon = {
  CONFIRMED: <CheckCircle className="text-green-500 size-5" />,
  CANCELLED: <XCircle className="text-red-500 size-5" />,
  COMPLETED: <CheckCircle className="text-surface-400 size-5" />,
  WAITING_PAYMENT: <AlertCircle className="text-yellow-500 size-5" />,
  PENDING: <Clock className="text-blue-500 size-5" />,
};

const statusBgClass = {
  CONFIRMED: "bg-green-50 border-green-200",
  CANCELLED: "bg-red-50 border-red-200",
  COMPLETED: "bg-blue-50 border-blue-200",
  WAITING_PAYMENT: "bg-yellow-50 border-yellow-200",
  PENDING: "bg-blue-50 border-blue-200",
};

const BookingStatusBanner = ({ status }: Props) => {
  return (
    <Card
      className={`p-5 mb-5 flex items-center gap-3 ${statusBgClass[status]}`}
    >
      {statusIcon[status]}

      <div>
        <p className="font-semibold text-surface-900">
          {status === "WAITING_PAYMENT" && "Payment Required"}
          {status === "PENDING" && "Awaiting Confirmation"}
          {status === "CONFIRMED" && "Booking Confirmed!"}
          {status === "COMPLETED" && "Session Completed"}
          {status === "CANCELLED" && "Booking Cancelled"}
        </p>
        <p className="text-sm text-surface-800">
          {status === "WAITING_PAYMENT" &&
            "Complete your payment to confirm the booking."}
          {status === "PENDING" && "Your payment is being processed."}
          {status === "CONFIRMED" &&
            "Your booking has been confirmed. See you soon!"}
          {status === "COMPLETED" && "Thank you for using our service."}
          {status === "CANCELLED" && "This booking has been cancelled"}
        </p>
      </div>
      <div className="ml-auto">
        <StatusBadge status={status} />
      </div>
    </Card>
  );
};

export default BookingStatusBanner;
