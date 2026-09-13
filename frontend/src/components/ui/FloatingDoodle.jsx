import { motion } from "framer-motion";

// Purely decorative sticker/icon placed at an absolute position around a
// section (edges, corners) — the small illustrations the design brief calls
// for scattered left/right of the main content. Always aria-hidden since it
// carries no information. Hidden below `sm` by default to keep mobile layouts
// clean; pass `mobileVisible` to keep it everywhere.
const FloatingDoodle = ({
  children,
  className = "",
  rotate = 0,
  delay = 0,
  duration = 7,
  mobileVisible = false,
}) => (
  <motion.div
    aria-hidden="true"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: [0, -8, 0] }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{
      opacity: { duration: 0.6, delay },
      y: { duration, repeat: Infinity, ease: "easeInOut", delay },
    }}
    style={{ rotate: `${rotate}deg` }}
    className={`pointer-events-none absolute select-none ${mobileVisible ? "" : "hidden sm:block"} ${className}`}
  >
    {children}
  </motion.div>
);

export default FloatingDoodle;
