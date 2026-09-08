import Card from "@/components/Card";
import { formatCurrency } from "@/lib/formatCurrency";
import {
  CalendarDays,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";

interface Stats {
  totalBookings: number;
  totalPendings: number;
  totalRevenue: number;
  totalUsers: number;
}

interface TotalSectionProps {
  stats: Stats;
}

const TotalSection = ({ stats }: TotalSectionProps) => {
  const statCards = [
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarDays,
      color: "text-brand-600",
      bg: "bg-brand-50",
      change: "+12%",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
      change: "+8%",
    },
    {
      label: "Pending",
      value: stats.totalPendings,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      change: null,
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
      change: "+5%",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {statCards.map(({ bg, change, color, icon: Icon, label, value }) => (
        <Card className="p-5" key={label}>
          <div className="flex justify-between mb-4">
            <div
              className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}
            >
              <Icon className={`size-5 ${color}`} />
            </div>
            {change && (
              <span className="flex items-center gap-1 h-fit text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <TrendingUp className="size-2.75" />
                {change}
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-surface-900">{value}</p>
          <p className="text-sm text-surface-400">{label}</p>
        </Card>
      ))}
    </div>
  );
};

export default TotalSection;
