<script setup>
const route = useRoute()

const { getItems } = useDirectusItems()

const { data: programs, error } = await useAsyncData('program-s-' + route.params?.program, async () => await getItems({
  collection: 'programs',
  params: {
    filter: {
      slug: {
        _eq: route.params?.program
      }
    },
    fields: ['*']
  }
}))

const p = computed(() => programs.value?.[0])

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