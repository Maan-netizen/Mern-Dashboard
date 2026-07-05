import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { 
  useGetCurrentUser, 
  useGetDashboardStats, 
  useGetRecentActivity,
  useLogout,
  getGetCurrentUserQueryKey
} from "@workspace/api-client-react";
import { format } from "date-fns";
import { 
  Users, 
  Activity, 
  UserPlus, 
  Clock, 
  LogOut, 
  ShieldCheck, 
  RefreshCcw,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("auth_token");

  // Authentication check wrapper
  useEffect(() => {
    if (!token) {
      setLocation("/login");
    }
  }, [token, setLocation]);

  if (!token) return null;

  const { data: user, isLoading: isLoadingUser, error: userError } = useGetCurrentUser({
    query: {
      enabled: !!token,
      queryKey: getGetCurrentUserQueryKey(),
      retry: false,
    }
  });

  const { data: stats, isLoading: isLoadingStats } = useGetDashboardStats({
    query: {
      enabled: !!token,
    }
  });

  const { data: activity, isLoading: isLoadingActivity } = useGetRecentActivity({
    query: {
      enabled: !!token,
    }
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
        // Even if server fails, clear local token
        localStorage.removeItem("auth_token");
        queryClient.clear();
        setLocation("/login");
      }
    }
  });

  // Handle unauthorized access smoothly
  useEffect(() => {
    if (userError) {
      localStorage.removeItem("auth_token");
      setLocation("/login");
      toast.error("Session expired", { description: "Please sign in again." });
    }
  }, [userError, setLocation]);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'login': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case 'register': return <UserPlus className="h-4 w-4 text-primary" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <RefreshCcw className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span data-testid="text-brand">Command Center</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground" data-testid="text-user-info">
            {isLoadingUser ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <>
                <span className="font-medium text-foreground">{user?.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
                  {user?.role || 'User'}
                </span>
              </>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-foreground"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground" data-testid="text-greeting">
            {isLoadingUser ? <Skeleton className="h-9 w-48" /> : `Welcome back, ${user?.name.split(' ')[0]}`}
          </h1>
          <p className="text-muted-foreground mt-1" data-testid="text-greeting-subtitle">
            Here's what's happening with your workspace today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold" data-testid="stat-total-users">{stats?.totalUsers.toLocaleString() || 0}</div>
              )}
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Today</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-primary" data-testid="stat-active-today">{stats?.activeToday.toLocaleString() || 0}</div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">New This Week</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold" data-testid="stat-new-weekly">+{stats?.newThisWeek.toLocaleString() || 0}</div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Account Age</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold" data-testid="stat-account-age">{stats?.accountAgeDays || 0} <span className="text-sm font-normal text-muted-foreground">days</span></div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Feed */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <Card className="lg:col-span-2 shadow-sm flex flex-col">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions performed across your workspace.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {isLoadingActivity ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-3 w-[100px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : activity && activity.length > 0 ? (
                <div className="space-y-6">
                  {activity.map((item) => (
                    <div key={item.id} className="flex items-start gap-4" data-testid={`activity-item-${item.id}`}>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-background shrink-0">
                        {getActivityIcon(item.type)}
                      </div>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none" data-testid={`activity-desc-${item.id}`}>
                          {item.description}
                        </p>
                        <p className="text-xs text-muted-foreground" data-testid={`activity-time-${item.id}`}>
                          {format(new Date(item.timestamp), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                  <Activity className="h-8 w-8 mb-2 opacity-50" />
                  <p>No recent activity found.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" data-testid="btn-action-reports">
                <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                View Detailed Reports
              </Button>
              <Button variant="outline" className="w-full justify-start" data-testid="btn-action-users">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start" data-testid="btn-action-settings">
                <ShieldCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                Security Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
