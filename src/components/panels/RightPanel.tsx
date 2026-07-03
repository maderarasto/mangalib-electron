import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../shadcn/sheet";
import { useVolumeQuery } from "@/hooks/query/useVolumeQuery";
import { VolumeCard } from "../VolumeCard";
import { VolumeCover } from "../VolumeCover";
import { VolumePreview } from "../VolumePreview";
import { VolumePreviewSkeleton } from "../VolumePreviewSkeleton";
import { ConfirmDialog, ConfirmDialogActions } from "../ui/ConfirmDialog";
import { useDeleteVolume } from "@/hooks/mutation/useDeleteVolume";
import { toast } from "sonner";
import { CircleCheck, XIcon } from "lucide-react";
import { VolumeHeader } from "../VolumeHeader";

type RightPanelProps = {
  onClose?: () => void;
};

export interface RightPanelActions {
  openWith: (volumeId: string) => void;
  close: () => void;
}

export const RightPanel = React.forwardRef<RightPanelActions, RightPanelProps>(({
  onClose,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [volumeId, setVolumeId] = useState<string | null>(null);

  const confirmDialogRef = useRef<ConfirmDialogActions>(null);
  const volumeToBeDeleted = useRef('');

  const {
    data: volume,
    isFetching,
  } = useVolumeQuery({
    id: volumeId ?? undefined,
    enabled: isOpen && !!volumeId,
  });

  const deleteVolume = useDeleteVolume();

  useImperativeHandle(ref, () => ({
    openWith: (volumeId: string) => {
      setVolumeId(volumeId);
      setIsOpen(true);
    },

    close: () => {
      setVolumeId(null);
      setIsOpen(false);
      onClose?.();
    }
  }));

  const deleteItem = (itemId: string) => {
    volumeToBeDeleted.current = itemId;
    confirmDialogRef.current?.open();
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      setVolumeId(null);
      onClose?.();  
    };
  };
  
  const handleConfirm = async () => {
    try {
      const response = await deleteVolume.mutateAsync({ id: volumeToBeDeleted.current });
      
      toast.success(response.message, {
        duration: 10000,
        closeButton: true,
        icon: <CircleCheck className="size-4 text-green-500" />
      });
      
      setVolumeId(null);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      volumeToBeDeleted.current = '';
    }
  }

  const handleCancel = () => {
    volumeToBeDeleted.current = '';
  }

  return (
    <div className="right-panel">
      <Sheet onOpenChange={handleOpenChange} open={isOpen}>
        <SheetContent className="p-0 border-0 outline-none select-none" showCloseButton={false} autoFocus={false}>
          <VolumeHeader isLoading={isFetching} volume={volume} />
          <VolumePreview
            isLoading={isFetching}
            onDelete={() => deleteItem(volume?.id ?? '')}
            volume={volume}
          />
        </SheetContent>
      </Sheet>
      <ConfirmDialog
        ref={confirmDialogRef}
        closeAfterConfirm={false}
        loading={deleteVolume.isPending}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  )
});