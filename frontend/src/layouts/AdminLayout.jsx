import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "../components/layout/AdminSidebar";
import Logo from "../components/layout/Logo";
import ThemeToggle from "../components/ui/ThemeToggle";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close the mobile drawer automatically on route change.
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex bg-canvas-tint/40 dark:bg-canvas-dark min-h-screen">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile/tablet top bar — replaces the sidebar's logo/theme row when
            the sidebar itself is collapsed off-screen. */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-surface-dark border-b border-line dark:border-line-dark">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="w-10 h-10 grid place-items-center rounded-full text-ink-soft dark:text-canvas/70 hover:bg-canvas-tint dark:hover:bg-white/5 shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Logo />
          <ThemeToggle />
        </div>

        <div className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
