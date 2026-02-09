"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { Course } from "@/types";

interface Props {
  courses: Course[];
  onRefresh: () => void;
}

export default function CourseManager({ courses, onRefresh }: Props) {
  const supabase = createClient();
  const [selectedId, setSelectedId] = useState<string>("new");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [tee, setTee] = useState("");
  const [rating, setRating] = useState("");
  const [slope, setSlope] = useState("");

  useEffect(() => {
    if (selectedId === "new") {
      setName(""); setCity(""); setTee(""); setRating(""); setSlope("");
    } else {
      const c = courses.find((x) => x.id === selectedId);
      if (c) {
        setName(c.name);
        setCity(c.city || "");
        setTee(c.tee || "");
        setRating(String(c.course_rating ?? ""));
        setSlope(String(c.slope_rating ?? ""));
      }
    }
  }, [selectedId, courses]);

  const handleSave = async () => {
    const payload = {
      name,
      city: city || null,
      tee: tee || null,
      course_rating: parseFloat(rating),
      slope_rating: parseInt(slope),
    };
    if (selectedId !== "new") {
      await supabase.from("courses").update(payload).eq("id", selectedId);
    } else {
      await supabase.from("courses").insert(payload);
    }
    setSelectedId("new");
    onRefresh();
  };

  const handleDelete = async () => {
    if (selectedId === "new") return;
    if (!confirm("Delete this course?")) return;
    await supabase.from("courses").delete().eq("id", selectedId);
    setSelectedId("new");
    onRefresh();
  };

  return (
    <Card>
      <h3 className="font-display text-xl mb-4">Course Manager</h3>
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base mb-4 outline-none focus:ring-2 focus:ring-golf-500"
      >
        <option value="new">-- Add New Course --</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <div className="space-y-3">
        <input
          type="text" placeholder="Course Name" value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base outline-none focus:ring-2 focus:ring-golf-500"
        />
        <input
          type="text" placeholder="City" value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base outline-none focus:ring-2 focus:ring-golf-500"
        />
        <input
          type="text" placeholder="Tee Box (e.g. White, Blue)" value={tee}
          onChange={(e) => setTee(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base outline-none focus:ring-2 focus:ring-golf-500"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number" step="0.1" placeholder="Rating" value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base outline-none focus:ring-2 focus:ring-golf-500"
          />
          <input
            type="number" placeholder="Slope" value={slope}
            onChange={(e) => setSlope(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base outline-none focus:ring-2 focus:ring-golf-500"
          />
        </div>
      </div>

      <Button onClick={handleSave} className="mt-4">Save Course</Button>
      {selectedId !== "new" && (
        <Button variant="danger" onClick={handleDelete} className="mt-2">
          Delete Course
        </Button>
      )}
    </Card>
  );
}
