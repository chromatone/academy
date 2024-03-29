<script setup>

const projects = await usePublicItems('projects', {
  sort: ['sort'],
  fields: ['slug', 'color', 'title', 'description', 'cover', 'courses', 'events', {
    program: ['title', 'slug']
  }]
})
</script>

<template lang='pug'>
.flex.flex-col.gap-8.p-4
  .text-4xl.w-full Projects
  .flex.flex-wrap.gap-4
    ProjectCard(
      style="flex: 1 1 300px"
      v-for="project in projects"
      :project="project"
      )
</template>