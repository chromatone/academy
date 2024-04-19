<script setup>
const props = defineProps({
  project: { type: Object, default: () => ({}) }
})
</script>

<template lang='pug'>
NuxtLink.flex.items-start.flex-col.gap-2.relative(
  :to="`/projects/${project?.slug}/`") 
  .p-0.overflow-hidden(
    style="flex: 1 1 180px")

    .absolute.z-2.transition.duration-500.w-full.h-auto.grayscale-30.contrast-70.hover-contrast-100.hover-grayscale-0.max-h-80.overflow-clip.rounded-xl
      NuxtImg.w-full.overflow-clip.rounded-xl(
        v-if="project?.cover"
        :src="project?.cover"
        width="300")

  .flex.flex-col.flex-auto.p-4.z-8.glass.mx-2
    .text-xs.uppercase.op-30.hover-op-70.transition {{ project.program?.title }} 
    .text-2xl {{ project.title }}
    .text-md.flex-1.mt-2 {{ project.description }}

    .flex.flex-wrap.gap-2.mt-2
      .flex.gap-1.p-2.bg-light-800.dark-bg-dark-800.self-start.rounded-2xl(v-if="project?.events?.length > 0")  
        b {{ project?.events?.length }} 
        .a events
</template>