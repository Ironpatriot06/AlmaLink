"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

type Profile = {
  id: string;
  full_name?: string;
  profile_pic_path?: string | null;
  is_admin?: boolean;

};

type AuthContextValue = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!mounted) return;
        setUser(data.user ?? null);

        if (data.user) {
          
          const { data: p, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .maybeSingle();
          if (!error && p) setProfile(p as Profile);
        }
      } catch (err) {
        console.error("Auth initial check error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);

      
      if (nextUser) {
        const { data: p, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", nextUser.id)
          .maybeSingle();
        if (!error && p) setProfile(p as Profile);
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      
    } catch (err) {
      console.error("Sign out error", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
