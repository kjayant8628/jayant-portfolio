"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ArchitectureDiagramProps {
  /** SVG coordinate space — lay out children (nodes, sections, connections) within this. */
  viewBox?: string;
  minHeight?: number;
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Reusable canvas for architecture diagrams: a responsive SVG with a
 * scoped orange accent (#F59E0B) and tokens that follow the site's
 * light/dark theme automatically. Compose it with ArchitectureSection,
 * ArchitectureNode, ConnectionLine, and AnimatedPacket.
 */
export function ArchitectureDiagram({
  viewBox = "0 0 1200 640",
  minHeight = 420,
  title,
  description,
  className,
  children,
}: ArchitectureDiagramProps) {
  return (
    <div
      className={cn("w-full rounded-2xl border border-border bg-surface/40 p-4 sm:p-6", className)}
      style={
        {
          // Scoped diagram tokens — orange accent stays local to this
          // component tree instead of overriding the site's amber "signal".
          // Values are HSL triplets, following the same pattern as globals.css.
          "--diagram-accent": "38 92% 50%", // #F59E0B
          "--diagram-bg": "var(--surface)",
          "--diagram-surface": "var(--surface-raised)",
          "--diagram-border": "var(--border)",
          "--diagram-fg": "var(--foreground)",
          "--diagram-muted": "var(--muted-foreground)",
        } as React.CSSProperties
      }
    >
      {(title || description) && (
        <div className="mb-5 flex flex-col gap-1.5">
          {title && (
            <h4 className="font-mono text-xs uppercase tracking-wider text-[hsl(var(--diagram-accent))]">
              {title}
            </h4>
          )}
          {description && <p className="max-w-2xl text-sm leading-relaxed text-muted">{description}</p>}
        </div>
      )}

      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={title ?? "Architecture diagram"}
        className="w-full"
        style={{ minHeight }}
      >
        {children}
      </svg>
    </div>
  );
}
