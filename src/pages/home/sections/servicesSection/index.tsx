import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { getAllService } from "@/services/serviceService";
import type { Service } from "@/types/service";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { emoji: "🏓", label: "Sports" },
  { emoji: "💇", label: "Beauty" },
  { emoji: "💆", label: "Wellness" },
  { emoji: "🏋️‍♂️", label: "Fitness" },
];

const ServicesSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["service-featured"],
    queryFn: () => getAllService({ limit: 4 }),
  });

  const services = data?.data?.services || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <div className="flex justify-center gap-3 flex-wrap">
        {CATEGORIES.map(({ emoji, label }) => (
          <Button
            key={label}
            variant="secondary"
            size="xl"
            className="gap-2 border-surface-200 hover:border-brand-300 hover:bg-brand-50"
            nativeButton={false}
            render={<Link to={`/services?category=${label}`} />}
          >
            <span className="text-lg">{emoji}</span>
            {label}
          </Button>
        ))}
        <Button
          render={<Link to="/services" />}
          nativeButton={false}
          size="xl"
          className="gap-2"
        >
          All Services <ArrowRight size={14} />
        </Button>
      </div>
      <div className="flex justify-between mt-12 items-center">
        <div>
          <h2 className="text-2xl font-bold text-surface-900">
            Features Services
          </h2>
          <p className="text-surface-800 text-sm mt-1">
            Handpicked top-rated services
          </p>
        </div>
        <Button
          render={<Link to="/services" />}
          variant="ghost"
          nativeButton={false}
        >
          View all <ArrowRight />
        </Button>
      </div>
      {isLoading && <p>Loading services...</p>}
      {isError && <p>Failed to load services.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5  place-items-center mt-8">
        {services.map((service: Service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
