"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRounds } from "@/hooks/useRounds";
import { createClient } from "@/lib/supabase-browser";
import RoundForm from "@/components/rounds/RoundForm";
import { useRouter } from "next/navigation";
import type { Course, Round } from "@/types";

export default function AddPage() {
  const { user } = useAuth();
  const { saveRound } = useRounds(user?.id);
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingRound, setEditingRound] = useState<Round | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase
      .from("courses")
      .select("*")
      .order("name")
      .then(({ data }) => setCourses((data as Course[]) || []));

    // Check if editing
    const editId = sessionStorage.getItem("editRoundId");
    if (editId) {
      sessionStorage.removeItem("editRoundId");
      supabase
        .from("rounds")
        .select("*")
        .eq("id", editId)
        .single()
        .then(({ data }) => {
          if (data) setEditingRound(data as Round);
        });
    }
  }, []);

  const handleSave = async (
    data: Omit<Round, "id" | "user_id" | "differential" | "created_at">,
    editId?: string
  ) => {
    await saveRound(data, editId);
    (window as any).__refreshProfile?.();
    setEditingRound(null);
    router.push("/history");
  };

  return (
    <RoundForm
      courses={courses}
      editingRound={editingRound}
      onSave={handleSave}
      onCancel={() => { setEditingRound(null); router.push("/history"); }}
    />
  );
}
