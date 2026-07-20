"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitFork, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubRepo } from "@/types";
import { siteConfig } from "@/lib/config";
import { formatMonthYear } from "@/lib/utils";

type State = { status: "loading" } | { status: "error" } | { status: "ready"; repos: GithubRepo[] };

/** Live GitHub repo grid — rendered inside the GithubDialog popup. */
export function GithubPanel() {
  const [state, setState] = React.useState<State>({ status: "loading" });

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then((res) => res.json())
      .then((data: { repos: GithubRepo[] }) => {
        if (!cancelled) setState({ status: "ready", repos: data.repos ?? [] });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-lg border border-border bg-surface/40" />
        ))}
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="rounded-lg border border-border bg-surface/40 p-8 text-center">
        <p className="text-sm text-muted">Couldn&apos;t reach the GitHub API right now.</p>
        <Button variant="outline" className="mt-4" asChild>
          <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">
            Open GitHub profile
          </a>
        </Button>
      </div>
    );
  }

  if (state.repos.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface/40 p-8 text-center">
        <p className="text-sm text-muted">No public repositories found for this account yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {state.repos.slice(0, 6).map((repo, i) => (
        <motion.a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: (i % 4) * 0.05 }}
          className="group flex flex-col rounded-lg border border-border bg-surface/50 p-5 transition-colors hover:border-muted-foreground/30 hover:bg-surface-hover"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="truncate text-sm font-semibold text-foreground">{repo.name}</h3>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-signal" />
          </div>
          <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-muted">
            {repo.description ?? "No description provided."}
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            {repo.language && <Badge variant="mono">{repo.language}</Badge>}
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              {repo.forks_count}
            </span>
            <span className="ml-auto font-mono text-[10px]">{formatMonthYear(repo.updated_at)}</span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
