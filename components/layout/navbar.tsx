"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CommandPalette } from "@/components/layout/command-palette";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [paletteOpen, setPaletteOpen] = React.useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="glass border-b border-border">
          <nav className="container flex h-16 items-center justify-between">
            <Link
              href="/"
              className="font-mono text-sm font-medium tracking-tight text-foreground"
            >
              <span className="text-signal">$</span> jayant.dev
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    href={isHome ? `#${link.id}` : `/#${link.id}`}
                    className={cn(
                      "relative rounded-md px-3.5 py-2 text-sm text-muted transition-colors hover:text-foreground",
                      isHome && active === link.id && "text-foreground"
                    )}
                  >
                    {link.label}
                    {isHome && active === link.id && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-px h-px bg-signal"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className={cn(
                    "rounded-md px-3.5 py-2 text-sm text-muted transition-colors hover:text-foreground",
                    pathname === "/blog" && "text-foreground"
                  )}
                >
                  Blog
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPaletteOpen(true)}
                className="hidden items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-muted-foreground/40 hover:text-foreground sm:flex"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Search</span>
                <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </button>
              <button
                onClick={() => setPaletteOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground sm:hidden"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" />
              </button>
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground md:hidden"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </button>
            </div>
          </nav>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="glass border-b border-border md:hidden overflow-hidden"
            >
              <ul className="container flex flex-col py-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={isHome ? `#${link.id}` : `/#${link.id}`}
                      onClick={() => setMobileOpen(false)}
                      className="block px-2 py-3 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/blog"
                    onClick={() => setMobileOpen(false)}
                    className="block px-2 py-3 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
