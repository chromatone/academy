<script setup>
const { data: crafts } = await useFetch('/api/get/crafts')
</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-4
  .text-2xl.w-full Crafts 
  NuxtLink.p-4.glass(
    style="flex: 1 1 240px"
    :event="craft"  
    :to="`/crafts/${craft?.slug}`"
    v-for="craft in crafts")
    .text-xl {{ craft?.title }}
</template>