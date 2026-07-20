import Link from "next/link";
import { ArrowUpRight, FileDown, Github, Linkedin, Mail } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export function Contact() {
  return (
    <section id="contact" className="border-t border-border py-28">
      <div className="container">
        <div className="flex flex-col items-start gap-10 rounded-2xl border border-border bg-surface/50 p-10 md:flex-row md:items-center md:justify-between md:p-16">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Open to AI engineering roles and select consulting work"
              description="The fastest way to reach me is email — I read everything that comes in."
              className="max-w-lg"
            />
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto">
            <Button size="lg" asChild>
              <Link href={`mailto:${siteConfig.email}`}>
                <Mail className="h-4 w-4" />
                {siteConfig.email}
              </Link>
            </Button>
            <div className="flex gap-3">
              <Button size="lg" variant="outline" className="flex-1" asChild>
                <Link href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="flex-1" asChild>
                <Link href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </div>
            <Button size="lg" variant="ghost" asChild>
              <Link href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer">
                <FileDown className="h-4 w-4" />
                Download resume
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
