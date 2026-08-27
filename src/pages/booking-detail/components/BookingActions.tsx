import { Button } from "@/components/ui/button";
import { CreditCard, XCircle } from "lucide-react";

interface Props {
  canPay: boolean;
  canCancel: boolean;
  onPay: () => void;
  onCancel: () => void;
  isPaying: boolean;
  isCancelling: boolean;
}

const BookingActions = ({
  canCancel,
  canPay,
  isCancelling,
  isPaying,
  onCancel,
  onPay,
}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {canPay && (
        <Button
          onClick={onPay}
          disabled={isPaying}
          size="xl"
          className=" gap-2 flex-1"
        >
          <CreditCard className="size-4" /> Pay Now
        </Button>
      )}
      {canCancel && (
        <Button
          onClick={onCancel}
          disabled={isCancelling}
          variant="secondary"
          size="xl"
          className="gap-2 flex-1 sm:flex-none text-red-600 border-red-200 hover:bg-red-50"
        >
          <XCircle className="size-4" /> Cancel Booking
        </Button>
      )}
    </div>
  );
};

export default BookingActions;
