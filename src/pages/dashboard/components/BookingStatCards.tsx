import Card from "@/components/Card";
import { getBookingStat } from "@/services/bookingService";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, CheckCircle, Clock } from "lucide-react";

const BookingStatCards = () => {
  const { data: statData } = useQuery({
    queryKey: ["booking-stats"],
    queryFn: () => getBookingStat(),
  });

  const stats = [
    {
      label: "Confirmed",
      value: statData?.data?.confirmed,
      icon: CheckCircle,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      label: "Upcoming",
      value: statData?.data?.upcoming,
      icon: Clock,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Completed",
      value: statData?.data?.completed,
      icon: CalendarDays,
      color: "text-surface-800",
      bg: "bg-surface-100",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map(({ label, value, icon: Icon, color, bg }) => (
        <Card key={label} className="p-4 sm:p-5">
          <div
            className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}
          >
            <Icon className={`size-4.5 ${color}`} />
          </div>
          <p className="text-2xl font-bold text-surface-900">{value}</p>
          <p className="text-sm text-surface-400">{label}</p>
        </Card>
      ))}
    </div>
  );
};

export default BookingStatCards;
