<script setup>
const route = useRoute()

const { data: units } = await useFetch('/api/list/units')

</script>

<template lang='pug'>
.flex.flex-wrap.gap-4.p-4
  .glass.p-4.flex.flex-col.gap-2 
    .text-2xl Units
  NuxtLink.relative.glass.flex.items-start.gap-2.hover-bg-light-900.dark-hover-bg-dark-400(
    style="flex: 1 1 200px"
    v-for="(unit) in units"
    :to="`/courses/${unit.module?.course?.slug}/${unit?.module?.slug}/${unit?.slug}`"
    )
    .flex.flex-col.gap-1.p-2.h-full
      .text-xs.op-50 {{ unit?.module?.course?.title }}
      .text-sm {{ unit?.module?.title }}
      .text-xl  {{ unit?.title }}
      .text-md.max-h-30.overflow-clip {{ unit?.description }}
      .flex-1

</template>