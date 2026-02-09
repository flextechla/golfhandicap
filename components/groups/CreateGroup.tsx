"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { generateGroupCode } from "@/utils/helpers";

interface Props {
  onCreate: (name: string, code: string) => Promise<void>;
}

export default function CreateGroup({ onCreate }: Props) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name || !code) return;
    setLoading(true);
    await onCreate(name, code);
    setName("");
    setCode("");
    setLoading(false);
  };

  return (
    <Card>
      <h3 className="font-display text-xl mb-4">Create Group</h3>
      <input
        type="text"
        placeholder="Group Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base mb-3 outline-none focus:ring-2 focus:ring-golf-500"
      />
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Code"
          value={code}
          readOnly
          className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-base font-mono outline-none"
        />
        <button
          onClick={() => setCode(generateGroupCode())}
          className="px-4 py-3 text-sm font-bold rounded-xl border border-golf-700 text-golf-700 hover:bg-golf-50 dark:hover:bg-golf-900/20 transition whitespace-nowrap"
        >
          Generate
        </button>
      </div>
      <Button onClick={handleCreate} disabled={loading || !name || !code}>
        {loading ? "Creating..." : "Create & Join"}
      </Button>
    </Card>
  );
}
