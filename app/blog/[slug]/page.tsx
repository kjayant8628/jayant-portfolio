import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/data/content";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return blogPosts.filter((p) => p.status === "Published").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post || post.status !== "Published") notFound();

  return (
    <article className="container max-w-2xl py-32">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All posts
      </Link>

      <div className="mt-8 flex items-center gap-3">
        <Badge variant="mono">{post.tag}</Badge>
        <time dateTime={post.date} className="font-mono text-xs text-muted-foreground">
          {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </time>
        <span className="text-muted-foreground/50">·</span>
        <span className="font-mono text-xs text-muted-foreground">{post.readTime} read</span>
      </div>

      <h1 className="mt-4 text-display-md font-semibold text-balance text-foreground">{post.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>

      <div className="mt-12 flex flex-col gap-8 border-t border-border pt-10">
        {post.content?.map((block, i) => (
          <div key={i}>
            {block.heading && (
              <h2 className="mb-3 text-lg font-semibold text-foreground">{block.heading}</h2>
            )}
            <p className="text-[15px] leading-relaxed text-muted">{block.body}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
