import axios from "axios";
import { Job } from "../types";

// Example for one Greenhouse board (replace subdomain)
export async function fetchGreenhouse(boardToken: string, query: string): Promise<Job[]> {
  const url = `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs`;
  const { data } = await axios.get(url);
  return (data.jobs || [])
    .filter((j: any) => j.title.toLowerCase().includes(query.toLowerCase()))
    .map((j: any) => ({
      title: j.title,
      company: boardToken,
      location: j.location?.name,
      remote: /remote/i.test(j.location?.name || ""),
      url: j.absolute_url,
      source: "greenhouse",
      postedAt: j.updated_at,
      salary: undefined,
    }));
}
