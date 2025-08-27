// src/dedupe.ts
import { Job } from "./types";

export function dedupe(jobs: Job[]): Job[] {
  const seen = new Set<string>();
  return jobs.filter(j => {
    const key = j.url || `${j.title}|${j.company}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
