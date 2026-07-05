import { ShieldCheck } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useLogin } from "@workspace/api-client-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin({
    mutation: {
      onSuccess: (data) => {
        localStorage.setItem("auth_token", data.token);
        toast.success("Welcome back", {
          description: `Successfully signed in as ${data.user.name}`,
        });
        setLocation("/dashboard");
      },
      onError: (error) => {
        toast.error("Sign in failed", {
          description: error.message || "Please check your credentials and try again.",
        });
      },
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate({ data: values });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm mb-2" data-testid="logo-icon">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground" data-testid="text-title">
            Sign in to Command Center
          </h1>
          <p className="text-sm text-muted-foreground" data-testid="text-subtitle">
            Enter your email and password to access your dashboard.
          </p>
        </div>

        <Card className="shadow-lg border-border/50">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="name@example.com" 
                          type="email" 
                          disabled={loginMutation.isPending}
                          data-testid="input-email"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage data-testid="error-email" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password" 
                          disabled={loginMutation.isPending}
                          data-testid="input-password"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage data-testid="error-password" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loginMutation.isPending}
                  data-testid="button-submit"
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline" data-testid="link-register">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
