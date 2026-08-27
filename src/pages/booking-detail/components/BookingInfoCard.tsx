import Card from "@/components/Card";
import { formatCurrency } from "@/lib/formatCurrency";
import type { Booking } from "@/types/booking";
import { format } from "date-fns";

interface Props {
  booking: Booking;
}

const BookingInfoCard = ({ booking }: Props) => {
  return (
    <Card className="p-6 mb-5">
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-semibold text-surface-900">Booking Details</h2>
        <span className="text-xs text-surface-400 font-mono ">
          #{booking.id.slice(-8).toUpperCase()}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-y-4 text-sm">
        <div>
          <p className="text-surface-400 text-xs mb-0.5">Service</p>
          <p className="font-medium text-surface-800">{booking.service.name}</p>
        </div>
        <div>
          <p className="text-surface-400 text-xs mb-0.5">Category</p>
          <p className="font-medium text-surface-800">
            {booking.service.category?.icon} {booking.service.category?.name}
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
            <p className="font-medium text-surface-800">{booking.notes}</p>
          </div>
        )}
        <div className="col-span-2 border-t border-surface-100 pt-4 flex justify-between">
          <span className="font-semibold text-surface-900">Total Amount</span>
          <span className="font-bold text-brand-700 text-base">
            {formatCurrency(booking.totalAmount)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default BookingInfoCard;
