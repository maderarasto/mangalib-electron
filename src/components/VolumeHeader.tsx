import React from "react"
import { SheetHeader, SheetTitle } from "./shadcn/sheet"
import { XIcon } from "lucide-react"
import { VolumeCover } from "./VolumeCover"
import { Volume } from "@/api/types"
import { VolumeHeaderSkeleton } from "./VolumeHeaderSkeleton"
import { VolumeHeaderBackground } from "./VolumeHeaderBackground"

type VolumeHeaderProps = {
  isLoading?: boolean;
  volume?: Volume
}

export const VolumeHeader: React.FC<VolumeHeaderProps> = ({
  isLoading,
  volume
}) => {
  return (
    <SheetHeader className="relative flex gap-8 p-4 space-y-0">
      <VolumeHeaderBackground />
      <div className="flex justify-between items-center w-full">
        <SheetTitle className="leading-none">Volume Details</SheetTitle>
        <XIcon className="size-5 cursor-pointer hover:stroke-black" />
      </div>
      <div className="">
        {isLoading ? (
          <VolumeHeaderSkeleton />
        ) : (
          <div className="flex gap-4">
            <VolumeCover volume={volume} size="small" cardClassName="border border-slate-300 shadow" />
            <div className="flex flex-col justify-end">
              {volume && (
                <>
                  <p className="font-semibold uppercase">{volume.collection.name}</p>
                  <p className="font-bold text-xl leading-none">{volume.title}</p>
                  <p className="text-gray-700">Fujimoto</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </SheetHeader>
  )
}