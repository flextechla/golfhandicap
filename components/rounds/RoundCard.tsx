"use client";

import { formatDate } from "@/utils/helpers";
import type { Round } from "@/types";

interface Props {
  round: Round;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function RoundCard({ round, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 mb-3 border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-golf-700 flex justify-between items-center shadow-sm">
      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {round.score}
          </span>
          <span className="text-sm text-zinc-500">
            @ {round.course_name}
          </span>
        </div>
        <p className="text-xs text-zinc-400 mt-0.5">
          {formatDate(round.date_played)} · Diff: {round.differential}
        </p>
      </div>
      <div className="flex gap-1.5">
        <button
          onClick={() => onEdit(round.id)}
          className="text-xs font-bold px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(round.id)}
          className="text-xs font-bold px-3 py-1.5 rounded-lg border border-red-300 text-danger hover:bg-red-50 dark:hover:bg-red-900/20 transition"
        >
          Del
        </button>
      </div>
    </div>
  );
}
