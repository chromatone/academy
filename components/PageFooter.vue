<script setup>
const route = useRoute()

const { getItems } = useDirectusItems()

const { data: programs } = await useAsyncData('footer-programs', async () => await getItems({
  collection: 'programs',
  params: {
    sort: ['sort'],
    fields: ['title', 'slug', 'color']
  }
}))

const { data: docs, error } = await useAsyncData('docs-titles', () => getItems({
  collection: 'academy_docs',
  fields: ['title', 'slug']
}))

const routes = {
  programs: 'Programs',
  courses: 'Courses',
  projects: 'Projects',
  events: 'Events',
  students: 'Students'
}
</script>

<template lang='pug'>
footer.bg-dark-900.bg-opacity-20.flex.flex-col.items-stretch
  //- .flex.flex-wrap
    NuxtLink.p-4.flex-1.text-lg.bg-dark-900(
      :style="{backgroundColor: route.path.includes(program.slug) ? program.color+'50': '#ccc3'}"
      :to="`/p/${program.slug}/`"
      v-for="program in programs" :key="program") {{ program.title }}
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
    .text-sm.op-50 2024
  .flex.flex-wrap.gap-4.py-2.bg-dark-100.bg-opacity-40.px-4
  
</template>
