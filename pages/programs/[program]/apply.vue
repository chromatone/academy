<script setup>
const route = useRoute()

const { data: p } = await useFetch('/api/get/program', { query: { slug: route.params?.program } })

useHead({
  title: p.value?.title,
  titleTemplate: '%s course application form'
})
</script>

<template lang='pug'>
.p-0.gap-4.flex-col.flex
  PageCover.mx-4(:id="p?.cover")
  .p-6.max-w-55ch.glass.mx-4.flex.flex-col.gap-4
    NuxtLink.text-4xl(
      :to="`/${p?.slug}`"
    ) {{ p?.title }}
    h2.text-xl Program application form
    //- .text-sm {{ p?.description }}

  .p-4.max-w-55ch.glass.mx-4.flex
    ApplicationForm(:program-id="p?.id")
</template>