import { useEffect, useState } from "react";
import { FileText, Upload } from "lucide-react";
import AdminPageHeader from "../../components/layout/AdminPageHeader";
import Button from "../../components/ui/Button";
import { Field, FileInput } from "../../components/ui/FormFields";
import ResumeModal from "../../components/layout/ResumeModal";
import { getProfile } from "../../services/contentService";
import { profileAdmin } from "../../services/adminService";
import { useToast } from "../../context/ToastContext";

const AdminResume = () => {
  const toast = useToast();
  const [resumeUrl, setResumeUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then((p) => {
      setProfile(p);
      setResumeUrl(p.resume?.url || null);
    });
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Choose a PDF file first");
    setSubmitting(true);
    try {
      const res = await profileAdmin.updateResume(file);
      setResumeUrl(res.data.resume?.url);
      toast.success("Resume updated");
      setFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Resume" description="Shown via the About section's resume preview modal." />

      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-6 max-w-lg space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-lavender dark:bg-primary/15 grid place-items-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-ink dark:text-canvas text-sm">Current Resume</p>
            {resumeUrl ? (
              <button
                onClick={() => setResumeOpen(true)}
                className="text-sm text-primary hover:underline bg-none border-none cursor-pointer p-0"
              >
                View current file
              </button>
            ) : (
              <p className="text-sm text-ink-faint dark:text-canvas/50">No resume uploaded yet</p>
            )}
          </div>
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          <Field label="Replace with new PDF">
            <FileInput accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
          </Field>
          <Button type="submit" disabled={submitting}>
            <Upload className="w-4 h-4" /> {submitting ? "Uploading…" : "Upload Resume"}
          </Button>
        </form>
      </div>

      <ResumeModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        resumeUrl={resumeUrl}
        name={profile?.name}
      />
    </div>
  );
};

export default AdminResume;
