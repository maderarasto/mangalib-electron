import { SidebarProvider } from "@/components/shadcn/sidebar";
import { LeftPanel } from "@/components/LeftPanel";
import React, { useEffect } from "react";
import { TopBar } from "@/components/TopBar";
import { createCollection } from "@/api/services/collections";

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