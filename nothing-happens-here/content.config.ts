import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    poems: defineCollection({
      type: 'page',
      source: 'poems/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        year: z.number(),
        draft: z.boolean().default(false)
      })
    })
  }
})
