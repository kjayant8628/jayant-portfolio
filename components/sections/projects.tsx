"use client";

import * as React from "react";
import { projects } from "@/lib/data/projects";
import { Project } from "@/types";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Enterprise", "Agentic AI", "Applied ML", "Forecasting"] as const;

export function Projects() {
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("All");
  const [selected, setSelected] = React.useState<Project | null>(null);
  const [open, setOpen] = React.useState(false);

  const visible = projects.filter((p) => filter === "All" || p.category === filter);

  const handleOpen = (project: Project) => {
    setSelected(project);
    setOpen(true);
  };

  return (
    <section id="projects" className="border-t border-border py-28">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Systems built to survive contact with production"
            description="Each project shipped to real users or real data, not a notebook. Open any card for the architecture, the role I played, and the measured impact."
          />

          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  filter === f
                    ? "border-signal/40 bg-signal-dim text-signal"
                    : "border-border text-muted hover:border-muted-foreground/40 hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured={project.featured}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </div>

      <ProjectDialog project={selected} open={open} onOpenChange={setOpen} />
    </section>
  );
}
