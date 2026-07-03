import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./shadcn/dropdown-menu";
import { Edit2Icon } from "lucide-react";
import { VolumeState } from "@/api/types";
import { Spinner } from "./shadcn/spinner";

type VolumeStateDropdownProps = {
  currentState: VolumeState;
  isLoading?: boolean;
  onSelect?: (state: VolumeState) => void;
}

export const VolumeStateDropdown: React.FC<VolumeStateDropdownProps> = ({
  currentState,
  isLoading,
  onSelect
}) => {
  const states = Object.values(VolumeState);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {isLoading ? (
          <Spinner />
        ) : (
          <Edit2Icon size={16} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {states.map((state) => (
          <DropdownMenuItem 
            key={state}
            disabled={state === currentState}
            className="cursor-pointer hover:bg-neutral-200"
            onClick={() => onSelect?.(state)}
          >
            {state}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}