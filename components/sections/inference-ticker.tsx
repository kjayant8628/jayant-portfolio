"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOG_LINES = [
  { tag: "router", text: "intent classified → multi-hop retrieval", ms: 12 },
  { tag: "retrieve", text: "qdrant · 3 partitions · 6/6 hits", ms: 84 },
  { tag: "rerank", text: "cross-encoder · top_k=8 → top_k=3", ms: 41 },
  { tag: "generate", text: "grounded response · 2 citations attached", ms: 620 },
  { tag: "critic", text: "claim check passed · 0 unsupported spans", ms: 96 },
  { tag: "trace", text: "run logged · p95 latency 1.9s", ms: 3 },
];

/**
 * A quiet, looping "system log" strip — standing in for the usual typed
 * bio intro. It shows the kind of trace a production RAG/agent request
 * actually produces, which doubles as a compact proof of the work.
 */
export function InferenceTicker() {
  const [visibleCount, setVisibleCount] = React.useState(0);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisibleCount(LOG_LINES.length);
      return;
    }

    let cancelled = false;
    let i = 0;

    const run = async () => {
      while (!cancelled) {
        if (i >= LOG_LINES.length) {
          await new Promise((r) => setTimeout(r, 2200));
          if (cancelled) return;
          i = 0;
          setVisibleCount(0);
          await new Promise((r) => setTimeout(r, 400));
          continue;
        }
        i += 1;
        setVisibleCount(i);
        await new Promise((r) => setTimeout(r, 480));
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full max-w-md rounded-lg border border-border bg-surface/70 font-mono text-[12.5px] shadow-xl shadow-black/20">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-signal" />
        <span className="text-muted-foreground">agent_run.trace</span>
        <span className="ml-auto text-muted-foreground/60">live</span>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <AnimatePresence initial={false}>
          {LOG_LINES.slice(0, visibleCount).map((line) => (
            <motion.div
              key={line.tag}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-baseline gap-2 text-muted"
            >
              <span className="text-signal/80">{line.tag}</span>
              <span className="flex-1 truncate">{line.text}</span>
              <span className="font-tabular text-muted-foreground/70">{line.ms}ms</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <span
          className="mt-0.5 h-3.5 w-1.5 bg-signal/70 animate-blink"
          style={{ display: visibleCount >= LOG_LINES.length ? "none" : "block" }}
        />
      </div>
    </div>
  );
}
