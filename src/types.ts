import { z } from "zod";

export const JobSchema = z.object({
  title: z.string(),
  company: z.string().optional(),
  location: z.string().optional(),
  remote: z.boolean().optional(),
  url: z.string().url(),
  source: z.string(),
  postedAt: z.string().optional(),
  salary: z.string().optional(),
});

export type Job = z.infer<typeof JobSchema>;
