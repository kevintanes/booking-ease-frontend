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
import { formatCurrency } from "@/lib/formatCurrency";
import type { Pagination } from "@/types/booking";
import type { Service } from "@/types/service";
import { ArrowLeft, ArrowRight, Pencil, Trash2 } from "lucide-react";

interface TableSectionProps {
  services: Service[];
  isLoading: boolean;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
  pagination?: Pagination;
}

const TableSection = ({
  services,
  isLoading,
  onEdit,
  onDelete,
  onPageChange,
  pagination,
}: TableSectionProps) => {
  return (
    <>
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-surface-50">
              {[
                "Service",
                "Category",
                "Price",
                "Duration",
                "Status",
                "Actions",
              ].map((h) => (
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
                  Loading services...
                </TableCell>
              </TableRow>
            )}

            {!isLoading && services.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-surface-400"
                >
                  No services yet.
                </TableCell>
              </TableRow>
            )}

            {services.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="px-5 py-4">
                  <p className="font-medium text-surface-900">{s.name}</p>
                  <p className="text-xs text-surface-400 truncate max-w-48">
                    {s.description}
                  </p>
                </TableCell>
                <TableCell className="px-5 py-4 ">
                  {s.category?.icon} {s.category?.name}
                </TableCell>
                <TableCell className="px-5 py-4 font-semibold text-surface-900">
                  {formatCurrency(s.price)}
                </TableCell>
                <TableCell className="px-5 py-4 ">{s.duration} min</TableCell>
                <TableCell className="px-5 py-4">
                  <span
                    className={`badge ${s.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                  >
                    {s.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => onEdit(s)}
                      variant="ghost"
                      className="hover:bg-brand-100 text-surface-400 hover:text-brand-600 transition-colors"
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      onClick={() => onDelete(s.id)}
                      variant="ghost"
                      className="hover:bg-red-100 text-surface-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {pagination && pagination.count > 0 && (
          <div className="flex items-center justify-between px-5 py-3 text-sm border-t border-surface-100">
            <div>
              Showing {(pagination.page - 1) * pagination.limit + 1}-
              {Math.min(pagination.page * pagination.limit, pagination.count)}{" "}
              of {pagination.count}
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
    </>
  );
};

export default TableSection;
