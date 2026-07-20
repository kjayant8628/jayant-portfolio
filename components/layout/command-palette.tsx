"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  FileText,
  Github,
  Home,
  Layers,
  Linkedin,
  Mail,
  Moon,
  Newspaper,
  Sun,
  User,
  Wrench,
} from "lucide-react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/lib/config";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const go = (id: string) => {
    onOpenChange(false);
    if (window.location.pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const external = (href: string) => {
    onOpenChange(false);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-background/70 backdrop-blur-sm pt-[12vh]"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface-raised shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Command menu" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground">
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Command.Input
              autoFocus
              placeholder="Type a command or search..."
              className="h-14 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              ESC
            </kbd>
          </div>
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-muted">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigate">
              <Item icon={<Home className="h-4 w-4" />} onSelect={() => go("hero")}>
                Home
              </Item>
              <Item icon={<User className="h-4 w-4" />} onSelect={() => go("about")}>
                About (journey & GitHub in popups)
              </Item>
              <Item icon={<Layers className="h-4 w-4" />} onSelect={() => go("projects")}>
                Projects
              </Item>
              <Item icon={<Wrench className="h-4 w-4" />} onSelect={() => go("skills")}>
                Skills & experience
              </Item>
              <Item icon={<Newspaper className="h-4 w-4" />} onSelect={() => router.push("/blog")}>
                Blog
              </Item>
              <Item icon={<Mail className="h-4 w-4" />} onSelect={() => go("contact")}>
                Contact
              </Item>
            </Command.Group>

            <Command.Group heading="Actions">
              <Item icon={<FileText className="h-4 w-4" />} onSelect={() => external(siteConfig.resumeUrl)}>
                Download resume
              </Item>
              <Item icon={<Github className="h-4 w-4" />} onSelect={() => external(siteConfig.githubUrl)}>
                Open GitHub profile
              </Item>
              <Item icon={<Linkedin className="h-4 w-4" />} onSelect={() => external(siteConfig.linkedinUrl)}>
                Open LinkedIn profile
              </Item>
              <Item
                icon={resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                onSelect={() => {
                  setTheme(resolvedTheme === "dark" ? "light" : "dark");
                  onOpenChange(false);
                }}
              >
                Toggle theme
              </Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

function Item({
  children,
  icon,
  onSelect,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-surface-hover aria-selected:text-foreground"
    >
      <span className="text-muted-foreground">{icon}</span>
      {children}
    </Command.Item>
  );
}
