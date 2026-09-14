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
    <section id="experience" className="relative py-24 sm:py-32 bg-gradient-to-br from-lavender/35 via-white/40 to-blue/[0.1] dark:from-surface-dark/50 dark:via-surface-dark/30 dark:to-surface-dark/40 overflow-hidden">
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/4 via-transparent to-transparent dark:from-primary-light/4 pointer-events-none" />
      <FloatingDoodle className="top-16 right-8 lg:right-24 text-primary/40 dark:text-primary-light/40" rotate={-10} delay={0.3} duration={7}>
        <Squiggle className="w-16 h-7" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-16 left-6 lg:left-16 text-mint/70" rotate={8} delay={0.5} duration={6}>
        <Sparkle className="w-7 h-7" />
      </FloatingDoodle>
      <FloatingDoodle className="top-1/3 left-10 text-blue/40" rotate={-14} delay={0.7} duration={7}>
        <DiamondOutline className="w-6 h-6" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-1/3 right-1/4 text-primary/35 dark:text-primary-light/35" rotate={6} delay={0.9} duration={6}>
        <HalfMoonArc className="w-9 h-9" />
      </FloatingDoodle>
      <FloatingDoodle className="top-10 left-1/3 text-cream/60" rotate={0} delay={1.1} duration={5}>
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
            <div className="absolute left-[19px] sm:left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-primary via-primary to-transparent dark:from-primary-light dark:via-primary-light dark:to-transparent rounded-full" aria-hidden="true" />
            <div className="space-y-12">
              {experience.map((role, i) => (
                <motion.div
                  key={role._id}
                  initial={{ opacity: 0, x: 0, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative pl-14 sm:pl-16"
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-1 w-10 h-10 rounded-2xl bg-gradient-to-br from-white to-lavender/20 dark:from-surface-dark-alt dark:to-surface-dark border-2 border-line dark:border-line-dark shadow-lg grid place-items-center overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow"
                  >
                    {role.companyLogo?.url ? (
                      <img src={role.companyLogo.url} alt={role.companyName} className="w-full h-full object-contain p-1.5 group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <Briefcase className="w-4 h-4 text-primary dark:text-primary-light" />
                    )}
                  </motion.div>

                  <div className="group bg-gradient-to-br from-white/90 to-white/60 dark:from-surface-dark dark:to-surface-dark/80 rounded-2xl border border-line/60 dark:border-line-dark/60 shadow-md p-5 sm:p-6 transition-all hover:shadow-xl hover:-translate-y-2 backdrop-blur-sm hover:border-primary/40 dark:hover:border-primary-light/40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-display font-bold text-lg text-ink dark:text-canvas group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{role.role}</h3>
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-xs font-mono text-ink-faint dark:text-canvas/50 bg-white/60 dark:bg-surface-dark-alt/60 px-2.5 py-1 rounded-full whitespace-nowrap"
                        >
                          {formatDate(role.startDate)} — {role.current ? "Present" : formatDate(role.endDate)}
                        </motion.span>
                      </div>
                      <p className="text-primary dark:text-primary-light font-semibold text-sm mt-2">{role.companyName}</p>
                      {role.description && (
                        <p className="text-ink-soft dark:text-canvas/70 text-sm mt-4 leading-relaxed group-hover:text-ink-soft dark:group-hover:text-canvas/75 transition-colors">{role.description}</p>
                      )}
                    </div>
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
