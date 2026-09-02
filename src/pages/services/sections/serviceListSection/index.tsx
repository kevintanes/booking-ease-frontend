import PaginationControl from "@/components/PaginationControl";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
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
    queryFn: () => getAllService({ search, categoryId, page, limit: 8 }),
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

      {pagination && (
        <PaginationControl
          page={page}
          totalPage={pagination.totalPage}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
};

export default ServiceListSection;
