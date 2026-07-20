"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileDown, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NodeNetwork } from "@/components/layout/node-network";
import { InferenceTicker } from "@/components/sections/inference-ticker";
import { siteConfig } from "@/lib/config";
import Image from "next/image";

const SPECIALTIES = [
  "LLM Applications",
  "Agentic AI",
  "Retrieval-Augmented Generation",
  "Machine Learning",
  "FastAPI",
  "Backend Systems",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const headline = siteConfig.tagline
  .replace(".", "")
  .split(" ")
  .reduce<string[]>((acc, word) => {
    if (word === "Building") acc.push(word);
    else if (word === "Production") acc.push(word);
    else if (word === "AI") acc.push("AI Systems");
    else if (word === "That") acc.push("That Solve");
    else if (word === "Real") acc.push("Real Business");
    else if (word === "Problems") acc.push("Problems.");
    return acc;
  }, []);

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 bg-grid" />
      <NodeNetwork className="absolute inset-0 h-full w-full opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative grid gap-14 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10"
      >
        <div>
          <motion.div variants={item} className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            <span className="tracking-wide">{"// "}{siteConfig.role.toUpperCase()} — {siteConfig.location.toUpperCase()}</span>
          </motion.div>

          <motion.h1
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className="text-display-xl font-semibold leading-[0.86] tracking-[-0.045em] text-foreground"
          >
            {headline.map((line, index) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line === "AI Systems" ? (
                  <>
                    <motion.span
                      className="text-signal inline-block"
                      animate={{
                        filter: [
                          "brightness(1)",
                          "brightness(1.25)",
                          "brightness(1)",
                        ],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      AI
                    </motion.span>{" "}
                    <span>Systems</span>
                  </>
                ) : (
                  line
                )}
              </motion.div>
            ))}
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            {siteConfig.role} specializing in
          </motion.p>

          <motion.ul variants={item} className="mt-4 flex flex-wrap gap-2">
            {SPECIALTIES.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-sm text-foreground/80"
              >
                {s}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link href="#projects">
                View projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer">
                <FileDown className="h-4 w-4" />
                Download resume
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-[18px] w-[18px]" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-[18px] w-[18px]" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="relative flex h-[420px] items-center justify-center lg:justify-end"
        >
          {/* Orange glow */}
          <div className="absolute top-8 right-24 h-64 w-64 rounded-full bg-signal/10 blur-3xl" />

          {/* Avatar */}
          <motion.div
            className="absolute right-20 -top-20 z-20 hidden lg:block"
            whileHover={{
              scale: 1.05,
              rotate: 2,
            }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/avatar.png"
              alt="Jayant Kumar"
              width={260}
              height={260}
              priority
              className="drop-shadow-[0_25px_50px_rgba(251,146,60,0.25)]"
            />
          </motion.div>

          {/* AI Widget */}
          <div className="absolute right-0 bottom-0">
            <InferenceTicker />
          </div>
        </motion.div>
        </motion.div>   

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground md:flex"
      >
        <span className="font-mono text-[11px] tracking-wide">SCROLL</span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </motion.div>
    </section>
  );
}
