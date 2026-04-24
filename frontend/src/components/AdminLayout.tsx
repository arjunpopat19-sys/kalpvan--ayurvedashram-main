import { Navigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { ExternalLink, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const { user, isAdmin } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-background">
            <div className="flex items-center">
               <SidebarTrigger className="mr-4" />
               <h1 className="font-display text-lg font-semibold text-foreground">Admin Panel</h1>
            </div>
            <Link to="/">
               <Button variant="outline" size="sm" className="rounded-full gap-2 hover:bg-primary/5 border-primary/20 text-primary">
                 <Home size={14} />
                 <span>Go to Website</span>
                 <ExternalLink size={12} />
               </Button>
            </Link>
          </header>
          <main className="flex-1 p-6 bg-secondary/20 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
