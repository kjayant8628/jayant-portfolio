"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";

export function ProjectCard({
  project,
  featured = false,
  onOpen,
}: {
  project: Project;
  featured?: boolean;
  onOpen: (project: Project) => void;
}) {
  return (
    <motion.button
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={`group relative flex flex-col rounded-xl border border-border bg-surface/50 p-7 text-left transition-all duration-300 hover:border-muted-foreground/30 hover:bg-surface-hover ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="mono">{project.category}</Badge>
          <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-foreground">{project.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>

      <div className={`mt-6 grid gap-4 ${featured ? "sm:grid-cols-3" : "grid-cols-2"}`}>
        {project.metrics.slice(0, featured ? 3 : 2).map((metric) => (
          <div key={metric.label}>
            <div className="text-xl font-semibold text-signal font-tabular">{metric.value}</div>
            <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((tech) => (
          <Badge key={tech} variant="outline" className="text-[11px]">
            {tech}
          </Badge>
        ))}
        {project.stack.length > 5 && (
          <Badge variant="outline" className="text-[11px]">
            +{project.stack.length - 5}
          </Badge>
        )}
      </div>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors group-hover:text-signal">
        View case study
        <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </motion.button>
  );
}
