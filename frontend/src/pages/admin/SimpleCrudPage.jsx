import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import AdminPageHeader from "../../components/layout/AdminPageHeader";
import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { Field, TextInput, TextArea, SelectInput } from "../../components/ui/FormFields";
import { useToast } from "../../context/ToastContext";

// Renders a full CRUD screen (list + inline form) from a field schema, so
// Education, Skill, and similar file-less models don't need near-identical
// bespoke pages. `fields` describes the form; `renderItem` describes how
// each row is displayed in the list.
const SimpleCrudPage = ({
  title,
  description,
  emptyIcon,
  fields,
  emptyForm,
  api,
  getAll,
  renderItem,
}) => {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    setLoading(true);
    getAll()
      .then(setItems)
      .catch(() => toast.error(`Couldn't load ${title.toLowerCase()}`))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...emptyForm, ...item });
    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editing) {
        await api.update(editing._id, form);
        toast.success(`${title.slice(0, -1)} updated`);
      } else {
        await api.create(form);
        toast.success(`${title.slice(0, -1)} added`);
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
      await api.remove(deleteTarget._id);
      setItems((prev) => prev.filter((i) => i._id !== deleteTarget._id));
      toast.success(`${title.slice(0, -1)} deleted`);
    } catch {
      toast.error("Couldn't delete item");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title={title}
        description={description}
        action={
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4" /> Add {title}
          </Button>
        }
      />

      {formOpen && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-ink dark:text-canvas">{editing ? "Edit" : "New"} {title}</h2>
            <button type="button" onClick={() => setFormOpen(false)} className="text-ink-faint dark:text-canvas/40 hover:text-ink dark:hover:text-canvas" aria-label="Close form">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.name} className={f.fullWidth ? "sm:col-span-2" : ""}>
                <Field label={f.label}>
                  {f.type === "textarea" ? (
                    <TextArea
                      required={f.required}
                      value={form[f.name] ?? ""}
                      onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                    />
                  ) : f.type === "select" ? (
                    <SelectInput
                      required={f.required}
                      value={form[f.name] ?? f.options[0]}
                      onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                    >
                      {f.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </SelectInput>
                  ) : (
                    <TextInput
                      type={f.type || "text"}
                      required={f.required}
                      value={form[f.name] ?? ""}
                      onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                      placeholder={f.placeholder}
                    />
                  )}
                </Field>
              </div>
            ))}
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
        <EmptyState icon={emptyIcon} title={`No ${title.toLowerCase()} yet`} description={`Add your first entry to populate this section.`} />
      ) : (
        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card divide-y divide-line">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-4 p-4">
              <div className="flex-1 min-w-0">{renderItem(item)}</div>
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
        title={`Delete this ${title.toLowerCase()}?`}
        description="This action can't be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default SimpleCrudPage;
