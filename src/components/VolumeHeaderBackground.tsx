import { cn } from "@/lib/utils";

type VolumeHeaderBackgroundProps = {
  src?: string;
}

export const VolumeHeaderBackground: React.FC<VolumeHeaderBackgroundProps> = ({
  src
}) => (
  <>
    <div 
      className={cn('absolute inset-0 -z-10', !src && 'bg-slate-400')}
      style={src ? { backgroundImage: `url('${src}')`, backgroundSize: 'cover' } : undefined}
    ></div>
    <div className="absolute inset-0 bg-white/70 -z-10"></div>
  </>
)