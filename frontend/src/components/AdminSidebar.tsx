import { LayoutDashboard, Stethoscope, CalendarCheck, Star, Receipt, Package, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Treatments", url: "/admin/treatments", icon: Stethoscope },
  { title: "Appointments", url: "/admin/appointments", icon: CalendarCheck },
  { title: "Reviews", url: "/admin/reviews", icon: Star },
  { title: "Stock", url: "/admin/stock", icon: Package },
  { title: "Billing", url: "/admin/billing", icon: Receipt },
  { title: "Daily Log", url: "/admin/daily-log", icon: CalendarCheck },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className="p-4 flex items-center gap-3 border-b border-border">
        <div className="relative flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-white/60 dark:bg-white/20 blur-[8px] rounded-full scale-[1.5]"></div>
          <img src={logo} alt="Kalpvan" className="relative z-10 h-7 w-7 object-contain drop-shadow-[0_1px_8px_rgba(255,255,255,0.6)]" />
        </div>
        {!collapsed && (
          <div>
            <span className="font-display text-sm font-bold text-foreground block leading-tight">Kalpvan</span>
            <span className="text-[10px] text-muted-foreground leading-tight block">Admin Panel</span>
          </div>
        )}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className="hover:bg-muted/50"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {!collapsed && "Logout"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
