<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import { useDateFormat } from '@vueuse/core'

const route = useRoute()

// definePageMeta({ middleware: ["auth"] })

const { getItems } = useDirectusItems()


const { data: crafts, error } = await useAsyncData('craft-' + route.params?.slug, async () => await getItems({
  collection: 'crafts',
  params: {
    filter: {
      slug: {
        _eq: route.params?.slug
      }
    },
    fields: ['*',]
  }
}))

const p = computed(() => crafts.value?.[0])

useHead({
  title: p.value?.title,
  titleTemplate: '%s event'
})

const date = useDateFormat(() => p.value?.date, 'DD MMM YYYY')
</script>

<template lang='pug'>
.p-0 

  .text-2xl {{ p?.title }}

  .font-mono {{ p }}

  //- PageCover(:id="p?.cover")

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