import { LucideIcon } from "lucide-react";

export type DiagramNode = {
  id: string;
  title: string;
  subtitle?: string;
  icon: LucideIcon;

  x: number;
  y: number;

  width?: number;
  height?: number;

  accent?: boolean;
};

export type DiagramConnection = {
  id: string;

  from: string;
  to: string;

  dashed?: boolean;

  label?: string;

  animated?: boolean;
};

export type DiagramSection = {
  label: string;

  x: number;
  y: number;

  width: number;
  height: number;

  icon: LucideIcon;
};

export interface DiagramDefinition {

  title: string;

  description: string;

  viewBox: string;

  sections: DiagramSection[];

  nodes: DiagramNode[];

  connections: DiagramConnection[];
}