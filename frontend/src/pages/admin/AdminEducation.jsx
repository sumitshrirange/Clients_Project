import { GraduationCap } from "lucide-react";
import SimpleCrudPage from "./SimpleCrudPage";
import { educationAdmin } from "../../services/adminService";
import { getEducation } from "../../services/contentService";

const FIELDS = [
  { name: "degree", label: "Degree", required: true },
  { name: "institute", label: "Institute", required: true },
  { name: "year", label: "Year", required: true, placeholder: "2019 – 2023" },
  { name: "description", label: "Description", type: "textarea", fullWidth: true },
];

const AdminEducation = () => (
  <SimpleCrudPage
    title="Education"
    description="Degrees and institutes shown in the About section."
    emptyIcon={GraduationCap}
    fields={FIELDS}
    emptyForm={{ degree: "", institute: "", year: "", description: "" }}
    api={educationAdmin}
    getAll={getEducation}
    renderItem={(item) => (
      <>
        <p className="font-semibold text-ink dark:text-canvas text-sm">{item.degree}</p>
        <p className="text-xs text-ink-faint dark:text-canvas/50">{item.institute} · {item.year}</p>
      </>
    )}
  />
);

export default AdminEducation;
