"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArchitectureNodeProps {
  /** Position and size within the parent SVG's viewBox coordinate space. */
  x: number;
  y: number;
  width?: number;
  height?: number;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  /** Highlights the node with the orange accent — use for the 1-2 focal nodes per diagram. */
  accent?: boolean;
  /** Stagger delay for the reveal animation, in seconds. */
  delay?: number;
  className?: string;
}

/**
 * A single diagram card, rendered via <foreignObject> so it can use real
 * Tailwind classes and Lucide icons instead of hand-drawn SVG shapes.
 * Reusable across any ArchitectureDiagram composition.
 */
export function ArchitectureNode({
  x,
  y,
  width = 220,
  height = 72,
  icon: Icon,
  title,
  subtitle,
  accent = false,
  delay = 0,
  className,
}: ArchitectureNodeProps) {
  return (
    <foreignObject x={x} y={y} width={width} height={height} className="overflow-visible">
      <div className="h-full w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 6 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2 }}
          className={cn(
            "flex h-full w-full items-center gap-3 rounded-xl border px-4 py-3 shadow-sm shadow-black/5 transition-colors duration-200",
            accent
              ? "border-[hsl(var(--diagram-accent))]/50 bg-[hsl(var(--diagram-accent))]/[0.07]"
              : "border-[hsl(var(--diagram-border))] bg-[hsl(var(--diagram-surface))]",
            className
          )}
        >
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              accent
                ? "bg-[hsl(var(--diagram-accent))]/15 text-[hsl(var(--diagram-accent))]"
                : "bg-[hsl(var(--diagram-border))]/50 text-[hsl(var(--diagram-fg))]/70"
            )}
          >
            <Icon className="h-[18px] w-[18px]" />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[13px] font-medium leading-tight text-[hsl(var(--diagram-fg))]">
              {title}
            </span>
            {subtitle && (
              <span className="truncate text-[11px] leading-tight text-[hsl(var(--diagram-muted))]">
                {subtitle}
              </span>
            )}
          </span>
        </motion.div>
      </div>
    </foreignObject>
  );
}
