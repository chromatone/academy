<script setup>
import { formatTimeAgo } from '@vueuse/core'

definePageMeta({ middleware: ["auth", "course"] })

const user = useDirectusUser()

const { getItemById } = useDirectusItems()

const route = useRoute()

const showPrice = useShowPrice()

const { getItems } = useDirectusItems()

const { data: course } = await useFetch('/api/get/course', { query: { slug: route.params?.course } })

useHead({
  title: course.value?.title
})

const member = await getItemById({
  collection: 'members',
  id: user?.value?.member,
  params: {
    fields: ['student.id', 'student.courses.*']
  }
})

const studentCourse = computed(() => {
  return member?.student?.[0]?.courses.find(m => m.courses_slug == course.value?.slug)
})
</script>

<template lang='pug'>
.flex.flex-wrap.overflow-clip.items-start.px-4.gap-4

  .max-w-55ch.flex.flex-col.gap-4(style="flex: 1 1 300px")

    PageCover(:id="course?.cover")

    NuxtLink.flex.flex-col.glass.p-4(
      :to="`/programs/${course?.program?.slug}`") 
      .op-50.text-xs.uppercase Program
      .text-xl {{ course?.program?.title }}

    .glass.p-4.flex.flex-col
      .op-50.text-xs.uppercase  Course
      .text-xl {{ course?.title }}

    .glass.gap-4.flex.flex-col.p-4
      .text-md {{ course?.description }}

    .glass.gap-4.flex.flex-col.py-2.px-4(v-if="course?.team")

      .flex.gap-2.items-center 
        .p-0.uppercase.text-xs.op-70 Team 
        NuxtLink(
          v-for="t in course?.team" :key="t"
          :to="`/courses/${route.params?.course}/team/${t?.team_id?.member?.id}/`")
          UserPill(
            :user="t?.team_id?.member?.user") {{ t?.position }}

    .glass.flex.flex-col.p-4
      .op-50.text-xs.uppercase Craft
      NuxtLink.text-xl(:to="`/crafts/${course?.craft?.slug}`") {{ course?.craft.title }}

    .glass.p-4.font-mono.text-xs.flex.flex-col.gap-2(v-if="studentCourse")

      .op-60 STARTED: {{ formatTimeAgo(new Date(studentCourse?.start_date)) }}
      .op-60(v-if="studentCourse?.complete_date") COMPLETED: {{ formatTimeAgo(new Date(studentCourse?.complete_date)) }}

    .glass.gap-4.flex.flex-col.py-2.px-4(v-if="course?.students")

      .flex.gap-2.items-center.flex.flex-wrap.gap-2 
        .p-0.uppercase.text-xs.op-70.w-full Students 
        NuxtLink(
          v-for="t in course?.students" :key="t"
          :to="`/students/${t?.students_id?.member?.id}/`")
          UserPill(
            :user="t?.students_id?.member?.user") 

  .max-w-55ch.gap-4.flex.flex-col(style="flex: 1 1 300px")

    .max-w-55ch.glass(v-if="course?.content")
      MDC.prose.m-4(:value="course?.content || ''" tag="article")
    .glass.p-2.px-4.top-16.z-1000.flex-1.w-full.flex.flex-wrap.items-center
      .text-2xl.flex-1 Modules
      .op-70 {{ course?.modules?.length }}

    NuxtLink.relative.glass.flex.items-center.gap-2.hover-bg-light-900.dark-hover-bg-dark-400(
      v-for="(mod, m) in course?.modules?.sort((a, b) => a?.sort > b?.sort ? 1 : -1)"
      :to="`/courses/${route.params?.course}/${mod?.slug}`"
      @click="!user ? showPrice = true : null"
      )

      //- .absolute.-left-5.font-mono.text-lg.text-end {{ m + 1 }}
      NuxtImg.rounded-xl.self-start(:src="mod?.cover" v-if="mod?.cover" width="80")
      .flex.flex-col.gap-1.p-2
        .text-xl {{ m + 1 }}. {{ mod.title }}
        .text-md {{ mod?.description }}

      .op-70.mx-4(v-if="mod?.units?.length > 0") {{ mod?.units?.length }}
      .i-la-lock.min-w-8.op-80(
        v-if="!user"
        title="You need to log in in order to view these")
</template>