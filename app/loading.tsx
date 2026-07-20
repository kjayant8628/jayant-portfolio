export default function Loading() {
  return (
    <div className="flex min-h-[100svh] items-center justify-center">
      <div className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
        <span className="h-2 w-2 animate-pulse rounded-full bg-signal" />
        loading…
      </div>
    </div>
  );
}
