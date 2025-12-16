import { defineCollection, z } from 'astro:content';

const manifestoCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        number: z.string(),
        illustration: z.string().optional(),
    }),
});

export const collections = {
    manifesto: manifestoCollection,
};
