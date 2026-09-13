const AdminPageHeader = ({ title, description, action }) => (
  <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
    <div>
      <h1 className="font-display font-bold text-2xl text-ink dark:text-canvas">{title}</h1>
      {description && <p className="text-ink-soft dark:text-canvas/60 text-sm mt-1">{description}</p>}
    </div>
    {action}
  </div>
);

export default AdminPageHeader;
