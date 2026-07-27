"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion, useReducedMotion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-signal text-signal-foreground hover:bg-signal/90",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:bg-surface-hover hover:border-muted-foreground/40",
        ghost: "bg-transparent text-foreground hover:bg-surface-hover",
        link: "bg-transparent text-foreground underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-12 px-7 text-[15px]",
        icon: "h-10 w-10 shrink-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const shouldReduceMotion = useReducedMotion();
    const resolvedVariant = variant ?? "default";
    const isDisabled = props.disabled || props["aria-disabled"] === true || props["aria-disabled"] === "true";
    const isPrimaryMotionEnabled = resolvedVariant === "default" && !isDisabled;
    const content = <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;

    if (!isPrimaryMotionEnabled || shouldReduceMotion) {
      return content;
    }

    return (
      <motion.span
        className="inline-flex"
        initial={false}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ y: -1, scale: 0.985 }}
        transition={{ type: "spring", stiffness: 380, damping: 24, mass: 0.75 }}
      >
        {content}
      </motion.span>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
