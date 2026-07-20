"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface ArchitectureSectionProps {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  icon?: LucideIcon;
  delay?: number;
}

/**
 * A dashed, rounded group boundary with a floating label chip — used to
 * cluster related ArchitectureNodes (e.g. "Ingestion", "Reasoning Engine").
 * Reusable across any ArchitectureDiagram composition.
 */
export function ArchitectureSection({
  x,
  y,
  width,
  height,
  label,
  icon: Icon,
  delay = 0,
}: ArchitectureSectionProps) {
  return (
    <g>
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={18}
        fill="hsl(var(--diagram-surface))"
        fillOpacity={0.35}
        stroke="hsl(var(--diagram-border))"
        strokeWidth={1}
        strokeDasharray="4 6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay }}
      />
      <foreignObject x={x + 18} y={y - 13} width={width - 36} height={26} className="overflow-visible">
        <div className="flex w-fit">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--diagram-border))] bg-[hsl(var(--diagram-bg))] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-[hsl(var(--diagram-muted))]">
            {Icon && <Icon className="h-3 w-3" />}
            {label}
          </span>
        </div>
      </foreignObject>
    </g>
  );
}
