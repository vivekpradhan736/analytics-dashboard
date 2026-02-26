import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Wrench, 
  IndianRupee, 
  BarChart3,
  Settings,
  Car,
  Calendar,
  Truck,
  Shield,
  Building2,
  Battery,
  Box
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Health Analysis", url: "/health", icon: AlertTriangle },
  { title: "Maintenance", url: "/maintenance", icon: Wrench },
  { title: "Service Bookings", url: "/service-bookings", icon: Calendar },
  { title: "Resale Value", url: "/resale", icon: IndianRupee },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const b2bItems = [
  { title: "Digital Twin", url: "/digital-twin", icon: Box },
  // { title: "Fleet & Logistics", url: "/fleet-logistics", icon: Truck },
  { title: "Insurance", url: "/insurance", icon: Shield },
  { title: "OEM & Dealerships", url: "/oem-dealerships", icon: Building2 },
  { title: "EV Fleets", url: "/ev-fleets", icon: Battery },
];

const otherItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-white">
        {/* Brand Header */}
        <div className="p-4 border-b">
          <div className={`flex items-center gap-3  ${collapsed && "w-8 h-8"} `}>
            {/* <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div> */}
            {!collapsed && (
              <div className="py-1.5">
                <img src="./ForWhite.svg" alt="ENGENX" className="w-32 h-5 object-cover" />
                {/* <p className="text-xs text-muted-foreground">Analytics Dashboard</p> */}
              </div>
            )}
            {collapsed && (
              <div className="">
                <img src="./favicon.png" alt="ENGENX" className="pr-2 object-cover " />
              </div>
            )}
          </div>
        </div>

        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>MAIN MENU</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="">
                    <NavLink to={item.url} end className={`getNavCls ${currentPath === item.url ? "bg-[#fbefef]" : ""}`}>
                      <item.icon className={`w-5 h-5 ${currentPath === item.url ? "text-[#d36262]" : "text-gray-500"}`} />
                      {!collapsed && <span className={`text-sm ${currentPath === item.url ? "text-[#d36262]" : "text-gray-500"}`}>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* B2B Features */}
        <SidebarGroup>
          {/* <SidebarGroupLabel>B2B SOLUTIONS</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {b2bItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={`getNavCls ${currentPath === item.url ? "bg-[#fbefef]" : ""}`}>
                      <item.icon className={`w-5 h-5 ${currentPath === item.url ? "text-[#d36262]" : "text-gray-500"}`} />
                      {!collapsed && <span className={`text-sm ${currentPath === item.url ? "text-[#d36262]" : "text-gray-500"}`}>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Others Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>OTHERS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={`getNavCls ${currentPath === item.url ? "bg-[#fbefef]" : ""}`}>
                      <item.icon className={`w-5 h-5 ${currentPath === item.url ? "text-[#d36262]" : "text-gray-500"}`} />
                      {!collapsed && <span className={`text-sm ${currentPath === item.url ? "text-[#d36262]" : "text-gray-500"}`}>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}