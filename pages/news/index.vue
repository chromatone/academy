<script setup>


const { data: news } = await useFetch('/api/list/news')

</script>

<template lang='pug'>
.p-4.flex.flex-col.gap-2 
  .glass.p-4.flex.items-baseline.gap-2
    .text-3xl News
  .p-3.flex.flex-col.gap-4 
    NuxtLink.p-2.glass(
      v-for="n in news"
      :to="`/news/${n?.slug}`"
      ) {{ n?.title }}
    
</template>