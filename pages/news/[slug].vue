<script setup>
definePageMeta({ middleware: ["auth"] })
const route = useRoute()

const { data: n } = await useFetch('/api/get/news', { query: { slug: route.params?.slug } })
</script>

<template lang='pug'>
.flex.flex-col.gap-4.px-4
  NuxtLink.glass.p-4.max-w-55ch(to="/news/")
    .text-2xl News

  .glass.p-4.gap-2.flex.flex-col.max-w-55ch
    .text-xs {{ n?.date.slice(0,10) }}
    .text-2xl {{ n?.title }}
    NuxtLink(:to="n?.link" target="_blank") {{ n?.link }}
    .text-md {{ n?.description }}
</template>