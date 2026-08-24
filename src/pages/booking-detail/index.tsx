import Card from "@/components/Card";
import SEO from "@/components/SEO";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import { getBookingById } from "@/services/bookingService";
import type { Booking } from "@/types/booking";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  CreditCard,
  ExternalLink,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const statusIcon = {
  CONFIRMED: <CheckCircle className="text-green-500 size-5" />,
  CANCELLED: <XCircle className="text-red-500 size-5" />,
  COMPLETED: <CheckCircle className="text-surface-400 size-5" />,
  WAITING_PAYMENT: <AlertCircle className="text-yellow-500 size-5" />,
  PENDING: <Clock className="text-blue-500 size-5" />,
};

const BookingDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBookingById(id as string),
  });

  const booking: Booking | undefined = data?.data;

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

          <Card
            className={`p-5 mb-5 flex items-center gap-3 ${
              booking.status === "CONFIRMED"
                ? "bg-green-50 border-green-200"
                : booking.status === "CANCELLED"
                  ? "bg-red-50 border-red-200"
                  : booking.status === "WAITING_PAYMENT"
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-blue-50 border-blue-200"
            }`}
          >
            {statusIcon[booking.status]}

            <div>
              <p className="font-semibold text-surface-900">
                {booking.status === "WAITING_PAYMENT" && "Payment Required"}
                {booking.status === "PENDING" && "Awaiting Confirmation"}
                {booking.status === "CONFIRMED" && "Booking Confirmed!"}
                {booking.status === "COMPLETED" && "Session Completed"}
                {booking.status === "CANCELLED" && "Booking Cancelled"}
              </p>
              <p className="text-sm text-surface-800">
                {booking.status === "WAITING_PAYMENT" &&
                  "Complete your payment to confirm the booking."}
                {booking.status === "PENDING" &&
                  "Your payment is being processed."}
                {booking.status === "CONFIRMED" &&
                  "Your booking has been confirmed. See you soon!"}
                {booking.status === "COMPLETED" &&
                  "Thank you for using our service."}
                {booking.status === "CANCELLED" &&
                  "This booking has been cancelled"}
              </p>
            </div>
            <div className="ml-auto">
              <StatusBadge status={booking.status} />
            </div>
          </Card>

          <Card className="p-6 mb-5">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-semibold text-surface-900">
                Booking Details
              </h2>
              <span className="text-xs text-surface-400 font-mono ">
                #{booking.id.slice(-8).toUpperCase()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <p className="text-surface-400 text-xs mb-0.5">Service</p>
                <p className="font-medium text-surface-800">
                  {booking.service.name}
                </p>
              </div>
              <div>
                <p className="text-surface-400 text-xs mb-0.5">Category</p>
                <p className="font-medium text-surface-800">
                  {booking.service.category?.icon}{" "}
                  {booking.service.category?.name}
                </p>
              </div>
              <div>
                <p className="text-surface-400 text-xs mb-0.5">Date</p>
                <p className="font-medium text-surface-800">
                  {format(new Date(booking.bookingDate), "EEE, MMM d, yyyy")}
                </p>
              </div>
              <div>
                <p className="text-surface-400 text-xs mb-0.5">Time</p>
                <p className="font-medium text-surface-800">
                  {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
                </p>
              </div>
              <div>
                <p className="text-surface-400 text-xs mb-0.5">Duration</p>
                <p className="font-medium text-surface-800">
                  {booking.service.duration}
                </p>
              </div>
              <div>
                <p className="text-surface-400 text-xs mb-0.5">Location</p>
                <p className="font-medium text-surface-800">
                  {booking.service.location || "-"}
                </p>
              </div>
              {booking.notes && (
                <div>
                  <p className="text-surface-400 text-xs mb-0.5">Notes</p>
                  <p className="font-medium text-surface-800">
                    {booking.notes}
                  </p>
                </div>
              )}
              <div className="col-span-2 border-t border-surface-100 pt-4 flex justify-between">
                <span className="font-semibold text-surface-900">
                  Total Amount
                </span>
                <span className="font-bold text-brand-700 text-base">
                  {formatCurrency(booking.totalAmount)}
                </span>
              </div>
            </div>
          </Card>

          {booking.payment && (
            <Card className="p-6 mb-5">
              <h2 className="font-semibold text-surface-900 mb-4">Payment</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="text-surface-400 size-4" />
                  <span className="text-sm text-surface-800">
                    {booking.payment.paymentMethod || "Online Payment"}
                  </span>
                </div>
                <StatusBadge status={booking.payment.status} />
              </div>
              {booking.payment.xenditPaymentUrl &&
                booking.payment.status === "UNPAID" && (
                  <a
                    href={booking.payment.xenditPaymentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 btn-primary w-full py-2.5 text-sm"
                  >
                    <ExternalLink className="size-3.5" /> Open Payment Page
                  </a>
                )}
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="xl" className=" gap-2 flex-1">
              <CreditCard className="size-4" /> Pay Now
            </Button>
            <Button
              variant="secondary"
              size="xl"
              className="gap-2 flex-1 sm:flex-none text-red-600 border-red-200 hover:bg-red-50"
            >
              <XCircle className="size-4" /> Cancel Booking
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetailPage;
