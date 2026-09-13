import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MousePointer2, Figma, StickyNote, Headphones, Palette, Component, PenTool } from "lucide-react";
import Button from "../../components/ui/Button";
import FloatingCard from "../../components/ui/FloatingCard";
import GridBackdrop from "../../components/ui/GridBackdrop";
import FloatingDoodle from "../../components/ui/FloatingDoodle";
import { StarBurst, Sparkle, Squiggle, DottedCircle, PlusCross, ZigZag, DiamondOutline } from "../../components/illustrations/Doodles";

const FloatingShapes = lazy(() => import("../../components/three/FloatingShapes"));

const EXPERTISE = [
  "UI/UX Design",
  "Product Design",
  "User Research",
  "Wireframing",
  "Prototyping",
  "Design Systems",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = ({ profile }) => {
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isNarrow = window.innerWidth < 768;
    setShow3D(!prefersReducedMotion && !isNarrow);
  }, []);

  const name = profile?.name || "Payal Wansing";
  const designation = profile?.designation || "UI/UX Designer";
  const tagline = profile?.tagline || "Designing intuitive experiences that solve real problems.";
  const chips = profile?.expertiseChips?.length ? profile.expertiseChips : EXPERTISE;
  const imageUrl = profile?.profileImage?.url || profile?.cutoutImage?.url;

  return (
    <section id="home" className="relative pt-40 pb-24 sm:pt-48 sm:pb-32 overflow-hidden">
      <GridBackdrop />

      <FloatingDoodle className="top-24 left-4 lg:left-10 text-primary/40 dark:text-primary-light/40" rotate={-8} delay={0.2} mobileVisible>
        <StarBurst className="w-9 h-9 sm:w-12 sm:h-12" />
      </FloatingDoodle>
      <FloatingDoodle className="top-1/2 right-4 lg:right-10 text-mint" rotate={10} delay={0.6} duration={5}>
        <Sparkle className="w-7 h-7" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-16 left-8 lg:left-16 text-primary/30 dark:text-primary-light/30" rotate={4} delay={0.9} duration={8}>
        <Squiggle className="w-14 h-6" />
      </FloatingDoodle>
      <FloatingDoodle className="top-44 left-1/3 text-blue/40" rotate={0} delay={0.4} duration={6}>
        <PlusCross className="w-4 h-4" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-40 right-1/4 text-primary/30 dark:text-primary-light/30" rotate={-14} delay={1.1} duration={7}>
        <DottedCircle className="w-9 h-9" />
      </FloatingDoodle>
      <FloatingDoodle className="top-1/3 left-1/4 text-cream" rotate={20} delay={0.7} duration={6}>
        <DiamondOutline className="w-6 h-6" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-10 right-1/3 text-mint/80" rotate={0} delay={1.3} duration={5}>
        <ZigZag className="w-12 h-5" />
      </FloatingDoodle>
      <FloatingDoodle className="top-1/4 right-1/3 text-primary/30 dark:text-primary-light/30" rotate={-6} delay={0.5} duration={7}>
        <Palette className="w-6 h-6" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-1/4 left-1/2 text-blue/30" rotate={8} delay={0.8} duration={6}>
        <Component className="w-6 h-6" />
      </FloatingDoodle>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div>
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-blue/10 dark:from-primary/20 dark:to-blue/20 px-4 py-1.5 text-xs font-mono tracking-wide text-primary dark:text-primary-light mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light animate-pulse" />
            {designation}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight text-ink dark:text-canvas relative inline-block"
          >
            {name}
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-primary/25 via-blue/25 to-mint/25 dark:from-primary/30 dark:via-blue/30 dark:to-mint/30 -z-10 rounded-full blur-[2px]" aria-hidden="true" />
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 font-accent italic text-2xl sm:text-3xl text-ink-soft dark:text-canvas/80 max-w-lg leading-snug"
          >
            {tagline}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-9 flex flex-wrap gap-3">
            <Button as="a" href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}>
              View Projects
            </Button>
            <Button as="a" href="#about" variant="outline" onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}>
              About Me
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-10 flex flex-wrap gap-2 max-w-xl">
            {chips.map((chip) => (
              <span
                key={chip}
                className="px-4 py-2 rounded-full bg-white/80 dark:bg-surface-dark border border-line dark:border-line-dark text-sm font-medium text-ink-soft dark:text-canvas/70 shadow-sm backdrop-blur-sm hover:border-primary/40 hover:text-primary dark:hover:text-primary-light hover:shadow-glow transition-all"
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] max-w-sm mx-auto w-full"
        >
          {/* Signature 3D moment — abstract shapes floating behind the portrait */}
          {show3D && (
            <div className="absolute -inset-10 z-0">
              <Suspense fallback={null}>
                <FloatingShapes />
              </Suspense>
            </div>
          )}

          <div className="relative z-10 h-full w-full rounded-4xl overflow-hidden bg-lavender dark:bg-surface-dark-alt border border-white dark:border-line-dark shadow-floaty">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full grid place-items-center text-primary/40 font-display font-extrabold text-6xl">
                PW
              </div>
            )}
          </div>

          <FloatingCard className="-left-8 top-6 flex items-center gap-2 z-20" rotate={-6} delay={0.3}>
            <Figma className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-ink-soft dark:text-canvas/70 pr-1">Figma</span>
          </FloatingCard>

          <FloatingCard className="-right-6 top-1/3 block w-32 z-20" rotate={5} delay={0.5}>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-300" />
              <span className="w-2 h-2 rounded-full bg-amber-300" />
              <span className="w-2 h-2 rounded-full bg-emerald-300" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 rounded-full bg-line dark:bg-line-dark w-full" />
              <div className="h-1.5 rounded-full bg-line dark:bg-line-dark w-2/3" />
              <div className="h-6 rounded-lg bg-lavender dark:bg-primary/20 mt-2" />
            </div>
          </FloatingCard>

          <FloatingCard className="-left-4 bottom-10 flex items-center gap-2 z-20 bg-cream dark:bg-surface-dark" rotate={-3} delay={0.7}>
            <StickyNote className="w-4 h-4 text-ink-soft dark:text-canvas/70" />
            <span className="text-xs font-medium text-ink-soft dark:text-canvas/70">User-first</span>
          </FloatingCard>

          <FloatingCard className="right-4 -bottom-6 flex items-center justify-center w-11 h-11 z-20" rotate={0} delay={0.9}>
            <MousePointer2 className="w-4 h-4 text-primary" />
          </FloatingCard>

          <FloatingCard className="-right-9 bottom-16 flex items-center justify-center w-11 h-11 z-20" rotate={-8} delay={1.1}>
            <Headphones className="w-4 h-4 text-primary" />
          </FloatingCard>

          <FloatingCard className="-left-10 top-1/2 flex items-center justify-center w-10 h-10 z-20" rotate={9} delay={1.3}>
            <PenTool className="w-4 h-4 text-primary" />
          </FloatingCard>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden sm:flex justify-center mt-16"
      >
        <ArrowDown className="w-5 h-5 text-ink-faint dark:text-canvas/40 animate-bounce" aria-hidden="true" />
      </motion.div>
    </section>
  );
};

export default Hero;
