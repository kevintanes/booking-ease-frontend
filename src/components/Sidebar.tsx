import { useAuth } from "@/context/authContext";
import {
  Briefcase,
  CalendarDays,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

interface SidebarProps {
  setSidebarOpen: (open: boolean) => void;
}

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { path: "/admin/services", label: "Services", icon: Briefcase },
  { path: "/admin/users", label: "Users", icon: Users },
];

const Sidebar = ({ setSidebarOpen }: SidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-surface-100">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
            <CalendarDays className="size-4 text-white" />
          </div>
          <span className="font-bold text-lg">
            Book<span className="text-brand-600">Ease</span>
          </span>
        </Link>
        <div className="mt-1 ">
          <span className="text-xs font-semibold text-surface-400 uppercase tracking-wider">
            ADMIN PANEL
          </span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${active ? "bg-brand-50 text-brand-700" : "text-surface-800 hover:bg-surface-50 hover:text-surface-900"}`}
            >
              <Icon
                className={`size-4.5 ${active ? "text-brand-600" : "text-surface-400 group-hover:text-surface-800"}`}
              />
              {label}
              {active && (
                <ChevronRight className="size-3.5 ml-auto text-brand-400" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-surface-100">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div
            className="w-8 h-8 rounded-full bg-linear-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white
            text-sm font-bold overflow-hidden"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="user avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              user?.name[0].toUpperCase()
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-surface-800 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-surface-800 truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="destructive"
          size="lg"
          onClick={handleLogout}
          className="w-full text-red-600 hover:bg-red-50 bg-transparent"
        >
          <LogOut />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
