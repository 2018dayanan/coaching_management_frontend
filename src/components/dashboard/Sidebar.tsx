import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  Video,
  Settings,
  Shield,
  UserCircle,
} from "lucide-react";

import { NavLink, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard, accent: "blue" },
  { title: "Student Management", url: "/admin/users", icon: Users, accent: "indigo" },
  { title: "Teacher Management", url: "/admin/teachers", icon: Users, accent: "indigo" },
  { title: "Batch Management", url: "/admin/batches", icon: BookOpen, accent: "emerald" },
  { title: "Class Management", url: "/admin/classes", icon: Video, accent: "blue" },
  { title: "Security", url: "/admin/security", icon: Shield, accent: "indigo" },
  { title: "Settings", url: "/admin/settings", icon: Settings, accent: "blue" },
  { title: "Admin Profile", url: "/admin/profile", icon: UserCircle, accent: "indigo" },
];

export default function AppSidebar() {
  const { pathname } = useLocation();
  const { open, isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "border-r border-sidebar-border bg-card transition-all sidebar duration-300",
        open || isMobile ? "w-64" : "w-16"
      )}
    >
      {/* HEADER */}
      <SidebarHeader className="flex items-center gap-2 border-b border-sidebar-border pl-3 py-4">
        <div className="flex items-center gap-3 py-0.5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-black text-xl tracking-tighter">E</span>
          </div>

          {(open || isMobile) && (
            <div className="flex flex-col">
              <h1 className="text-md font-bold text-foreground leading-tight">
                Education <span className="text-primary">Admin</span>
              </h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-60">
                Management Portal
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="flex-1 px-3 mt-4 overflow-y-auto custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {menuItems.map((item) => {
                const isActive =
                  item.url === "/admin"
                    ? pathname === item.url
                    : pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold group relative overflow-hidden",
                          isActive
                            ? "bg-secondary text-white shadow-md shadow-secondary/20"
                            : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                        )}
                      >
                        {/* Active Indicator Line */}
                        {isActive && (
                          <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-white rounded-full" />
                        )}

                        <item.icon className={cn(
                          "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                          isActive ? "text-white" : cn(
                            item.accent === "blue" && "text-blue-500",
                            item.accent === "indigo" && "text-secondary",
                            item.accent === "emerald" && "text-emerald-500"
                          )
                        )} />

                        {(open || isMobile) && (
                          <span className="truncate tracking-tight">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
