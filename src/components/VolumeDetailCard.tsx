import { Card, CardContent } from "./shadcn/card";

type VolumeDetailCardProps = {
  label: string;
  value: string;
};

export const VolumeDetailCard: React.FC<VolumeDetailCardProps> = ({
  label,
  value,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col p-4 rounded-sm bg-slate-300">
        <div className="flex justify-between items-center gap-4">
          <span className="font-bold text-xl">
            {value}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-700">{label}</span>
        </div>
      </CardContent>
    </Card>
  )
}