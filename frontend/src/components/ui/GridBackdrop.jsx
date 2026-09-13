// Purely decorative, absolutely-positioned backdrop: a faint dot grid plus
// several soft color blobs. Sits behind section content (z-0) so it never
// interferes with focus order or screen readers.
const GridBackdrop = ({ variant = "default", className = "" }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-lavender/70 via-canvas-tint/40 to-transparent dark:from-primary/10 dark:via-transparent" />
      <div className="absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />
      {variant === "default" && (
        <>
          <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-primary/20 dark:bg-primary/25 blur-3xl" />
          <div className="absolute top-1/3 -right-32 w-[380px] h-[380px] rounded-full bg-blue/15 dark:bg-blue/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-mint/30 dark:bg-mint/10 blur-3xl" />
          <div className="absolute top-2/3 right-1/4 w-[260px] h-[260px] rounded-full bg-cream/70 dark:bg-cream/10 blur-3xl" />
        </>
      )}
      {variant === "warm" && (
        <>
          <div className="absolute top-0 right-0 w-[360px] h-[360px] rounded-full bg-cream/60 dark:bg-cream/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-mint/30 dark:bg-mint/15 blur-3xl" />
          <div className="absolute top-1/4 left-0 w-[260px] h-[260px] rounded-full bg-primary/10 dark:bg-primary/15 blur-3xl" />
        </>
      )}
    </div>
  );
};

export default GridBackdrop;
