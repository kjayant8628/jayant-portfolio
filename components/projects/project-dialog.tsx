"use client";

import { CheckCircle2, GitBranch } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/types";



import { SiemensBidArchitecture } from "@/components/diagrams/siemens-bid-architecture";
import { RagPipelineArchitecture } from "@/components/diagrams/rag-architecture";
import { MultiAgentArchitecture } from "@/components/diagrams/multi-agent-rag";
import { DDIArchitecture } from "@/components/diagrams/ddi-architecture";
// import { RealEstateArchitecture } from "@/components/diagrams/real-estate-architecture";
// import { TourismArchitecture } from "@/components/diagrams/tourism-architecture";
// import { ZomatoArchitecture } from "@/components/diagrams/zomato-architecture";

const architectureMap = {
  "siemens-bid-automation": SiemensBidArchitecture,
  "enterprise-rag-assistant": RagPipelineArchitecture,
  "multi-agent-rag": MultiAgentArchitecture,
  "drug-drug-interaction-prediction": DDIArchitecture,
  
// Coming soon
  "real-estate-analytics": undefined,
  "tourism-demand-forecasting": undefined,
  "zomato-data-analysis": undefined,

  // Optional future projects
  "resume-parser": undefined,
  "chatbot": undefined,
} as const;

export function ProjectDialog({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!project) return null;
  const ArchitectureComponent = architectureMap[
    project.slug as keyof typeof architectureMap
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Badge variant="mono">{project.category}</Badge>
            <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
          </div>
          <DialogTitle>{project.name}</DialogTitle>
          <DialogDescription>{project.tagline}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-8 p-8 pt-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="rounded-md border border-border bg-surface/60 p-4">
                <div className="text-2xl font-semibold text-signal font-tabular">{metric.value}</div>
                <div className="mt-1 text-xs font-medium text-foreground/80">{metric.label}</div>
                {metric.detail && (
                  <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{metric.detail}</div>
                )}
              </div>
            ))}
          </div>

          <section>
            <h4 className="text-sm font-medium text-foreground">Business problem</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</p>
          </section>

          <section>
            <h4 className="flex items-center gap-2 text-sm font-medium text-foreground">
              <GitBranch className="h-3.5 w-3.5 text-signal" />
              System Architecture
            </h4>

            <div className="mt-4">
              {ArchitectureComponent ? (
                <ArchitectureComponent />
              ) : (
                <ul className="mt-3 flex flex-col gap-2.5">
                  {project.architecture.map((step) => (
                    <li
                      key={step}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <Separator />

          <section>
            <h4 className="text-sm font-medium text-foreground">Stack</h4>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-signal/25 bg-signal-dim/40 p-4">
            <h4 className="text-sm font-medium text-foreground">Impact</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{project.impact}</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
