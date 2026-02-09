"use client";

import type { Group } from "@/types";

interface Props {
  group: Group | null;
}

export default function GroupStatus({ group }: Props) {
  if (!group) {
    return (
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-5 mb-4 text-center text-zinc-500 text-sm">
        No active group. Create or join one below.
      </div>
    );
  }

  return (
    <div className="bg-golf-50 dark:bg-golf-900/30 border-l-4 border-golf-700 rounded-2xl p-5 mb-4">
      <p className="font-bold text-golf-800 dark:text-golf-200">
        Active: {group.name}
      </p>
      <p className="text-sm text-zinc-500 mt-1">
        Share code:{" "}
        <span className="font-mono font-bold text-golf-700 bg-white dark:bg-zinc-900 px-2 py-0.5 rounded">
          {group.group_code}
        </span>
      </p>
    </div>
  );
}
