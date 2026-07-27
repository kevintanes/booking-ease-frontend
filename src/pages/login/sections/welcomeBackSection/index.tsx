import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const WelcomeBackSection = () => {
  return (
    <section className=" hidden lg:block lg:flex-1 bg-linear-to-br from-brand-900 to-brand-700 text-white p-12 relative">
      {/* this is blur circle background*/}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-2xl" />
        <div className="absolute w-64 h-64 bottom-20 right-10 bg-accent-400 rounded-full blur-2xl" />
      </div>

      {/* content */}
      <div className="relative flex flex-col h-full justify-between ">
        <Link to={`/`} className="flex items-center gap-2 w-fit">
          <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/20">
            <CalendarDays className="size-4.5" />
          </div>
          <span className="text-xl font-bold">BookEase</span>
        </Link>

        <div className="space-y-4">
          <h2 className="text-4xl font-bold leading-tight">
            Welcome back to BookEase
          </h2>
          <p className="text-brand-200 text-lg leading-relaxed">
            Book premium services with just a few clicks. Real-time
            availability, instant confirmation.
          </p>
        </div>
        <div className="text-sm text-brand-300">© 2026 BookEase</div>
      </div>
    </section>
  );
};

export default WelcomeBackSection;
