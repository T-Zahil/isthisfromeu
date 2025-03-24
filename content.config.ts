import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    brands: defineCollection({
      type: 'data',
      source: 'brands.yml',
      schema: z.object({
        name: z.string(),
        isEuropean: z.boolean(),
        country: z.string(),
        category: z.string(),
        description: z.string()
      })
    })
  }
})
