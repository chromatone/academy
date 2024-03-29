<script setup>
const props = defineProps({
  project: { type: Object, default: () => ({}) }
})
</script>

<template lang='pug'>
NuxtLink.flex.items-start.flex-col.gap-2.max-w-90.relative(
  :to="`/projects/${project?.slug}/`") 
  .p-0.overflow-hidden(
    style="flex: 1 1 180px")

    .absolute.z-2.transition.duration-500.w-full.h-auto.op-80.hover-op-90.max-h-80.overflow-clip.rounded-xl
      NuxtImg.w-full.overflow-clip.rounded-xl(
        v-if="project?.cover"
        :src="project?.cover"
        width="300")

  .flex.flex-col.flex-auto.p-4.gap-2.z-8.glass.mx-4
    .text-xs.uppercase.op-30.hover-op-70.transition {{ project.program?.title }}
    .text-2xl {{ project.title }}
    .text-md.flex-1 {{ project.description }}

    .flex.gap-1.p-2.bg-light-800.dark-bg-dark-800.self-start(v-if="project?.events?.length > 0")  
      b {{ project?.events?.length }} 
      .a events
</template>