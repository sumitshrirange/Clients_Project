import { forwardRef } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]";

const variants = {
  primary:
    "bg-gradient-to-br from-primary to-primary-dark text-canvas px-6 py-3 shadow-glow hover:shadow-[0_20px_45px_-12px_rgba(108,76,241,0.55)] hover:from-primary-light hover:to-primary hover:-translate-y-0.5 dark:from-primary dark:to-primary-dark dark:hover:from-primary-light dark:hover:to-primary",
  outline:
    "border border-ink/15 text-ink px-6 py-3 hover:border-primary hover:text-primary hover:-translate-y-0.5 hover:shadow-card dark:border-white/20 dark:text-canvas dark:hover:border-primary-light dark:hover:text-primary-light",
  ghost: "text-ink-soft px-4 py-2 hover:text-primary dark:text-canvas/70 dark:hover:text-primary-light",
  danger: "bg-red-500 text-white px-5 py-2.5 hover:bg-red-600",
};

const Button = forwardRef(({ as: Component = "button", variant = "primary", className = "", ...props }, ref) => {
  return <Component ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props} />;
});

Button.displayName = "Button";
export default Button;
