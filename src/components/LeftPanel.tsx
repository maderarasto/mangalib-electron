import React from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarSeparator } from "./shadcn/sidebar";
import logo from '@/assets/logo.png';
import { Plus, Search } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./shadcn/input-group";

export const LeftPanel: React.FC = () => {
  const handleAddCollection = () => {

  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center">
        <img src={logo} alt="logo" width={32} height={32} />
        <h1 className="font-bold text-xl text-slate-700 dark:text-white">Manga Library</h1>
      </SidebarHeader>
      <SidebarContent>
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
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="uppercase">
            Your collections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mb-2">
              <SidebarMenuButton className="flex flex-1 flex-row gap-3 cursor-pointer" onClick={handleAddCollection}>
                <div className="flex flex-1 items-center gap-3 text-gray-500">
                  <Plus size={20} />
                  <span>New Collection</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenu>
            <SidebarMenu>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup className="h-1/3">
          <SidebarGroupLabel className="uppercase">
            Shopping List
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex justify-center items-center py-2">
              <span className="text-xs text-gray-500">No added items yet.</span>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}