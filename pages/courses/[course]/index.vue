<script setup>
// definePageMeta({ middleware: ["auth"] })

const user = useDirectusUser()

const route = useRoute()

const showPrice = useShowPrice()

const { getItems } = useDirectusItems()

const { data: course } = await useFetch('/api/get/course', { query: { slug: route.params?.course } })

useHead({
  title: course.value?.title,
  titleTemplate: '%s course'
})
</script>

<template lang='pug'>
.flex.flex-wrap.overflow-clip.items-start.p-4.gap-2 

  .max-w-55ch.flex.flex-col.gap-4(style="flex: 1 1 300px")

    NuxtLink.flex.flex-col.glass.p-4(
      :to="`/programs/${course?.program?.slug}`") 
      .op-50.text-xs.uppercase Program
      .text-xl {{ course?.program?.title }}

    .glass.p-4.flex.flex-col
      .op-50.text-xs.uppercase  Course
      .text-xl {{ course?.title }}

    .glass.gap-4.flex.flex-col.p-4
      .text-md {{ course?.description }}

    .glass.flex.flex-col.p-4
      .op-50.text-xs.uppercase Craft
      NuxtLink.text-xl(:to="`/crafts/${course?.craft?.slug}`") {{ course?.craft.title }}

    .glass.gap-4.flex.flex-col.py-2.px-4(v-if="course?.team")

      .flex.gap-2.items-center 
        .p-0.uppercase.text-xs.op-70 Team 
        UserPill(
          v-for="t in course?.team" :key="t"
          :user="t?.team_id?.member?.user") {{ t?.position }}

    PageCover(:id="course?.cover")

    .glass.gap-4.flex.flex-col.py-2.px-4(v-if="course?.students")

      .flex.gap-2.items-center 
        .p-0.uppercase.text-xs.op-70 Students 
        UserPill(
          v-for="t in course?.students" :key="t"
          :user="t?.students_id?.member?.user")

  .max-w-55ch.gap-4.flex.flex-col(style="flex: 1 1 300px")
    .text-2xl.glass.p-2.sticky.top-16.z-1000.flex-1.w-full Modules
    NuxtLink.glass.p-2.flex.items-baseline.gap-1.hover-bg-light-900.dark-hover-bg-dark-400(
      v-for="(mod, m) in course?.modules?.sort((a, b) => a?.sort > b?.sort ? 1 : -1)"
      :to="user ? `/courses/${route.params?.course}/${mod?.slug}` : '/auth/login'"
      @click="!user ? showPrice = true : null"
      )
      .font-mono.text-lg.min-w-8.text-end {{ m + 1 }}.
      .flex.flex-col.gap-1
        .text-xl {{ mod.title }}
        .text-md {{ mod?.description }}
      .flex-1
      .op-70.mx-2 {{ mod?.unitcourse?.length }}
      .i-la-lock.min-w-8.op-80(
        v-if="!user"
        title="You need to log in in order to view these")
</template>