import { motion } from "framer-motion";

// A single floating "paper" element in the editorial collage. `rotate` gives
// it the slight, deliberate tilt the design calls for; `delay` staggers the
// idle float animation so a cluster of these doesn't move in lockstep.
const FloatingCard = ({ children, className = "", rotate = 0, delay = 0, duration = 6 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotate: rotate - 4 }}
    animate={{
      opacity: 1,
      y: [0, -10, 0],
      rotate,
    }}
    transition={{
      opacity: { duration: 0.7, delay },
      y: { duration, repeat: Infinity, ease: "easeInOut", delay },
      rotate: { duration: 0.7, delay },
    }}
    className={`absolute rounded-2xl bg-white dark:bg-surface-dark shadow-card border border-line dark:border-line-dark p-3 ${className}`}
  >
    {children}
  </motion.div>
);

export default FloatingCard;
