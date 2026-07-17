import { Volume, VolumeState } from "@/api/types";
import { SheetFooter } from "./shadcn/sheet";
import { Button } from "./shadcn/button";
import { Edit2Icon, ShoppingCartIcon, TrashIcon } from "lucide-react";
import dayjs from 'dayjs';
import { useUpdateVolumeMutation } from "@/hooks/mutation/useUpdateVolume";
import { VolumePreviewSkeleton } from "./VolumePreviewSkeleton";
import { Badge } from "./shadcn/badge";
import { VolumeDetailCard } from "./VolumeDetailCard";
import { VolumeStateDropdown } from "./VolumeStateDropdown";
import { toast } from "sonner";
import { useState } from "react";
import { CalendarPopover } from "./ui/CalendarPopover";

type VolumePreviewProps = {
  className?: string;
  isLoading?: boolean;
  onDelete?: () => void;
  volume?: Volume;
}

type UpdatedProperty = 'state' | 'published_at' | null;

export const VolumePreview: React.FC<VolumePreviewProps> = ({
  isLoading,
  onDelete,
  volume 
}) => {
  const [updatedProperty, setUpdatedProperty] = useState<UpdatedProperty>(null);
  const updateVolume = useUpdateVolumeMutation();
  const formattedPublishedAt = volume?.published_at 
    ? dayjs(volume.published_at).format('MMMM YYYY')
    : ''

  const isUpdatePending = (property: UpdatedProperty) => {
    return updateVolume.isPending && updatedProperty === property;
  }

  const handleSelectState = async (state: VolumeState) => {
    if (!volume || volume.state === state) {
      return;
    }

    setUpdatedProperty('state');

    try {
      await updateVolume.mutateAsync({ id: volume.id, state });
      toast.success('Volume state updated successfully');
    } catch (error) {
      console.error('Error updating volume state:', error);
      toast.error('Failed to update volume state');
    } finally {
      setUpdatedProperty(null);
    }
  }

  const handleSelectDate = async (date: Date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');

    if (!volume || volume.published_at === formattedDate) {
      return;
    }

    setUpdatedProperty('published_at');

    try {
      await updateVolume.mutateAsync({ id: volume.id, published_at: formattedDate });
      toast.success('Volume published date updated successfully');
    } catch (error) {
      console.error('Error updating volume published date:', error);
      toast.error('Failed to update volume published date');
    } finally {
      setUpdatedProperty(null);
    }
  }

  if (isLoading) {
    return (
      <VolumePreviewSkeleton />
    )
  }
  
  return (
    <>
      <div className="flex flex-1 flex-col gap-8 p-4 overflow-y-auto">
        <div className="space-y-2">
          <span className="font-semibold uppercase">Genres</span>
          <div className="flex gap-1">
            <Badge>Action</Badge>
            <Badge>Adventure</Badge>
            <Badge>Comedy</Badge>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <span className="font-semibold uppercase">Status</span>
            <div className="flex items-center justify-start gap-2">
              <Badge className="capitalize">{volume?.state}</Badge>
              <VolumeStateDropdown
                currentState={volume?.state as VolumeState}
                isLoading={isUpdatePending('state')}
                onSelect={handleSelectState}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="font-semibold uppercase">Published</span>
            <div className="flex items-center justify-start gap-2">
              <span>{formattedPublishedAt}</span>
              <CalendarPopover
                isLoading={isUpdatePending('published_at')}
                onSelectDate={handleSelectDate}
                selectedDate={volume?.published_at ? dayjs(volume.published_at).toDate() : undefined}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <span className="font-semibold uppercase">Summary</span>
          <p className="text-[0.95rem] leading-snug">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem quas tenetur maiores nulla eligendi dolores obcaecati, explicabo, cumque velit consectetur cupiditate ipsa ullam dolorem dolorum! Omnis pariatur natus quam accusantium porro obcaecati exercitationem, quae voluptas unde ex ipsam tempore ab rem fuga at repellendus veritatis repudiandae sint autem dolor numquam.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <VolumeDetailCard 
            label="pages" 
            value="122" 
          />
          <VolumeDetailCard 
            label="chapters" 
            value="110-120" 
          />
        </div>
      </div>
      <SheetFooter className="p-4">
        <div className="flex flex-col gap-2 w-full">
          <Button 
            className="w-full" 
            icon={<ShoppingCartIcon />}
          >
            Add to your shopping list
          </Button>
          <div className="flex items-center gap-2 w-full">
            <Button 
              className="w-full bg-slate-300 hover:bg-slate-200" 
              icon={<Edit2Icon />}
              variant="secondary"
            >
              Edit details
            </Button>
            <Button 
              className="w-full" 
              icon={<TrashIcon />}
              onClick={onDelete}
              variant="destructive" 
            >
              Delete
            </Button>
          </div>
        </div>
      </SheetFooter>
    </>
  )
}