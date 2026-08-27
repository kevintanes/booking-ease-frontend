import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/handleApiError";
import { cancelBooking, getBookingById } from "@/services/bookingService";
import { createPayment } from "@/services/paymentService";
import type { Booking } from "@/types/booking";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import BookingActions from "./components/BookingActions";
import BookingInfoCard from "./components/BookingInfoCard";
import BookingPaymentCard from "./components/BookingPaymentCard";
import BookingStatusBanner from "./components/BookingStatusBanner";

const BookingDetailPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBookingById(id as string),
  });

  const booking: Booking | undefined = data?.data;

  useEffect(() => {
    const result = searchParams.get("payment");
    if (result === "success") {
      toast.add({
        type: "success",
        description: "Payment confirmed! Your booking is confirmed!",
      });
      refetch();
    } else if (result === "failed") {
      toast.add({
        type: "error",
        description: "Payment failed! Please try again later.",
      });
    }
  }, []);

  const payMutation = useMutation({
    mutationFn: () => createPayment(id as string),
    onSuccess: (res) => {
      const url = res.data.xenditPaymentUrl;
      if (url) {
        window.open(url, "_blank");
      } else {
        toast.add({
          type: "error",
          description: "Payment URl not available",
        });
        queryClient.invalidateQueries({ queryKey: ["booking", id] });
      }
    },
    onError: (error) => {
      toast.add({
        type: "error",
        description: getErrorMessage(
          error,
          "Payment failed. Please try again.",
        ),
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => cancelBooking(id as string),
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Booking cancelled",
      });
      queryClient.invalidateQueries({ queryKey: ["booking", id] });
    },
    onError: (error) => {
      toast.add({
        type: "error",
        description: getErrorMessage(error, "Cancel failed. Please try again."),
      });
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-32">
        <p className="text-surface-800">Loading...</p>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="min-h-screen bg-surface-50">
        <div className="text-center py-32 text-surface-800">
          Booking not found.
        </div>
      </div>
    );
  }

  const canPay = booking?.status === "WAITING_PAYMENT";
  const canCancel = !["COMPLETED", "CANCELLED"].includes(booking.status);

  return (
    <>
      <SEO title="Booking Detail" description="Booking Detail" />
      <div className="min-h-screen bg-surface-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            render={<Link to={`/dashboard`} />}
            nativeButton={false}
            className="gap-2 h-fit font-medium text-surface-900 hover:text-surface-800 mb-6"
          >
            <ArrowLeft className="size-3.5" /> Back to dashboard
          </Button>

          <BookingStatusBanner status={booking.status} />
          <BookingInfoCard booking={booking} />
          <BookingPaymentCard payment={booking.payment} />
          <BookingActions
            canPay={canPay}
            canCancel={canCancel}
            onPay={() => payMutation.mutate()}
            onCancel={() => cancelMutation.mutate()}
            isPaying={payMutation.isPending}
            isCancelling={cancelMutation.isPending}
          />
        </div>
      </div>
    </>
  );
};

export default BookingDetailPage;
