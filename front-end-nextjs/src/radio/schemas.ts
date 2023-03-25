import { z } from "zod";

export const Station = z.object({
  id: z.number(),
  name: z.string(),
  website: z.string().url(),
  tags: z.array(z.string()),
});

export const Stations = z.array(Station);

export const Status = z.discriminatedUnion("isPlaying", [
  z.object({
    isPlaying: z.literal(true),
    volume: z.number(),
    source: z.object({
      station: z.object({
        name: z.string(),
        tags: z.array(z.string()),
        website: z.string(),
      }),
    }),
  }),
  z.object({
    isPlaying: z.literal(false),
    volume: z.number(),
  }),
]);
