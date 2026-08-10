import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { getAllCategories } from "@/services/categoryService";
import type { Category } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import type { SubmitEvent } from "react";

const HeaderSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const hasFilters = Boolean(search || categoryId);

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });
  const categories: Category[] = categoryData?.data || [];

  const updateParams = (updates: Record<string, string>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (value) next.set(key, value);
        else next.delete(key);
      });
      next.delete("page");
      return next;
    });
  };

  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateParams({ search: (formData.get("search") as string) || "" });
  };

  const clearFilters = () => setSearchParams({});

  return (
    <div className="bg-white border-b border-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-surface-900 mb-1">
          All Services
        </h1>
        <p className="text-surface-800 text-sm">
          Discover and book premium services near you
        </p>

        <form onSubmit={handleSearch} className="mt-5 flex gap-3 max-w-xl">
          <InputGroup className="w-full h-12 rounded-xl bg-white text-surface-900 focus-within:ring-2! focus-within:ring-brand-500!">
            <InputGroupInput
              key={search}
              name="search"
              defaultValue={search}
              placeholder="Search services, locations..."
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
              onClick={clearFilters}
              variant="secondary"
              size="xl"
              className="gap-1.5"
            >
              <X className="size-3.5" /> Clear
            </Button>
          )}
        </form>

        <div className="flex gap-2 flex-wrap mt-4">
          <Button
            className={`px-4 py-1.5 rounded-full font-semibold border ${!categoryId ? "border-brand-600" : "bg-white text-surface-800 border-surface-200 hover:border-brand-300 hover:text-white"}`}
            onClick={() => updateParams({ categoryId: "" })}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => updateParams({ categoryId: category.id })}
              className={`px-4 py-1.5 rounded-full font-semibold border ${categoryId === category.id ? "border-brand-600" : "bg-white text-surface-800 border-surface-200 hover:border-brand-300 hover:text-brand-700 hover:bg-white"}`}
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
