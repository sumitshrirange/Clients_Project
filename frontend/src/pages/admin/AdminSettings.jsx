import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import AdminPageHeader from "../../components/layout/AdminPageHeader";
import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";
import { Field, TextInput, TextArea } from "../../components/ui/FormFields";
import { getSettings } from "../../services/contentService";
import { settingsAdmin } from "../../services/adminService";
import { useToast } from "../../context/ToastContext";

const AdminSettings = () => {
  const toast = useToast();
  const [form, setForm] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getSettings().then(setForm).catch(() => toast.error("Couldn't load settings"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!form) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await settingsAdmin.update({
        siteTitle: form.siteTitle,
        metaDescription: form.metaDescription,
        footerHeadline: form.footerHeadline,
        contactEmail: form.contactEmail,
        socialLinks: form.socialLinks,
      });
      toast.success("Settings updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Portfolio Settings" description="Site-wide SEO and footer content." />

      <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-6 space-y-5 max-w-2xl">
        <Field label="Site Title">
          <TextInput value={form.siteTitle} onChange={(e) => setForm((f) => ({ ...f, siteTitle: e.target.value }))} />
        </Field>
        <Field label="Meta Description">
          <TextArea value={form.metaDescription} onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))} />
        </Field>
        <Field label="Footer Headline">
          <TextInput value={form.footerHeadline} onChange={(e) => setForm((f) => ({ ...f, footerHeadline: e.target.value }))} />
        </Field>
        <Field label="Contact Email">
          <TextInput type="email" value={form.contactEmail} onChange={(e) => setForm((f) => ({ ...f, contactEmail: e.target.value }))} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="LinkedIn">
            <TextInput
              value={form.socialLinks?.linkedin || ""}
              onChange={(e) => setForm((f) => ({ ...f, socialLinks: { ...f.socialLinks, linkedin: e.target.value } }))}
            />
          </Field>
          <Field label="Behance">
            <TextInput
              value={form.socialLinks?.behance || ""}
              onChange={(e) => setForm((f) => ({ ...f, socialLinks: { ...f.socialLinks, behance: e.target.value } }))}
            />
          </Field>
          <Field label="Dribbble">
            <TextInput
              value={form.socialLinks?.dribbble || ""}
              onChange={(e) => setForm((f) => ({ ...f, socialLinks: { ...f.socialLinks, dribbble: e.target.value } }))}
            />
          </Field>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={submitting}>
            <Save className="w-4 h-4" /> {submitting ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
