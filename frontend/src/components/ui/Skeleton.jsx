const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded-2xl bg-ink/[0.06] dark:bg-white/10 ${className}`} aria-hidden="true" />
);

export default Skeleton;
