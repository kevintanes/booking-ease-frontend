import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { emoji: "🏓", label: "Sports" },
  { emoji: "💇", label: "Beauty" },
  { emoji: "💆", label: "Wellness" },
  { emoji: "🏋️‍♂️", label: "Fitness" },
];

const ServicesSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <div className="flex justify-center gap-3 flex-wrap">
        {CATEGORIES.map(({ emoji, label }) => (
          <Button
            key={label}
            variant="outline"
            size="xl"
            className="gap-2"
            render={<Link to={`/services?category=${label}`} />}
          >
            <span className="text-lg">{emoji}</span>
            {label}
          </Button>
        ))}
        <Button render={<Link to="/services" />} size="xl" className="gap-2">
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
        <Button render={<Link to="/services" />} variant="ghost">
          View all <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default ServicesSection;
