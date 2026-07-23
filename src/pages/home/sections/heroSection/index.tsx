import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-linear-to-br from-brand-900 via-brand-800 to-brand-700 text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 ">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-6">
          <span className="max-w-3xl w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
          Book services instantly, no hassle
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
          Find & Book the
          <span className="block bg-clip-text bg-linear-to-r from-accent-400 to-yellow-300 text-transparent">
            Best Services
          </span>
          Near You
        </h1>
        <p className="text-lg sm:text-xl text-brand-200 mb-8 max-w-xl">
          From padel courts to beauty salons — discover and book premium
          services with real-time availability and instant confirmation.
        </p>
        <form className="flex gap-2 max-w-lg">
          <InputGroup className="w-full h-12 rounded-xl bg-white text-surface-900  focus:outline-none focus-within:ring-2! focus-within:ring-accent-400! ">
            <InputGroupInput
              placeholder="Search services..."
              className="placeholder:text-surface-400"
            />
            <InputGroupAddon align="inline-start">
              <Search className="text-surface-400" />
            </InputGroupAddon>
          </InputGroup>
          <Button
            size="xl"
            className="bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-lg text-base"
          >
            Search
          </Button>
        </form>
        <div className="flex mt-12 gap-8 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">50+</h2>
            <p className="text-sm text-brand-300 mt-0.5">Active Services</p>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">2,400+</h2>
            <p className="text-sm text-brand-300 mt-0.5">Happy Customers</p>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">12,000+</h2>
            <p className="text-sm text-brand-300 mt-0.5">Bookings Made</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
