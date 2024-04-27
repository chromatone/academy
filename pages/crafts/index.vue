<script setup>
const { data: crafts } = await useFetch('/api/list/crafts')
</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-4
  .text-2xl.w-full Crafts 
  NuxtLink.flex.flex-wrap.max-w-55ch(
    style="flex: 1 1 240px"
    :event="craft"  
    :to="`/crafts/${craft?.slug}`"
    v-for="craft in crafts")
    NuxtImg.self-start.rounded-xl(
      v-if="craft?.cover"
      :src="craft?.cover"
      width="420"
      )
    .p-4.glass.-mt-30.mx-2.max-w-400px
      .text-2xl {{ craft?.title }}
      .text-md {{ craft?.description }}
</template>