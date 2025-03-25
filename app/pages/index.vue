<script setup>
// Make CommandPalette always open
const isOpen = ref(true)

// Search state
const searchQuery = ref('')

// Fetch brands data from Nuxt Content
const { data: brandsData } = await useAsyncData('brands', () => queryCollection('brands').all())

// Create commands for CommandPalette
const commands = computed(() => {
  // Create a default group for all brands
  const defaultGroup = {
    id: 'all-brands',
    label: 'All Brands',
    items: []
  }

  // Get brands from the correct path in the data structure
  const brands = brandsData.value?.[0]?.meta?.body || []

  // Add each brand to the default group
  brands.forEach(brand => {
    defaultGroup.items.push({
      id: brand.name,
      label: brand.name,
      icon: brand.isEuropean ? 'i-ph-check-circle-duotone' : 'i-ph-x-circle-duotone',
      isEuropean: brand.isEuropean,
      shortcuts: [],
      suffix: brand.country,
      alternatives: brand.alternatives || []
    })
  })

  return [defaultGroup]
})

// Keep CommandPalette open on close event
function onClose() {
  isOpen.value = true
}

// European countries for reference (not used directly in the interface)
const europeanCountries = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus',
  'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France',
  'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy',
  'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
  'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia',
  'Spain', 'Sweden', 'United Kingdom', 'Switzerland', 'Norway'
]

// Compute the total number of brands
const totalBrands = computed(() => {
  return brandsData.value?.[0]?.meta?.body?.length || 0
})
</script>

<template>
  <div class="container mx-auto px-4 py-10">
    <UCard>
      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold mb-2">Is this from Europe?</h1>
          <p class="text-gray-500">Search among {{ totalBrands }} brands and find out if it's European or not</p>
        </div>
      </template>

      <div class="py-4">
        <!-- Always visible CommandPalette -->
        <UCommandPalette v-model="isOpen" :groups="commands" v-model:search-value="searchQuery"
          placeholder="Search for a brand (e.g., Apple, Samsung, Panzani...)" @close="onClose">
          <!-- Custom slot for items to display colored icons -->
          <template #item="{ item, active, selected }">
            <div class="flex flex-col">
              <div class="flex items-center justify-start w-fit gap-2 py-1">
                <UIcon :name="item.icon" :class="item.isEuropean ? 'text-green-500' : 'text-red-500'" />
                <span class="flex-1 text-base">{{ item.label }}</span>
                <span class="text-sm text-gray-500">- &nbsp;{{ item.suffix }}</span>
              </div>

              <!-- Show alternatives for non-European brands -->
              <div v-if="!item.isEuropean && item.alternatives && item.alternatives.length > 0"
                class="mt-1 mb-1 text-gray-500 text-left text-sm">
                <span>EU alternatives: </span>
                <span class="text-green-600">{{ item.alternatives.join(', ') }}</span>
              </div>
            </div>
          </template>

          <!-- Custom empty state -->
          <template #empty-state>
            <div class="p-4 text-center">
              <i class="i-ph-magnifying-glass-duotone text-4xl mx-auto mb-2 text-gray-400" />
              <p class="text-sm text-gray-500">No brands found. Try another search term.</p>
            </div>
          </template>
        </UCommandPalette>
      </div>

      <template #footer>
        <div class="text-center text-xs text-gray-500">
          <p>Open-source application to identify brand origins, by <NuxtLink class="strong text-green-600"
              to="https://uneed.best" target="_blank">
              Uneed</NuxtLink>
          </p>
          <p class="mt-1">Contribute to the project by adding new brands!</p>
          <UButton to="https://github.com/T-Zahil/isthisfromeu" target="_blank" icon="i-ph-github-logo-duotone"
            variant="link" class="text-gray-500 mt-2">
            <span>View on GitHub</span>
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>
