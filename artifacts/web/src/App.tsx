import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, Redirect } from 'wouter';
import { setAuthTokenGetter } from "@workspace/api-client-react";

import { Toaster } from '@/components/ui/toaster';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Dashboard from '@/pages/dashboard';

// Set up the API client auth token getter globally
setAuthTokenGetter(() => localStorage.getItem("auth_token"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/40 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4" data-testid="text-404">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Page not found</h2>
        <p className="text-muted-foreground mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a href="/dashboard" className="text-primary hover:underline font-medium" data-testid="link-home">
          Return to Dashboard
        </a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/dashboard" />} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
