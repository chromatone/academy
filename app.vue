<script setup>

const config = useRuntimeConfig()

useHead({
  titleTemplate: '%s %separator Chromatone Academy',
  templateParams: {
    separator: '·',
  },
  htmlAttrs: {
    lang: 'en',
  },
  link: [{
    rel: "icon",
    type: "image/svg+xml", href: "/logo.svg"
  }],
  script: [
    ['production', 'prerender'].includes(process.env.NODE_ENV) ? {
      'data-website-id': config.public.umamiId,
      async: '',
      src: config.public.umamiUrl
    } : false
  ].filter(Boolean)
})

useSeoMeta({
  viewport: 'width=device-width, initial-scale=1.0',
  charset: 'utf-8',
  themeColor: '#D3D3E8',
  applicationName: 'Academy',
  author: "Denis Starov",
  creator: 'Chromatone',

  title: 'Chromatone Academy',
  description: 'Visual Music Language Education Research Center. Join the global community of students, researchers and teachers of new approach to music. Async non-linear courses, group activities and personal guidance available for subscribed members.',

  ogTitle: 'Chromatone Academy',
  ogSiteName: 'Chromatone Academy',
  ogDescription: 'Visual Music Language Education Research Center. Join the global community of students, researchers and teachers of new approach to music. Async non-linear courses, group activities and personal guidance available for subscribed members.',
  ogImage: 'https://academy.chromatone.center/cover.jpg',
  ogImageType: 'image/jpeg',
  ogImageAlt: 'Chromatone Academy - Study and Perform with Visual Music Language',

  twitterCard: 'summary_large_image',
  twitterLabel1: 'Visual Music Language',
  twitterLabel2: 'Online Education Center',
  twitterSite: '@davay42',
  twitterCreator: '@davay42',
  twitterImageType: 'image/jpeg',
  twitterImage: 'https://academy.chromatone.center/cover.jpg',

})

const { loggedIn, user, session, clear } = useUserSession()

</script>

<template lang="pug">
NuxtLoadingIndicator(color='purple')
Notivue(v-slot="item")
  Notification(:item="item")
NuxtLayout
  NuxtPage
</template>

<style lang="postcss">
@import '~/assets/layout.postcss'
</style>