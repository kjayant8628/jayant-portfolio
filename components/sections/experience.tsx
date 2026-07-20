"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience } from "@/lib/data/content";
import { Badge } from "@/components/ui/badge";

/** Expandable role timeline — used as a tab panel inside SkillsExperience. */
export function ExperienceList() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {experience.map((role, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={`${role.company}-${role.role}`}
            className="rounded-xl border border-border bg-surface/50 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-6 text-left"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="text-lg font-semibold text-foreground">{role.company}</span>
                <span className="text-sm text-muted">{role.role}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-muted-foreground">
                  {role.start} — {role.end}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border px-6 pb-6 pt-5">
                    <p className="max-w-2xl text-sm leading-relaxed text-muted">{role.summary}</p>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {role.achievements.map((a) => (
                        <li key={a} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {role.stack.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-[11px]">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
