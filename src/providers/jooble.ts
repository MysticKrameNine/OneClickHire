import axios from "axios";
import { Job } from "../types";

const JOOBLE_KEY = process.env.JOOBLE_KEY;

export async function fetchJooble(query: string): Promise<Job[]> {
  if (!JOOBLE_KEY) return [];
  const { data } = await axios.post(
    `https://jooble.org/api/${JOOBLE_KEY}`,
    { keywords: query, page: 1 }
  );

  return (data.jobs || []).map((j: any) => ({
    title: j.title,
    company: j.company,
    location: j.location,
    remote: /remote/i.test(j.location || ""),
    url: j.link,
    source: "jooble",
    postedAt: j.updated,
    salary: j.salary,
  }));
}
