<script setup>
useSeoMeta({
  title: 'Is this from EU? - Check brand origins',
  description: 'Find out if a brand is European or not. A simple application to check product origins.',
  ogTitle: 'Is this from EU? - The app to verify brand origins',
  ogDescription: 'Instantly find out if a brand is European or not with our search tool.',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const { $pwa } = useNuxtApp()
const toast = useToast()

onMounted(() => {
  if ($pwa.offlineReady)
    toast.success('App ready to work offline')
})
</script>

<template>
  <UApp>
    <div v-if="$pwa && $pwa.needRefresh">
      <span>
        New content available, click on reload button to update.
      </span>

      <button @click="$pwa.updateServiceWorker()">
        Reload
      </button>
    </div>
    <NuxtPwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
