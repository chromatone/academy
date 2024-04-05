<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import { useDateFormat } from '@vueuse/core'

const route = useRoute()

// definePageMeta({ middleware: ["auth"] })
const { data: p } = await useFetch('/api/get/craft', { query: { slug: route.params?.slug } })

useHead({
  title: p.value?.title,
  titleTemplate: '%s event'
})

const date = useDateFormat(() => p.value?.date, 'DD MMM YYYY')
</script>

<template lang='pug'>
.flex.flex-wrap.gap-4.p-4

  PageCover(:id="p?.cover")

  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 200px")
    .glass.p-2
      NuxtLink.text-sm.uppercase.op-60(to="/crafts/") Craft
      .text-2xl {{ p?.title }}
      .text-lg {{ p?.description }}

    .glass.p-2.flex.flex-col.gap-2.p-2
      .text-sm.uppercase.op-60 Skills
      .p-2.border-1.rounded-lg(v-for="skill in p?.skills" :key="skill") {{ skill?.title }}

    .glass.p-2.flex.flex-col.gap-2.p-2
      NuxtLink.text-sm.uppercase.op-60(to="/courses/") Courses
      NuxtLink.p-2.border-1.rounded-lg(
        :to="`/courses/${course?.slug}/`"
        v-for="course in p?.courses" :key="course") {{ course?.title }}

  .glass.p-2.max-w-55ch(style="flex: 1 1 400px")
    MDC.prose.text-lg(:value="p?.content || ''" tag="article")



  //- .glass.mx-4.max-w-55ch.mt-40.flex.flex-col

  //-   NuxtLink.p-2.text-lg.flex.gap-2.flex-wrap(
  //-     :style="{backgroundColor: p?.project?.program?.color}"
  //-     :to="`/${p?.project?.program?.slug}/`") {{ p?.project?.program?.title }} 
  //-     .flex-1
  //-     .op-50 program
  //- .glass.mx-4.max-w-55ch.my-2.flex.flex-col
  //-   NuxtLink.p-2.text-lg.flex.gap-2.flex-wrap(:to="`/projects/${p?.project?.slug}/`") {{ p?.project.title }}
  //-     .flex-1
  //-     .op-50 project
  //- .glass.mx-4.max-w-55ch.my-2.flex.flex-col
  //-   NuxtPicture.w-full(
  //-     v-if="p?.poster"
  //-     :src="p?.poster"
  //-     :img-attrs="{class:'w-full'}"
  //-     )

  //-   .p-4.gap-4.flex.flex-col
  //-     .flex.gap-2.flex-wrap.items-center
  //-       .text-4xl {{ p?.title }}
  //-       .flex-auto
  //-       NuxtLink.op-50(to="/events/") event

  //-     .text-2xl.op-70 {{ date }} @ {{ p?.place?.title }}

  //-     .text-lg.max-w-55ch {{ p?.description }}



  //-   LiteYouTubeEmbed(
  //-     title="Video" 
  //-     :id="p?.youtube_video" 
  //-     v-if="p?.youtube_video")

  //-   EventSchedule(:schedule="p?.schedule")

  //-   MDC.prose.p-4(:value="p?.content || ''" tag="article")

  //-   LiteYouTubeEmbed(
  //-     title="Video" 
  //-     :id="p?.live_stream" 
  //-     v-if="p?.live_stream")

  //- .glass.mx-4.max-w-55ch.my-2.flex.flex-col
  //-   NuxtLink.p-2.text-lg.flex.gap-2.flex-wrap(:to="`/projects/${p?.project?.slug}/`") {{ p?.project.title }}
  //-     .flex-1
  //-     .op-50 project

  //- .glass.mx-4.max-w-55ch.mt-4.flex.flex-col

  //-   NuxtLink.p-2.text-lg.flex.gap-2.flex-wrap(
  //-     :style="{backgroundColor: p?.project?.program?.color}"
  //-     :to="`/${p?.project?.program?.slug}/`") {{ p?.project?.program?.title }} 
  //-     .flex-1
  //-     .op-50 program
</template>