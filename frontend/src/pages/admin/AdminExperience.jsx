import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Briefcase } from "lucide-react";
import AdminPageHeader from "../../components/layout/AdminPageHeader";
import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { Field, TextInput, TextArea, FileInput } from "../../components/ui/FormFields";
import { getExperience } from "../../services/contentService";
import { experienceAdmin } from "../../services/adminService";
import { useToast } from "../../context/ToastContext";

const emptyForm = { companyName: "", role: "", startDate: "", endDate: "", current: false, description: "" };

const AdminExperience = () => {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [logo, setLogo] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    setLoading(true);
    getExperience()
      .then(setItems)
      .catch(() => toast.error("Couldn't load experience"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toDateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setLogo(null);
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...item, startDate: toDateInput(item.startDate), endDate: toDateInput(item.endDate) });
    setLogo(null);
    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...form, companyLogo: logo || undefined };
      if (editing) {
        await experienceAdmin.update(editing._id, payload);
        toast.success("Experience updated");
      } else {
        await experienceAdmin.create(payload);
        toast.success("Experience added");
      }
      setFormOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await experienceAdmin.remove(deleteTarget._id);
      setItems((prev) => prev.filter((i) => i._id !== deleteTarget._id));
      toast.success("Experience deleted");
    } catch {
      toast.error("Couldn't delete entry");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Experience"
        description="Work history shown in the Experience timeline."
        action={
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4" /> Add Experience
          </Button>
        }
      />

      {formOpen && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-ink dark:text-canvas">{editing ? "Edit" : "New"} Experience</h2>
            <button type="button" onClick={() => setFormOpen(false)} aria-label="Close form" className="text-ink-faint dark:text-canvas/40 hover:text-ink dark:hover:text-canvas">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Company Name">
              <TextInput required value={form.companyName} onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))} />
            </Field>
            <Field label="Role">
              <TextInput required value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} />
            </Field>
            <Field label="Start Date">
              <TextInput type="date" required value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
            </Field>
            <Field label="End Date">
              <TextInput
                type="date"
                disabled={form.current}
                value={form.endDate}
                onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
              />
            </Field>
          </div>

          <label className="flex items-center gap-2 text-sm font-medium text-ink dark:text-canvas">
            <input
              type="checkbox"
              checked={form.current}
              onChange={(e) => setForm((f) => ({ ...f, current: e.target.checked, endDate: e.target.checked ? "" : f.endDate }))}
            />
            This is my current job
          </label>

          <Field label="Description">
            <TextArea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </Field>

          {/* <Field label="Company Logo">
            <FileInput accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
          </Field> */}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving…" : "Save"}
            </Button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-3">
          {[0, 1].map((i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      ) : !items.length ? (
        <EmptyState icon={Briefcase} title="No experience yet" description="Add a role to populate the timeline." />
      ) : (
        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card divide-y divide-line">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-lavender dark:bg-primary/15 overflow-hidden grid place-items-center shrink-0">
                {item.companyLogo?.url ? <img src={item.companyLogo.url} alt="" className="w-full h-full object-contain p-1" /> : item.companyName.slice(0, 1)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ink dark:text-canvas text-sm">{item.role}</p>
                <p className="text-xs text-ink-faint dark:text-canvas/50">{item.companyName}</p>
              </div>
              <button onClick={() => openEdit(item)} className="p-2 text-ink-soft dark:text-canvas/60 hover:text-primary dark:hover:text-primary-light" aria-label="Edit">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => setDeleteTarget(item)} className="p-2 text-ink-soft dark:text-canvas/60 hover:text-red-500 dark:hover:text-red-400" aria-label="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this experience entry?"
        description="This action can't be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default AdminExperience;
