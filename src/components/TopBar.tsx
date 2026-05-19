import { Plus } from "lucide-react"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem } from "./shadcn/breadcrumb"
import { Button } from "./shadcn/button"
import { SidebarTrigger } from "./shadcn/sidebar"

export const TopBar: React.FC = () => {
  return (
    <nav className="sticky top-0 flex flex-row justify-between items-center gap-2 w-full h-12 border-b px-2 pr-4 bg-background z-50">
      {/* Left Side */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="font-medium text-slate-700">
              <Button variant="link" className="px-0 cursor-pointer">Library</Button>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <Button>
          <Plus size={24} />
          <span className="hidden sm:inline">
            New Volume
          </span>
        </Button>
      </div>
    </nav>
  )
}