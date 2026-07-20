export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: "Enterprise" | "Agentic AI" | "Applied ML" | "Forecasting";
  featured: boolean;
  problem: string;
  role: string;
  architecture: string[];
  stack: string[];
  metrics: ProjectMetric[];
  impact: string;
  year: string;
  links?: { label: string; href: string }[];
}

export interface ExperienceRole {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  achievements: string[];
  stack: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface TechCategory {
  name: string;
  items: { name: string; level: "Expert" | "Advanced" | "Working" }[];
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  status: "Published" | "Draft" | "Planned";
  content?: { heading?: string; body: string }[];
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  archived: boolean;
}
