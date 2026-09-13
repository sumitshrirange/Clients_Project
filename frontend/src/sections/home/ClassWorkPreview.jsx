import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Sparkles } from "lucide-react";
import SectionHeading from "../../components/ui/SectionHeading";
import ClassWorkGallery from "../../components/ui/ClassWorkGallery";
import Button from "../../components/ui/Button";
import FloatingDoodle from "../../components/ui/FloatingDoodle";
import { Sparkle, StarBurst, PlusCross, BadgeRing } from "../../components/illustrations/Doodles";

const ClassWorkPreview = ({ classWork, loading }) => (
  <section id="class-work" className="relative py-24 sm:py-32 bg-gradient-to-br from-mint/20 via-white/50 to-cream/25 dark:from-surface-dark/50 dark:via-surface-dark/30 dark:to-surface-dark/40 overflow-hidden">
    {/* Enhanced gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-primary/3 dark:from-primary-light/5 dark:to-transparent pointer-events-none" />
    
    <FloatingDoodle className="top-6 right-10 lg:right-20 text-primary/40 dark:text-primary-light/40" rotate={10} delay={0.2} duration={6}>
      <StarBurst className="w-10 h-10 sm:w-12 sm:h-12" />
    </FloatingDoodle>
    <FloatingDoodle className="bottom-20 left-6 lg:left-16 text-mint/60" rotate={-6} delay={0.4} duration={5}>
      <Sparkle className="w-7 h-7" />
    </FloatingDoodle>
    <FloatingDoodle className="top-1/3 left-8 lg:left-20 text-blue/30" rotate={0} delay={0.6} duration={7}>
      <PlusCross className="w-5 h-5" />
    </FloatingDoodle>
    <FloatingDoodle className="bottom-1/4 right-1/4 text-cream/50" rotate={0} delay={0.8} duration={6}>
      <Camera className="w-6 h-6" />
    </FloatingDoodle>
    <FloatingDoodle className="top-1/2 right-8 lg:right-16 text-primary/25 dark:text-primary-light/25" rotate={8} delay={1.0} duration={8}>
      <BadgeRing className="w-8 h-8" />
    </FloatingDoodle>

    <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            kicker="Class Work"
            title="Design exercises & experiments."
            description="UI drills, user flows, and typography studies from ongoing practice."
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-purple/20 dark:from-primary-light/10 dark:to-purple/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Button as={Link} to="/class-work" variant="outline" className="relative group hover:shadow-lg transition-all hover:-translate-y-1">
            <Sparkles className="w-4 h-4 group-hover:animate-spin transition-transform" /> View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      <ClassWorkGallery items={classWork} loading={loading} limit={6} showFilters={false} />
    </div>
  </section>
);

export default ClassWorkPreview;
