import { Collection } from "@/api/types";
import { SidebarMenuButton } from "./shadcn/sidebar";
import { Library, SquareLibrary } from "lucide-react";
import clsx from "clsx";
import { CollectionContextMenu, CollectionContextMenuItem } from "./CollectionContextMenu";
import { PopoverCollectionForm } from "./PopoverCollectionForm";

type CollectionMenuItemProps = {
  collection: Collection;
  isActive?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
}

export const CollectionMenuItem: React.FC<CollectionMenuItemProps> = ({ 
  collection,
  isActive = false,
  onClick,
  onEdit
 }) => {
  const handleSelectedItem = (menuItem: CollectionContextMenuItem) => {
    if (menuItem === 'Edit') {
      onEdit?.();
    }
  }

  const buttonClassName = clsx(
    'flex flex-1 flex-row gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700', 
    isActive && 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700',
  );

  return (
    <CollectionContextMenu
      onSelectedItem={handleSelectedItem}
      trigger={(
        <SidebarMenuButton className={buttonClassName} onClick={onClick}>
          <div className="flex flex-1 items-center gap-3">
            <SquareLibrary size={20} />
            <span>{collection.name}</span>
          </div>
        </SidebarMenuButton>
      )}
    />
  );
}