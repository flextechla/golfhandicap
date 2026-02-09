import type { Round } from "@/types";

/** Generate a random 6-char uppercase alphanumeric code */
export function generateGroupCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

/** Format ISO date string to readable format */
export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Get today's date as YYYY-MM-DD */
export function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

/** Export rounds array to CSV and trigger download */
export function exportToCSV(rounds: Round[]): void {
  if (!rounds.length) {
    alert("No scores to export.");
    return;
  }

  const header = "Date,Course,Score,Rating,Slope,Differential\n";
  const rows = rounds
    .map(
      (r) =>
        `${r.date_played},"${r.course_name}",${r.score},${r.course_rating},${r.slope_rating},${r.differential}`
    )
    .join("\n");

  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `golf_scores_${todayISO()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}