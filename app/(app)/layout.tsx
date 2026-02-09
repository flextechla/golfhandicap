"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const { profile, activeGroup, refresh } = useProfile(user?.id);
  const [prevHcp, setPrevHcp] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading, router]);

  // Track previous handicap for trend arrow
  useEffect(() => {
    if (profile?.handicap_index != null) {
      setPrevHcp((prev) =>
        prev === null ? profile.handicap_index : prev
      );
    }
  }, [profile?.handicap_index]);

  // Expose refresh for child pages
  useEffect(() => {
    (window as any).__refreshProfile = refresh;
    return () => { delete (window as any).__refreshProfile; };
  }, [refresh]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-5xl animate-pulse">⛳</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <AppHeader
        profile={profile}
        activeGroup={activeGroup}
        prevHandicap={prevHcp}
        onLogout={signOut}
      />
      <main className="max-w-lg mx-auto px-4 py-5">{children}</main>
      <BottomNav />
    </div>
  );
}
