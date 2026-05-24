import React, { useEffect } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarSeparator, useSidebar } from "./shadcn/sidebar";
import logo from '@/assets/logo.png';
import { Plus, Search } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./shadcn/input-group";
import { PopoverCollectionForm } from "./PopoverCollectionForm";
import { useCollectionsQuery } from "@/hooks/query/useCollections";
import { useCollectionsStore } from "@/store/useCollections";
import { CollectionMenuItem } from "./CollectionMenuItem";

export const LeftPanel: React.FC = () => {
  const collections = useCollectionsStore((state) => state.collections);
  const activeCollectionId = useCollectionsStore((state) => state.activeCollectionId);
  const setCollections = useCollectionsStore((state) => state.setCollections);
  const setActiveCollectionId = useCollectionsStore((state) => state.setActiveCollectionId);

  const {open: isOpen} = useSidebar();
  const {data} = useCollectionsQuery();

  useEffect(() => {
    setCollections(data?.collections || []);
  }, [data, setCollections]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center">
        <img src={logo} alt="logo" width={32} height={32} />
        {isOpen && (
          <h1 className="font-bold text-xl text-slate-700 dark:text-white">Manga Library</h1>
        )}
      </SidebarHeader>
      <SidebarContent className="h-full min-h-0 overflow-hidden">
        {isOpen && (
          <SidebarGroup>
            <SidebarGroupContent>
              <InputGroup>
                  <InputGroupInput placeholder="Search in collections..." />
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                </InputGroup>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        <SidebarGroup className="flex min-h-0 flex-1 flex-col">
          <SidebarGroupLabel className="uppercase">
            Your collections
          </SidebarGroupLabel>
          <SidebarMenu className="mb-2 shrink-0">
            <PopoverCollectionForm
              trigger={(
                <SidebarMenuButton className="flex flex-1 flex-row gap-3 cursor-pointer">
                  <div className="flex flex-1 items-center gap-3 text-gray-500">
                    <Plus size={20} />
                    <span>New Collection</span>
                  </div>
                </SidebarMenuButton>
              )}
            />
          </SidebarMenu>
          <div className="flex-1 min-h-0 pr-2 overflow-y-auto slim-scrollbar">
            <SidebarMenu>
              {collections.map((collection) => (
                <CollectionMenuItem
                  key={collection.id}
                  collection={collection}
                  isActive={collection.id === activeCollectionId}
                  onClick={() => setActiveCollectionId(collection.id)}
                />
              ))}
            </SidebarMenu>
          </div>
        </SidebarGroup>
        <SidebarSeparator />
        {isOpen && (
          <SidebarGroup className="shrink-0 basis-1/3">
            <SidebarGroupLabel className="uppercase">
              Shopping List
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex justify-center items-center py-2">
                <span className="text-xs text-gray-500">No added items yet.</span>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}