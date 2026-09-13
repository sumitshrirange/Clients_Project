import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative w-10 h-10 grid place-items-center rounded-full border border-ink/10 dark:border-white/15 text-ink-soft dark:text-canvas/70 hover:text-primary hover:border-primary/40 transition-colors ${className}`}
    >
      {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
    </button>
  );
};

export default ThemeToggle;
