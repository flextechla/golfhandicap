"use client";

import { createClient } from "@/lib/supabase-browser";

export function useGroup(userId: string | undefined) {
  const supabase = createClient();

  const createGroup = async (name: string, code: string) => {
    if (!userId) return;
    const { data: g } = await supabase
      .from("groups")
      .insert({ name, group_code: code, owner_id: userId })
      .select()
      .single();
    if (!g) return;
    await supabase
      .from("group_members")
      .insert({ group_id: g.id, user_id: userId });
    await supabase
      .from("profiles")
      .update({ current_group_id: g.id })
      .eq("id", userId);
  };

  const joinGroup = async (code: string) => {
    if (!userId) return;
    const { data: g } = await supabase
      .from("groups")
      .select("*")
      .eq("group_code", code.toUpperCase())
      .single();
    if (!g) throw new Error("Group not found");
    await supabase
      .from("group_members")
      .upsert({ group_id: g.id, user_id: userId });
    await supabase
      .from("profiles")
      .update({ current_group_id: g.id })
      .eq("id", userId);
  };

  const leaveGroup = async (groupId: string) => {
    if (!userId) return;
    await supabase
      .from("group_members")
      .delete()
      .eq("group_id", groupId)
      .eq("user_id", userId);
    await supabase
      .from("profiles")
      .update({ current_group_id: null })
      .eq("id", userId);
  };

  return { createGroup, joinGroup, leaveGroup };
}