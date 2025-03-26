<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'

definePageMeta({
  layout: 'default'
})

interface Brand {
  name: string
  isEuropean: boolean
  country: string
  alternatives?: string[]
}

const { data: brandsData } = await useAsyncData('brands', () => queryCollection('brands').all())

const columns = [
  { id: 'name', header: 'Brand' },
  { id: 'isEuropean', header: 'European' },
  { id: 'country', header: 'Country' },
  { id: 'alternatives', header: 'Alternatives' }
]

const pagination = ref({
  pageIndex: 0,
  pageSize: 20
})

const filters = ref({
  origin: null as null | string,
  country: null as null | string
})

const table = useTemplateRef('table')

const countries = computed(() => {
  const brands = (brandsData.value?.[0]?.meta?.body || []) as Brand[]
  return [...new Set(brands.map(brand => brand.country))].sort()
})

const originOptions = [
  { label: 'All', value: null },
  { label: 'European', value: 'eu' },
  { label: 'Non-European', value: 'non-eu' }
]

const countryOptions = computed(() => [
  { label: 'All Countries', value: null },
  ...countries.value.map(country => ({
    label: country,
    value: country
  }))
])

const filteredItems = computed(() => {
  const brands = (brandsData.value?.[0]?.meta?.body || []) as Brand[]

  return brands.filter(brand => {
    if (filters.value.origin === 'eu' && !brand.isEuropean) return false
    if (filters.value.origin === 'non-eu' && brand.isEuropean) return false
    if (filters.value.country && brand.country !== filters.value.country) return false
    return true
  })
})

const items = computed(() => {
  const brands = (brandsData.value?.[0]?.meta?.body || []) as Brand[]

  return brands.filter(brand => {
    if (filters.value.origin === 'eu' && !brand.isEuropean) return false
    if (filters.value.origin === 'non-eu' && brand.isEuropean) return false
    if (filters.value.country && brand.country !== filters.value.country) return false
    return true
  })
})

useHead({
  title: 'All Brands - Is This From EU?',
  meta: [
    { name: 'description', content: 'Browse and filter all brands to check if they are European or not.' }
  ]
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-2xl font-bold">All Brands</h1>
          <p class="text-gray-500 mt-1">Browse and filter all available brands</p>
        </div>
        <UButton to="/" icon="i-ph-magnifying-glass-duotone" variant="soft">
          Quick Search
        </UButton>
      </div>
    </template>

    <div class="flex gap-4 mb-6">
      <USelect v-model="filters.origin" :items="originOptions" placeholder="Filter by origin" icon="i-ph-globe-duotone"
        class="w-48" />
      <USelect v-model="filters.country" :items="countryOptions" placeholder="Filter by country"
        icon="i-ph-flag-duotone" class="w-48" />
    </div>

    <UTable ref="table" :data="items" :columns="columns" v-model:pagination="pagination" :pagination-options="{
      getPaginationRowModel: getPaginationRowModel()
    }">
      <template #name-cell="{ row }">
        <div class="flex items-center gap-2">
          {{ row.original.name }}
        </div>
      </template>

      <template #isEuropean-cell="{ row }">
        <UBadge :color="row.original.isEuropean ? 'success' : 'error'"
          :variant="row.original.isEuropean ? 'soft' : 'subtle'">
          {{ row.original.isEuropean ? 'Yes' : 'No' }}
        </UBadge>
      </template>

      <template #country-cell="{ row }">
        <span class="flex items-center gap-2">
          <UIcon name="i-ph-flag-duotone" />
          {{ row.original.country }}
        </span>
      </template>

      <template #alternatives-cell="{ row }">
        <div class="flex items-center gap-2">
          {{ row.original.alternatives?.join(', ') }}
        </div>
      </template>

      <template #empty>
        <div class="text-center py-4">
          <UIcon name="i-ph-magnifying-glass-duotone" class="text-4xl text-gray-400 mb-2" />
          <p class="text-sm text-gray-500">No brands found with the current filters.</p>
        </div>
      </template>
    </UTable>

    <div class="flex justify-center border-t border-(--ui-border) pt-4">
      <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
    </div>
  </UCard>
</template>
