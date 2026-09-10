import Card from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NEXT_STATUSES, STATUS_LABELS } from "@/constants/bookingStatus";
import { formatCurrency } from "@/lib/formatCurrency";
import type { AdminBookingsResponse, BookingStatus } from "@/types/booking";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface BookingSectionProps {
  data?: AdminBookingsResponse;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onStatusChange: (id: string, status: BookingStatus) => void;
}

const BookingSection = ({
  data,
  isLoading,
  onPageChange,
  onStatusChange,
}: BookingSectionProps) => {
  const bookings = data?.bookings ?? [];
  const pagination = data?.pagination;

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-50">
            <TableHead>Customer</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading && bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-surface-400">
                No bookings yet.
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <p className="font-medium">{booking.user.name}</p>
                  <p className="text-xs text-surface-400">
                    {booking.user.email}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{booking.service.name}</p>
                  <p className="text-xs text-surface-400">
                    {booking.service.category.name}
                  </p>
                </TableCell>
                <TableCell>
                  <p>{format(new Date(booking.bookingDate), "MMM d, yyyy")}</p>
                  <p className="text-xs text-surface-400">
                    {booking.timeSlot.startTime} – {booking.timeSlot.endTime}
                  </p>
                </TableCell>
                <TableCell className="font-semibold">
                  {formatCurrency(Number(booking.totalAmount))}
                </TableCell>
                <TableCell>
                  <StatusBadge status={booking.status} />
                </TableCell>
                <TableCell>
                  {NEXT_STATUSES[booking.status].length > 0 ? (
                    <Select
                      value=""
                      onValueChange={(value) =>
                        onStatusChange(booking.id, value as BookingStatus)
                      }
                    >
                      <SelectTrigger size="sm" className="rounded-md">
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent alignItemWithTrigger={false}>
                        <SelectGroup>
                          {NEXT_STATUSES[booking.status].map((option) => (
                            <SelectItem key={option} value={option}>
                              {STATUS_LABELS[option]}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className="text-xs text-surface-400 italic">
                      No actions
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {pagination && pagination.count > 0 && (
        <div className="flex items-center justify-between px-5 py-3 text-sm border-t border-surface-100">
          <div>
            Showing {(pagination.page - 1) * pagination.limit + 1}-
            {Math.min(pagination.page * pagination.limit, pagination.count)} of{" "}
            {pagination.count}
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="shadow-none"
              disabled={pagination.page <= 1}
              onClick={() => onPageChange(pagination.page - 1)}
            >
              <ArrowLeft />
              Prev
            </Button>
            <Button
              variant="secondary"
              className="shadow-none"
              disabled={pagination.page >= pagination.totalPage}
              onClick={() => onPageChange(pagination.page + 1)}
            >
              Next
              <ArrowRight />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default BookingSection;
