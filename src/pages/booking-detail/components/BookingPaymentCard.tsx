import Card from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import type { Booking } from "@/types/booking";
import { CreditCard, ExternalLink } from "lucide-react";

interface Props {
  payment: Booking["payment"];
}

const BookingPaymentCard = ({ payment }: Props) => {
  if (!payment) return null;

  return (
    <Card className="p-6 mb-5">
      <h2 className="font-semibold text-surface-900 mb-4">Payment</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="text-surface-400 size-4" />
          <span className="text-sm text-surface-800">
            {payment.paymentMethod || "Online Payment"}
          </span>
        </div>
        <StatusBadge status={payment.status} />
      </div>
      {payment.xenditPaymentUrl && payment.status === "UNPAID" && (
        <a
          href={payment.xenditPaymentUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex items-center justify-center gap-2 btn-primary w-full py-2.5 text-sm"
        >
          <ExternalLink className="size-3.5" /> Open Payment Page
        </a>
      )}
    </Card>
  );
};

export default BookingPaymentCard;
