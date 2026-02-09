"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface Props {
  onJoin: (code: string) => Promise<void>;
}

export default function JoinGroup({ onJoin }: Props) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJoin = async () => {
    if (!code) return;
    setLoading(true);
    setError("");
    try {
      await onJoin(code);
      setCode("");
    } catch {
      setError("Group not found. Check the code and try again.");
    }
    setLoading(false);
  };

  return (
    <Card>
      <h3 className="font-display text-xl mb-4">Join Group</h3>
      <input
        type="text"
        placeholder="Enter Join Code"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base font-mono tracking-widest mb-3 outline-none focus:ring-2 focus:ring-golf-500"
      />
      {error && <p className="text-danger text-sm mb-2">{error}</p>}
      <Button variant="outline" onClick={handleJoin} disabled={loading || !code}>
        {loading ? "Joining..." : "Join Group"}
      </Button>
    </Card>
  );
}
