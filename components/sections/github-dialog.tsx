"use client";

import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { GithubPanel } from "@/components/sections/github-panel";
import { siteConfig } from "@/lib/config";

export function GithubDialog({ variant = "outline" }: { variant?: "outline" | "ghost" | "default" }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size="lg">
          <Github className="h-4 w-4" />
          View live GitHub activity
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>GitHub activity</DialogTitle>
          <DialogDescription>
            Live from the GitHub API, sorted by stars —{" "}
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal hover:underline"
            >
              @{siteConfig.github}
            </a>
          </DialogDescription>
        </DialogHeader>
        <div className="p-8 pt-6">
          <GithubPanel />
        </div>
      </DialogContent>
    </Dialog>
  );
}
