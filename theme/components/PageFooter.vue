<script setup>
const { data: docs } = await useFetch('/api/list/docs')

const { data: academy } = await useFetch('/api/get/academy')

const routes = {
  programs: 'Programs',
  courses: 'Courses',
  members: 'Members',
  projects: 'Projects',
  events: 'Events',
}
</script>

<template lang='pug'>
footer.bg-dark-900.bg-opacity-20.flex.flex-col.items-stretch

  .flex.flex-wrap.p-2.gap-4
    NuxtLink.p-2.text-xl(
      v-for="(rTitle, r) in routes"
      :to="`/${r}/`"
      ) {{ rTitle }}


  .flex.flex-wrap.gap-2.p-4.py-4.items-center.bg-dark-600.bg-opacity-20
    NuxtLink.text-lg.flex.gap-2(to="/") Chromatone
      .text-lg.op-60 Academy
    .flex-1
    NuxtLink.p-0.text-sm.op-50.hover-op-100.transition(

      :to="`/docs/${doc.slug}/`"
      v-for="doc in docs" :key="doc") {{ doc.title }}
    NuxtLink.text-sm.op-30.hover-op-80(:to="academy?.github_repo" target="_blank") v.{{ academy?.version }} 
    .text-sm.op-50 2024
  .flex.flex-wrap.gap-4.py-2.bg-dark-100.bg-opacity-40.px-4
  
</template>
