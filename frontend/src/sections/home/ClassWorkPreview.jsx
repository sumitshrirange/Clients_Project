import { Link } from "react-router-dom";
import { ArrowRight, Camera } from "lucide-react";
import SectionHeading from "../../components/ui/SectionHeading";
import ClassWorkGallery from "../../components/ui/ClassWorkGallery";
import Button from "../../components/ui/Button";
import FloatingDoodle from "../../components/ui/FloatingDoodle";
import { Sparkle, StarBurst, PlusCross } from "../../components/illustrations/Doodles";

const ClassWorkPreview = ({ classWork, loading }) => (
  <section id="class-work" className="relative py-24 sm:py-32 bg-gradient-to-b from-mint/15 via-canvas-tint/50 to-cream/20 dark:from-surface-dark/40 dark:via-transparent dark:to-transparent overflow-hidden">
    <FloatingDoodle className="top-8 right-8 lg:right-20 text-primary/30 dark:text-primary-light/30" rotate={10} delay={0.2} duration={6}>
      <StarBurst className="w-9 h-9" />
    </FloatingDoodle>
    <FloatingDoodle className="bottom-16 left-6 lg:left-16 text-mint" rotate={-6} delay={0.4} duration={5}>
      <Sparkle className="w-6 h-6" />
    </FloatingDoodle>
    <FloatingDoodle className="top-1/2 left-1/4 text-blue/30" rotate={0} delay={0.6} duration={6}>
      <PlusCross className="w-4 h-4" />
    </FloatingDoodle>
    <FloatingDoodle className="bottom-1/3 right-1/4 text-cream" rotate={0} delay={0.8} duration={5}>
      <Camera className="w-5 h-5" />
    </FloatingDoodle>

    <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
        <SectionHeading
          kicker="Class Work"
          title="Design exercises & experiments."
          description="UI drills, user flows, and typography studies from ongoing practice."
        />
        <Button as={Link} to="/class-work" variant="outline">
          View All <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <ClassWorkGallery items={classWork} loading={loading} limit={6} showFilters={false} />
    </div>
  </section>
);

export default ClassWorkPreview;
