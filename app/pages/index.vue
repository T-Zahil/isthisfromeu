<script setup>
definePageMeta({
  layout: 'default'
})

const isOpen = ref(true)
const searchQuery = ref('')

const { data: brandsData } = await useAsyncData('brands', () => queryCollection('brands').all())

const commands = computed(() => {
  const defaultGroup = {
    id: 'all-brands',
    label: 'All Brands',
    items: []
  }

  const brands = brandsData.value?.[0]?.meta?.body || []

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

function onClose() {
  isOpen.value = true
}

const totalBrands = computed(() => {
  return brandsData.value?.[0]?.meta?.body?.length || 0
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="text-center">
        <h1 class="text-2xl font-bold mb-2">Is this from Europe?</h1>
        <p class="text-gray-500">Search among {{ totalBrands }} brands and find out if it's European or not</p>
      </div>
    </template>

    <div class="py-4">
      <UCommandPalette v-model="isOpen" :groups="commands" v-model:search-value="searchQuery"
        placeholder="Search for a brand (e.g., Apple, Samsung, Panzani...)" @close="onClose">
        <template #item="{ item }">
          <div class="flex flex-col">
            <div class="flex items-center justify-start w-fit gap-2 py-1">
              <UIcon :name="item.icon" :class="item.isEuropean ? 'text-green-500' : 'text-red-500'" />
              <span class="flex-1 text-base">{{ item.label }}</span>
              <span class="text-sm text-gray-500">- &nbsp;{{ item.suffix }}</span>
            </div>

            <div v-if="!item.isEuropean && item.alternatives && item.alternatives.length > 0"
              class="mt-1 mb-1 text-gray-500 text-left text-sm">
              <span>EU alternatives: </span>
              <span class="text-green-600">{{ item.alternatives.join(', ') }}</span>
            </div>
          </div>
        </template>

        <template #empty-state>
          <div class="p-4 text-center">
            <i class="i-ph-magnifying-glass-duotone text-4xl mx-auto mb-2 text-gray-400" />
            <p class="text-sm text-gray-500">No brands found. Try another search term.</p>
          </div>
        </template>
      </UCommandPalette>
    </div>
  </UCard>
</template>
