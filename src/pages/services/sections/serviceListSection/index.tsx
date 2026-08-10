import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getAllService } from "@/services/serviceService";
import type { Service } from "@/types/service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Briefcase } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const ServiceListSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const { data } = useQuery({
    queryKey: ["services", search, categoryId, page],
    queryFn: () => getAllService({ search, categoryId, page, limit: 1 }),
    placeholderData: keepPreviousData,
  });

  const services: Service[] = data?.data?.services || [];
  const pagination = data?.data?.pagination || null;

  const goToPage = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
  };

  const clearFilters = () => setSearchParams({});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {pagination && (
        <p className="text-sm text-surface-800 mb-5">
          {pagination.count} service{pagination.count !== 1 ? "s" : ""} found
        </p>
      )}

      {services.length === 0 ? (
        <div className="text-center py-16 px-6">
          <div className="w-16 h-16 bg-surface-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Briefcase size={28} className="text-surface-400" />
          </div>
          <h3 className="text-lg font-semibold text-surface-800 mb-1">
            No services found
          </h3>
          <p className="text-sm text-surface-400 mb-6 max-w-sm mx-auto">
            Try adjusting your search
          </p>
          <Button onClick={clearFilters}>Clear filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}

      {pagination && pagination.totalPage > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="gap-2">
            <PaginationItem>
              <PaginationPrevious
                text="Prev"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) goToPage(page - 1);
                }}
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-40" : ""}
              />
            </PaginationItem>

            {[...Array(pagination.totalPage)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={page === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(i + 1);
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
                  if (page < pagination.totalPage) goToPage(page + 1);
                }}
                aria-disabled={page === pagination.totalPage}
                className={
                  page === pagination.totalPage
                    ? "pointer-events-none opacity-40"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ServiceListSection;
