import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { parse } from 'yaml'

describe('Brands', () => {
  it('should not have duplicate brand names', () => {
    // Read the brands.yml file
    const brandsYaml = readFileSync('./content/brands.yml', 'utf-8')
    const brands = parse(brandsYaml)

    // Create a map to track brand names
    const brandNames = new Map<string, number>()

    // Count occurrences of each brand name
    brands.forEach((brand: { name: string }) => {
      const count = brandNames.get(brand.name) || 0
      brandNames.set(brand.name, count + 1)
    })

    // Find duplicates
    const duplicates = Array.from(brandNames.entries())
      .filter(([_, count]) => count > 1)
      .map(([name]) => name)

    // If there are duplicates, create a detailed error message
    if (duplicates.length > 0) {
      throw new Error(
        `Duplicate brand names found: ${duplicates.join(', ')}`
      )
    }

    // If we get here, there are no duplicates
    expect(duplicates.length).toBe(0)
  })
})
