<script setup lang="ts">
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-(--ui-text-muted) text-sm">Copyright © {{ new Date().getFullYear() }}</p>
    </template>

    <div class="text-center text-xs text-gray-500">
      <p>Open-source application to identify brand origins, by <NuxtLink class="strong text-green-600"
          to="https://uneed.best" target="_blank">
          Uneed</NuxtLink>
      </p>
      <p class="mt-1">Contribute to the project by adding new brands!</p>
    </div>

    <template #right>
      <UButton to="https://github.com/T-Zahil/isthisfromeu" target="_blank" icon="i-ph-github-logo-duotone"
        variant="link" class="text-gray-500 mt-2">
        <span>View on GitHub</span>
      </UButton>
    </template>
  </UFooter>
</template>
