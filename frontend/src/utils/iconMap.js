import {
  Figma,
  PenTool,
  Layers,
  Users,
  GitBranch,
  LayoutGrid,
  Smartphone,
  Palette,
  Component,
  Sparkles,
  Map,
  MessageSquare,
} from "lucide-react";

// Admin stores the icon as a plain string (e.g. "figma", "wireframe") so it
// can be set from a simple text input rather than an icon picker widget.
const ICON_MAP = {
  figma: Figma,
  wireframe: PenTool,
  wireframing: PenTool,
  prototyping: Layers,
  research: Users,
  "user-research": Users,
  "user-flows": GitBranch,
  "information-architecture": Map,
  "responsive-design": Smartphone,
  "visual-design": Palette,
  "design-systems": Component,
  interviews: MessageSquare,
  default: Sparkles,
};

export const getSkillIcon = (name) => ICON_MAP[(name || "").toLowerCase().trim()] || LayoutGrid;
