"use client";

import * as React from "react";
import { useMotionValue, motion, useSpring } from "framer-motion";

/**
 * A restrained radial highlight that follows the pointer across the whole
 * page. Kept low-opacity and desktop-only (fine pointer) so it reads as an
 * ambient cue rather than a gimmick, and never blocks interaction.
 */
export function CursorSpotlight() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, {
    damping: 35,
    stiffness: 260,
    mass: 0.35,
  });

  const springY = useSpring(y, {
    damping: 35,
    stiffness: 260,
    mass: 0.35,
  });
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
    if (!fine || reduced) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[240px] w-[240px] rounded-full"
      style={{
        translateX: springX,
        translateY: springY,
        x: "-50%",
        y: "-50%",
        background:
        "radial-gradient(circle, hsl(var(--signal) / 0.08) 0%, hsl(var(--signal) / 0.03) 35%, transparent 80%)",
      }}
    />
  );
}
