"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function RootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.replace(user ? "/history" : "/auth");
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-golf-700 to-golf-900">
      <div className="text-white text-center">
        <div className="text-5xl mb-3">⛳</div>
        <p className="text-sm font-bold opacity-70 tracking-widest">LOADING</p>
      </div>
    </div>
  );
}
