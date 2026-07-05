import { useState } from "react";
import { useLocation } from "wouter";
import { useGetCurrentUser, useLogout } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  LayoutDashboard,
  StickyNote,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { getGetCurrentUserQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/notes", label: "Notes", icon: StickyNote },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useGetCurrentUser({
    query: { retry: false, queryKey: getGetCurrentUserQueryKey() },
  });

  const logoutMutation = useLogout({
    mutation: {
      onSuccess: () => {
        localStorage.removeItem("auth_token");
        queryClient.clear();
        toast.success("Signed out successfully");
        setLocation("/login");
      },
      onError: () => {
        localStorage.removeItem("auth_token");
        queryClient.clear();
        setLocation("/login");
      },
    },
  });

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center gap-2 px-4 py-5 border-b">
        <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
        <span className="font-bold text-foreground text-lg">Command Center</span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <button
            key={href}
            onClick={() => { setLocation(href); setMobileOpen(false); }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              location === href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      {/* User + logout */}
      <div className="px-3 py-4 border-t space-y-2">
        <div className="px-3 py-2">
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <>
              <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-muted/20">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r bg-background">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-60 bg-background border-r flex flex-col transition-transform duration-200 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 h-14 border-b bg-background shrink-0">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">Command Center</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
