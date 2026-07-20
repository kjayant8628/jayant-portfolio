import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-sm text-foreground">
            <span className="text-signal">$</span> {siteConfig.name}
          </span>
          <p className="text-xs text-muted-foreground">
            {siteConfig.role} — {siteConfig.location}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <FooterLink href={`mailto:${siteConfig.email}`} label="Email">
            <Mail className="h-4 w-4" />
          </FooterLink>
          <FooterLink href={siteConfig.githubUrl} label="GitHub">
            <Github className="h-4 w-4" />
          </FooterLink>
          <FooterLink href={siteConfig.linkedinUrl} label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </FooterLink>
        </div>

        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} · built with Next.js
        </p>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
    >
      {children}
    </Link>
  );
}
