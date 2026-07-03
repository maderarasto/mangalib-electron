import { Skeleton } from "./shadcn/skeleton";

export const VolumePreviewSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="space-y-1">
        <Skeleton className="w-16 h-5" />
        <div className="flex gap-1">
          <Skeleton className="w-16 h-5" />
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-12 h-5" />
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Skeleton className="w-16 h-5" />
        <Skeleton className="w-20 h-5" />
      </div>

      <div className="space-y-2">
        <Skeleton className="w-16 h-5" />
        <Skeleton className="w-full h-40" />
      </div>
    </div>
  );
}