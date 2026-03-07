import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    poems: defineCollection({
      type: 'page',
      source: 'poems/**',
      schema: z.object({
        title: z.string(),
        date: z.string(),
      }),
    }),
  },
})
