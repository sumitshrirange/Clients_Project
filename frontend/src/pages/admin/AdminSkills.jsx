import { Wrench } from "lucide-react";
import SimpleCrudPage from "./SimpleCrudPage";
import { skillsAdmin } from "../../services/adminService";
import { getSkills } from "../../services/contentService";

const CATEGORIES = ["UX Skills", "UI Skills", "Research", "Design Tools"];

const FIELDS = [
  { name: "name", label: "Skill Name", required: true, placeholder: "e.g. Figma" },
  { name: "category", label: "Category", type: "select", options: CATEGORIES, required: true },
  { name: "icon", label: "Icon Key", placeholder: "figma, wireframe, research…" },
  { name: "order", label: "Order", type: "number" },
];

const AdminSkills = () => (
  <SimpleCrudPage
    title="Skills"
    description="Grouped by category in the Skills section."
    emptyIcon={Wrench}
    fields={FIELDS}
    emptyForm={{ name: "", category: CATEGORIES[0], icon: "", order: 0 }}
    api={skillsAdmin}
    getAll={getSkills}
    renderItem={(item) => (
      <>
        <p className="font-semibold text-ink dark:text-canvas text-sm">{item.name}</p>
        <p className="text-xs text-ink-faint dark:text-canvas/50">{item.category}</p>
      </>
    )}
  />
);

export default AdminSkills;
