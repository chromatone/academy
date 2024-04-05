<script setup>
const { data: crafts } = await useFetch('/api/get/crafts')
</script>

<template lang='pug'>
.p-0.flex.flex-wrap.gap-2
  .text-2xl.p-4.w-full Crafts 
  EventCard(
    style="flex: 1 1 240px"
    :event="craft"  
    v-for="craft in crafts")
</template>