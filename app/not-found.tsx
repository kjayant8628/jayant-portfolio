import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="font-mono text-sm text-signal">404</span>
      <h1 className="text-display-md font-semibold text-foreground">This page doesn&apos;t exist</h1>
      <p className="max-w-sm text-sm leading-relaxed text-muted">
        The page you&apos;re looking for was moved, renamed, or never published.
      </p>
      <Button asChild className="mt-2">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
