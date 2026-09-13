import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Images } from "lucide-react";
import AdminPageHeader from "../../components/layout/AdminPageHeader";
import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { Field, TextInput, TextArea, SelectInput, FileInput } from "../../components/ui/FormFields";
import { getClassWork } from "../../services/contentService";
import { classWorkAdmin } from "../../services/adminService";
import { useToast } from "../../context/ToastContext";

const CATEGORIES = [
  "UI Exercise",
  "User Flow",
  "Component",
  "Typography",
  "Color Palette",
  "Mobile Screen",
  "Design Experiment",
  "Other",
];

const emptyForm = { title: "", description: "", category: CATEGORIES[0], figmaUrl: "" };

const AdminClassWork = () => {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    setLoading(true);
    getClassWork()
      .then(setItems)
      .catch(() => toast.error("Couldn't load class work"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setImages(null);
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...item });
    setImages(null);
    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...form, images: images || undefined };
      if (editing) {
        await classWorkAdmin.update(editing._id, payload);
        toast.success("Class work updated");
      } else {
        await classWorkAdmin.create(payload);
        toast.success("Class work added");
      }
      setFormOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveImage = async (item, publicId) => {
    try {
      const res = await classWorkAdmin.removeImage(item._id, publicId);
      setItems((prev) => prev.map((i) => (i._id === item._id ? res.data : i)));
    } catch {
      toast.error("Couldn't remove image");
    }
  };

  const handleDelete = async () => {
    try {
      await classWorkAdmin.remove(deleteTarget._id);
      setItems((prev) => prev.filter((i) => i._id !== deleteTarget._id));
      toast.success("Class work deleted");
    } catch {
      toast.error("Couldn't delete item");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Class Work"
        description="Design exercises and experiments shown in the gallery."
        action={
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4" /> Add Class Work
          </Button>
        }
      />

      {formOpen && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-ink dark:text-canvas">{editing ? "Edit" : "New"} Class Work</h2>
            <button type="button" onClick={() => setFormOpen(false)} aria-label="Close form" className="text-ink-faint dark:text-canvas/40 hover:text-ink dark:hover:text-canvas">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title">
              <TextInput required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </Field>
            <Field label="Category">
              <SelectInput value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </SelectInput>
            </Field>
          </div>

          <Field label="Description">
            <TextArea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </Field>

          <Field label="Figma URL">
            <TextInput value={form.figmaUrl} onChange={(e) => setForm((f) => ({ ...f, figmaUrl: e.target.value }))} />
          </Field>

          <Field label="Images" hint="New images are added to the existing gallery.">
            <FileInput multiple accept="image/*" onChange={(e) => setImages(e.target.files)} />
          </Field>

          {editing?.images?.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {editing.images.map((img) => (
                <div key={img.publicId} className="relative w-20 h-20 rounded-xl overflow-hidden border border-line dark:border-line-dark group">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(editing, img.publicId)}
                    className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                    aria-label="Remove image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

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
        <div className="grid sm:grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : !items.length ? (
        <EmptyState icon={Images} title="No class work yet" description="Add design exercises to populate the gallery." />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-4 flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-lavender dark:bg-primary/15 shrink-0">
                {item.images?.[0]?.url && <img src={item.images[0].url} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ink dark:text-canvas text-sm truncate">{item.title}</p>
                <p className="text-xs text-ink-faint dark:text-canvas/50">{item.category} · {item.images?.length || 0} images</p>
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
        title="Delete this class work item?"
        description="This action can't be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default AdminClassWork;
