import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Settings,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Poppins } from "next/font/google"

const font = Poppins({ weight: ['300', '400', '500'], subsets: ['latin'] })

const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: Users,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Tags,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="p-8 bg-[#0a1217] text-lg">
      <SidebarContent className="bg-[#0a1217]">
        <SidebarGroup>
          <div className="mb-8">
            <div className="logo">
              <Link href="/admin">
                <img
                  src="/icons/bazaar-logo.png"
                  alt="logo"
                  className="w-36"
                />
              </Link>
            </div>
          </div>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="rounded-xl">
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center gap-4 px-4 py-3 text-gray-300 font-light text-base hover:bg-[#1e2a33] transition-all duration-200 ${font.className}`}
                  >
                    <Link href={item.url}>
                      <item.icon size={22} className="text-white" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
