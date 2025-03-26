<script setup lang="ts">
const items = computed(() => [{
  label: 'Home',
  to: '/'
}, {
  label: 'All Brands',
  to: '/brands'
}])
</script>

<template>
  <UHeader title="Is This From EU">

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UColorModeSelect />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />

      <USeparator class="my-6" />

      <UButton label="Sign in" color="neutral" variant="subtle" to="/login" block class="mb-3" />
      <UButton label="Sign up" color="neutral" to="/signup" block />
    </template>
  </UHeader>
</template>
