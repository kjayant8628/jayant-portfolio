"use client";

import { useEffect, useState } from "react";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

export function useHoverCapable(): boolean {
  const [hoverCapable, setHoverCapable] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(HOVER_QUERY);

    const update = () => setHoverCapable(mediaQuery.matches);

    update();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  return hoverCapable;
}
