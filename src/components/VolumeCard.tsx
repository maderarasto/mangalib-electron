import { Volume } from "@/api/types";
import { VolumeCover } from "./VolumeCover";
import { Badge } from "./shadcn/badge";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type VolumeCardProps = {
  volume: Volume;
  active?: boolean;
  onClick?: () => void;
  selected?: boolean;
  size?: 'medium' | 'large';
  pointerEvents?: boolean;
};

export const VolumeCard: React.FC<VolumeCardProps> = ({ 
  active,
  volume,
  onClick,
  selected,
  size = 'medium',
  pointerEvents = true,
}) => {
  

  return (
    <div className={cn('volume-card-wrapper', !pointerEvents && 'pointer-events-none')} onClick={onClick}>
      <VolumeCover 
        className={cn(
          active ? 'ring-2 ring-emerald-500 dark:ring-emerald-700' : '',
          selected ? 'ring-2 ring-slate-600 dark:ring-white' : ''
        )}
        title={volume.title} 
        size={size}
      />
      <Badge 
        className="absolute left-2 bottom-2 border border-gray-300"
        variant="secondary" 
      >
        {volume.state}
      </Badge>
      {selected && (
        <CircleCheck size={20} strokeWidth={3} className="absolute -left-2 -top-2 fill-slate-200 dark:fill-slate-600 stroke-slate-600 dark:stroke-white" />
      )}
    </div>
  )
}