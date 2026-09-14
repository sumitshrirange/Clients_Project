import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Folder,
  Images,
  Wrench,
  Briefcase,
  ArrowUpRight,
  PlusCircle,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

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
      <p className="font-display font-extrabold text-2xl text-ink dark:text-canvas leading-none">
        {value}
      </p>

      <p className="text-xs text-ink-faint dark:text-canvas/50 mt-1">
        {label}
      </p>
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
    getDashboardStats()
      .then(setStats)
      .catch(() => {});
  }, []);

  // Data for overview graph
  const overviewData = useMemo(() => {
    if (!stats) return [];

    return [
      {
        name: "Projects",
        value: stats.totalProjects || 0,
      },
      {
        name: "Class Work",
        value: stats.totalClassWork || 0,
      },
      {
        name: "Skills",
        value: stats.totalSkills || 0,
      },
      {
        name: "Experience",
        value: stats.totalExperience || 0,
      },
    ];
  }, [stats]);

  // Data for category graph
  const categoryData = useMemo(() => {
    if (!stats?.recentProjects?.length) return [];

    const categoryCount = {};

    stats.recentProjects.forEach((project) => {
      const category = project.category || "Other";

      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [stats]);

  return (
    <div>
      <AdminPageHeader
        title={`Welcome back, ${admin?.name?.split(" ")[0] || "Admin"}`}
        description="Here's what's happening with the portfolio."
      />

      {/* ================= STATS ================= */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats ? (
          <>
            <StatTile
              icon={Folder}
              label="Total Projects"
              value={stats.totalProjects}
            />

            <StatTile
              icon={Images}
              label="Total Class Work"
              value={stats.totalClassWork}
            />

            <StatTile
              icon={Wrench}
              label="Total Skills"
              value={stats.totalSkills}
            />

            <StatTile
              icon={Briefcase}
              label="Total Experience"
              value={stats.totalExperience}
            />
          </>
        ) : (
          [0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))
        )}
      </div>

      {/* ================= GRAPHS ================= */}

      {!stats ? (
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Skeleton className="h-[360px]" />
          <Skeleton className="h-[360px]" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          {/* Portfolio Overview */}

          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-6">
            <div className="mb-6">
              <h2 className="font-display font-bold text-ink dark:text-canvas">
                Portfolio Overview
              </h2>

              <p className="text-xs text-ink-faint dark:text-canvas/50 mt-1">
                Overall portfolio statistics
              </p>
            </div>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={overviewData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-line dark:stroke-line-dark"
                  />

                  <XAxis
                    dataKey="name"
                    tick={{
                      fontSize: 12,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    allowDecimals={false}
                    tick={{
                      fontSize: 12,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    cursor={{ opacity: 0.08 }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                    }}
                  />

                  <Bar
                    dataKey="value"
                    radius={[8, 8, 0, 0]}
                    fill="#6366f1"
                    barSize={45}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Project Categories */}

          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-6">
            <div className="mb-6">
              <h2 className="font-display font-bold text-ink dark:text-canvas">
                Project Categories
              </h2>

              <p className="text-xs text-ink-faint dark:text-canvas/50 mt-1">
                Projects grouped by category
              </p>
            </div>

            <div className="h-[280px]">
              {categoryData.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={categoryData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -20,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      className="stroke-line dark:stroke-line-dark"
                    />

                    <XAxis
                      dataKey="name"
                      tick={{
                        fontSize: 12,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      allowDecimals={false}
                      tick={{
                        fontSize: 12,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#6366f1"
                      strokeWidth={3}
                      dot={{
                        r: 5,
                      }}
                      activeDot={{
                        r: 7,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm text-ink-soft dark:text-canvas/60">
                    No project category data available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= RECENT + ACTIONS ================= */}

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">

        {/* Recent Projects */}

        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-6">
          <h2 className="font-display font-bold text-ink dark:text-canvas mb-4">
            Recent Projects
          </h2>

          {!stats ? (
            <Skeleton className="h-32" />
          ) : stats.recentProjects?.length ? (
            <ul className="divide-y divide-line dark:divide-line-dark">
              {stats.recentProjects.map((p) => (
                <li
                  key={p._id}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-ink dark:text-canvas text-sm">
                      {p.title}
                    </p>

                    <p className="text-xs text-ink-faint dark:text-canvas/50">
                      {p.category}
                    </p>
                  </div>

                  <Link
                    to="/admin/projects"
                    className="text-primary dark:text-primary-light"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-soft dark:text-canvas/60">
              No projects added yet.
            </p>
          )}
        </div>

        {/* Quick Actions */}

        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-6">
          <h2 className="font-display font-bold text-ink dark:text-canvas mb-4">
            Quick Actions
          </h2>

          <div className="space-y-2">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-soft dark:text-canvas/70 hover:bg-canvas-tint dark:hover:bg-white/5 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;