<script setup>
import { formatTimeAgo } from '@vueuse/core'

definePageMeta({ middleware: ["auth", "course"] })

const route = useRoute()

const { data: module } = await useFetch('/api/get/module', { query: { slug: route.params?.module } })

useHead({
  title: module.value?.title,
  titleTemplate: '%s module'
})

const user = useDirectusUser();

const { getItemById } = useDirectusItems()

const member = await getItemById({
  collection: 'members',
  id: user?.value?.member,
  params: {
    fields: ['student.id', 'student.modules.*']
  }
})

const { token } = useDirectusToken()

const studentModule = computed(() => {
  return member?.student?.[0]?.modules.find(m => m.modules_id == module.value?.id)
})

const body = {
  modules_id: module.value?.id,
  students_id: member?.student?.[0]?.id,
  token: token.value
}

const applyModule = useFetch('/api/apply/module', {
  method: 'POST',
  body
})

</script>

<template lang='pug'>
.flex.flex-wrap.gap-4.p-4

  .flex.flex-col.gap-2.max-w-55ch(style="flex: 1 1 300px")

    .glass.p-4.gap-4.flex.flex-col
      NuxtLink.uppercase.text-sm.flex(:to="`/programs/${module?.course?.program?.slug}/`") 
        .p-0 {{ module?.course?.program?.title }}
        .flex-1
        .p-0.op-60 Program


    NuxtLink.gap-2.glass.p-4.text-sm.flex.flex-col(:to="`/courses/${module?.course?.slug}`") 
      .text-xs.op-60.uppercase Course
      .p-0.text-xl {{ module?.course?.title }}

    .glass.p-4.gap-2.flex.flex-col

      .p-0.uppercase.text-xs.op-60 Module
      .p-0.text-2xl {{ module?.title }}

      .text-md {{ module?.description }}


    .glass.gap-4.flex.flex-col.py-2.px-4(v-if="module?.team")

      .flex.gap-2.items-center 
        .p-0.uppercase.text-xs.op-70 Team 
        NuxtLink(
          v-for="t in module?.team" :key="t"
          :to="`/team/${t?.team_id?.member?.id}/`")
          UserPill(
            :user="t?.team_id?.member?.user") {{ t?.position }}

    PageCover(:id="module?.cover")

    .glass.p-4.font-mono.text-xs.flex.flex-col.gap-2
      template(v-if="studentModule")
        .op-60 FIRST OPEN: {{ formatTimeAgo(new Date(studentModule?.first_visit)) }}
        .op-60 LAST VISIT: {{ formatTimeAgo(new Date(studentModule?.last_visit)) }}
      template(v-else)
        p Welcome! 



    .glass.gap-4.flex.flex-col.py-2.px-4(v-if="module?.students")
      .flex.gap-2.items-center 
        .p-0.uppercase.text-xs.op-70 Students 
        NuxtLink(
          v-for="t in module?.students" :key="t"
          :to="`/students/${t?.students_id?.member?.id}/`")
          UserPill(
            :user="t?.students_id?.member?.user") 



  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 300px")

    .glass.max-w-55ch.px-4(v-if="module?.content")
      MDC.prose.text-lg(:value="module?.content || ''" tag="article")

    .glass.p-4.gap-4.flex.items-center.uppercase
      .w-full.text-sm Units
      .flex-1 
      .text-sm {{ module?.units?.length }}
      .i-la-angle-down


    NuxtLink.gap-2.flex.flex-col.glass.p-4(
      v-for="unit in module?.units"
      :to="`/courses/${route.params?.course}/${route.params?.module}/${unit?.slug}`"
      )
      .flex.items-center.gap-2
        .text-xl {{ unit?.title }}
        .flex-1 
        .text-sm.uppercase.op-60 {{ unit?.type }}
      .text-md(v-if="unit?.description") {{ unit?.description }}
      .max-h-60.overflow-clip.flex.flex-col.items-center.relative.justify-center 
        NuxtImg.w-full(v-if="unit?.cover" :src="unit?.cover" width="400")
        .i-la-play-circle.text-6xl.absolute(v-if="unit?.youtube")
        
</template>