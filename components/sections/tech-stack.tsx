"use client";

import { motion } from "framer-motion";
import { techStack } from "@/lib/data/content";
import { cn } from "@/lib/utils";

const LEVEL_STYLES: Record<string, string> = {
  Expert: "bg-signal",
  Advanced: "bg-data",
  Working: "bg-muted-foreground",
};

/** Grid of categorized tech cards — used as a tab panel inside SkillsExperience. */
export function TechStackGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {techStack.map((category, i) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
          className="rounded-xl border border-border bg-surface/50 p-6"
        >
          <h3 className="text-sm font-semibold text-foreground">{category.name}</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {category.items.map((tech) => (
              <li key={tech.name} className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted">{tech.name}</span>
                <span className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    {tech.level}
                  </span>
                  <span className="flex gap-0.5">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          dotFilled(tech.level, dot) ? LEVEL_STYLES[tech.level] : "bg-border-strong"
                        )}
                      />
                    ))}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

function dotFilled(level: string, index: number) {
  const thresholds: Record<string, number> = { Expert: 3, Advanced: 2, Working: 1 };
  return index < (thresholds[level] ?? 0);
}
