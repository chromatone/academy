<script setup>
const props = defineProps({
  artifact: { type: Object, default: () => ({}) }
})
</script>

<template lang='pug'>
NuxtLink.p-0.flex.flex-wrap.items-start.gap-4.rounded-xl.overflow-clip.max-w-150.relative(
  :to="`/artifacts/${artifact.slug}/`"
  ) 
  .p-0.max-h-30(style="flex: 1 1 400px")
    NuxtImg.w-full.op-80.hover-op-100.transition(
      title="Cover"
      format="webp"
      width="400"
      :src="artifact?.cover"
      v-if="artifact?.cover"
      )
    .i-la-play-circle.op-80.text-light-400.text-80px.absolute.top-8(style="left:calc(50% - 50px)" v-if="artifact?.youtube_video")
  .flex.flex-col.flex-auto.gap-2.glass.p-2.mx-2.mb-2(style="flex: 1 1 400px")
    .text-xl {{ artifact?.title }}
    .text-sm {{ artifact?.description }}
</template>