<script setup>
import { TransitionPresets, useTransition } from '@vueuse/core'

const routes = {
  programs: 'Programs',
  courses: 'Courses',
  modules: 'Modules',
  units: 'Units',
  projects: 'Projects',
  artifacts: 'Artifacts',
  events: 'Events',
  news: 'News'
}

const user = useDirectusUser()

const counts = reactive({})

Object.keys(routes).forEach(async r => {
  const source = ref(0)
  counts[r] = useTransition(source, {
    duration: 1000,
    transition: TransitionPresets.easeInOutCubic,
  })
  const [c] = await $fetch(`/api/count/${r}`)
  source.value = Number(c?.count)
})



</script>

<template lang='pug'>
nav.flex.flex-col.items-stretch.gap-2
  .flex.flex-wrap.p-2.gap-4
    .p-2.flex.flex-col.gap-2.bg-light-100.rounded.shadow.dark-bg-dark-300(
      v-for="(rTitle, r) in routes"
      style="flex: 1 1 150px"
      ) 
      .p-0.text-4xl {{ counts[r].toFixed() }}
      .p-0.text-2xl {{ rTitle }}
      NuxtLink.text-sm(
        v-if="user?.email"
        :to="`/${r}/`") View

  
</template>
