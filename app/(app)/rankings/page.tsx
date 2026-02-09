"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { createClient } from "@/lib/supabase-browser";
import Card from "@/components/ui/Card";
import LeaderboardRow from "@/components/leaderboard/LeaderboardRow";
import MemberHistory from "@/components/leaderboard/MemberHistory";
import type { Profile } from "@/types";

export default function RankingsPage() {
  const { user } = useAuth();
  const { activeGroup } = useProfile(user?.id);
  const [members, setMembers] = useState<Profile[]>([]);
  const [viewing, setViewing] = useState<{ id: string; name: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!activeGroup) return;
    (async () => {
      const { data: mems } = await supabase
        .from("group_members")
        .select("user_id")
        .eq("group_id", activeGroup.id);
      if (!mems?.length) return;
      const { data: pros } = await supabase
        .from("profiles")
        .select("*")
        .in("id", mems.map((m) => m.user_id));
      const sorted = (pros as Profile[] || []).sort(
        (a, b) => (a.handicap_index ?? 99) - (b.handicap_index ?? 99)
      );
      setMembers(sorted);
    })();
  }, [activeGroup]);

  if (!activeGroup) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🏆</div>
        <p className="text-zinc-500 font-medium">No group yet.</p>
        <p className="text-zinc-400 text-sm mt-1">
          Join or create a group to see rankings.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <h2 className="font-display text-xl mb-4">Leaderboard</h2>
        <div className="grid grid-cols-[36px_1fr_64px_52px] text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 px-1">
          <span>#</span>
          <span>Name</span>
          <span>Index</span>
          <span className="text-right">Rnds</span>
        </div>
        {members.map((p, i) => (
          <LeaderboardRow
            key={p.id}
            profile={p}
            rank={i + 1}
            onClick={(id, name) => setViewing({ id, name })}
          />
        ))}
        {members.length === 0 && (
          <p className="text-sm text-zinc-400 py-4 text-center">
            No members yet.
          </p>
        )}
      </Card>

      {viewing && (
        <MemberHistory
          memberId={viewing.id}
          memberName={viewing.name}
          onClose={() => setViewing(null)}
        />
      )}
    </div>
  );
}
