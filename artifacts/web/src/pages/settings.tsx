import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetCurrentUser,
  useUpdateProfile,
  useChangePassword,
  getGetCurrentUserQueryKey,
} from "@workspace/api-client-react";
import { toast } from "sonner";
import { User, Lock, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function Settings() {
  const queryClient = useQueryClient();
  const userQueryKey = getGetCurrentUserQueryKey();

  const { data: user, isLoading } = useGetCurrentUser({
    query: { queryKey: userQueryKey, retry: false },
  });

  const [profileSaved, setProfileSaved] = useState(false);

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    values: { name: user?.name ?? "" },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const updateProfileMutation = useUpdateProfile({
    mutation: {
      onSuccess: (updated) => {
        queryClient.invalidateQueries({ queryKey: userQueryKey });
        profileForm.reset({ name: updated.name });
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 2000);
        toast.success("Profile updated");
      },
      onError: (err: unknown) => {
        const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
        toast.error(msg ?? "Failed to update profile");
      },
    },
  });

  const changePasswordMutation = useChangePassword({
    mutation: {
      onSuccess: () => {
        passwordForm.reset();
        toast.success("Password changed successfully");
      },
      onError: (err: unknown) => {
        const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
        toast.error(msg ?? "Failed to change password");
      },
    },
  });

  const onProfileSubmit = (data: ProfileForm) => {
    updateProfileMutation.mutate({ data });
  };

  const onPasswordSubmit = (data: PasswordForm) => {
    changePasswordMutation.mutate({
      data: { currentPassword: data.currentPassword, newPassword: data.newPassword },
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and security preferences.</p>
      </div>

      {/* Profile card */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Profile</CardTitle>
          </div>
          <CardDescription>Update your display name.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  {...profileForm.register("name")}
                  placeholder="Your name"
                />
                {profileForm.formState.errors.name && (
                  <p className="text-sm text-destructive">{profileForm.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email ?? ""} disabled className="bg-muted/50" />
                <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={updateProfileMutation.isPending || !profileForm.formState.isDirty}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {profileSaved ? "Saved!" : updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
                {profileForm.formState.isDirty && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => profileForm.reset()}
                  >
                    Discard
                  </Button>
                )}
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Password card */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle>Change Password</CardTitle>
          </div>
          <CardDescription>Choose a strong password you don't use elsewhere.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                autoComplete="current-password"
                {...passwordForm.register("currentPassword")}
              />
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-sm text-destructive">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                {...passwordForm.register("newPassword")}
              />
              {passwordForm.formState.errors.newPassword && (
                <p className="text-sm text-destructive">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                {...passwordForm.register("confirmPassword")}
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={changePasswordMutation.isPending}
              className="mt-2"
            >
              <Lock className="h-4 w-4 mr-2" />
              {changePasswordMutation.isPending ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
