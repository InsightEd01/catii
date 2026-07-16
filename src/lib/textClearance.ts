/**
 * How clear the left-hand text zone is at a given point in the scroll
 * sequence, sourced from a manual visual survey of the source footage
 * (~24 frames spread across the full 276-frame sequence). 1 = wide open
 * wall, 0 = the cat or caretaker reaches close to the text column.
 *
 * Control points are (scroll progress 0-1, clearance 0-1); values between
 * them are linearly interpolated. Re-derive by eye if the footage changes.
 */
const CONTROL_POINTS: [progress: number, clearance: number][] = [
  [0.0, 1.0], // f001 – cat at window, wide open wall
  [0.073, 0.15], // f021 – cat's tail nearly reaches the left edge
  [0.146, 0.6], // f041 – cat centered, moderate margin
  [0.219, 1.0], // f061 – cat right, open hallway wall
  [0.248, 0.9], // f069 – cat centered, open wall
  [0.292, 0.45], // f081 – caretaker's edge close to text column
  [0.321, 0.9], // f090 – open wall up to ~48%
  [0.365, 0.3], // f101 – caretaker bends in, narrow clear zone
  [0.438, 0.9], // f121 – wide open wall
  [0.511, 0.35], // f141 – caretaker bends in again, narrow zone
  [0.584, 1.0], // f161 – very open wall
  [0.65, 0.55], // f180 – windowsill scene, plants/brightness on left
  [0.73, 1.0], // f201 – extremely open wall
  [0.752, 0.9], // f207 – open wall
  [0.803, 0.65], // f221 – cabinet + cat encroach a little
  [0.876, 0.75], // f241 – open wall
  [0.949, 0.8], // f261 – open wall
  [1.0, 0.55], // f276 – daybed extends toward center-left
];

const MIN_CLEARANCE = 0.12;

export function getTextClearance(progress: number): number {
  const p = Math.min(1, Math.max(0, progress));
  for (let i = 0; i < CONTROL_POINTS.length - 1; i++) {
    const [p0, c0] = CONTROL_POINTS[i];
    const [p1, c1] = CONTROL_POINTS[i + 1];
    if (p >= p0 && p <= p1) {
      const t = p1 === p0 ? 0 : (p - p0) / (p1 - p0);
      const clearance = c0 + (c1 - c0) * t;
      return Math.max(MIN_CLEARANCE, clearance);
    }
  }
  return 1;
}
