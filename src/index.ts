import "dotenv/config";
import { fetchAdzuna } from "./providers/adzuna";
import { fetchJooble } from "./providers/jooble";
import { fetchRemotive } from "./providers/remotive";
import { fetchGreenhouse } from "./providers/ats";
import { dedupe } from "./dedupe";

const query = process.argv.slice(2).join(" ").trim() || "typescript remote";

(async () => {
  const results = await Promise.allSettled([
    fetchAdzuna(query),
    fetchJooble(query),
    fetchRemotive(query),
    fetchGreenhouse("stripe", query),
  ]);

  const jobs = dedupe(
    results.flatMap(r => (r.status === "fulfilled" ? r.value : []))
  );

  // Optional: log failed sources
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      const src = ["adzuna","jooble","remotive","greenhouse"][i];
      console.warn(`WARN: ${src} failed →`, r.reason?.response?.status || r.reason?.message);
    }
  });

  console.log(JSON.stringify(jobs, null, 2));
})();
