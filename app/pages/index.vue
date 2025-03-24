<script setup>
const isOpen = ref(true)

// Fetch brands data from Nuxt Content
const { data } = await useAsyncData('brands', () => queryCollection('brands').all())
const brandsData = data.value[0].meta.body

// Log the structure to debug
console.log('Brands data structure:', brandsData)

// Create commands for CommandPalette
const commands = computed(() => {
  const groups = {}

  // Make sure we have an array to iterate
  const brandsArray = Array.isArray(brandsData) ? brandsData : []

  brandsArray.forEach(brand => {
    // Create category groups
    if (!groups[brand.category]) {
      groups[brand.category] = {
        id: brand.category,
        label: brand.category,
        items: []
      }
    }

    // Add item to appropriate group
    groups[brand.category].items.push({
      id: brand.name,
      label: brand.name,
      icon: brand.isEuropean ? 'i-ph-check-circle-duotone' : 'i-ph-x-circle-duotone',
      iconClass: brand.isEuropean ? 'text-green-500' : 'text-red-500',
      shortcuts: [],
      suffix: brand.country
    })
  })

  return Object.values(groups)
})

// Handle brand selection
const selectedBrand = ref(null)

function onCommandSelect(command) {
  const brandsArray = Array.isArray(brandsData) ? brandsData : []
  selectedBrand.value = brandsArray.find(brand => brand.name === command.id)
}

// Prevent CommandPalette from closing
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
</script>

<template>
  <div class="container mx-auto px-4 py-10">
    <UCard>
      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold mb-2">Is it European?</h1>
          <p class="text-gray-500">Find out if a brand is European or not</p>
        </div>
      </template>

      <div class="py-4">
        <!-- Always visible CommandPalette -->
        <UCommandPalette v-model="isOpen" :groups="commands"
          placeholder="Search for a brand (e.g., Apple, Samsung, Panzani...)" @select="onCommandSelect"
          @close="onClose">
          <template #empty-state>
            <div class="p-4 text-center">
              <i class="i-ph-magnifying-glass-duotone text-4xl mx-auto mb-2 text-gray-400" />
              <p class="text-sm text-gray-500">No brands found. Try another search term.</p>
            </div>
          </template>
        </UCommandPalette>

        <!-- Results display -->
        <div v-if="selectedBrand" class="mt-8">
          <UCard :ui="{ base: 'border border-gray-200 dark:border-gray-800 shadow-sm rounded-lg' }">
            <div class="text-center">
              <h2 class="text-xl font-semibold">{{ selectedBrand.name }}</h2>

              <div class="mt-4 flex justify-center items-center">
                <UBadge v-if="selectedBrand.isEuropean" color="green" size="lg">
                  <i class="i-ph-check-circle-duotone mr-1" />
                  European Brand
                </UBadge>
                <UBadge v-else color="red" size="lg">
                  <i class="i-ph-x-circle-duotone mr-1" />
                  Non-European Brand
                </UBadge>
              </div>

              <div class="mt-4 mb-2">
                <UBadge color="gray" variant="subtle">
                  <i class="i-ph-flag-duotone mr-1" />
                  {{ selectedBrand.country }}
                </UBadge>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <template #footer>
        <div class="text-center text-xs text-gray-500">
          <p>Open-source application to identify brand origins</p>
          <p class="mt-1">Contribute to the project by adding new brands!</p>
        </div>
      </template>
    </UCard>
  </div>
</template>
