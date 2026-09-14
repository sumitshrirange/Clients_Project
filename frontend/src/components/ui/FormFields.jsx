export const Field = ({ label, children, hint }) => (
  <label className="block">
    <span className="block text-sm font-semibold text-ink dark:text-canvas mb-1.5">
      {label}
    </span>
    {children}
    {hint && (
      <span className="block text-xs text-ink-faint dark:text-canvas/50 mt-1">
        {hint}
      </span>
    )}
  </label>
);

const inputClass =
  "w-full rounded-xl border border-line dark:border-line-dark bg-white dark:bg-surface-dark px-3.5 py-2.5 text-sm text-ink dark:text-canvas placeholder:text-ink-faint focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary";

export const TextInput = (props) => (
  <input {...props} className={`${inputClass} ${props.className || ""}`} />
);

export const TextArea = (props) => (
  <textarea
    {...props}
    className={`${inputClass} min-h-[110px] resize-y ${props.className || ""}`}
  />
);

export const SelectInput = ({ children, ...props }) => (
  <select {...props} className={`${inputClass} ${props.className || ""}`}>
    {children}
  </select>
);

export const FileInput = (props) => (
  <input
    type="file"
    {...props}
    multiple={false}
    onChange={(e) => {
      const files = e.target.files;

      if (files.length > 1) {
        toast.error("You can select only one file.");
        e.target.value = "";
        return;
      }

      props.onChange?.(e);
    }}
    className="block w-full text-sm text-ink-soft dark:text-canvas/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-lavender dark:file:bg-primary/20 file:text-primary dark:file:text-primary-light file:font-semibold hover:file:bg-primary/20 dark:hover:file:bg-primary/30"
  />
);
