export function ProjectCardSkeleton() {
  return (
    <div
      aria-hidden
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
    >
      <div className="flex items-start justify-between">
        <div className="h-3 w-20 animate-pulse rounded-full bg-white/[0.06]" />
        <div className="h-4 w-4 animate-pulse rounded-full bg-white/[0.06]" />
      </div>
      <div className="mt-5 h-7 w-3/4 animate-pulse rounded-md bg-white/[0.06]" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-white/[0.04]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-white/[0.04]" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-white/[0.04]" />
      </div>
      <div className="mt-6 flex gap-1.5">
        <div className="h-6 w-16 animate-pulse rounded-full bg-white/[0.04]" />
        <div className="h-6 w-20 animate-pulse rounded-full bg-white/[0.04]" />
        <div className="h-6 w-14 animate-pulse rounded-full bg-white/[0.04]" />
      </div>
      <div className="mt-6 flex justify-between border-t border-white/[0.06] pt-4">
        <div className="h-3 w-24 animate-pulse rounded bg-white/[0.04]" />
        <div className="h-3 w-12 animate-pulse rounded bg-white/[0.04]" />
      </div>
    </div>
  );
}
