"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { todayISO } from "@/utils/helpers";
import type { Course, Round } from "@/types";

interface Props {
  courses: Course[];
  editingRound?: Round | null;
  onSave: (
    data: Omit<Round, "id" | "user_id" | "differential" | "created_at">,
    editId?: string
  ) => Promise<void>;
  onCancel?: () => void;
}

export default function RoundForm({
  courses,
  editingRound,
  onSave,
  onCancel,
}: Props) {
  const [courseId, setCourseId] = useState("");
  const [score, setScore] = useState("");
  const [rating, setRating] = useState("");
  const [slope, setSlope] = useState("");
  const [date, setDate] = useState(todayISO());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingRound) {
      setScore(String(editingRound.score));
      setRating(String(editingRound.course_rating));
      setSlope(String(editingRound.slope_rating));
      setDate(editingRound.date_played);
    }
  }, [editingRound]);

  const handleCourseChange = (id: string) => {
    setCourseId(id);
    const c = courses.find((x) => x.id === id);
    if (c) {
      setRating(String(c.course_rating));
      setSlope(String(c.slope_rating));
    }
  };

  const handleSubmit = async () => {
    if (!score || !rating || !slope || !date) return;
    setSaving(true);
    const courseName =
      courses.find((c) => c.id === courseId)?.name || "Course";

    await onSave(
      {
        score: +score,
        course_rating: +rating,
        slope_rating: +slope,
        date_played: date,
        course_name: courseName,
      },
      editingRound?.id
    );
    // Reset
    setScore("");
    setCourseId("");
    setRating("");
    setSlope("");
    setDate(todayISO());
    setSaving(false);
  };

  return (
    <Card>
      <h3 className="font-display text-xl mb-4">
        {editingRound ? "Edit Score" : "Add Score"}
      </h3>

      <select
        value={courseId}
        onChange={(e) => handleCourseChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base mb-3 outline-none focus:ring-2 focus:ring-golf-500"
      >
        <option value="">-- Select Course --</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} {c.tee ? `(${c.tee})` : ""}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <input
          type="number"
          step="0.1"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base outline-none focus:ring-2 focus:ring-golf-500"
        />
        <input
          type="number"
          placeholder="Slope"
          value={slope}
          onChange={(e) => setSlope(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base outline-none focus:ring-2 focus:ring-golf-500"
        />
      </div>

      <input
        type="number"
        placeholder="Gross Score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base mb-3 outline-none focus:ring-2 focus:ring-golf-500"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base mb-4 outline-none focus:ring-2 focus:ring-golf-500"
      />

      <Button onClick={handleSubmit} disabled={saving}>
        {saving
          ? "Saving..."
          : editingRound
          ? "Update Round"
          : "Save Round"}
      </Button>

      {editingRound && onCancel && (
        <Button variant="ghost" onClick={onCancel} className="mt-2">
          Cancel Edit
        </Button>
      )}
    </Card>
  );
}
