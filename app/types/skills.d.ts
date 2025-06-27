export interface Skill {
  id: string;
  name: string;
  logo: string;
  category: string;
}

export interface ParsedSkillFormData {
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "design";
  logo: string;
}

export interface SkillFormData {
  name: string;
  logo: File | string;
  category: string;
}
