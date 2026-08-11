import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { formatCurrency } from "@/lib/formatCurrency";
import { getServiceImage } from "@/lib/serviceImages";
import { getServiceById } from "@/services/serviceService";
import type { Service } from "@/types/service";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  MapPin,
  Shield,
  Star,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const HeroSection = () => {
  const { id } = useParams();

  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceById(id),
    enabled: Boolean(id),
  });

  const service: Service | undefined = data?.data;

  if (isLoading) {
    return (
      <div className="text-center py-32">
        <p className="text-surface-800">Loading...</p>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="text-center py-32">
        <p className="text-surface-800">Service not found.</p>
      </div>
    );
  }

  const imgUrl = getServiceImage(service.category?.name);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        render={<Link to={`/services/`} />}
        nativeButton={false}
        className="gap-2 h-fit font-medium text-surface-900 hover:text-surface-800 mb-6"
      >
        <ArrowLeft className="size-3.5" /> Back to services
      </Button>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <Card className="overflow-hidden">
            <img
              src={imgUrl}
              alt={service.name}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h1 className="text-2xl font-bold text-surface-900">
                  {service.name}
                </h1>
                {service.rating && (
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-surface-800">
                      {Number(service.rating).toFixed(1)}{" "}
                    </span>
                    <span className="text-xs text-surface-800">
                      {service.totalReviews}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-surface-800 mb-5">
                {service.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-brand-500" />
                    {service.location}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-brand-500" />
                  {service.duration} minutes
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-brand-100 flex items-center justify-center text-xs">
                    {service.category?.icon}
                  </span>
                  {service.category?.name}
                </span>
              </div>
              <p className="text-surface-800 leading-relaxed">
                {service.description}
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold text-surface-900 mb-4">
              What's included
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Professional staff",
                "Clean environment",
                "Easy booking",
                "Flexible scheduling",
              ].map((item: string) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-surface-800"
                >
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="size-3.5 text-green-500" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-6 sticky top-24">
            <div className="mb-4">
              <p className="text-sm text-surface-800">Starting from</p>
              <p className="text-3xl font-bold text-brand-700">
                {formatCurrency(service.price)}
              </p>
              <p className="text-xs text-surface-800">
                / {service.duration} min session
              </p>
            </div>

            <Button className="w-full mb-4 gap-2" size="xl">
              <Calendar className="size-4" />
              Book Now
              <ArrowRight className="size-3.5" />
            </Button>

            <div className="space-y-3 border-t border-surface-100 pt-4">
              <div className="flex items-center gap-2.5 text-sm text-surface-800">
                <Shield className="size-3.5 text-green-500 shrink-0" />
                Secure payment via Xendit
              </div>
              <div className="flex items-center gap-2.5 text-sm text-surface-800">
                <Clock className="size-3.5 text-brand-500 shrink-0" />
                Free cancellation before session
              </div>
              <div className="flex items-center gap-2.5 text-sm text-surface-800">
                <Calendar className="size-3.5 text-brand-500 shrink-0" />
                Instant booking confirmation
              </div>
            </div>

            {!isAuthenticated && (
              <p className="text-xs text-center text-surface-800 mt-4">
                <Link
                  to="/login"
                  className="text-brand-600 font-medium hover:underline"
                >
                  Sign in
                </Link>{" "}
                to book this service
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
