<script setup>
import { useDateFormat } from '@vueuse/core'

const props = defineProps({
  event: { type: Object, default: () => ({}) }
})

const date = useDateFormat(() => props.event?.date, 'DD MMM YYYY')
</script>

<template lang='pug'>
NuxtLink.p-0.flex.flex-wrap.items-start.gap-4.rounded-xl.overflow-clip.max-w-150.relative(
  :to="`/events/${event.slug}/`"
  ) 
  .p-0.max-h-30(style="flex: 1 1 400px")
    NuxtImg.w-full.op-80.hover-op-100.transition(
      title="Cover"
      format="webp"
      width="400"
      :src="event?.cover"
      v-if="event?.cover"
      )
    .i-la-play-circle.op-80.text-light-400.text-80px.absolute.top-8(style="left:calc(50% - 50px)" v-if="event?.youtube_video || event?.live_stream")
  .flex.flex-col.flex-auto.gap-2.glass.p-2.mx-2.mb-2(style="flex: 1 1 400px")
    .text-md {{ date }}
    .text-xl {{ event?.title }}
    .text-sm {{ event?.description }}
</template>