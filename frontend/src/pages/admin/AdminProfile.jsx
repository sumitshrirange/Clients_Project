import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import AdminPageHeader from "../../components/layout/AdminPageHeader";
import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";
import { Field, TextInput, TextArea, FileInput } from "../../components/ui/FormFields";
import { getProfile } from "../../services/contentService";
import { profileAdmin } from "../../services/adminService";
import { useToast } from "../../context/ToastContext";

const AdminProfile = () => {
  const toast = useToast();
  const [form, setForm] = useState(null);
  const [images, setImages] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getProfile()
      .then(setForm)
      .catch(() => toast.error("Couldn't load profile"));
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
      const payload = {
        name: form.name,
        designation: form.designation,
        tagline: form.tagline,
        introduction: form.introduction,
        philosophy: form.philosophy,
        expertiseChips: form.expertiseChips,
        socialLinks: form.socialLinks,
        ...images,
      };
      await profileAdmin.update(payload);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Profile" description="Content shown in the Hero and About sections." />

      <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark rounded-2xl border border-line dark:border-line-dark shadow-card p-6 space-y-5 max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name">
            <TextInput value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </Field>
          <Field label="Designation">
            <TextInput value={form.designation} onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))} />
          </Field>
        </div>

        <Field label="Tagline">
          <TextInput value={form.tagline} onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))} />
        </Field>

        <Field label="Introduction">
          <TextArea value={form.introduction} onChange={(e) => setForm((f) => ({ ...f, introduction: e.target.value }))} />
        </Field>

        <Field label="Design Philosophy">
          <TextArea value={form.philosophy} onChange={(e) => setForm((f) => ({ ...f, philosophy: e.target.value }))} />
        </Field>

        <Field label="Expertise Chips" hint="Comma-separated, shown floating in the Hero.">
          <TextInput
            value={(form.expertiseChips || []).join(", ")}
            onChange={(e) => setForm((f) => ({ ...f, expertiseChips: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))}
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email">
            <TextInput
              type="email"
              value={form.socialLinks?.email || ""}
              onChange={(e) => setForm((f) => ({ ...f, socialLinks: { ...f.socialLinks, email: e.target.value } }))}
            />
          </Field>
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

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Profile Image">
            <FileInput accept="image/*" onChange={(e) => setImages((i) => ({ ...i, profileImage: e.target.files[0] }))} />
          </Field>
          {/* <Field label="Cutout Image">
            <FileInput accept="image/*" onChange={(e) => setImages((i) => ({ ...i, cutoutImage: e.target.files[0] }))} />
          </Field> */}
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

export default AdminProfile;
