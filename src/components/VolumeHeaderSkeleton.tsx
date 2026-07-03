import { Skeleton } from "./shadcn/skeleton";

export const VolumeHeaderSkeleton: React.FC = () => (
  <div className="flex gap-4">
    <Skeleton className="w-28 h-40"></Skeleton>
    <div className="flex flex-col justify-end gap-2">
      <Skeleton className="w-[150px] h-4" />
      <Skeleton className="w-[180px] h-6" />
      <Skeleton className="w-[120px] h-4" />
    </div>
  </div>
)