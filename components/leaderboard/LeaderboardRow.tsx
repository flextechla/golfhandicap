"use client";

import { formatHandicap } from "@/utils/handicap";
import type { Profile } from "@/types";

interface Props {
  profile: Profile;
  rank: number;
  onClick: (id: string, name: string) => void;
}

export default function LeaderboardRow({ profile, rank, onClick }: Props) {
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <button
      onClick={() => onClick(profile.id, profile.display_name || "Unknown")}
      className="w-full grid grid-cols-[36px_1fr_64px_52px] items-center py-3 px-1 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition text-left"
    >
      <span className="text-sm font-bold text-zinc-400">
        {medals[rank - 1] || rank}
      </span>
      <span className="font-bold text-sm truncate">
        {profile.display_name || "Unknown"}
      </span>
      <span className="font-mono text-sm text-golf-700 font-bold">
        {formatHandicap(profile.handicap_index)}
      </span>
      <span className="text-xs text-zinc-400 text-right">View</span>
    </button>
  );
}
