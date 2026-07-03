import { Edit2Icon } from "lucide-react";
import { Card, CardContent } from "./shadcn/card";
import { Input } from "./shadcn/input";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./shadcn/spinner";

type VolumeDetailCardProps = {
  label: string;
  value: string;
  editable?: boolean;
  isLoading?: boolean;
  onChange?: (value: string) => void;
};

export const VolumeDetailCard: React.FC<VolumeDetailCardProps> = ({
  isLoading,
  label,
  value: initialValue,
  editable = false,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const resolveRightSide = () => {
    if (!editable) return null;

    if (isLoading) {
      return <Spinner className="size-5" />;
    }

    return (
      <Edit2Icon 
        className="size-4 stroke-slate-700 cursor-pointer hover:stroke-black" 
        onClick={handleEditClick}
      />
    );
  }

  const handleBlur = () => {
    setEditing(false);
    onChange?.(value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  const handleEditClick = () => {
    setEditing(true);
    inputRef.current?.focus();
  }

  return (
    <Card className="w-full rounded-sm">
      <CardContent className="flex flex-col gap-2 p-4 bg-slate-200">
        <div className="flex justify-between items-center gap-4">
          <Input 
              ref={inputRef}
              className={cn('px-0 py-0 font-bold md:text-xl shadow-none', {
                'pointer-events-none': !editing,
              })} 
              onBlur={handleBlur}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              value={value}
              readOnly={!editing}
            />
          {resolveRightSide()}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-700">{label}</span>
        </div>
      </CardContent>
    </Card>
  )
}