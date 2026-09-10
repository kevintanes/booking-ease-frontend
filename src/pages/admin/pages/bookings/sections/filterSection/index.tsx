import type { SubmitEvent } from "react";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Funnel, Search, X } from "lucide-react";
import { STATUS_FILTER_OPTIONS } from "@/constants/bookingStatus";

interface FilterSectionProps {
  search: string;
  status: string;
  hasFilters: boolean;
  onSearch: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClear: () => void;
}

const ALL_VALUE = "All";

const FilterSection = ({
  search,
  status,
  hasFilters,
  onSearch,
  onStatusChange,
  onClear,
}: FilterSectionProps) => {
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSearch((formData.get("search") as string) || "");
  };

  return (
    <Card className="p-4 flex flex-col sm:flex-row gap-3 mb-5">
      <form onSubmit={handleSubmit} className="flex gap-3 w-full">
        <InputGroup className="w-full h-12 rounded-xl bg-white text-surface-900 focus-within:ring-2! focus-within:ring-brand-500!">
          <InputGroupInput
            key={search}
            name="search"
            defaultValue={search}
            placeholder="Search by customer or service..."
            className="placeholder:text-surface-400"
          />
          <InputGroupAddon align="inline-start">
            <Search className="text-surface-400" />
          </InputGroupAddon>
        </InputGroup>
        <Button type="submit" size="xl">
          Search
        </Button>
        {hasFilters && (
          <Button
            type="button"
            onClick={onClear}
            variant="secondary"
            size="xl"
            className="gap-1.5"
          >
            <X className="size-3.5" /> Clear
          </Button>
        )}
      </form>
      <div className="flex gap-2 items-center">
        <Funnel className="size-4 text-surface-400 shrink-0" />
        <Select
          items={STATUS_FILTER_OPTIONS}
          value={status || ALL_VALUE}
          onValueChange={(value) =>
            onStatusChange(value === ALL_VALUE || value === null ? "" : value)
          }
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Statuses" />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectGroup>
              {STATUS_FILTER_OPTIONS.map(({ label, value }) => (
                <SelectItem key={label} value={value || ALL_VALUE}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default FilterSection;
