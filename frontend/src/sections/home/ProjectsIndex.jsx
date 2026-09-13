import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Folder, Pin, Monitor } from "lucide-react";
import SectionHeading from "../../components/ui/SectionHeading";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import FloatingDoodle from "../../components/ui/FloatingDoodle";
import { StarBurst, Sparkle, ZigZag, DottedCircle } from "../../components/illustrations/Doodles";

const CATEGORY_STYLE = {
  "Mobile App": "bg-lavender dark:bg-primary/15",
  "Website Design": "bg-mint/30 dark:bg-mint/10",
  "Web Application": "bg-blue/10 dark:bg-blue/15",
  Dashboard: "bg-cream dark:bg-cream/10",
  "Product Design": "bg-white dark:bg-surface-dark",
};

const pad = (n) => String(n).padStart(2, "0");

const ProjectsIndex = ({ projects, loading }) => (
  <section id="projects" className="relative py-24 sm:py-32 bg-gradient-to-b from-blue/[0.08] via-lavender/20 to-mint/10 dark:from-transparent dark:via-transparent dark:to-transparent overflow-hidden">
    <FloatingDoodle className="top-4 right-10 lg:right-24 text-primary/30 dark:text-primary-light/30" rotate={14} delay={0.2} duration={7} mobileVisible>
      <StarBurst className="w-8 h-8 sm:w-10 sm:h-10" />
    </FloatingDoodle>
    <FloatingDoodle className="bottom-10 left-6 lg:left-16 text-mint" rotate={-8} delay={0.4} duration={6}>
      <Sparkle className="w-6 h-6" />
    </FloatingDoodle>
    <FloatingDoodle className="top-1/2 left-1/4 text-blue/30" rotate={0} delay={0.6} duration={6}>
      <ZigZag className="w-11 h-5" />
    </FloatingDoodle>
    <FloatingDoodle className="bottom-1/3 right-1/4 text-primary/25 dark:text-primary-light/25" rotate={-12} delay={0.8} duration={7}>
      <DottedCircle className="w-8 h-8" />
    </FloatingDoodle>
    <FloatingDoodle className="top-1/3 right-10 text-cream" rotate={0} delay={1.0} duration={5}>
      <Monitor className="w-5 h-5" />
    </FloatingDoodle>

    <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="relative">
          <span
            aria-hidden="true"
            className="hidden sm:inline-flex absolute -top-8 -left-3 -rotate-6 items-center gap-1.5 bg-mint text-ink text-[11px] font-mono uppercase tracking-wide px-3 py-1 rounded-full shadow-sm"
          >
            <Pin className="w-3 h-3" /> Open for work
          </span>
          <SectionHeading
            kicker="Selected Work"
            title={<span className="font-accent italic font-normal">Index</span>}
            description="A collection of case studies across product, mobile, and dashboard design."
          />
        </div>
        <p className="font-mono text-sm tracking-tight text-primary dark:text-primary-light bg-gradient-to-r from-primary/10 to-blue/10 dark:from-primary/20 dark:to-blue/20 border border-primary/20 dark:border-primary-light/20 rounded-full px-4 py-2">
          TOTAL PROJECTS: {loading ? "—" : projects?.length ?? 0}
        </p>
      </div>

      {loading ? (
        <div className="mt-14 space-y-5">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : !projects?.length ? (
        <div className="mt-14">
          <EmptyState icon={Folder} title="Projects coming soon" description="Case studies will appear here once added from the admin panel." />
        </div>
      ) : (
        <div className="mt-14 flex flex-col divide-y divide-line dark:divide-line-dark border-t border-b border-line dark:border-line-dark">
          {projects.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group grid sm:grid-cols-[auto_1fr_auto_auto] items-center gap-5 sm:gap-8 py-6 sm:py-8 px-4 -mx-4 rounded-2xl transition-colors hover:bg-lavender/40 dark:hover:bg-white/5"
              >
                <span className="font-mono font-bold text-3xl sm:text-4xl text-ink-faint/50 dark:text-canvas/30 group-hover:text-primary dark:group-hover:text-primary-light transition-colors w-12">
                  {pad(i + 1)}
                </span>

                <div
                  className={`hidden sm:block w-24 h-16 rounded-xl overflow-hidden border border-line dark:border-line-dark shrink-0 ${
                    CATEGORY_STYLE[project.category] || "bg-lavender dark:bg-primary/15"
                  }`}
                >
                  {project.thumbnail?.url && (
                    <img src={project.thumbnail.url} alt="" className="w-full h-full object-cover" />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-ink dark:text-canvas group-hover:text-primary dark:group-hover:text-primary-light transition-colors truncate">
                    {project.title}
                  </h3>
                  <p className="text-ink-soft dark:text-canvas/60 text-sm mt-1 line-clamp-1">{project.shortDescription}</p>
                </div>

                <span className="hidden md:inline-flex text-xs font-mono text-ink-faint dark:text-canvas/50 border border-line dark:border-line-dark rounded-full px-3 py-1.5 whitespace-nowrap">
                  {project.category}
                </span>

                <ArrowUpRight className="w-5 h-5 text-ink-faint dark:text-canvas/50 group-hover:text-primary dark:group-hover:text-primary-light group-hover:translate-x-1 group-hover:-translate-y-1 transition-all justify-self-end" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  </section>
);

export default ProjectsIndex;
