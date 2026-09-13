import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Dribbble, Heart } from "lucide-react";
import Logo from "./Logo";
import FloatingDoodle from "../ui/FloatingDoodle";
import { StarBurst, Sparkle, ZigZag, DottedCircle } from "../illustrations/Doodles";

const SOCIAL_LINK_META = {
  linkedin: { label: "LinkedIn", icon: Linkedin },
  dribbble: { label: "Dribbble", icon: Dribbble },
  behance: { label: "Behance", icon: ArrowUpRight },
};

const Footer = ({ settings, profile }) => {
  const email = profile?.socialLinks?.email || settings?.contactEmail;
  const social = { ...profile?.socialLinks, ...settings?.socialLinks };
  const headline = settings?.footerHeadline || "Let's Create Something Amazing";

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-canvas">
      <div className="absolute inset-0 bg-dot-grid opacity-[0.06]" aria-hidden="true" />
      <div className="absolute -bottom-32 -right-20 w-[420px] h-[420px] rounded-full bg-primary/30 blur-[100px]" aria-hidden="true" />
      <div className="absolute top-0 left-1/4 w-[280px] h-[280px] rounded-full bg-blue/20 blur-[100px]" aria-hidden="true" />

      <FloatingDoodle className="top-10 left-6 lg:left-14 text-primary-light/50" rotate={-10} delay={0.2} duration={7} mobileVisible>
        <StarBurst className="w-10 h-10 sm:w-14 sm:h-14" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-28 right-10 lg:right-1/4 text-mint/70" rotate={8} delay={0.5} duration={5}>
        <Sparkle className="w-7 h-7" />
      </FloatingDoodle>
      <FloatingDoodle className="top-1/3 right-10 lg:right-24 text-canvas/20" rotate={0} delay={0.7} duration={6}>
        <ZigZag className="w-14 h-6" />
      </FloatingDoodle>
      <FloatingDoodle className="bottom-1/3 left-1/4 text-primary-light/30" rotate={-8} delay={0.9} duration={7}>
        <DottedCircle className="w-9 h-9" />
      </FloatingDoodle>
      <FloatingDoodle className="top-16 right-1/3 text-mint/50" rotate={0} delay={1.1} duration={5}>
        <Heart className="w-4 h-4" />
      </FloatingDoodle>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 pt-24 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-canvas/50 font-mono text-xs tracking-wide uppercase mb-4">Have a project in mind?</p>
          <h2 className="font-accent italic font-semibold text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight max-w-3xl">
            {headline}
          </h2>

          {email && (
            <a
              href={`mailto:${email}`}
              className="mt-8 inline-flex items-center gap-3 text-lg sm:text-2xl font-semibold border-b-2 border-canvas/30 hover:border-mint hover:text-mint transition-colors pb-1"
            >
              {email}
              <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          )}
        </motion.div>

        <div className="mt-20 flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-t border-canvas/10 pt-8">
          <Logo light />

          <div className="flex items-center gap-5">
            {Object.entries(social)
              .filter(([key, url]) => SOCIAL_LINK_META[key] && url)
              .map(([key, url]) => {
                const { label, icon: Icon } = SOCIAL_LINK_META[key];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-10 h-10 grid place-items-center rounded-full border border-canvas/15 text-canvas/70 hover:text-ink hover:bg-mint hover:border-mint transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
          </div>

          <p className="text-sm text-canvas/40">
            © {new Date().getFullYear()} Payal Wansing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
