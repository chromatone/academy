<script setup>

const routes = {
  programs: 'Programs',
  projects: 'Projects',
  courses: 'Courses',
  events: 'Events',
  news: 'News',
  calendar: 'Calendar',
  crafts: 'Crafts',
}
</script>

<template lang='pug'>
nav.bg-dark-900.bg-opacity-20.flex.flex-col.items-stretch

  .flex.flex-wrap.p-2.gap-4
    NuxtLink.p-2.text-xl(
      v-for="(rTitle, r) in routes"
      :to="`/${r}/`"
      ) {{ rTitle }}

  
</template>
