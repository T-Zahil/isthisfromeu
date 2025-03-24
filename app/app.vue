<script setup>
useSeoMeta({
  title: 'Is it European? - Check brand origins',
  description: 'Find out if a brand is European or not. A simple application to check product origins.',
  ogTitle: 'Is it European? - The app to verify brand origins',
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
</script>

<template>
  <div class="min-h-screen">
    <NuxtPage />
  </div>
</template>
