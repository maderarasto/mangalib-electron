import React from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./shadcn/context-menu";
import { PopoverCollectionForm } from "./PopoverCollectionForm";

export type CollectionContextMenuItem = (
  | 'Edit'
  | 'Delete'
);

type CollectionContextMenuProps = {
  trigger: React.ReactNode;
  onSelectedItem?: (menuItem: CollectionContextMenuItem) => void;
}

export const CollectionContextMenu: React.FC<CollectionContextMenuProps> = ({
  trigger,
  onSelectedItem,
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {trigger}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <PopoverCollectionForm
          trigger={(
            <ContextMenuItem 
              className="cursor-pointer"
              onClick={() => onSelectedItem?.('Edit')}
            >
              Edit
            </ContextMenuItem>  
          )}
        />
        <ContextMenuItem 
          className="text-red-500 focus:text-red-500 focus:bg-red-100 cursor-pointer"
          onClick={() => onSelectedItem?.('Delete')}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}