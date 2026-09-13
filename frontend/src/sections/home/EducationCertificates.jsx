import { motion } from "framer-motion";
import { GraduationCap, Award, ExternalLink, BookOpen } from "lucide-react";
import SectionHeading from "../../components/ui/SectionHeading";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import FloatingDoodle from "../../components/ui/FloatingDoodle";
import { Sparkle, StarBurst, PlusCross, RingOrbit } from "../../components/illustrations/Doodles";

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";

const EducationCertificates = ({ education, certificates, loading }) => (
  <section className="relative py-24 sm:py-32 bg-gradient-to-tr from-mint/20 via-lavender/25 to-cream/40 dark:from-transparent dark:via-transparent dark:to-transparent overflow-hidden">
    <FloatingDoodle className="top-8 left-6 lg:left-16 text-mint" rotate={-4} delay={0.2} duration={6}>
      <Sparkle className="w-6 h-6" />
    </FloatingDoodle>
    <FloatingDoodle className="bottom-10 right-6 lg:right-20 text-primary/30 dark:text-primary-light/30" rotate={10} delay={0.5} duration={7}>
      <StarBurst className="w-8 h-8" />
    </FloatingDoodle>
    <FloatingDoodle className="top-1/3 right-1/4 text-blue/40" rotate={0} delay={0.7} duration={5}>
      <PlusCross className="w-4 h-4" />
    </FloatingDoodle>
    <FloatingDoodle className="bottom-1/4 left-1/4 text-primary/30 dark:text-primary-light/30" rotate={-8} delay={0.4} duration={6}>
      <RingOrbit className="w-7 h-7" />
    </FloatingDoodle>
    <FloatingDoodle className="top-10 right-1/3 text-cream" rotate={0} delay={0.9} duration={5}>
      <BookOpen className="w-5 h-5" />
    </FloatingDoodle>

    <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
      <SectionHeading
        kicker="Background"
        title="Education & certifications"
        description="Formal training and continued learning that inform the work."
      />

      <div className="mt-16 grid lg:grid-cols-2 gap-10">
        <div>
          <h3 className="font-display font-bold text-ink dark:text-canvas flex items-center gap-2 mb-5">
            <GraduationCap className="w-5 h-5 text-primary dark:text-primary-light" /> Education
          </h3>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          ) : !education?.length ? (
            <EmptyState title="No education added yet" description="Degrees and institutes will appear here." />
          ) : (
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu._id}
                  initial={{ opacity: 0, y: 16, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-5 transition-all hover:shadow-card-hover hover:-translate-y-0.5"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-semibold text-ink dark:text-canvas">{edu.degree}</h4>
                    <span className="text-xs font-mono text-ink-faint dark:text-canvas/50 shrink-0">{edu.year}</span>
                  </div>
                  <p className="text-primary dark:text-primary-light text-sm font-medium mt-0.5">{edu.institute}</p>
                  {edu.description && <p className="text-ink-soft dark:text-canvas/70 text-sm mt-2 leading-relaxed">{edu.description}</p>}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-display font-bold text-ink dark:text-canvas flex items-center gap-2 mb-5">
            <Award className="w-5 h-5 text-primary dark:text-primary-light" /> Certificates
          </h3>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          ) : !certificates?.length ? (
            <EmptyState title="No certificates added yet" description="Certifications will appear here." />
          ) : (
            <div className="space-y-4">
              {certificates.map((cert, i) => (
                <motion.a
                  key={cert._id}
                  href={cert.certificateFile?.url || undefined}
                  target={cert.certificateFile?.url ? "_blank" : undefined}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 16, rotate: i % 2 === 0 ? 1.5 : -1.5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="block bg-cream/50 dark:bg-cream/10 rounded-2xl border border-line dark:border-line-dark shadow-card p-5 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-semibold text-ink dark:text-canvas">{cert.title}</h4>
                    {cert.certificateFile?.url && <ExternalLink className="w-4 h-4 text-ink-faint dark:text-canvas/50 shrink-0" />}
                  </div>
                  <p className="text-primary dark:text-primary-light text-sm font-medium mt-0.5">{cert.organization}</p>
                  <span className="text-xs font-mono text-ink-faint dark:text-canvas/50">{formatDate(cert.date)}</span>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default EducationCertificates;
