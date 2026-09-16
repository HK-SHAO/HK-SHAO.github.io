import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { normalizeTags } from "./utils/tags";

const entries = defineCollection({
  loader: glob({ base: "./src/content/entries", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      publishedAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      tags: z.array(z.string().min(1)).default([]).transform(normalizeTags),
      cover: image().optional(),
      visibility: z.enum(["public", "unlisted", "excluded"]).default("public"),
      comment: z.boolean().default(true),
      commentTerm: z.string().optional(),
      website: z.url().optional(),
      source: z.url().optional(),
      license: z
        .object({
          content: z.string().default("CC BY-SA 4.0"),
          code: z.string().default("MIT"),
        })
        .default({ content: "CC BY-SA 4.0", code: "MIT" }),
    }),
});

export const collections = { entries };
