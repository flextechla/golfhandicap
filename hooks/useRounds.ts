"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase-browser";
import { calcDifferential, calcHandicapIndex } from "@/utils/handicap";
import type { Round } from "@/types";

export function useRounds(userId: string | undefined) {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchRounds = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data } = await supabase
      .from("rounds")
      .select("*")
      .eq("user_id", userId)
      .order("date_played", { ascending: false });
    setRounds((data as Round[]) || []);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchRounds();
  }, [fetchRounds]);

  /** Recalculate and persist handicap index */
  const recalcHandicap = async () => {
    if (!userId) return;
    const { data } = await supabase
      .from("rounds")
      .select("differential")
      .eq("user_id", userId)
      .order("date_played", { ascending: false })
      .limit(20);

    const diffs = (data || []).map((r) => Number(r.differential));
    const index = calcHandicapIndex(diffs);

    await supabase
      .from("profiles")
      .update({ handicap_index: index })
      .eq("id", userId);
  };

  /** Save a new round or update an existing one */
  const saveRound = async (
    round: Omit<Round, "id" | "user_id" | "differential" | "created_at">,
    editId?: string
  ) => {
    const diff = calcDifferential(
      round.score,
      round.course_rating!,
      round.slope_rating!
    );
    const payload = { ...round, differential: +diff.toFixed(1) };

    if (editId) {
      await supabase.from("rounds").update(payload).eq("id", editId);
    } else {
      await supabase
        .from("rounds")
        .insert({ ...payload, user_id: userId });
    }

    await recalcHandicap();
    await fetchRounds();
  };

  /** Delete a round and recalc */
  const deleteRound = async (id: string) => {
    await supabase.from("rounds").delete().eq("id", id);
    await recalcHandicap();
    await fetchRounds();
  };

  return { rounds, loading, saveRound, deleteRound, refresh: fetchRounds };
}