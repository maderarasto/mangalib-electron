import { SidebarProvider } from "@/components/shadcn/sidebar";
import { LeftPanel } from "@/components/LeftPanel";
import React from "react";

export const LibraryScreen: React.FC = () => {
  return (
    <SidebarProvider>
      <LeftPanel />
      <div className="w-screen h-screen">
        Content
      </div>
    </SidebarProvider>
  );
}