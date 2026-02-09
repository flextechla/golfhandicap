"use client";

import { formatHandicap, handicapTrend } from "@/utils/handicap";
import type { Profile, Group } from "@/types";

interface Props {
  profile: Profile | null;
  activeGroup: Group | null;
  prevHandicap: number | null;
  onLogout: () => void;
}

export default function AppHeader({
  profile,
  activeGroup,
  prevHandicap,
  onLogout,
}: Props) {
  const hcp = profile?.handicap_index ?? null;
  const trend = handicapTrend(hcp, prevHandicap);

  const trendConfig = {
    improved: { icon: "↓", color: "text-green-300", bg: "bg-green-800/40" },
    worsened: { icon: "↑", color: "text-red-300", bg: "bg-red-800/40" },
    same: { icon: "↔", color: "text-amber-300", bg: "bg-amber-800/40" },
  };

  const t = trend ? trendConfig[trend] : null;
  const subtitle = [
    profile?.display_name,
    activeGroup ? `· ${activeGroup.name}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className="bg-gradient-to-br from-golf-700 via-golf-800 to-golf-900 text-white px-5 pt-12 pb-6 text-center relative">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold opacity-90 truncate max-w-[70%]">
          {subtitle || "Connecting..."}
        </span>
        <button
          onClick={onLogout}
          className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition"
        >
          Logout
        </button>
      </div>

      {/* Handicap */}
      <div className="flex items-center justify-center gap-3">
        <span className="font-display text-6xl font-black tracking-tight">
          {formatHandicap(hcp)}
        </span>
        {t && (
          <span
            className={`text-lg px-3 py-1 rounded-full ${t.bg} ${t.color} font-bold`}
          >
            {t.icon}
          </span>
        )}
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] mt-1 opacity-70">
        WHS Handicap Index
      </p>
    </header>
  );
}
