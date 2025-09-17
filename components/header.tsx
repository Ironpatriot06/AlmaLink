// src/components/Header.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

function Avatar({ name, imageUrl }: { name?: string | null; imageUrl?: string | null }) {
  // ✅ If we have a profile image (e.g., from Google), use that
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name || "User Avatar"}
        className="h-8 w-8 rounded-lg object-cover"
      />
    );
  }


  // ✅ Fallback: show initials (your earlier logic)
  const initials = (name || "A")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Header() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const getDisplayName = () => {
    if (profile?.full_name) return profile.full_name;
    const metaName = (user as any)?.user_metadata?.full_name;
    if (metaName) return metaName;
    if (user?.email) return user.email.split("@")[0];
    return "Alumni";
  };
  const displayName = getDisplayName();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
  <img
    src="/icon.png"
    alt="AlmaLink Logo"
    className="h-10 w-auto rounded" // Adjust size here (h-10 = ~40px tall)
  />
</Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/directory" className="text-muted-foreground hover:text-foreground transition-colors">
              Directory
            </Link>
            <Link href="/mentors" className="text-muted-foreground hover:text-foreground transition-colors">
              Mentors
            </Link>
            <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
              Events
            </Link>
            <Link href="/donate" className="text-muted-foreground hover:text-foreground transition-colors">
              Donate
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {!loading && !user && (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}

            {!loading && user && (
              <>
                <Link href="/dashboard" className="flex items-center space-x-3">
                  <Avatar name={profile?.full_name ?? user.email ?? "A"} imageUrl={(user as any)?.user_metadata?.avatar_url}/>
                  
                  <div className="hidden sm:block text-sm">
                    <div className="font-medium text-foreground">{displayName}</div>
                    <div className="text-xs text-foreground">{profile?.full_name ?? user.email}</div>
                  </div>
                </Link>

                <Button variant="ghost" onClick={() => router.push("/create-profile")}>
                  Edit Profile
                </Button>

                <Button variant="outline" onClick={handleSignOut}>
                  Sign out
                </Button>
              </>
            )}

            {loading && <div className="h-8 w-8 rounded bg-gray-200 animate-pulse" />}
          </div>
        </div>
      </div>
    </header>
  );
}
