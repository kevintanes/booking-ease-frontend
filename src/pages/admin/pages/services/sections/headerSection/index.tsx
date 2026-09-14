import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HeaderSectionProps {
  onAddService: () => void;
}

const HeaderSection = ({ onAddService }: HeaderSectionProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Services</h1>
        <p className="text-surface-500 text-sm mt-1">
          Manage all available services
        </p>
      </div>
      <Button size="xl" className="gap-2" onClick={onAddService}>
        <Plus size={15} /> Add Service
      </Button>
    </div>
  );
};

export default HeaderSection;
