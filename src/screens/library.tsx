import { SidebarProvider } from "@/components/shadcn/sidebar";
import { LeftPanel } from "@/components/LeftPanel";
import React, { useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Spinner } from "@/components/shadcn/spinner";
import { useVolumesQuery } from "@/hooks/query/useVolumesQuery";
import { VolumeCard } from "@/components/VolumeCard";
import { Volume } from "@/api/types";

export const LibraryScreen: React.FC = () => {
  const [selectedVolumeIds, setSelectedVolumeIds] = useState<string[]>([]);
  const [activeVolumeId, setActiveVolumeId] = useState<string | null>(null);
  const [isControlDown, setIsControlDown] = useState<boolean>(false);

  useEffect(() => {
    const onDocumentClick = (ev: MouseEvent) => {
      const nearestVolumeWrapper = (ev.target as HTMLElement).closest('.volume-card-wrapper');

      if (nearestVolumeWrapper) {
        return;
      }

      setSelectedVolumeIds([]);
    }

    const onKeyDown = (ev: KeyboardEvent) => {
      setIsControlDown(ev.key === 'Control');
    };

    const onKeyReleased = () => {
      setIsControlDown(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyReleased);
    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyReleased);
      document.removeEventListener("click", onDocumentClick);
    }
  }, []);

  const {
    data: volumes,
    isFetching,
  } = useVolumesQuery();

  const pickVolume = (volume: Volume) => {
    if (!isControlDown) {
      setActiveVolumeId(volume.id);
      return;
    }

    setSelectedVolumeIds((prevSelectedVolumeIds) => {
      if (!prevSelectedVolumeIds.includes(volume.id)) {
        return [...prevSelectedVolumeIds, volume.id];
      } 

      return prevSelectedVolumeIds.filter((id) => id !== volume.id);
    });
  }

  return (
    <SidebarProvider>
      <LeftPanel />
      <div className="flex flex-col w-screen h-screen">
        <TopBar />
        <div className="relative w-full flex-1">
          {isFetching && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner className="size-8"  />
            </div>
          )}
          {!isFetching && (
            <div className="flex flex-wrap gap-4 p-4">
              {volumes?.volumes.map((volume) => (
                <VolumeCard 
                  key={volume.id}
                  active={activeVolumeId === volume.id}
                  onClick={() => pickVolume(volume)}
                  selected={!!selectedVolumeIds.includes(volume.id)}
                  volume={volume} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}