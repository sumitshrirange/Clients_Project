import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Award } from "lucide-react";
import AdminPageHeader from "../../components/layout/AdminPageHeader";
import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { Field, TextInput, FileInput } from "../../components/ui/FormFields";
import { getCertificates } from "../../services/contentService";
import { certificatesAdmin } from "../../services/adminService";
import { useToast } from "../../context/ToastContext";

const emptyForm = { title: "", organization: "", date: "" };

const AdminCertificates = () => {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    setLoading(true);
    getCertificates()
      .then(setItems)
      .catch(() => toast.error("Couldn't load certificates"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFile(null);
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...item, date: item.date ? new Date(item.date).toISOString().slice(0, 10) : "" });
    setFile(null);
    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...form, certificateFile: file || undefined };
      if (editing) {
        await certificatesAdmin.update(editing._id, payload);
        toast.success("Certificate updated");
      } else {
        await certificatesAdmin.create(payload);
        toast.success("Certificate added");
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
      await certificatesAdmin.remove(deleteTarget._id);
      setItems((prev) => prev.filter((i) => i._id !== deleteTarget._id));
      toast.success("Certificate deleted");
    } catch {
      toast.error("Couldn't delete certificate");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Certificates"
        description="Certifications shown alongside Education."
        action={
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4" /> Add Certificate
          </Button>
        }
      />

      {formOpen && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-ink dark:text-canvas">{editing ? "Edit" : "New"} Certificate</h2>
            <button type="button" onClick={() => setFormOpen(false)} aria-label="Close form" className="text-ink-faint dark:text-canvas/40 hover:text-ink dark:hover:text-canvas">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title">
              <TextInput required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </Field>
            <Field label="Organization">
              <TextInput required value={form.organization} onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))} />
            </Field>
            <Field label="Date">
              <TextInput type="date" required value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
            </Field>
            {/* <Field label="Certificate File (image or PDF)">
              <FileInput accept="image/*,application/pdf" onChange={(e) => setFile(e.target.files[0])} />
            </Field> */}
          </div>

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
        <EmptyState icon={Award} title="No certificates yet" description="Add a certification to display it here." />
      ) : (
        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card divide-y divide-line">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-4 p-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ink dark:text-canvas text-sm">{item.title}</p>
                <p className="text-xs text-ink-faint dark:text-canvas/50">{item.organization}</p>
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
        title="Delete this certificate?"
        description="This action can't be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default AdminCertificates;
