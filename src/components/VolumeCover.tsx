import { cn } from "@/lib/utils";

type VolumeCoverProps = {
  title: string;
  className?: string;
}

export const VolumeCover: React.FC<VolumeCoverProps> = ({ 
  title,
  className,
}) => {
  return (
    <div className={cn('volume-card', className)}>
      <span className="font-bold text-center text-slate-600 dark:text-white">
        {title}
      </span>
    </div>
  );
}