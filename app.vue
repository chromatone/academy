<script setup>
useHead({
  htmlAttrs: {
    lang: 'en',
    icon: '/logo.svg',
  }
})

if (process.env.NODE_ENV == 'production') {
  useHead({
    script: [
      {
        'data-website-id': 'b6e6f7c9-19cd-4e1d-b507-56b3900e2baa',
        async: '',
        src: 'https://stats.chromatone.center/script.js'
      }
    ]
  })
}

useSeoMeta({
  title: 'Chromatone academy',
  ogTitle: 'Chromatone Academy',
  description: 'Visual Music Education Community Center',
  ogDescription: 'Visual Music Education Community Center',
  ogImage: '/front.png',
  twitterCard: 'summary_large_image',
})

</script>

<template lang="pug">
NuxtLoadingIndicator(color='purple')
NuxtLayout
  NuxtPage
</template>

<style lang="postcss">
@import url(~/assets/index.postcss);

body {
  @apply bg-light-500 transition overflow-x-hidden min-h-100vh hyphens-auto
}

#__nuxt {
  @apply min-h-100vh flex flex-col overflow-y-clip
}

.dark body {
  @apply bg-dark-300 transition duration-1000 text-light-200;
}
</style>