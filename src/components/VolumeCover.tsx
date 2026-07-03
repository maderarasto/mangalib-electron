import { Volume } from "@/api/types";
import { cn } from "@/lib/utils";

type VolumeCoverProps = {
  volume?: Volume
  cardClassName?: string;
  size?: 'small' | 'medium' | 'large';
  src?: string
}

export const VolumeCover: React.FC<VolumeCoverProps> = ({ 
  cardClassName,
  size = 'medium',
  src,
  volume
}) => {
  const resolvedCardClassName = (() => cn({
    'w-28 h-40': size === 'small',
    'w-40 h-56': size === 'medium',
    'w-64 h-96': size === 'large',
  }, cardClassName))();

  if (src) {
    return (
      <img 
        className={resolvedCardClassName} 
        src={src}
      />
    )
  }

  return (
    <div className={cn(`volume-card select-none`, resolvedCardClassName)}>
      <span className={cn('volume-card-title', {
        'text-sm': size === 'small',
        'text-lg': size === 'large'
      })}>
        {volume?.title}
      </span>
    </div>
  );
}