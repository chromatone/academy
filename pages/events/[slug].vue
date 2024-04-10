<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import { useDateFormat } from '@vueuse/core'

// definePageMeta({ middleware: ["auth"] })

const route = useRoute()

const { data: event } = await useFetch('/api/get/event', { query: { slug: route.params.slug } })

useHead({
  title: event.value?.title,
  titleTemplate: '%s event'
})

const date = useDateFormat(() => event.value?.date, 'DD MMM YYYY')
</script>

<template lang='pug'>
.px-4.flex.flex-wrap.gap-4.items-start



  .max-w-55ch.flex.flex-col.gap-4(style="flex: 1 1 300px")

    NuxtLink.glass.p-2.text-lg.flex.gap-2.flex-wrap(
      :to="`/programs/${event?.project?.program?.slug}/`") {{ event?.project?.program?.title }} 
      .flex-1
      .op-50 program

    NuxtLink.glass.p-2.text-lg.flex.gap-2.flex-wrap(:to="`/projects/${event?.project?.slug}/`") {{ event?.project?.title }}
      .flex-1
      .op-50 project

    NuxtImg.w-full.rounded-xl.shadow-lg(
      v-if="event?.cover"
      :src="event?.cover"
      width="600"
      )

    .glass.p-4.flex-col.flex.gap-4
      .flex.gap-2.flex-wrap.items-center
        .text-3xl {{ event?.title }}
        .flex-auto
        NuxtLink.op-50(to="/events/") event

      .text-xl.op-70 {{ date }} @ {{ event?.place?.title }}

      .text-lg {{ event?.description }}

    NuxtImg.w-full.rounded-xl.shadow-lg(
      v-if="event?.poster && event?.poster != event?.cover"
      :src="event?.poster"
      width="400"
      )


  .max-w-55ch.flex.flex-col.gap-4(style="flex: 1 1 300px")

    LiteYouTubeEmbed(
      title="Video" 
      :id="event?.youtube_video" 
      v-if="event?.youtube_video")

    .glass

      EventSchedule(:schedule="event?.schedule")

      MDC.prose.p-4(:value="event?.content || ''" tag="article")

    LiteYouTubeEmbed(
      title="Video" 
      :id="event?.live_stream" 
      v-if="event?.live_stream")

</template>