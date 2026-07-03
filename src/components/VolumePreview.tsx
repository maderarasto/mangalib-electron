import { Volume, VolumeState } from "@/api/types";
import { SheetFooter } from "./shadcn/sheet";
import { Button } from "./shadcn/button";
import { Edit2Icon, EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import dayjs from 'dayjs';
import { SimpleTooltip } from "./ui/SimpleTooltip";
import { useUpdateVolumeMutation } from "@/hooks/mutation/useUpdateVolume";
import { VolumePreviewSkeleton } from "./VolumePreviewSkeleton";
import { Badge } from "./shadcn/badge";
import { VolumeDetailCard } from "./VolumeDetailCard";
import { VolumeStateDropdown } from "./VolumeStateDropdown";
import { toast } from "sonner";
import { useState } from "react";

type VolumePreviewProps = {
  isLoading?: boolean;
  onDelete?: () => void;
  volume?: Volume;
}

type UpdatedProperty = 'state' | 'pages' | 'chapters' | null;

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

  const updateVolumeDetail = async (property: UpdatedProperty, value: string) => {
    if (!volume || volume[property as keyof Volume] === value) {
      return;
    }

    setUpdatedProperty(property);

    try {
      await updateVolume.mutateAsync({ id: volume.id, [property as keyof Volume]: value });
      toast.success(`Volume ${property} updated successfully`);
    } catch (error) {
      console.error(`Error updating volume ${property}:`, error);
      toast.error(`Failed to update volume ${property}`);
    } finally {
      setUpdatedProperty(null);
    }
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

  if (isLoading) {
    return (
      <VolumePreviewSkeleton />
    )
  }
  
  return (
    <>
      <div className="flex flex-col gap-10 px-4 py-4">
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="font-semibold uppercase">Genres</span>
            <div className="flex gap-1">
              <Badge>Action</Badge>
              <Badge>Adventure</Badge>
              <Badge>Comedy</Badge>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <span className="font-semibold uppercase">Status</span>
            <div className="flex items-center gap-2">
              <Badge>{volume?.state}</Badge>
              {/* <Edit2Icon 
                className="size-4 stroke-slate-700 cursor-pointer hover:stroke-black"
              /> */}
              <VolumeStateDropdown
                currentState={volume?.state as VolumeState}
                isLoading={isUpdatePending('state')}
                onSelect={handleSelectState}
              />
            </div>
          </div>

          <div className="space-y-1">
            <span className="font-semibold uppercase">Summary</span>
            <p className="text-[0.95rem] leading-snug">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem quas tenetur maiores nulla eligendi dolores obcaecati, explicabo, cumque velit consectetur cupiditate ipsa ullam dolorem dolorum! Omnis pariatur natus quam accusantium porro obcaecati exercitationem, quae voluptas unde ex ipsam tempore ab rem fuga at repellendus veritatis repudiandae sint autem dolor numquam.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <VolumeDetailCard 
            isLoading={isUpdatePending('pages')}
            label="pages" 
            value="122" 
            editable 
            onChange={(value) => updateVolumeDetail('pages', value)}
          />
          <VolumeDetailCard 
            isLoading={isUpdatePending('chapters')}
            label="chapters" 
            value="110-120" 
            editable 
            onChange={(value) => updateVolumeDetail('chapters', value)}
          />
        </div>
      </div>
      <SheetFooter>
      </SheetFooter>
    </>
  )
}