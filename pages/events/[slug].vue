<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import { useDateFormat } from '@vueuse/core'

const config = useRuntimeConfig()

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

    NuxtImg.w-full.rounded-xl.shadow-lg(
      v-if="event?.cover"
      :src="event?.cover"
      width="400"
      )

    NuxtLink.glass.p-4.text-lg.flex.gap-2.flex-wrap.items-center(
      :to="`/programs/${event?.project?.program?.slug}/`") {{ event?.project?.program?.title }} 
      .flex-1
      .op-50.uppercase.text-xs program

    NuxtLink.glass.p-4.text-lg.flex.gap-2.flex-wrap.items-center(:to="`/projects/${event?.project?.slug}/`") {{ event?.project?.title }}
      .flex-1
      .op-50.uppercase.text-xs project

    .glass.p-4.flex-col.flex.gap-4
      .flex.gap-2.flex-wrap.items-center
        .text-2xl {{ event?.title }}
        .flex-auto
        NuxtLink.op-50(to="/events/") event

      .text-xl.op-70 {{ date }} @ {{ event?.place?.title }}

      .text-lg {{ event?.description }}

      .text-sm {{ event?.announcement }}

    .glass.p-4.w-full.flex.flex-col.gap-4(v-if="event?.media")
      .text-xl Media downloads
      a.p-2.shadow.flex.flex-wrap.gap-2.bg-light-300.bg-op-30.rounded-xl.relative.items-center(
        :href="`${config.public.dbUrl}/assets/${file.directus_files_id?.id}?download`"
        target="_blank" 
        :download="file?.directus_files_id?.title"
        v-for="file in event?.media" :key="file") 
        .i-la-file-download
        .p-0 {{ file.directus_files_id?.title }}
        .absolute.right-2.op-40  {{ file.directus_files_id?.type }}

  .max-w-55ch.flex.flex-col.gap-4(style="flex: 1 1 300px")

    NuxtImg.w-full.rounded-xl.shadow-lg(
      v-if="event?.poster && event?.poster != event?.cover"
      :src="event?.poster"
      width="400"
      )

    LiteYouTubeEmbed(
      title="Video" 
      :id="event?.youtube_video" 
      v-if="event?.youtube_video")

    .glass

      EventSchedule(v-if="event?.schedule" :schedule="event?.schedule")

      MDC.prose.p-4(v-if="event?.content" :value="event?.content" tag="article")

    LiteYouTubeEmbed(
      title="Video" 
      :id="event?.live_stream" 
      v-if="event?.live_stream")

</template>