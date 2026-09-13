import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Figma,
  Sparkles,
  Search,
  GitBranch,
  PenTool,
  Palette,
  Layers,
} from "lucide-react";
import GridBackdrop from "../components/ui/GridBackdrop";
import ImageLightbox from "../components/ui/ImageLightbox";
import Skeleton from "../components/ui/Skeleton";
import FloatingDoodle from "../components/ui/FloatingDoodle";
import { StarBurst, Sparkle, Squiggle } from "../components/illustrations/Doodles";
import { getProjectBySlug, getProjects } from "../services/contentService";

const ImageGrid = ({ images, onOpen, baseIndex }) => (
  <div className="grid sm:grid-cols-2 gap-5">
    {images.map((img, i) => (
      <button
        key={img.publicId || i}
        onClick={() => onOpen(baseIndex + i)}
        className="rounded-2xl overflow-hidden border border-line dark:border-line-dark shadow-card"
      >
        <img src={img.url} alt="" className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500" />
      </button>
    ))}
  </div>
);

const ProcessStep = ({ icon: Icon, title, description }) =>
  description ? (
    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-5">
      <div className="w-10 h-10 rounded-xl bg-lavender dark:bg-primary/15 grid place-items-center mb-3">
        <Icon className="w-4.5 h-4.5 text-primary dark:text-primary-light" />
      </div>
      <h4 className="font-display font-semibold text-ink dark:text-canvas mb-1">{title}</h4>
      <p className="text-ink-soft dark:text-canvas/70 text-sm leading-relaxed">{description}</p>
    </div>
  ) : null;

const InfoCard = ({ label, children, className = "" }) => (
  <div className={`rounded-2xl border border-line dark:border-line-dark p-5 ${className}`}>
    <p className="text-xs font-semibold text-ink dark:text-canvas mb-2">{label}</p>
    <p className="text-ink-soft dark:text-canvas/70 text-sm leading-relaxed">{children}</p>
  </div>
);

const ProjectDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([getProjectBySlug(slug), getProjects()])
      .then(([proj, all]) => {
        setProject(proj);
        setAllProjects(all);
      })
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [slug]);

  const { prevProject, nextProject } = useMemo(() => {
    if (!allProjects.length || !project) return {};
    const idx = allProjects.findIndex((p) => p.slug === project.slug);
    return {
      prevProject: allProjects[(idx - 1 + allProjects.length) % allProjects.length],
      nextProject: allProjects[(idx + 1) % allProjects.length],
    };
  }, [allProjects, project]);

  const openLightbox = (images, index) => {
    setLightboxImages(images.map((i) => i.url));
    setLightboxIndex(index);
  };

  if (loading) {
    return (
      <div className="pt-40 pb-28 max-w-5xl mx-auto px-6 space-y-6">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-40 pb-28 max-w-3xl mx-auto px-6 text-center">
        <h1 className="font-display font-bold text-2xl text-ink dark:text-canvas mb-3">Project not found</h1>
        <p className="text-ink-soft dark:text-canvas/70 mb-6">This case study may have been moved or removed.</p>
        <Link to="/#projects" className="text-primary dark:text-primary-light font-semibold">
          ← Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-28">
      {/* 01 — Project hero */}
      <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-20 overflow-hidden">
        <GridBackdrop />
        <FloatingDoodle className="top-40 right-8 lg:right-20 text-primary/30 dark:text-primary-light/30" rotate={12} delay={0.2} duration={7}>
          <StarBurst className="w-9 h-9" />
        </FloatingDoodle>
        <FloatingDoodle className="top-1/2 left-6 lg:left-16 text-mint" rotate={-6} delay={0.4} duration={5}>
          <Sparkle className="w-6 h-6" />
        </FloatingDoodle>
        <FloatingDoodle className="bottom-10 right-1/4 text-blue/30" rotate={4} delay={0.6} duration={6}>
          <Squiggle className="w-12 h-5" />
        </FloatingDoodle>
        <div className="relative max-w-5xl mx-auto px-6 sm:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft dark:text-canvas/70 hover:text-primary dark:hover:text-primary-light mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <span className="inline-block font-mono text-sm text-primary dark:text-primary-light mb-3">{project.category}</span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold text-4xl sm:text-6xl leading-[1.05] text-ink dark:text-canvas max-w-3xl"
          >
            {project.title}
          </motion.h1>
          <p className="mt-5 text-lg text-ink-soft dark:text-canvas/70 max-w-2xl leading-relaxed">{project.shortDescription}</p>

          <div className="mt-8 flex flex-wrap gap-8 text-sm">
            {project.role && (
              <div>
                <p className="text-ink-faint dark:text-canvas/50 mb-1 font-mono text-xs">Role</p>
                <p className="font-semibold text-ink dark:text-canvas">{project.role}</p>
              </div>
            )}
            {project.duration && (
              <div>
                <p className="text-ink-faint dark:text-canvas/50 mb-1 font-mono text-xs">Duration</p>
                <p className="font-semibold text-ink dark:text-canvas">{project.duration}</p>
              </div>
            )}
            {project.tools?.length > 0 && (
              <div>
                <p className="text-ink-faint dark:text-canvas/50 mb-1 font-mono text-xs">Tools</p>
                <p className="font-semibold text-ink dark:text-canvas">{project.tools.join(", ")}</p>
              </div>
            )}
            {project.figmaUrl && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-primary dark:text-primary-light hover:underline"
              >
                <Figma className="w-4 h-4" /> View in Figma
              </a>
            )}
          </div>

          {(project.heroImage?.url || project.thumbnail?.url) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-12 rounded-3xl overflow-hidden border border-line dark:border-line-dark shadow-floaty"
            >
              <img
                src={project.heroImage?.url || project.thumbnail?.url}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-20">
        {/* 02 — Overview */}
        {(project.fullDescription || project.problem || project.goal || project.targetUsers) && (
          <section>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink dark:text-canvas mb-6">Overview</h2>
            {project.fullDescription && (
              <p className="text-ink-soft dark:text-canvas/70 leading-relaxed mb-6 max-w-3xl">{project.fullDescription}</p>
            )}
            <div className="grid sm:grid-cols-3 gap-5">
              {project.problem && (
                <InfoCard label="Problem" className="bg-white dark:bg-surface-dark shadow-card">
                  {project.problem}
                </InfoCard>
              )}
              {project.goal && (
                <InfoCard label="Goal" className="bg-white dark:bg-surface-dark shadow-card">
                  {project.goal}
                </InfoCard>
              )}
              {project.targetUsers && (
                <InfoCard label="Target Users" className="bg-white dark:bg-surface-dark shadow-card">
                  {project.targetUsers}
                </InfoCard>
              )}
            </div>
          </section>
        )}

        {/* 03 — Key points */}
        {project.keyPoints?.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink dark:text-canvas mb-6">Key Points</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.keyPoints.slice(0, 5).map((point, i) => (
                <div key={i} className="flex items-start gap-3 bg-lavender/40 dark:bg-primary/10 rounded-2xl border border-line dark:border-line-dark p-4">
                  <Sparkles className="w-4 h-4 text-primary dark:text-primary-light mt-0.5 shrink-0" />
                  <p className="text-ink-soft dark:text-canvas/70 text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 04 — Design process */}
        {project.process && Object.values(project.process).some(Boolean) && (
          <section>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink dark:text-canvas mb-6">Design Process</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <ProcessStep icon={Search} title="Research" description={project.process.research} />
              <ProcessStep icon={GitBranch} title="User Flow" description={project.process.userFlow} />
              <ProcessStep icon={PenTool} title="Wireframes" description={project.process.wireframes} />
              <ProcessStep icon={Palette} title="Visual Design" description={project.process.visualDesign} />
              <ProcessStep icon={Layers} title="Prototype" description={project.process.prototype} />
            </div>
          </section>
        )}

        {/* 05 — User flow */}
        {project.userFlowImages?.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink dark:text-canvas mb-6">User Flow</h2>
            <ImageGrid images={project.userFlowImages} onOpen={(i) => openLightbox(project.userFlowImages, i)} baseIndex={0} />
          </section>
        )}

        {/* 06 — Wireframes */}
        {project.wireframeImages?.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink dark:text-canvas mb-6">Wireframes</h2>
            <ImageGrid images={project.wireframeImages} onOpen={(i) => openLightbox(project.wireframeImages, i)} baseIndex={0} />
          </section>
        )}

        {/* 07 — Visual design */}
        {project.visualDesignImages?.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink dark:text-canvas mb-6">Visual Design</h2>
            <div className="space-y-5">
              {project.visualDesignImages.map((img, i) => (
                <button
                  key={img.publicId || i}
                  onClick={() => openLightbox(project.visualDesignImages, i)}
                  className="block w-full rounded-3xl overflow-hidden border border-line dark:border-line-dark shadow-card"
                >
                  <img src={img.url} alt="" className="w-full h-auto object-cover" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 08 — Final design */}
        {project.projectImages?.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink dark:text-canvas mb-6">Final Design</h2>
            <ImageGrid images={project.projectImages} onOpen={(i) => openLightbox(project.projectImages, i)} baseIndex={0} />
          </section>
        )}

        {/* 09 — Result */}
        {(project.result || project.learnings || project.challenges) && (
          <section>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink dark:text-canvas mb-6">Result</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {project.result && (
                <InfoCard label="Outcome" className="bg-mint/20 dark:bg-mint/10">
                  {project.result}
                </InfoCard>
              )}
              {project.challenges && (
                <InfoCard label="Challenges" className="bg-cream/50 dark:bg-cream/10">
                  {project.challenges}
                </InfoCard>
              )}
              {project.learnings && (
                <InfoCard label="Learnings" className="bg-lavender/50 dark:bg-primary/10">
                  {project.learnings}
                </InfoCard>
              )}
            </div>
          </section>
        )}
      </div>

      {/* 10 — Next project navigation */}
      {(prevProject || nextProject) && (
        <section className="max-w-5xl mx-auto px-6 sm:px-8 mt-24 pt-10 border-t border-line dark:border-line-dark grid sm:grid-cols-2 gap-6">
          {prevProject && (
            <Link to={`/projects/${prevProject.slug}`} className="group">
              <p className="text-xs font-semibold text-ink-faint dark:text-canvas/50 mb-2">Previous</p>
              <p className="font-display font-bold text-xl text-ink dark:text-canvas group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                {prevProject.title}
              </p>
            </Link>
          )}
          {nextProject && (
            <Link to={`/projects/${nextProject.slug}`} className="group sm:text-right">
              <p className="text-xs font-semibold text-ink-faint dark:text-canvas/50 mb-2">Next</p>
              <p className="font-display font-bold text-xl text-ink dark:text-canvas group-hover:text-primary dark:group-hover:text-primary-light transition-colors inline-flex items-center gap-2">
                {nextProject.title} <ArrowUpRight className="w-4 h-4" />
              </p>
            </Link>
          )}
        </section>
      )}

      <ImageLightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </div>
  );
};

export default ProjectDetails;
