<template>
  <div class="container mx-auto px-4 py-10 min-h-screen flex flex-col gap-8">
    <AppHeader class="mb-8" />
    <UPage>
      <slot />
    </UPage>
    <AppFooter class="mt-8" />
  </div>
</template>
