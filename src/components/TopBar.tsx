import { Plus } from "lucide-react"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "./shadcn/breadcrumb"
import { Button } from "./shadcn/button"
import { SidebarTrigger } from "./shadcn/sidebar"
import { UserButton } from "./UserButton"
import { useCollectionsStore } from "@/store/useCollections"

export const TopBar: React.FC = () => {
  const activeCollection = useCollectionsStore((state) => state.activeCollection);
  const setActiveCollectionId = useCollectionsStore((state) => state.setActiveCollectionId);

  const changeCollection = (collectionId: string|null) => {
    setActiveCollectionId(collectionId);
  }

  return (
    <nav className="sticky top-0 flex flex-row justify-between items-center gap-2 w-full h-12 border-b px-2 pr-4 bg-background z-50">
      {/* Left Side */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="font-medium text-slate-700" onClick={() => changeCollection(null)}>
              <Button variant="link" className="px-0 cursor-pointer">Library</Button>
            </BreadcrumbItem>
            {!!activeCollection && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="font-medium text-slate-700" onClick={() => changeCollection(activeCollection.id)}>
                  <Button variant="link" className="px-0 cursor-pointer">
                    {activeCollection.name}
                  </Button>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {!!activeCollection && (
          <Button variant="default" size="sm" className="gap-2">
            <Plus size={16} />
            New Volume
          </Button>
        )}
        <UserButton />
      </div>
    </nav>
  )
}