"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

const DEFAULT_EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = Omit<
  HTMLMotionProps<"div">,
  "initial" | "whileInView" | "viewport" | "transition"
> & {
  offset?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  margin?: string;
};

export function Reveal({
  children,
  offset = 14,
  duration = 0.5,
  delay = 0,
  once = true,
  margin = "-60px",
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: DEFAULT_EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate"> & {
  staggerChildren?: number;
  delayChildren?: number;
};

export function Stagger({
  children,
  staggerChildren = 0.08,
  delayChildren = 0.05,
  ...props
}: StaggerProps) {
  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren, delayChildren } } }}
      initial="hidden"
      animate="show"
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "variants"> & {
  offset?: number;
  duration?: number;
};

export function StaggerItem({
  children,
  offset = 16,
  duration = 0.6,
  ...props
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: offset },
        show: { opacity: 1, y: 0, transition: { duration, ease: DEFAULT_EASE } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
