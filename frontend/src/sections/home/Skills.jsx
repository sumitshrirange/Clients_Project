import { motion } from "framer-motion";
import SectionHeading from "../../components/ui/SectionHeading";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import FloatingDoodle from "../../components/ui/FloatingDoodle";
import { Sparkle, StarBurst, PlusCross, RingOrbit, Squiggle } from "../../components/illustrations/Doodles";
import { getSkillIcon } from "../../utils/iconMap";
import { LayoutGrid, PenTool } from "lucide-react";

const CATEGORIES = ["UX Skills", "UI Skills", "Research", "Design Tools"];

const CATEGORY_ACCENT = {
  "UX Skills": "bg-lavender dark:bg-primary/10",
  "UI Skills": "bg-mint/40 dark:bg-mint/10",
  Research: "bg-cream dark:bg-cream/10",
  "Design Tools": "bg-blue/10 dark:bg-blue/15",
};

const Skills = ({ skills, loading }) => {
  const grouped = CATEGORIES.map((category) => ({
    category,
    items: (skills || []).filter((s) => s.category === category),
  }));

  const hasAny = (skills || []).length > 0;

  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-br from-lavender/30 via-blue/[0.08] to-mint/20 dark:from-transparent dark:via-transparent dark:to-transparent overflow-hidden">
      <FloatingDoodle className="top-6 right-6 lg:right-20 text-primary/40 dark:text-primary-light/40" rotate={0} delay={0.3} duration={5}>
        <Sparkle className="w-8 h-8" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-10 left-6 lg:left-16 text-blue/40" rotate={-10} delay={0.5} duration={7}>
        <StarBurst className="w-9 h-9" />
      </FloatingDoodle>
      <FloatingDoodle className="top-1/3 left-1/4 text-mint" rotate={0} delay={0.7} duration={6}>
        <PlusCross className="w-4 h-4" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-1/4 right-1/4 text-primary/30 dark:text-primary-light/30" rotate={14} delay={0.4} duration={6}>
        <RingOrbit className="w-8 h-8" />
      </FloatingDoodle>
      <FloatingDoodle className="top-1/2 right-10 text-cream" rotate={-6} delay={0.9} duration={5}>
        <PenTool className="w-5 h-5" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-6 left-1/3 text-primary/25 dark:text-primary-light/25" rotate={4} delay={1.1} duration={7}>
        <Squiggle className="w-12 h-5" />
      </FloatingDoodle>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading
          kicker="Skills"
          title="Design craft, backed by process."
          description="A working toolkit spanning research, structure, visual craft, and the tools that bring it together."
        />

        {loading ? (
          <div className="mt-14 grid sm:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-56" />
            ))}
          </div>
        ) : !hasAny ? (
          <div className="mt-14">
            <EmptyState icon={LayoutGrid} title="Skills coming soon" description="This section will list Payal's skills once added from the admin panel." />
          </div>
        ) : (
          <div className="mt-14 grid sm:grid-cols-2 gap-6">
            {grouped
              .filter((g) => g.items.length)
              .map((group, gi) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: gi * 0.08 }}
                  className={`rounded-3xl border border-line dark:border-line-dark p-6 sm:p-7 transition-all hover:shadow-card-hover hover:-translate-y-1 ${CATEGORY_ACCENT[group.category] || "bg-white dark:bg-surface-dark"}`}
                >
                  <h3 className="font-display font-bold text-lg text-ink dark:text-canvas mb-5">{group.category}</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((skill) => {
                      const Icon = getSkillIcon(skill.icon);
                      return (
                        <span
                          key={skill._id}
                          className="inline-flex items-center gap-2 bg-white/80 dark:bg-surface-dark-alt/80 border border-white dark:border-line-dark rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft dark:text-canvas/70 shadow-sm transition-all hover:shadow-glow hover:-translate-y-0.5 hover:text-primary dark:hover:text-primary-light"
                        >
                          <Icon className="w-3.5 h-3.5 text-primary dark:text-primary-light" />
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
