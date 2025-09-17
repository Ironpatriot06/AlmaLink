"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { signInWithGoogle, signInWithEmailPassword, supabase } from "@/lib/supabase";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setInfoMessage(null);
      setErrorMessage(null);

      // If you want users redirected to /dashboard after OAuth, pass redirectTo
      const redirectTo = `${window.location.origin}/dashboard`;
      const { data, error } = await signInWithGoogle(redirectTo);

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      // Usually Supabase will redirect the browser to Google immediately.
      // If no redirect (rare), show an informational message.
      setInfoMessage("Redirecting to Google for sign-in...");
    } catch (err: any) {
      setErrorMessage(err?.message ?? "Google sign-in failed.");
    } finally {
      // keep loading because the redirect will happen; but clear if no redirect
      // setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setInfoMessage(null);
    setErrorMessage(null);

    try {
      if (!email || !password) {
        setErrorMessage("Please provide both email and password.");
        setIsLoading(false);
        return;
      }

      const { data, error } = await signInWithEmailPassword(email, password);

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      // If session returned, redirect to dashboard
      if ((data as any)?.session) {
        router.push("/dashboard");
        return;
      }

      // If Supabase sends an email or requires action, show message
      setInfoMessage("Check your email for a sign-in link or confirmation.");
    } catch (err: any) {
      setErrorMessage(err?.message ?? "Sign-in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Send magic link (passwordless) for "Forgot password"
  const handleSendMagicLink = async () => {
    if (!email) {
      setErrorMessage("Enter your email to receive a magic link.");
      return;
    }
    setIsLoading(true);
    setInfoMessage(null);
    setErrorMessage(null);
    try {
      // signInWithOtp sends a magic link / OTP to the email
      const { data, error } = await supabase.auth.signInWithOtp({ email });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      setInfoMessage("Magic link sent — check your inbox (and spam).");
    } catch (err: any) {
      setErrorMessage(err?.message ?? "Could not send magic link.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1 pb-4">
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        {infoMessage && (
          <div className="rounded-md bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            {infoMessage}
          </div>
        )}

        {errorMessage && (
          <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" className="rounded border-border" />
              <span className="text-muted-foreground">Remember me</span>
            </label>

            <div className="flex items-center space-x-2">
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-accent hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  handleSendMagicLink();
                }}
              >
                Forgot password?
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
