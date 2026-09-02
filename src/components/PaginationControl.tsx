import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlProps {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const PaginationControl = ({
  onPageChange,
  page,
  totalPage,
  className,
}: PaginationControlProps) => {
  if (totalPage < 1) return null;

  return (
    <Pagination className={className ?? "mt-10"}>
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PaginationPrevious
            text="Prev"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) onPageChange(page - 1);
            }}
            aria-disabled={page === 1}
            className={page === 1 ? "pointer-events-none opacity-40" : ""}
          />
        </PaginationItem>

        {[...Array(totalPage)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={page === i + 1}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i + 1);
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPage) onPageChange(page + 1);
            }}
            aria-disabled={page === totalPage}
            className={
              page === totalPage ? "pointer-events-none opacity-40" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControl;
