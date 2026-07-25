import { Clock, Shield, Star, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Booking",
    desc: "Book any service in under 60 seconds with real-time availability.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    desc: "All payments processed securely via Xendit payment gateway.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Choose from multiple time slots that fit your schedule.",
  },
  {
    icon: Star,
    title: "Verified Services",
    desc: "All service providers are vetted and highly rated by our customers.",
  },
];

const WhySection = () => {
  return (
    <section className="bg-white border-y border-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-surface-900 mb-2">
            Why Choose BookEase?
          </h2>
          <p className="text-surface-800">
            Everything you need for a seamless booking experience
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
          {FEATURES.map(({ desc, icon: Icon, title }) => (
            <div key={title} className="text-center p-6">
              <div className="h-12 w-12 bg-brand-50 rounded-2xl flex justify-center items-center mb-4 mx-auto">
                <Icon className="text-brand-600" size={22} />
              </div>
              <h3 className="font-semibold text-surface-900 mb-2">{title}</h3>
              <p className="text-sm text-surface-800 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
