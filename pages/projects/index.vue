<script setup>

const { data: projects } = await useFetch('/api/list/projects')
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