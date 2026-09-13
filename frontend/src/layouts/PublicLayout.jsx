import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ResumeModal from "../components/layout/ResumeModal";
import { getProfile, getSettings } from "../services/contentService";

const PublicLayout = () => {
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    getProfile().then(setProfile).catch(() => setProfile({}));
    getSettings().then(setSettings).catch(() => setSettings({}));
  }, []);

  const openResumeModal = () => setResumeOpen(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onResumeClick={openResumeModal} />
      <main className="flex-1">
        <Outlet context={{ profile, settings, openResumeModal }} />
      </main>
      <Footer settings={settings} profile={profile} />
      <ResumeModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        resumeUrl={profile?.resume?.url}
        name={profile?.name}
      />
    </div>
  );
};

export default PublicLayout;

// Convenience hook so page components don't need to know the context shape.
export const useSiteContent = () => useOutletContext();
