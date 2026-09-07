import Card from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatCurrency";
import type { RecentBooking } from "@/types/booking";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface RecentBookingsSectionProps {
  recentBookings: RecentBooking[];
}

const RecentBookingsSection = ({
  recentBookings,
}: RecentBookingsSectionProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex justify-between items-center border-b border-surface-100 px-6 py-4">
        <h2 className="font-semibold text-surface-900">Recent Bookings</h2>
        <Button
          variant="ghost"
          render={<Link to={"/admin/bookings"} />}
          nativeButton={false}
        >
          View all <ArrowRight />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-50">
            <TableHead>customer</TableHead>
            <TableHead>service</TableHead>
            <TableHead>date</TableHead>
            <TableHead>amount</TableHead>
            <TableHead>status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentBookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-surface-400">
                No bookings yet.
              </TableCell>
            </TableRow>
          ) : (
            recentBookings.map(
              ({ user, service, createdAt, totalAmount, status, id }) => (
                <TableRow key={id}>
                  <TableCell>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-surface-400">{user.email}</p>
                  </TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>
                    {format(new Date(createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(totalAmount)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={status} />
                  </TableCell>
                </TableRow>
              ),
            )
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RecentBookingsSection;
