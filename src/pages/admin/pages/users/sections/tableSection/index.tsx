import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "@/types/user";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface TableSectionProps {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    count: number;
    totalPage: number;
  };
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

const TableSection = ({
  pagination,
  users,
  isLoading,
  onPageChange,
}: TableSectionProps) => {
  console.log(users);

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-50">
            {["User", "Phone", "Bookings", "Joined", "Auth"].map((h) => (
              <TableHead key={h}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 text-surface-400"
              >
                Loading users...
              </TableCell>
            </TableRow>
          )}

          {!isLoading && users.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 text-surface-400"
              >
                No users yet.
              </TableCell>
            </TableRow>
          )}

          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full bg-linear-to-br from-brand-400 to-brand-600 flex items-center 
                          justify-center text-white text-xs font-bold shrink-0 overflow-hidden"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.name?.[0]?.toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-surface-900">{user.name}</p>
                    <p className="text-xs text-surface-400">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {user.phone || <span className="text-surface-800">—</span>}
              </TableCell>
              <TableCell>
                <span className="font-semibold text-surface-900">
                  {user._count?.bookings || 0}
                </span>
                <span className="text-surface-400 ml-1">bookings</span>
              </TableCell>
              <TableCell>
                {format(new Date(user.createdAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <span
                  className={`badge ${user.googleId ? "bg-blue-100 text-blue-700" : "bg-surface-100 text-surface-800"}`}
                >
                  {user.googleId ? "🔵 Google" : "📧 Email"}
                </span>
              </TableCell>
            </TableRow>
          ))}
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

export default TableSection;
