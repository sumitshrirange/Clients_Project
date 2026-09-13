import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Folder, Images, Wrench, Briefcase, ArrowUpRight, PlusCircle } from "lucide-react";
import AdminPageHeader from "../../components/layout/AdminPageHeader";
import Skeleton from "../../components/ui/Skeleton";
import { useAuth } from "../../context/AuthContext";
import { getDashboardStats } from "../../services/adminService";

const StatTile = ({ icon: Icon, label, value }) => (
  <div className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-5 flex items-center gap-4 hover:-translate-y-0.5 transition-transform">
    <div className="w-11 h-11 rounded-xl bg-lavender dark:bg-primary/15 grid place-items-center shrink-0">
      <Icon className="w-5 h-5 text-primary dark:text-primary-light" />
    </div>
    <div>
      <p className="font-display font-extrabold text-2xl text-ink dark:text-canvas leading-none">{value}</p>
      <p className="text-xs text-ink-faint dark:text-canvas/50 mt-1">{label}</p>
    </div>
  </div>
);

const QUICK_ACTIONS = [
  { to: "/admin/projects", label: "Add a Project" },
  { to: "/admin/class-work", label: "Add Class Work" },
  { to: "/admin/experience", label: "Add Experience" },
];

const AdminDashboard = () => {
  const { admin } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then(setStats).catch(() => {});
  }, []);

  return (
    <div>
      <AdminPageHeader title={`Welcome back, ${admin?.name?.split(" ")[0] || "Admin"}`} description="Here's what's happening with the portfolio." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats ? (
          <>
            <StatTile icon={Folder} label="Total Projects" value={stats.totalProjects} />
            <StatTile icon={Images} label="Total Class Work" value={stats.totalClassWork} />
            <StatTile icon={Wrench} label="Total Skills" value={stats.totalSkills} />
            <StatTile icon={Briefcase} label="Total Experience" value={stats.totalExperience} />
          </>
        ) : (
          [0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />)
        )}
      </div>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-6">
          <h2 className="font-display font-bold text-ink dark:text-canvas mb-4">Recent Projects</h2>
          {!stats ? (
            <Skeleton className="h-32" />
          ) : stats.recentProjects?.length ? (
            <ul className="divide-y divide-line dark:divide-line-dark">
              {stats.recentProjects.map((p) => (
                <li key={p._id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink dark:text-canvas text-sm">{p.title}</p>
                    <p className="text-xs text-ink-faint dark:text-canvas/50">{p.category}</p>
                  </div>
                  <Link to="/admin/projects" className="text-primary dark:text-primary-light">
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-soft dark:text-canvas/60">No projects added yet.</p>
          )}
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-6">
          <h2 className="font-display font-bold text-ink dark:text-canvas mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-soft dark:text-canvas/70 hover:bg-canvas-tint dark:hover:bg-white/5 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                <PlusCircle className="w-4 h-4" /> {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
