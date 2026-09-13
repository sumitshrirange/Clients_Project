import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Wrench, FileText, Megaphone, Sprout, Eye } from "lucide-react";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import FloatingDoodle from "../../components/ui/FloatingDoodle";
import { BadgeRing, CurvedArrow, Sparkle, StarBurst, DottedCircle, ZigZag } from "../../components/illustrations/Doodles";
import { useSiteContent } from "../../layouts/PublicLayout";

const StatCard = ({ icon: Icon, label, value, rotate, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, rotate: rotate - 3 }}
    whileInView={{ opacity: 1, y: 0, rotate }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ rotate: 0, y: -4 }}
    className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-4 flex items-center gap-3 w-fit"
  >
    <div className="w-10 h-10 rounded-xl bg-lavender dark:bg-primary/15 grid place-items-center shrink-0">
      <Icon className="w-4.5 h-4.5 text-primary dark:text-primary-light" />
    </div>
    <div>
      <p className="font-mono font-bold text-xl text-ink dark:text-canvas leading-none">{value}</p>
      <p className="text-xs text-ink-faint dark:text-canvas/50 mt-1">{label}</p>
    </div>
  </motion.div>
);

const About = ({ profile, stats }) => {
  const { openResumeModal } = useSiteContent();
  const imageUrl = profile?.profileImage?.url;

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-gradient-to-b from-canvas-tint via-lavender/35 to-mint/10 dark:from-surface-dark/40 dark:via-transparent dark:to-surface-dark/20 overflow-hidden">
      <FloatingDoodle className="top-10 right-6 lg:right-16 text-primary/50 dark:text-primary-light/50" rotate={-6} delay={0.2} mobileVisible>
        <Megaphone className="w-6 h-6 sm:w-8 sm:h-8" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-24 right-1/3 text-mint" rotate={12} delay={0.5} duration={6}>
        <BadgeRing className="w-9 h-9" />
      </FloatingDoodle>
      <FloatingDoodle className="top-1/3 left-6 lg:left-12 text-primary/30 dark:text-primary-light/30" rotate={-10} delay={0.4} duration={7}>
        <StarBurst className="w-9 h-9" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-10 left-1/4 text-blue/40" rotate={6} delay={0.7} duration={6}>
        <Sprout className="w-6 h-6" />
      </FloatingDoodle>
      <FloatingDoodle className="top-1/2 right-8 lg:right-24 text-cream" rotate={0} delay={0.9} duration={5}>
        <Sparkle className="w-6 h-6" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-1/3 right-10 text-primary/30 dark:text-primary-light/30" rotate={-8} delay={0.6} duration={7}>
        <DottedCircle className="w-8 h-8" />
      </FloatingDoodle>
      <FloatingDoodle className="top-16 left-1/3 text-mint/70" rotate={0} delay={1.1} duration={6}>
        <ZigZag className="w-11 h-5" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-6 right-1/2 text-primary/30 dark:text-primary-light/30" rotate={4} delay={1.3} duration={6}>
        <Eye className="w-5 h-5" />
      </FloatingDoodle>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading
          kicker="About"
          title="A designer who thinks in systems, not screens."
          description="A closer look at how I got here — the philosophy behind the work, and the experience, tools, and training that shape it."
        />

        <div className="mt-16 grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-4xl overflow-hidden aspect-[4/5] bg-lavender dark:bg-surface-dark-alt border border-white dark:border-line-dark shadow-card rotate-[-2deg]"
            >
              {imageUrl ? (
                <img src={imageUrl} alt={profile?.name || "Payal Wansing"} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-primary/40 font-display font-extrabold text-6xl">
                  PW
                </div>
              )}
            </motion.div>

            <div className="mt-6 flex flex-wrap gap-4">
              <StatCard icon={Briefcase} label="Experience" value={stats?.experience ?? "—"} rotate={-2} delay={0.1} />
              <StatCard icon={Wrench} label="Skills" value={stats?.skills ?? "—"} rotate={2} delay={0.2} />
              <StatCard icon={GraduationCap} label="Education" value={stats?.education ?? "—"} rotate={-1} delay={0.3} />
              <StatCard icon={Award} label="Certificates" value={stats?.certificates ?? "—"} rotate={1} delay={0.4} />
            </div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-5 text-ink-soft dark:text-canvas/70 text-base sm:text-lg leading-relaxed"
            >
              <p>{profile?.introduction || "I'm a UI/UX designer who enjoys turning ambiguous problems into clear, usable interfaces — spending as much time understanding a user's context as I do refining a layout."}</p>
              <p>{profile?.philosophy || "Good design earns its simplicity. I design with intention: every screen, flow, and interaction should have a reason for existing."}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 relative w-fit"
            >
              <Button variant="primary" onClick={openResumeModal}>
                <FileText className="w-4 h-4" /> View Resume
              </Button>
              <CurvedArrow className="hidden sm:block absolute -right-14 -top-6 w-9 h-9 text-primary/40 dark:text-primary-light/40 -rotate-12" aria-hidden="true" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
