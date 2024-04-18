<script setup>
const { data: skills } = await useFetch('/api/list/skills')
</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-4
  .text-2xl.w-full Skills 
  NuxtLink.p-4.glass(
    style="flex: 1 1 240px"
    :to="`/crafts/skills/${skill?.slug}`"
    v-for="skill in skills")
    .text-xl {{ skill?.title }}
    pre {{ skill }}
</template>