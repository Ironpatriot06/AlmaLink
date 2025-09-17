"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SignupForm } from "@/components/auth/signup-form";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  // While checking auth, avoid flicker (optional skeleton/loader)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  // If already logged in, the useEffect will redirect — don’t render form
  if (user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="font-heading font-bold text-3xl mb-2">Join AlmaLink</h1>
            <p className="text-muted-foreground">
              Create your account and start connecting with your alumni network
            </p>
          </div>
          <SignupForm />
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-accent hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
