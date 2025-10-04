import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { Input } from "@/components/ui/input";
import { Search, Bell, CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 h-16 w-full border-b bg-card md:px-6 px-3 flex items-center justify-between z-50">
            <div className="flex items-center gap-4 w-[50%]">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                <img src="./ForWhite.svg" alt="ENGENX" className="w-32 h-5 object-cover md:hidden" />
              <div className="relative lg:w-96 md:w-64 sm:w-72 w-32">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 bg-muted/50 border-0 focus-visible:bg-background"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4 w-[50%] justify-end">
              <Button variant="ghost" size="icon" className="relative bg-gray-100">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-dashboard-red rounded-full text-xs flex items-center justify-center text-white">
                  2
                </div>
              </Button>
              
              <div className="flex items-center md:gap-3 gap-[0.2rem]">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">Vivek Pradhan</p>
                  <p className="text-xs text-muted-foreground">2019 Tata Safari</p>
                </div>
                <CircleUserRound className="w-8 h-8 text-white bg-gradient-primary rounded-full" />
                {/* <div className="w-8 h-8 bg-gradient-primary rounded-full"></div> */}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}