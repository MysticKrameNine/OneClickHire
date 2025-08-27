import axios from "axios";
import { Job } from "../types";

const APP_ID = process.env.ADZUNA_APP_ID;
const APP_KEY = process.env.ADZUNA_APP_KEY;
const COUNTRY = "gb"; // change to 'fr', 'us', etc.

export async function fetchAdzuna(query: string): Promise<Job[]> {
  if (!APP_ID || !APP_KEY) return [];
  const url = `https://api.adzuna.com/v1/api/jobs/${COUNTRY}/search/1`;
  const { data } = await axios.get(url, {
    params: { app_id: APP_ID, app_key: APP_KEY, what: query },
  });

  return (data.results || []).map((j: any) => ({
    title: j.title,
    company: j.company?.display_name,
    location: j.location?.display_name,
    remote: /remote/i.test(j.location?.display_name || ""),
    url: j.redirect_url,
    source: "adzuna",
    postedAt: j.created,
    salary: j.salary_min ? `${j.salary_min}-${j.salary_max}` : undefined,
  }));
}
