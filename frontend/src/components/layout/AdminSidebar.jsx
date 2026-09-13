import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  Folder,
  Images,
  Briefcase,
  GraduationCap,
  Wrench,
  Award,
  FileText,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "../ui/ThemeToggle";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/profile", label: "Profile", icon: User },
  { to: "/admin/projects", label: "Projects", icon: Folder },
  { to: "/admin/class-work", label: "Class Work", icon: Images },
  { to: "/admin/experience", label: "Experience", icon: Briefcase },
  { to: "/admin/education", label: "Education", icon: GraduationCap },
  { to: "/admin/skills", label: "Skills", icon: Wrench },
  { to: "/admin/certificates", label: "Certificates", icon: Award },
  { to: "/admin/resume", label: "Resume", icon: FileText },
  { to: "/admin/settings", label: "Portfolio Settings", icon: Settings },
];

// `open`/`onClose` only matter below the `lg` breakpoint, where the sidebar
// becomes a slide-in drawer over a backdrop instead of a static column.
const AdminSidebar = ({ open, onClose }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const sidebarContent = (
    <>
      <div className="p-5 border-b border-line dark:border-line-dark flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="lg:hidden w-9 h-9 grid place-items-center rounded-full text-ink-soft dark:text-canvas/70 hover:bg-canvas-tint dark:hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-lavender dark:bg-primary/15 text-primary dark:text-primary-light"
                  : "text-ink-soft dark:text-canvas/70 hover:bg-canvas-tint dark:hover:bg-white/5 hover:text-ink dark:hover:text-canvas"
              }`
            }
          >
            <Icon className="w-4.5 h-4.5 shrink-0" />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-line dark:border-line-dark">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-soft dark:text-canvas/70 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4.5 h-4.5" /> Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop: static column, always visible */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-white dark:bg-surface-dark border-r border-line dark:border-line-dark h-screen sticky top-0 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile/tablet: slide-in drawer over a backdrop */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 z-40 bg-ink/40 dark:bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-[82vw] max-w-72 bg-white dark:bg-surface-dark border-r border-line dark:border-line-dark flex flex-col shadow-floaty"
              role="dialog"
              aria-modal="true"
              aria-label="Admin navigation"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
