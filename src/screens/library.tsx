import { SidebarProvider } from "@/components/shadcn/sidebar";
import { LeftPanel } from "@/components/LeftPanel";
import React from "react";
import { TopBar } from "@/components/TopBar";

export const LibraryScreen: React.FC = () => {
  return (
    <SidebarProvider>
      <LeftPanel />
      <div className="w-screen h-screen">
        <TopBar />
        Content
      </div>
    </SidebarProvider>
  );
}