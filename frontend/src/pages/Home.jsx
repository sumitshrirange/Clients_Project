import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSiteContent } from "../layouts/PublicLayout";
import Hero from "../sections/home/Hero";
import About from "../sections/home/About";
import Skills from "../sections/home/Skills";
import Experience from "../sections/home/Experience";
import EducationCertificates from "../sections/home/EducationCertificates";
import ProjectsIndex from "../sections/home/ProjectsIndex";
import ClassWorkPreview from "../sections/home/ClassWorkPreview";
import {
  getProjects,
  getClassWork,
  getExperience,
  getEducation,
  getSkills,
  getCertificates,
} from "../services/contentService";

const Home = () => {
  const { profile } = useSiteContent();
  const location = useLocation();
  const [data, setData] = useState({
    projects: [],
    classWork: [],
    experience: [],
    education: [],
    skills: [],
    certificates: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProjects(), getClassWork(), getExperience(), getEducation(), getSkills(), getCertificates()])
      .then(([projects, classWork, experience, education, skills, certificates]) => {
        setData({ projects, classWork, experience, education, skills, certificates });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Supports deep-linking from other pages, e.g. navigating to /#projects.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.hash]);

  const stats = {
    experience: data.experience.length,
    skills: data.skills.length,
    education: data.education.length,
    certificates: data.certificates.length,
  };

  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} stats={stats} />
      <Skills skills={data.skills} loading={loading} />
      <ProjectsIndex projects={data.projects} loading={loading} />
      <ClassWorkPreview classWork={data.classWork} loading={loading} />
      <Experience experience={data.experience} loading={loading} />
      <EducationCertificates education={data.education} certificates={data.certificates} loading={loading} />
    </>
  );
};

export default Home;
