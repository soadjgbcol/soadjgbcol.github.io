import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const evidenceState = z.enum(["validated", "estimated", "qualitative", "inProgress"]);

const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    publicName: z.string(),
    subtitle: z.string(),
    group: z.enum(["internal-products-systems", "customer-experiences"]),
    order: z.number().int().positive(),
    status: z.string(),
    featured: z.boolean().default(false),
    evidence: z.array(z.object({
      state: evidenceState,
      statement: z.string(),
    })).default([]),
    quickView: z.object({
      problem: z.string().optional(),
      evolution: z.string().optional(),
      product: z.string().optional(),
      impact: z.string().optional(),
      learning: z.string().optional(),
    }),
    deepDive: z.object({
      available: z.boolean(),
      note: z.string().optional(),
    }),
  }),
});

export const collections = { projects };
