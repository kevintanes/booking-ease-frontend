import { formatCurrency } from "@/lib/formatCurrency";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import type { Service } from "@/types/service";
import { getServiceImage } from "@/lib/serviceImages";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const imgUrl = getServiceImage(service.category?.name);

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm border border-surface-100 group overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <div className="relative overflow-hidden">
        <img
          src={imgUrl}
          alt={service.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-surface-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {service.category?.icon} {service.category?.name}
          </span>
        </div>
        {service.rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
            <Star className="size-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-surface-800">
              {Number(service.rating).toFixed(1)}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-surface-900 mb-1 group-hover:text-brand-700 transition-colors line-clamp-1">
          {service.name}
        </h3>
        <p className="text-sm text-surface-800 line-clamp-2 mb-3 leading-relaxed min-h-11.5">
          {service.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-surface-800 mb-4">
          {service.location && (
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              {service.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {service.duration} min
          </span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-surface-400">from</span>
            <p className="text-base font-bold text-brand-700">
              {formatCurrency(service.price)}
            </p>
          </div>
          <Button
            render={<Link to={`/services/${service.id}`} />}
            nativeButton={false}
            className="gap-1.5 px-4 py-2 h-fit font-semibold active:scale-95 "
          >
            All Services <ArrowRight className="size-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
