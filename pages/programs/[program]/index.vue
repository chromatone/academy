<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'

import { useDateFormat } from '@vueuse/core'

const route = useRoute()

const { data: p } = await useFetch('/api/get/program', { query: { slug: route.params?.program } })


useHead({
  title: p.value?.title,
  titleTemplate: '%s program'
})

const from = useDateFormat(() => p.value?.start_date, 'DD MMM YYYY')
const to = p.value?.end_date ? useDateFormat(() => p.value?.end_date, 'DD MMM YYYY',) : 'Present'


</script>

<template lang='pug'>
.flex.flex-wrap.gap-4.items-start.px-4

  .flex.flex-col.gap-4(
    style="flex: 1 1 300px")


    .glass.gap-4.flex.flex-col.p-4
      .flex.flex-wrap.items-center.gap-0
        NuxtLink.text-xs(to="/programs/") PROGRAM
        .text-2xl.w-full {{ p?.title }}
        .text-md {{ p?.description }}

    PageCover(:id="p?.cover")
    .glass.gap-4.flex.flex-col.p-4

      .flex.gap-2.items-center
        .p-0 Tutors:
        NuxtLink.flex.gap-2.items-center.bg-light-100.dark-bg-dark-100.rounded-full.shadow.pr-4(:to="`/tutors/${p?.tutors[0].tutors_id.id}/`") 
          NuxtImg.rounded-full.max-w-8.max-h-8(:width="50" v-if="p?.tutors[0].tutors_id?.photo" :src="p?.tutors[0].tutors_id?.photo")
          .p-0 {{ p?.tutors?.[0]?.tutors_id?.first_name }} 
          .p-0 {{ p?.tutors?.[0]?.tutors_id?.last_name }}

    NuxtLink.rounded-xl.shadow-lg.p-4.text-2xl.shadow.bg-light-900.dark-bg-dark-900.filter.dark-brightness-62.dark-contrast-400(
      :style="{ backgroundColor: p?.color }"
      :to="`/programs/${route?.params?.program}/apply`") Apply to the program

  .flex.flex-col.gap-4(style="flex: 1 1 300px")

    .max-w-55ch.glass.rounded-2xl.overflow-clip
      LiteYouTubeEmbed(title="Video" :id="p?.youtube")
    .max-w-55ch.glass
      MDC.prose.m-4(:value="p?.content || ''" tag="article")




  .flex.flex-wrap.gap-4.max-w-55ch(
    style="flex: 1 1 300px"
    v-if="p?.courses?.length > 0")
    .mx-2.text-2xl.glass.p-2.sticky.top-16.z-1000.flex-1.w-full Courses
    .flex.flex-wrap.gap-4

      CourseBlock(
        :program="p?.slug"
        :p="course" v-for="course in p?.courses")
        .p-2(v-if="course?.modules?.length > 0") {{ course?.modules?.length }} modules

        //- NuxtLink.text-xl.underline.py-2( :to="`/crafts/${course?.craft?.slug}/`") Learn to become a {{ course?.craft?.title }}

  .flex.flex-wrap.gap-4.z-100(
    style="flex: 1 1 300px"
    v-if="p?.projects?.length > 0"
    )
    .mx-2.text-2xl.glass.p-2.sticky.top-16.z-1000.w-full Projects
    ProjectCard(
      style="flex: 1 1 250px"
      v-for="project in p?.projects"
      :key="project"
      :project="project"
      )

</template>