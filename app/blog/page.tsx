import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/data/content";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog",
  description: "Architecture notes, RAG and agent design write-ups, and a running learning journal.",
};

export default function BlogPage() {
  const published = blogPosts.filter((p) => p.status === "Published");
  const planned = blogPosts.filter((p) => p.status !== "Published");

  return (
    <div className="container py-32">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-wider text-signal">{"// Blog"}</span>
        <h1 className="mt-3 text-display-lg font-semibold text-foreground">
          Architecture notes & learning journal
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Long-form write-ups on the systems I build in the open — retrieval, agent orchestration,
          and the production details that don&apos;t make it into a demo.
        </p>
      </div>

      <div className="mt-16 flex flex-col divide-y divide-border border-y border-border">
        {published.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-2 py-7 transition-colors hover:bg-surface/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-2"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Badge variant="mono">{post.tag}</Badge>
                <time dateTime={post.date} className="font-mono text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <h2 className="mt-2.5 text-lg font-medium text-foreground transition-colors group-hover:text-signal">
                {post.title}
              </h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">{post.excerpt}</p>
            </div>
            <span className="shrink-0 font-mono text-xs text-muted-foreground">{post.readTime} read</span>
          </Link>
        ))}
      </div>

      {planned.length > 0 && (
        <div className="mt-14">
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Coming up</h2>
          <div className="mt-4 flex flex-col gap-3">
            {planned.map((post) => (
              <div
                key={post.slug}
                className="flex items-center justify-between gap-4 rounded-lg border border-dashed border-border p-5"
              >
                <div>
                  <span className="text-sm font-medium text-foreground/70">{post.title}</span>
                  <p className="mt-1 text-xs text-muted-foreground">{post.excerpt}</p>
                </div>
                <Badge variant="outline" className="shrink-0">
                  Planned
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
