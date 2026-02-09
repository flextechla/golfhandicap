"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase-browser";
import type { Profile, Group } from "@/types";

export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const refresh = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    const { data: p } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (p) setProfile(p as Profile);

    // Resolve active group
    const { data: mems } = await supabase
      .from("group_members")
      .select("group_id")
      .eq("user_id", userId);

    if (mems?.length) {
      const ids = mems.map((m) => m.group_id);
      const { data: groups } = await supabase
        .from("groups")
        .select("*")
        .in("id", ids);

      const active =
        groups?.find((g) => g.id === p?.current_group_id) ??
        groups?.[0] ??
        null;

      setActiveGroup(active as Group | null);
    } else {
      setActiveGroup(null);
    }

    setLoading(false);
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { profile, activeGroup, loading, refresh };
}