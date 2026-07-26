import { CalendarDays, Check } from "lucide-react";
import { Link } from "react-router-dom";

const StartBookSection = () => {
  return (
    <section className="bg-accent-400 hidden lg:block lg:flex-1 bg-linear-to-br from-brand-900 to-brand-700 text-white p-12 relative">
      {/* this is blur circle background*/}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-2xl" />
        <div className="absolute w-64 h-64 bottom-20 right-10 bg-accent-400 rounded-full blur-2xl" />
      </div>

      {/* content */}
      <div className="relative flex flex-col h-full justify-between ">
        <Link to={`/`} className="flex items-center gap-2 w-fit">
          <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/20">
            <CalendarDays size={18} />
          </div>
          <span className="text-xl font-bold">BookEase</span>
        </Link>

        <div className="space-y-4">
          <h2 className="text-4xl font-bold leading-tight">
            Start booking in seconds
          </h2>
          <p className="text-brand-200 text-lg leading-relaxed">
            Create your free account and get access to hundreds of premium
            services near you.
          </p>
          <ul className="space-y-3 mt-6">
            <li className="flex gap-2 items-center text-sm">
              <div className="flex justify-center items-center w-4 h-4 bg-accent-400 rounded-full">
                <Check size={10} className="text-white" />
              </div>
              Free to create an account
            </li>
            <li className="flex gap-2 items-center text-sm">
              <div className="flex justify-center items-center w-4 h-4 bg-accent-400 rounded-full">
                <Check size={10} className="text-white" />
              </div>
              No hidden fees
            </li>
            <li className="flex gap-2 items-center text-sm">
              <div className="flex justify-center items-center w-4 h-4 bg-accent-400 rounded-full">
                <Check size={10} className="text-white" />
              </div>
              Instant booking confirmation
            </li>
            <li className="flex gap-2 items-center text-sm">
              <div className="flex justify-center items-center w-4 h-4 bg-accent-400 rounded-full">
                <Check size={10} className="text-white" />
              </div>
              Secure payment with Xendit
            </li>
          </ul>
        </div>
        <div className="text-sm text-brand-300">© 2026 BookEase</div>
      </div>
    </section>
  );
};

export default StartBookSection;
