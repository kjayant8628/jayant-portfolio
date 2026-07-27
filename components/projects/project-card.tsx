"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";
import { useHoverCapable } from "@/hooks/use-hover-capable";

export function ProjectCard({
  project,
  featured = false,
  onOpen,
}: {
  project: Project;
  featured?: boolean;
  onOpen: (project: Project) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const hoverCapable = useHoverCapable();
  const [isHovered, setIsHovered] = useState(false);

  const shouldAnimateHover = hoverCapable && !prefersReducedMotion;
  const hoverActive = shouldAnimateHover && isHovered;

  return (
    <motion.button
      onClick={() => onOpen(project)}
      onHoverStart={() => shouldAnimateHover && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={
        shouldAnimateHover
          ? {
              y: -4,
              boxShadow: "0 24px 45px rgba(2, 6, 23, 0.2)",
              backgroundColor: "hsl(var(--surface-hover) / 0.9)",
            }
          : undefined
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
      }
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface/50 p-7 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/65 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl border border-signal/35"
        animate={{ opacity: hoverActive ? 1 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
      />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="mono">{project.category}</Badge>
          <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
        </div>
        <motion.div
          className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-surface/70"
          animate={hoverActive ? { scale: 1.06 } : { scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, hsl(var(--signal) / 0.3), transparent 65%)",
            }}
            animate={hoverActive ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
          />
          <ArrowUpRight className="relative z-10 h-4 w-4 text-muted-foreground transition-colors duration-200 group-hover:text-signal" />
        </motion.div>
      </div>

      <motion.h3
        className="mt-5 text-xl font-semibold text-foreground"
        animate={hoverActive ? { x: 1.5 } : { x: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
      >
        {project.name}
      </motion.h3>
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

      <motion.span
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors group-hover:text-signal"
        animate={hoverActive ? { x: 1 } : { x: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
      >
        View case study
        <motion.span
          animate={hoverActive ? { x: 1.5, y: -1.5 } : { x: 0, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </motion.span>
      </motion.span>
    </motion.button>
  );
}
