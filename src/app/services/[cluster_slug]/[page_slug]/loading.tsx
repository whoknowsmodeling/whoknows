import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Skeleton className="h-4 w-32 mb-12 bg-neutral-800" />
        <div className="space-y-4 mb-16">
          <Skeleton className="h-6 w-48 bg-neutral-800" />
          <Skeleton className="h-12 lg:h-20 w-full bg-neutral-800" />
          <Skeleton className="h-6 w-3/4 bg-neutral-800" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-6 w-full bg-neutral-800" />
          <Skeleton className="h-6 w-full bg-neutral-800" />
          <Skeleton className="h-6 w-5/6 bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}
