<script setup>
definePageMeta({
  middleware: ["auth", async (to) => {
    const user = useDirectusUser();

    const { getItemById } = useDirectusItems()

    const member = await getItemById({
      collection: 'members',
      id: user.value?.member,
      params: {
        fields: ['active']
      }
    })
    if (!member.active) {
      return navigateTo(`/membership/subscribe/`)
    }
    console.log(member)
  }]
})

const route = useRoute()

const user = useDirectusUser()

const { data: course } = await useFetch('/api/get/course', { query: { slug: route.params?.course } })

const isStudent = computed(() => !!course.value?.students?.find(s => s?.students_id.member.user == user.value.id))

watchEffect(() => {
  if (isStudent.value)
    navigateTo(`/courses/${route.params?.course}/`)
})

useHead({
  title: course.value?.title,
  titleTemplate: '%s course'
})

</script>

<template lang='pug'>
.flex.flex-wrap.overflow-clip.items-start.px-4.gap-4 

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
        NuxtLink(
          v-for="t in course?.team" :key="t"
          :to="`/team/${t?.team_id?.member?.id}/`")
          UserPill(
            :user="t?.team_id?.member?.user") {{ t?.position }}

    PageCover(:id="course?.cover")

    .glass.gap-4.flex.flex-col.py-2.px-4(v-if="course?.students")

      .flex.gap-2.items-center 
        .p-0.uppercase.text-xs.op-70 Students 
        NuxtLink(
          v-for="t in course?.students" :key="t"
          :to="`/students/${t?.students_id?.member?.id}/`")
          UserPill(
            :user="t?.students_id?.member?.user") 

  .max-w-55ch.gap-4.flex.flex-col(style="flex: 1 1 300px")

    CourseApply(:course="course?.slug")
</template>