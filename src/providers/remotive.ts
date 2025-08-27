import axios from "axios";
import { Job } from "../types";

export async function fetchRemotive(query: string): Promise<Job[]> {
  try {
    const { data } = await axios.get("https://remotive.io/api/remote-jobs", {
      params: { search: query },
      timeout: 10000,
      headers: { "User-Agent": "OneClickHire/0.1" }
    });
    return (data.jobs || []).map((j: any) => ({
      title: j.title,
      company: j.company_name,
      location: j.candidate_required_location,
      remote: true,
      url: j.url,
      source: "remotive",
      postedAt: j.publication_date,
      salary: j.salary,
    }));
  } catch (e: any) {
    // Cloudflare 526 or any other error → skip source
    console.warn("Remotive unavailable:", e?.response?.status || e?.message);
    return [];
  }
}
