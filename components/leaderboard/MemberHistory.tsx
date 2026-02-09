"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import Card from "@/components/ui/Card";
import { formatDate } from "@/utils/helpers";
import type { Round } from "@/types";

interface Props {
  memberId: string;
  memberName: string;
  onClose: () => void;
}

export default function MemberHistory({
  memberId,
  memberName,
  onClose,
}: Props) {
  const [rounds, setRounds] = useState<Round[]>([]);
  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("rounds")
      .select("*")
      .eq("user_id", memberId)
      .order("date_played", { ascending: false })
      .then(({ data }) => setRounds((data as Round[]) || []));
  }, [memberId]);

  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-display text-xl">{memberName}&apos;s History</h3>
        <button
          onClick={onClose}
          className="text-xs font-bold px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
        >
          Close
        </button>
      </div>
      {rounds.length === 0 ? (
        <p className="text-sm text-zinc-500">No rounds yet.</p>
      ) : (
        rounds.map((r) => (
          <div
            key={r.id}
            className="py-2 border-b border-zinc-100 dark:border-zinc-800 text-sm"
          >
            <span className="font-bold">{r.score}</span> @ {r.course_name}
            <span className="text-zinc-400 ml-2">
              {formatDate(r.date_played)}
            </span>
          </div>
        ))
      )}
    </Card>
  );
}
