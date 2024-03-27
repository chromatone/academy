<script setup>
const { getItems } = useDirectusItems()
const { getThumbnail: img } = useDirectusFiles()

const { data: projects, error } = await useAsyncData('projects', () => getItems({
  collection: 'projects'
}))
</script>

<template lang='pug'>
.p-0.flex.flex-wrap.gap-8
  .text-4xl.p-4.w-full Projects
  ProjectCard(
    v-for="project in projects"
    :project="project"
  )
</template>