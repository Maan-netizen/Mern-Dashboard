import { useEffect } from "react";
import { useLocation } from "wouter";
import {
  useGetCurrentUser,
  useGetDashboardStats,
  useGetRecentActivity,
  getGetCurrentUserQueryKey,
  getGetDashboardStatsQueryKey,
  getGetRecentActivityQueryKey,
} from "@workspace/api-client-react";
import { format } from "date-fns";
import {
  Users,
  Activity,
  UserPlus,
  Clock,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  StickyNote,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (!token) setLocation("/login");
  }, [token, setLocation]);

  if (!token) return null;

  const { data: user, isLoading: isLoadingUser, error: userError } = useGetCurrentUser({
    query: { enabled: !!token, queryKey: getGetCurrentUserQueryKey(), retry: false },
  });

  const { data: stats, isLoading: isLoadingStats } = useGetDashboardStats({
    query: { enabled: !!token, queryKey: getGetDashboardStatsQueryKey() },
  });

  const { data: activity, isLoading: isLoadingActivity } = useGetRecentActivity({
    query: { enabled: !!token, queryKey: getGetRecentActivityQueryKey() },
  });

  useEffect(() => {
    if (userError) {
      localStorage.removeItem("auth_token");
      setLocation("/login");
      toast.error("Session expired", { description: "Please sign in again." });
    }
  }, [userError, setLocation]);

  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "login": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "register": return <UserPlus className="h-4 w-4 text-primary" />;
      case "note": return <StickyNote className="h-4 w-4 text-amber-500" />;
      case "profile": return <Settings className="h-4 w-4 text-blue-500" />;
      case "security": return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default: return <RefreshCcw className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground" data-testid="text-greeting">
          {isLoadingUser ? <Skeleton className="h-9 w-48" /> : `Welcome back, ${user?.name.split(" ")[0]}`}
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
            {isLoadingStats ? <Skeleton className="h-8 w-16" /> : (
              <div className="text-2xl font-bold" data-testid="stat-total-users">
                {stats?.totalUsers.toLocaleString() ?? 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? <Skeleton className="h-8 w-16" /> : (
              <div className="text-2xl font-bold text-primary" data-testid="stat-active-today">
                {stats?.activeToday.toLocaleString() ?? 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New This Week</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? <Skeleton className="h-8 w-16" /> : (
              <div className="text-2xl font-bold" data-testid="stat-new-weekly">
                +{stats?.newThisWeek.toLocaleString() ?? 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Account Age</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? <Skeleton className="h-8 w-16" /> : (
              <div className="text-2xl font-bold" data-testid="stat-account-age">
                {stats?.accountAgeDays ?? 0}{" "}
                <span className="text-sm font-normal text-muted-foreground">days</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Activity + Quick Actions */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions performed on your account.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {isLoadingActivity ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
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
                      <p className="text-sm font-medium leading-none">{item.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(item.timestamp), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                <Activity className="h-8 w-8 mb-2 opacity-50" />
                <p>No recent activity yet.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump to a section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setLocation("/notes")}
            >
              <StickyNote className="h-4 w-4 mr-2 text-amber-500" />
              My Notes
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setLocation("/settings")}
            >
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              Edit Profile
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setLocation("/settings")}
            >
              <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
              Security Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
