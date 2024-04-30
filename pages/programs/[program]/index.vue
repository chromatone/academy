<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'

import { useDateFormat } from '@vueuse/core'

const route = useRoute()

const { data: p } = await useFetch('/api/get/program', { query: { slug: route.params?.program } })


useHead({
  title: p.value?.title,
})

const from = useDateFormat(() => p.value?.start_date, 'DD MMM YYYY')
const to = p.value?.end_date ? useDateFormat(() => p.value?.end_date, 'DD MMM YYYY',) : 'Present'


</script>

<template lang='pug'>
.flex.flex-wrap.gap-8.items-start.px-4

  .flex.flex-col.gap-4(
    style="flex: 1 1 300px")


    .glass.gap-4.flex.flex-col.p-4
      .flex.flex-wrap.items-center.gap-0
        NuxtLink.text-xs(to="/programs/") PROGRAM
        .text-2xl.w-full {{ p?.title }}
    .glass.gap-4.flex.flex-col.p-4
      .text-md {{ p?.description }}

    .glass.gap-4.flex.flex-col.py-2.px-4(v-if="p?.team")

      .flex.gap-2.items-center 
        .p-0.uppercase.text-xs.op-70 Team 
        UserPill(
          v-for="t in p?.team" :key="t"
          :user="t?.team_id?.member?.user") {{ t?.position }}

    PageCover(:id="p?.cover")


    //- NuxtLink.rounded-xl.shadow-lg.p-4.text-2xl.shadow.bg-light-900.dark-bg-dark-900.filter.dark-brightness-62.dark-contrast-400(
    //-   :style="{ backgroundColor: p?.color }"
    //-   :to="`/programs/${route?.params?.program}/apply`") Apply to the program

  .flex.flex-col.gap-4(style="flex: 1 1 300px")

    .max-w-55ch.glass.rounded-2xl.overflow-clip
      LiteYouTubeEmbed(title="Video" :id="p?.youtube")
    .max-w-55ch.glass
      MDC.prose.m-4(:value="p?.content || ''" tag="article")


  .flex.flex-wrap.gap-4(
    style="flex: 1 1 300px"
    v-if="p?.courses?.length > 0")
    .flex.items-center.glass.p-2.z-1000.flex-1.w-full   
      .text-xl.flex-1 Courses
      .text-sm.px-2.op-80 {{ p?.courses?.length }}
    .flex.flex-wrap.gap-4

      CourseBlock(
        :program="p?.title"
        :p="course" v-for="course in p?.courses")



  .flex.flex-wrap.gap-4.z-100(
    style="flex: 1 1 300px"
    v-if="p?.projects?.length > 0"
    )
    .flex.items-center.glass.p-2.z-1000.w-full   
      .text-xl.flex-1 Projects
      .text-sm.px-2.op-80 {{ p?.projects?.length }}
    ProjectCard(
      style="flex: 1 1 250px"
      v-for="project in p?.projects"
      :key="project"
      :project="project"
      )

</template>