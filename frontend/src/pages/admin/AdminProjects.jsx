import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Folder } from "lucide-react";
import AdminPageHeader from "../../components/layout/AdminPageHeader";
import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ProjectFormDrawer from "./ProjectFormDrawer";
import { getProjects } from "../../services/contentService";
import { projectsAdmin } from "../../services/adminService";
import { useToast } from "../../context/ToastContext";

const AdminProjects = () => {
  const toast = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    setLoading(true);
    getProjects()
      .then(setProjects)
      .catch(() => toast.error("Couldn't load projects"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setDrawerOpen(true);
  };
  const openEdit = (project) => {
    setEditing(project);
    setDrawerOpen(true);
  };

  const handleSubmit = async (fields, files) => {
    setSubmitting(true);
    try {
      const payload = { ...fields, ...files };
      if (editing) {
        await projectsAdmin.update(editing._id, payload);
        toast.success("Project updated");
      } else {
        await projectsAdmin.create(payload);
        toast.success("Project created");
      }
      setDrawerOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await projectsAdmin.remove(deleteTarget._id);
      toast.success("Project deleted");
      setProjects((p) => p.filter((proj) => proj._id !== deleteTarget._id));
    } catch {
      toast.error("Couldn't delete project");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Projects"
        description="Manage the case studies shown in the Index section."
        action={
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4" /> New Project
          </Button>
        }
      />

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : !projects.length ? (
        <EmptyState icon={Folder} title="No projects yet" description="Add your first case study to get started." />
      ) : (
        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card divide-y divide-line">
          {projects.map((project) => (
            <div key={project._id} className="flex items-center gap-4 p-4">
              <div className="w-16 h-12 rounded-lg overflow-hidden bg-lavender dark:bg-primary/15 shrink-0">
                {project.thumbnail?.url && (
                  <img src={project.thumbnail.url} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ink dark:text-canvas text-sm truncate">{project.title}</p>
                <p className="text-xs text-ink-faint dark:text-canvas/50">{project.category}</p>
              </div>
              {/* <button
                onClick={() => openEdit(project)}
                className="p-2 text-ink-soft dark:text-canvas/60 hover:text-primary dark:hover:text-primary-light"
                aria-label={`Edit ${project.title}`}
              >
                <Pencil className="w-4 h-4" />
              </button> */}
              <button
                onClick={() => setDeleteTarget(project)}
                className="p-2 text-ink-soft dark:text-canvas/60 hover:text-red-500 dark:hover:text-red-400"
                aria-label={`Delete ${project.title}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <ProjectFormDrawer
        open={drawerOpen}
        initialData={editing}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
        submitting={submitting}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this project?"
        description={`"${deleteTarget?.title}" and all its uploaded images will be permanently removed.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default AdminProjects;
