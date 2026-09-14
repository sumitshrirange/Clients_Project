import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Save, Plus, Trash2 } from "lucide-react";
import Button from "../../components/ui/Button";
import { Field, TextInput, TextArea, SelectInput, FileInput } from "../../components/ui/FormFields";

const CATEGORIES = ["Mobile App", "Website Design", "Web Application", "Dashboard", "Product Design", "Other"];

const emptyForm = {
  title: "",
  category: CATEGORIES[0],
  shortDescription: "",
  fullDescription: "",
  role: "",
  duration: "",
  figmaUrl: "",
  problem: "",
  goal: "",
  targetUsers: "",
  solution: "",
  result: "",
  learnings: "",
  challenges: "",
  featured: false,
  order: 0,
  keyPoints: [""],
  tools: [""],
  process: { research: "", userFlow: "", wireframes: "", visualDesign: "", prototype: "" },
};

// List-editing helper for `keyPoints` / `tools`: plain string arrays edited
// as a stack of text inputs with add/remove controls.
const ListEditor = ({ label, values, onChange }) => (
  <Field label={label}>
    <div className="space-y-2">
      {values.map((val, i) => (
        <div key={i} className="flex gap-2">
          <TextInput
            value={val}
            onChange={(e) => {
              const next = [...values];
              next[i] = e.target.value;
              onChange(next);
            }}
          />
          <button
            type="button"
            onClick={() => onChange(values.filter((_, idx) => idx !== i))}
            className="text-ink-faint dark:text-canvas/40 hover:text-red-500 shrink-0"
            aria-label={`Remove ${label} item`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
      >
        <Plus className="w-3.5 h-3.5" /> Add item
      </button>
    </div>
  </Field>
);

const ProjectFormDrawer = ({ open, initialData, onClose, onSubmit, submitting }) => {
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        ...emptyForm,
        ...initialData,
        keyPoints: initialData.keyPoints?.length ? initialData.keyPoints : [""],
        tools: initialData.tools?.length ? initialData.tools : [""],
        process: { ...emptyForm.process, ...initialData.process },
      });
    } else {
      setForm(emptyForm);
    }
    setFiles({});
  }, [initialData, open]);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const updateProcess = (key, value) => setForm((f) => ({ ...f, process: { ...f.process, [key]: value } }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(
      {
        ...form,
        keyPoints: form.keyPoints.filter(Boolean),
        tools: form.tools.filter(Boolean),
      },
      files
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm flex justify-end"
          onClick={onClose}
        >
          <motion.form
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="w-full max-w-2xl h-full bg-white dark:bg-surface-dark overflow-y-auto p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-ink dark:text-canvas">
                {initialData ? "Edit Project" : "New Project"}
              </h2>
              <button type="button" onClick={onClose} aria-label="Close form" className="text-ink-faint dark:text-canvas/40 hover:text-ink dark:hover:text-canvas">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <Field label="Title">
                <TextInput required value={form.title} onChange={(e) => update("title", e.target.value)} />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Category">
                  <SelectInput value={form.category} onChange={(e) => update("category", e.target.value)}>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </SelectInput>
                </Field>
                <Field label="Order">
                  <TextInput type="number" value={form.order} onChange={(e) => update("order", e.target.value)} />
                </Field>
              </div>

              <Field label="Short Description" hint="Shown on the Index card — keep it under ~220 characters.">
                <TextArea required value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} />
              </Field>

              <Field label="Full Description">
                <TextArea value={form.fullDescription} onChange={(e) => update("fullDescription", e.target.value)} />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Role">
                  <TextInput value={form.role} onChange={(e) => update("role", e.target.value)} />
                </Field>
                <Field label="Duration">
                  <TextInput value={form.duration} onChange={(e) => update("duration", e.target.value)} placeholder="e.g. 6 weeks" />
                </Field>
              </div>

              <ListEditor label="Tools" values={form.tools} onChange={(v) => update("tools", v)} />

              <Field label="Figma URL">
                <TextInput value={form.figmaUrl} onChange={(e) => update("figmaUrl", e.target.value)} />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Thumbnail">
                  <FileInput accept="image/*" onChange={(e) => setFiles((f) => ({ ...f, thumbnail: e.target.files[0] }))} />
                </Field>
                {/* <Field label="Hero Image">
                  <FileInput accept="image/*" onChange={(e) => setFiles((f) => ({ ...f, heroImage: e.target.files[0] }))} />
                </Field> */}
              </div>

              <hr className="border-line dark:border-line-dark" />
              <p className="font-display font-semibold text-ink dark:text-canvas">Case Study Overview</p>

              <Field label="Problem">
                <TextArea value={form.problem} onChange={(e) => update("problem", e.target.value)} />
              </Field>
              <Field label="Goal">
                <TextArea value={form.goal} onChange={(e) => update("goal", e.target.value)} />
              </Field>
              <Field label="Target Users">
                <TextArea value={form.targetUsers} onChange={(e) => update("targetUsers", e.target.value)} />
              </Field>
              <ListEditor label="Key Points (max 5)" values={form.keyPoints} onChange={(v) => update("keyPoints", v.slice(0, 5))} />

              <hr className="border-line dark:border-line-dark" />
              <p className="font-display font-semibold text-ink dark:text-canvas">Design Process</p>
              <Field label="Research">
                <TextArea value={form.process.research} onChange={(e) => updateProcess("research", e.target.value)} />
              </Field>
              <Field label="User Flow">
                <TextArea value={form.process.userFlow} onChange={(e) => updateProcess("userFlow", e.target.value)} />
              </Field>
              <Field label="Wireframes">
                <TextArea value={form.process.wireframes} onChange={(e) => updateProcess("wireframes", e.target.value)} />
              </Field>
              <Field label="Visual Design">
                <TextArea value={form.process.visualDesign} onChange={(e) => updateProcess("visualDesign", e.target.value)} />
              </Field>
              {/* <Field label="Prototype">
                <TextArea value={form.process.prototype} onChange={(e) => updateProcess("prototype", e.target.value)} />
              </Field> */}

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="User Flow Image">
                  <FileInput multiple accept="image/*" onChange={(e) => setFiles((f) => ({ ...f, userFlowImages: e.target.files }))} />
                </Field>
                <Field label="Wireframe Image">
                  <FileInput multiple accept="image/*" onChange={(e) => setFiles((f) => ({ ...f, wireframeImages: e.target.files }))} />
                </Field>
                <Field label="Visual Design Image">
                  <FileInput multiple accept="image/*" onChange={(e) => setFiles((f) => ({ ...f, visualDesignImages: e.target.files }))} />
                </Field>
                <Field label="Final Design / Project Image">
                  <FileInput multiple accept="image/*" onChange={(e) => setFiles((f) => ({ ...f, projectImages: e.target.files }))} />
                </Field>
              </div>

              <hr className="border-line dark:border-line-dark" />
              <p className="font-display font-semibold text-ink dark:text-canvas">Result</p>
              <Field label="Outcome">
                <TextArea value={form.result} onChange={(e) => update("result", e.target.value)} />
              </Field>
              <Field label="Challenges">
                <TextArea value={form.challenges} onChange={(e) => update("challenges", e.target.value)} />
              </Field>
              <Field label="Learnings">
                <TextArea value={form.learnings} onChange={(e) => update("learnings", e.target.value)} />
              </Field>

              <label className="flex items-center gap-2 text-sm font-medium text-ink dark:text-canvas">
                <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} />
                Featured project
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-8 sticky bottom-0 bg-white dark:bg-surface-dark pt-4">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                <Save className="w-4 h-4" /> {submitting ? "Saving…" : "Save Project"}
              </Button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectFormDrawer;
