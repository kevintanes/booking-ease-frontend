import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  name?: string;
  email?: string;
}

const DashboardHeader = ({ email, name }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between mb-8">
      <div>
        <h2 className="text-xl font-bold text-surface-900">
          Welcome back, {name}!
        </h2>
        <p className="text-sm text-surface-400">{email}</p>
      </div>
      <Button
        size="xl"
        nativeButton={false}
        render={<Link to={`/services/`} />}
        className="gap-2"
      >
        <Plus />
        New Booking
      </Button>
    </div>
  );
};

export default DashboardHeader;
