import { motion } from "framer-motion";
import { Briefcase, Rocket } from "lucide-react";
import SectionHeading from "../../components/ui/SectionHeading";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import FloatingDoodle from "../../components/ui/FloatingDoodle";
import { Squiggle, Sparkle, DiamondOutline, HalfMoonArc } from "../../components/illustrations/Doodles";

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";

const Experience = ({ experience, loading }) => {
  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-gradient-to-b from-lavender/30 via-canvas-tint/50 to-blue/[0.06] dark:from-surface-dark/40 dark:via-transparent dark:to-transparent overflow-hidden">
      <FloatingDoodle className="top-16 right-8 lg:right-24 text-primary/30 dark:text-primary-light/30" rotate={-10} delay={0.3} duration={7}>
        <Squiggle className="w-16 h-7" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-16 left-6 lg:left-16 text-mint" rotate={8} delay={0.5} duration={6}>
        <Sparkle className="w-6 h-6" />
      </FloatingDoodle>
      <FloatingDoodle className="top-1/3 left-10 text-blue/30" rotate={-14} delay={0.7} duration={7}>
        <DiamondOutline className="w-6 h-6" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-1/3 right-1/4 text-primary/30 dark:text-primary-light/30" rotate={6} delay={0.9} duration={6}>
        <HalfMoonArc className="w-9 h-9" />
      </FloatingDoodle>
      <FloatingDoodle className="top-10 left-1/3 text-cream" rotate={0} delay={1.1} duration={5}>
        <Rocket className="w-5 h-5" />
      </FloatingDoodle>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading
          kicker="Experience"
          title="Where the work happened."
          description="Roles that shaped how I approach design problems today."
        />

        {loading ? (
          <div className="mt-16 space-y-8">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        ) : !experience?.length ? (
          <div className="mt-14">
            <EmptyState icon={Briefcase} title="Experience coming soon" description="Work history will appear here once added from the admin panel." />
          </div>
        ) : (
          <div className="mt-16 relative">
            <div className="absolute left-[19px] sm:left-6 top-2 bottom-2 w-px bg-line dark:bg-line-dark" aria-hidden="true" />
            <div className="space-y-10">
              {experience.map((role, i) => (
                <motion.div
                  key={role._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="relative pl-14 sm:pl-16"
                >
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-2xl bg-white dark:bg-surface-dark border border-line dark:border-line-dark shadow-card grid place-items-center overflow-hidden">
                    {role.companyLogo?.url ? (
                      <img src={role.companyLogo.url} alt={role.companyName} className="w-full h-full object-contain p-1.5" />
                    ) : (
                      <Briefcase className="w-4 h-4 text-primary dark:text-primary-light" />
                    )}
                  </div>

                  <div className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-5 sm:p-6 transition-all hover:shadow-card-hover hover:-translate-y-0.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display font-bold text-lg text-ink dark:text-canvas">{role.role}</h3>
                      <span className="text-xs font-mono text-ink-faint dark:text-canvas/50">
                        {formatDate(role.startDate)} — {role.current ? "Present" : formatDate(role.endDate)}
                      </span>
                    </div>
                    <p className="text-primary dark:text-primary-light font-semibold text-sm mt-1">{role.companyName}</p>
                    {role.description && (
                      <p className="text-ink-soft dark:text-canvas/70 text-sm mt-3 leading-relaxed">{role.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
