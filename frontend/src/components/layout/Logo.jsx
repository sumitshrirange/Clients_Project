import { Link } from "react-router-dom";

const Logo = ({ light = false }) => (
  <Link
    to="/"
    className="flex items-center gap-2.5 group"
    aria-label="Payal Wansing — home"
  >
    <span
      className={`grid place-items-center w-10 h-10 rounded-2xl font-display font-extrabold text-base rotate-[-4deg] transition-transform group-hover:rotate-0 shadow-glow ${
        light ? "bg-canvas text-ink" : "bg-gradient-to-br from-primary to-primary-dark text-canvas"
      }`}
    >
      PW
    </span>
    <span className={`hidden sm:flex flex-col leading-none ${light ? "text-canvas" : "text-ink dark:text-canvas"}`}>
      <span className="font-display font-bold text-sm">Payal Wansing</span>
      <span className={`text-[11px] ${light ? "text-canvas/60" : "text-ink-faint dark:text-canvas/50"}`}>UI/UX Designer</span>
    </span>
  </Link>
);

export default Logo;
