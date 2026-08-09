import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { getAllCategories } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const HeaderSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  const categories = categoryData?.data || [];

  const hasFilters = search || categoryId;

  const clearFilters = () => {
    setSearch("");
    setCategoryId("");
    setPage(1);
    setSearchParams({});
  };

  return (
    <div className="bg-white border-b border-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-surface-900 mb-1">
          All Services
        </h1>
        <p className="text-surface-800 text-sm">
          Discover and book premium services near you
        </p>

        <form className="mt-5 flex gap-3 max-w-xl">
          <InputGroup className="w-full h-12 rounded-xl bg-white text-surface-900  focus:outline-none focus-within:ring-2! focus-within:ring-brand-500!">
            <InputGroupInput
              placeholder="Search services..."
              className="placeholder:text-surface-400"
            />
            <InputGroupAddon align="inline-start">
              <Search className="text-surface-400" />
            </InputGroupAddon>
          </InputGroup>
          <Button size="xl">Search</Button>
          {hasFilters && (
            <Button
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
            onClick={() => {
              setCategoryId("");
              setPage(1);
            }}
            className={`px-4 py-1.5 rounded-full font-semibold border ${!categoryId ? "border-brand-600" : "bg-white text-surface-800 border-surface-200 hover:border-brand-300 hover:text-brand-700"}`}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => {
                setCategoryId(category.id);
                setPage(1);
              }}
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
