import { useEffect, useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import GridBackdrop from "../components/ui/GridBackdrop";
import ClassWorkGallery from "../components/ui/ClassWorkGallery";
import FloatingDoodle from "../components/ui/FloatingDoodle";
import { StarBurst, Sparkle, Squiggle, DottedCircle } from "../components/illustrations/Doodles";
import { getClassWork } from "../services/contentService";

const ClassWork = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClassWork()
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative pt-40 pb-28 overflow-hidden">
      <GridBackdrop />
      <FloatingDoodle className="top-32 left-6 lg:left-16 text-primary/30 dark:text-primary-light/30" rotate={-8} delay={0.2} duration={7}>
        <StarBurst className="w-10 h-10" />
      </FloatingDoodle>
      <FloatingDoodle className="top-52 right-8 lg:right-24 text-mint" rotate={10} delay={0.4} duration={5}>
        <Sparkle className="w-7 h-7" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-24 left-1/4 text-blue/30" rotate={4} delay={0.6} duration={6}>
        <Squiggle className="w-14 h-6" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-40 right-1/4 text-primary/25 dark:text-primary-light/25" rotate={-10} delay={0.8} duration={7}>
        <DottedCircle className="w-8 h-8" />
      </FloatingDoodle>
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading
          kicker="Class Work"
          title="The full gallery."
          description="UI exercises, user flows, components, and design experiments from ongoing practice."
        />
        <div className="mt-14">
          <ClassWorkGallery items={items} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default ClassWork;
