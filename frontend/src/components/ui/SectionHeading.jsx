import { motion } from "framer-motion";

// `kicker` should be a real, meaningful label for the section (e.g. the
// section's role, like "Selected work"), not a decorative eyebrow — it's
// rendered in the same case the caller passes, no forced uppercase.
const SectionHeading = ({ kicker, title, description, align = "left" }) => {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-3 max-w-2xl ${alignment}`}
    >
      {kicker && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-primary/10 to-blue/10 dark:from-primary/20 dark:to-blue/20 px-3.5 py-1 text-xs font-mono tracking-wide text-primary dark:text-primary-light">
          <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light" />
          {kicker}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink dark:text-canvas leading-[1.08]">
        {title}
      </h2>
      {description && <p className="text-ink-soft dark:text-canvas/60 text-base sm:text-lg leading-relaxed">{description}</p>}
    </motion.div>
  );
};

export default SectionHeading;
