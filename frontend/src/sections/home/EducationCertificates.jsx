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
  <section className="relative py-24 sm:py-32 bg-gradient-to-br from-mint/25 via-white/50 to-cream/30 dark:from-surface-dark/50 dark:via-surface-dark/30 dark:to-surface-dark/40 overflow-hidden">
    {/* Enhanced gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent dark:via-primary-light/3 pointer-events-none" />
    <FloatingDoodle className="top-8 left-6 lg:left-16 text-mint/70" rotate={-4} delay={0.2} duration={6}>
      <Sparkle className="w-7 h-7" />
    </FloatingDoodle>
    <FloatingDoodle className="bottom-10 right-6 lg:right-20 text-primary/40 dark:text-primary-light/40" rotate={10} delay={0.5} duration={7}>
      <StarBurst className="w-9 h-9" />
    </FloatingDoodle>
    <FloatingDoodle className="top-1/3 right-1/4 text-blue/40" rotate={0} delay={0.7} duration={5}>
      <PlusCross className="w-4.5 h-4.5" />
    </FloatingDoodle>
    <FloatingDoodle className="bottom-1/4 left-1/4 text-primary/35 dark:text-primary-light/35" rotate={-8} delay={0.4} duration={6}>
      <RingOrbit className="w-8 h-8" />
    </FloatingDoodle>
    <FloatingDoodle className="top-10 right-1/3 text-cream/60" rotate={0} delay={0.9} duration={5}>
      <BookOpen className="w-5 h-5" />
    </FloatingDoodle>

    <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
      <SectionHeading
        kicker="Background"
        title="Education & certifications"
        description="Formal training and continued learning that inform the work."
      />

      <div className="mt-16 grid lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display font-bold text-lg text-ink dark:text-canvas flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary-light/20 dark:to-primary-light/10">
              <GraduationCap className="w-5 h-5 text-primary dark:text-primary-light" />
            </div>
            Education
          </h3>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          ) : !education?.length ? (
            <EmptyState title="No education added yet" description="Degrees and institutes will appear here." />
          ) : (
            <div className="space-y-6 relative">
              {/* Decorative dashed connecting line */}
              <div 
                className="absolute -left-8 top-0 bottom-0 w-1 opacity-40 dark:opacity-30" 
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    to bottom,
                    hsl(var(--primary)) 0px,
                    hsl(var(--primary)) 8px,
                    transparent 8px,
                    transparent 16px
                  )`,
                  backgroundPosition: '0 0',
                  backgroundRepeat: 'repeat-y'
                }}
                aria-hidden="true" 
              />
              {education.map((edu, i) => (
                <motion.div
                  key={edu._id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, rotate: i % 2 === 0 ? -2 : 2 }}
                  whileInView={{ opacity: 1, x: 0, rotate: i % 2 === 0 ? -1 : 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`group relative ${i % 2 === 0 ? "mr-8" : "ml-8"}`}
                >
                  {/* Numbered badge connector */}
                  <motion.div
                    whileInView={{ scale: 1 }}
                    initial={{ scale: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="absolute top-6 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple dark:from-primary-light dark:to-primary-light shadow-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ [i % 2 === 0 ? "right" : "left"]: "-1.75rem" }}
                  >
                    {i + 1}
                  </motion.div>
                  
                  <div className="bg-gradient-to-br from-white/90 to-lavender/10 dark:from-surface-dark dark:to-surface-dark/80 rounded-2xl border border-line/60 dark:border-line-dark/60 shadow-md p-5 transition-all hover:shadow-xl backdrop-blur-sm hover:border-primary/40 dark:hover:border-primary-light/40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-semibold text-ink dark:text-canvas group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{edu.degree}</h4>
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 }}
                          className="text-xs font-mono text-ink-faint dark:text-canvas/50 bg-white/60 dark:bg-surface-dark-alt/60 px-2.5 py-1 rounded-full shrink-0"
                        >
                          {edu.year}
                        </motion.span>
                      </div>
                      <p className="text-primary dark:text-primary-light text-sm font-medium mt-2">{edu.institute}</p>
                      {edu.description && (
                        <p className="text-ink-soft dark:text-canvas/70 text-sm mt-3 leading-relaxed group-hover:text-ink-soft dark:group-hover:text-canvas/75 transition-colors">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="font-display font-bold text-lg text-ink dark:text-canvas flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary-light/20 dark:to-primary-light/10">
              <Award className="w-5 h-5 text-primary dark:text-primary-light" />
            </div>
            Certificates
          </h3>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          ) : !certificates?.length ? (
            <EmptyState title="No certificates added yet" description="Certifications will appear here." />
          ) : (
            <div className="space-y-6 relative">
              {/* Decorative dashed connecting line */}
              <div 
                className="absolute -right-8 top-0 bottom-0 w-1 opacity-40 dark:opacity-30" 
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    to bottom,
                    hsl(var(--primary)) 0px,
                    hsl(var(--primary)) 8px,
                    transparent 8px,
                    transparent 16px
                  )`,
                  backgroundPosition: '0 0',
                  backgroundRepeat: 'repeat-y'
                }}
                aria-hidden="true" 
              />
              {certificates.map((cert, i) => (
                <motion.a
                  key={cert._id}
                  href={cert.certificateFile?.url || undefined}
                  target={cert.certificateFile?.url ? "_blank" : undefined}
                  rel="noreferrer"
                  initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40, rotate: i % 2 === 0 ? 2 : -2 }}
                  whileInView={{ opacity: 1, x: 0, rotate: i % 2 === 0 ? 1 : -1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`group block relative ${i % 2 === 0 ? "ml-8" : "mr-8"}`}
                >
                  {/* Numbered badge connector */}
                  <motion.div
                    whileInView={{ scale: 1 }}
                    initial={{ scale: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="absolute top-6 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-orange dark:from-primary-light dark:to-orange shadow-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ [i % 2 === 0 ? "left" : "right"]: "-1.75rem" }}
                  >
                    {i + 1}
                  </motion.div>
                  
                  <div className="bg-gradient-to-br from-cream/60 to-orange/15 dark:from-surface-dark-alt dark:to-surface-dark/70 rounded-2xl border border-line/50 dark:border-line-dark/50 shadow-md p-5 hover:shadow-lg transition-all backdrop-blur-sm hover:border-primary/40 dark:hover:border-primary-light/40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-orange/5 dark:from-primary-light/5 dark:to-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-semibold text-ink dark:text-canvas group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{cert.title}</h4>
                        {cert.certificateFile?.url && (
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 45 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ExternalLink className="w-4 h-4 text-ink-faint dark:text-canvas/50 group-hover:text-primary dark:group-hover:text-primary-light transition-colors shrink-0" />
                          </motion.div>
                        )}
                      </div>
                      <p className="text-primary dark:text-primary-light text-sm font-medium mt-2">{cert.organization}</p>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-xs font-mono text-ink-faint dark:text-canvas/50 inline-block mt-2 bg-white/40 dark:bg-surface-dark/40 px-2.5 py-1 rounded-full"
                      >
                        {formatDate(cert.date)}
                      </motion.span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  </section>
);

export default EducationCertificates;
