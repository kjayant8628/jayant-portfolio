"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { timeline, stats } from "@/lib/data/content";
import { AnimatedCounter } from "@/components/sections/animated-counter";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GithubDialog } from "@/components/sections/github-dialog";

export function About() {
  return (
    <section id="about" className="border-t border-border py-28">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About"
              title="From CS coursework to production bid systems"
              description="Three internships in three years — each one adding the production discipline the last one was missing. Data analytics, backend AI systems, and now generative AI at enterprise scale."
            />

            <div className="mt-8 flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg">
                    View full journey
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>The journey so far</DialogTitle>
                    <DialogDescription>From undergrad CS to production AI systems.</DialogDescription>
                  </DialogHeader>
                  <div className="p-8 pt-6">
                    <ol className="relative flex flex-col gap-8 pl-8">
                      <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
                      {timeline.map((event) => (
                        <li key={event.title} className="relative">
                          <span className="absolute -left-8 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-signal/40 bg-background">
                            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                          </span>
                          <span className="font-mono text-xs uppercase tracking-wide text-signal">
                            {event.year}
                          </span>
                          <h3 className="mt-1.5 text-base font-medium text-foreground">{event.title}</h3>
                          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
                            {event.description}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </DialogContent>
              </Dialog>

              <GithubDialog variant="ghost" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`rounded-lg border border-border bg-surface/50 p-6 ${
                  i === stats.length - 1 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className="text-3xl font-semibold text-foreground">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm leading-snug text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
