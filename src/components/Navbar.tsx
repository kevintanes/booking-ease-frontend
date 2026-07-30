import {
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/context/authContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-surface-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-linear-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center shadow-sm transition-all group-hover:shadow-brand-300">
              <CalendarDays className="size-4 text-white" />
            </div>
            <span className="text-lg font-bold text-surface-900">
              Book<span className="text-brand-600">Ease</span>
            </span>
          </Link>
          <div className="hidden md:flex gap-1 items-center">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/") ? "text-brand-600 bg-brand-50" : "text-surface-800 hover:text-surface-900 hover:bg-surface-50"}`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/services") ? "text-brand-600 bg-brand-50" : "text-surface-800 hover:text-surface-900 hover:bg-surface-50"}`}
            >
              Services
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-3 ">
            {isAuthenticated ? (
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="outline"
                      className="hover:bg-surface-50 text-surface-900"
                    />
                  }
                >
                  {user?.name}
                  <ChevronDown
                    className={`size-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-surface-400">
                      Signed in as
                    </DropdownMenuLabel>
                    <DropdownMenuLabel className="text-sm font-semibold text-surface-800">
                      {user?.email}
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {user.role === "ADMIN" ? (
                      <DropdownMenuItem>
                        <Link to="/admin" className="flex gap-2 items-center">
                          <Settings />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>
                        <Link
                          to="/dashboard"
                          className="flex gap-2 items-center"
                        >
                          <LayoutDashboard />
                          My Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem variant="destructive">
                      <LogOut />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  size="lg"
                  variant="secondary"
                  render={<Link to={"/login"} />}
                  nativeButton={false}
                >
                  Sign in
                </Button>
                <Button
                  size="lg"
                  className="font-semibold px-4"
                  render={<Link to={"/register"} />}
                  nativeButton={false}
                >
                  Get started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
