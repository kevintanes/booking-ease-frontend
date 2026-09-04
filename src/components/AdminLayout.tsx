import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex bg-surface-50">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-surface-100 fixed inset-y-0 left-0 z-30">
        <Sidebar setSidebarOpen={setSidebarOpen} />
      </aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-64 bg-white flex flex-col">
            <Sidebar setSidebarOpen={setSidebarOpen} />
          </div>
        </div>
      )}

      <div className="flex-1 lg:pl-64">
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-surface-100 sticky top-0 z-20">
          <Button
            variant="ghost"
            size="icon-lg"
            className="hover:bg-surface-100 text-surface-800"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} aria-label="Open Sidebar" />
          </Button>
          <span className="font-bold text-surface-900">
            Book<span className="text-brand-600">Ease</span> Admin
          </span>
        </div>
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
