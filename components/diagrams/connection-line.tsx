"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Point } from "@/components/diagrams/geometry";

export interface ConnectionLineProps {
  /** Unique id within the diagram — used for the path/marker and referenced by AnimatedPacket. */
  id: string;
  from: Point;
  to: Point;
  label?: string;
  dashed?: boolean;
  delay?: number;
}

/**
 * An orange bezier connector between two anchor points, with a draw-in
 * reveal and an arrowhead. Give it an `id` and point an AnimatedPacket at
 * `path-{id}` to animate a packet flowing along it.
 */
export function ConnectionLine({ id, from, to, label, dashed = false, delay = 0 }: ConnectionLineProps) {
  const midX = (from.x + to.x) / 2;
  const path = `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
  const markerId = `arrow-${id}`;

  return (
    <g>
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--diagram-accent))" />
        </marker>
      </defs>

      <motion.path
        id={`path-${id}`}
        d={path}
        fill="none"
        stroke="hsl(var(--diagram-accent))"
        strokeOpacity={0.6}
        strokeWidth={1.5}
        strokeDasharray={dashed ? "5 4" : undefined}
        markerEnd={`url(#${markerId})`}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay, ease: "easeInOut" }}
      />

      {label && (
        <foreignObject
          x={midX - 45}
          y={(from.y + to.y) / 2 - 22}
          width={90}
          height={20}
          className="pointer-events-none overflow-visible"
        >
          <div className="flex justify-center">
            <span className="rounded bg-[hsl(var(--diagram-bg))] px-1.5 font-mono text-[9px] uppercase tracking-wide text-[hsl(var(--diagram-muted))]">
              {label}
            </span>
          </div>
        </foreignObject>
      )}
    </g>
  );
}
