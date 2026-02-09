/**
 * WHS Handicap Index Calculator
 *
 * Formula:
 *   Differential = (Score - Course Rating) × 113 / Slope Rating
 *   Index = average of best N differentials from last 20 rounds × 0.96
 *
 * Lookup table (rounds → best N to use):
 *   3  → 1    |  6  → 2    |  9  → 3
 *   11 → 3    |  14 → 4    |  16 → 5
 *   18 → 6    |  19 → 7    |  20 → 8
 */

const WHS_MULTIPLIER = 0.96;
const STANDARD_SLOPE = 113;

/** How many best differentials to use for N total rounds */
function bestCountForRounds(n: number): number {
  if (n >= 20) return 8;
  if (n >= 15) return 5;
  if (n >= 10) return 3;
  if (n >= 6) return 2;
  return 1;
}

/** Compute a single score differential */
export function calcDifferential(
  score: number,
  courseRating: number,
  slopeRating: number
): number {
  return ((score - courseRating) * STANDARD_SLOPE) / slopeRating;
}

/** Compute handicap index from an array of differentials (most recent 20 max) */
export function calcHandicapIndex(differentials: number[]): number | null {
  if (differentials.length === 0) return null;

  const recent = differentials.slice(0, 20);
  const sorted = [...recent].sort((a, b) => a - b);
  const take = bestCountForRounds(recent.length);
  const best = sorted.slice(0, take);
  const avg = best.reduce((sum, d) => sum + d, 0) / best.length;

  return Math.round(avg * WHS_MULTIPLIER * 10) / 10;
}

/** Format handicap for display: "12.4" or "--" */
export function formatHandicap(index: number | null): string {
  return index != null ? index.toFixed(1) : "--";
}

/** Return trend direction comparing new vs old handicap */
export function handicapTrend(
  current: number | null,
  previous: number | null
): "improved" | "worsened" | "same" | null {
  if (current == null || previous == null) return null;
  if (current < previous) return "improved";
  if (current > previous) return "worsened";
  return "same";
}