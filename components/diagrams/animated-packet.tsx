"use client";

import * as React from "react";

export interface AnimatedPacketProps {
  /** The `id` of the ConnectionLine this packet should travel along. */
  pathId: string;
  duration?: number;
  delay?: number;
  radius?: number;
}

/**
 * A small dot that travels along a ConnectionLine's path on a loop —
 * standing in for a request/data packet moving through the system.
 * Automatically disabled for prefers-reduced-motion.
 */
export function AnimatedPacket({ pathId, duration = 2.6, delay = 0, radius = 3.5 }: AnimatedPacketProps) {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduced) return null;

  return (
    <circle r={radius} fill="hsl(var(--diagram-accent))">
      <animateMotion
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        keyPoints="0;1"
        keyTimes="0;1"
        calcMode="linear"
      >
        <mpath href={`#path-${pathId}`} />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.12;0.88;1"
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}
