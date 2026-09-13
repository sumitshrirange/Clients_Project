const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center text-center gap-3 py-16 px-6 rounded-3xl border border-dashed border-line dark:border-line-dark bg-white/60 dark:bg-white/[0.03]">
    {Icon && <Icon className="w-9 h-9 text-ink-faint dark:text-canvas/40" strokeWidth={1.5} />}
    <h3 className="font-display font-semibold text-lg text-ink dark:text-canvas">{title}</h3>
    {description && <p className="text-ink-soft dark:text-canvas/60 text-sm max-w-sm">{description}</p>}
    {action}
  </div>
);

export default EmptyState;
