import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, FileDown } from "lucide-react";
import Logo from "./Logo";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";
import { useActiveSection } from "../../hooks/useActiveSection";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Class Work", id: "class-work" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

const Header = ({ onResumeClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const activeId = useActiveSection(isHome ? SECTION_IDS : []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const goToSection = (id) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-4 sm:mx-6 lg:mx-auto max-w-6xl rounded-2xl transition-all duration-300 ${
          scrolled ? "glass shadow-card px-4" : "px-2"
        }`}
      >
        <div className="flex items-center justify-between h-14">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeId === item.id ? "text-primary" : "text-ink-soft dark:text-canvas/70 hover:text-ink dark:hover:text-canvas"
                }`}
              >
                {item.label}
                {activeId === item.id && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute left-1/2 -translate-x-1/2 bottom-1 w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Button onClick={onResumeClick} variant="outline" className="!px-5 !py-2.5">
              <FileDown className="w-4 h-4" /> Resume
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              className="p-2 text-ink dark:text-canvas"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden mx-4 mt-2 rounded-2xl glass shadow-card overflow-hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col p-4 gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goToSection(item.id)}
                  className="text-left px-3 py-3 rounded-xl text-ink-soft dark:text-canvas/70 hover:bg-lavender/50 dark:hover:bg-white/5 hover:text-ink dark:hover:text-canvas font-medium"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={onResumeClick}
                className="mt-2 text-center px-3 py-3 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-canvas font-semibold shadow-glow"
              >
                Resume
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
