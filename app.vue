<script setup>
useHead({
  htmlAttrs: {
    lang: 'en',
    icon: '/logo.svg',
  }
})

const config = useRuntimeConfig()

if (process.env.NODE_ENV == 'production') {
  useHead({
    script: [
      {
        'data-website-id': config.public.umamiId,
        async: '',
        src: config.public.umamiUrl
      }
    ]
  })
}

useSeoMeta({
  title: 'Chromatone academy',
  ogTitle: 'Chromatone Academy',
  description: 'Visual Music Education Community Center',
  ogDescription: 'Visual Music Education Community Center',
  ogImage: 'https://academy.chromatone.center/front.png',
  twitterCard: 'summary_large_image',
})

</script>

<template lang="pug">
NuxtLoadingIndicator(color='purple')
Notivue(v-slot="item")
  Notification(:item="item")
NuxtLayout
  NuxtPage
</template>

<style lang="postcss">
@import url(~/assets/index.postcss);

main a {
  @apply underline
}

body {
  --nv-root-top: 5em;
  @apply bg-light-500 transition overflow-x-hidden min-h-100vh hyphens-auto
}

#__nuxt {
  @apply min-h-100vh flex flex-col overflow-y-clip
}

.dark body {
  @apply bg-dark-300 transition duration-1000 text-light-200;
}
</style>