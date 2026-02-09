"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRounds } from "@/hooks/useRounds";
import RoundCard from "@/components/rounds/RoundCard";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const { user } = useAuth();
  const { rounds, loading, deleteRound } = useRounds(user?.id);
  const router = useRouter();

  const handleEdit = (id: string) => {
    sessionStorage.setItem("editRoundId", id);
    router.push("/add");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this round?")) return;
    await deleteRound(id);
    (window as any).__refreshProfile?.();
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-zinc-400 text-sm">
        Loading scores...
      </div>
    );
  }

  if (rounds.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🏌️</div>
        <p className="text-zinc-500 font-medium">No rounds yet.</p>
        <p className="text-zinc-400 text-sm mt-1">
          Tap <strong>Add</strong> to post your first score.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-xl mb-4">Recent Rounds</h2>
      {rounds.map((r) => (
        <RoundCard
          key={r.id}
          round={r}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
