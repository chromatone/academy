<script setup>

definePageMeta({ middleware: ["auth"] })

const route = useRoute()

const { getItemById } = useDirectusItems()

const { data: member, error } = await useAsyncData('member-' + route.params?.id, async () => await getItemById({
  collection: 'members',
  id: route.params?.id,
  params: {
    fields: ['active', 'role', 'user', 'student.*',
    ]
  }
}))

const { academy } = await useMeta()

const { data: user } = await useFetch('/api/get/user', {
  method: 'POST',
  body: {
    user: member.value?.user
  }
})

</script>

<template lang='pug'>
.p-4.flex.flex-wrap.flex-1.gap-4
  .flex.flex-col.gap-4.flex-1
    NuxtLink.glass.p-4.flex-1(to="/students/")
      .text-xl Student
    .rounded-full.overflow-clip.max-w-64.max-h-64
      NuxtImg(width="300" :src="user?.avatar || academy?.default_avatar")
    .glass.p-4.flex.flex-col.gap-4
      .flex.gap-2.flex-wrap
        .text-2xl {{ user?.first_name }}
        .text-2xl {{ user?.last_name }}
  .flex.flex-col.gap-4(
    style="flex: 1 1 400px"
    )

    .glass.p-4 {{ member?.student?.[0] }}

    //-   .flex.flex-wrap.gap-2.items-center
    //-     .text-xl(style="flex: 1 1 160px") Programs 

    //-     NuxtLink.bg-light-200.dark-bg-dark-400.p-2.shadow(
    //-       style="flex: 1 1 160px"
    //-       :to="`/programs/${program?.programs_id.slug}/`"
    //-       v-for="program in member?.team?.[0]?.programs" :key="program") {{ program?.programs_id.title }} 
    //-       .op-50 {{ program?.position }}

    //- .glass.p-4

    //-   .flex.flex-wrap.gap-2.items-center
    //-     .text-xl(style="flex: 1 1 160px") Courses 

    //-     NuxtLink.bg-light-200.dark-bg-dark-400.p-2.shadow(
    //-       style="flex: 1 1 160px"
    //-       :to="`/courses/${course?.courses_slug?.slug}/`"
    //-       v-for="course in member?.team?.[0]?.courses.filter(c=>c?.courses_slug)" :key="course") {{ course?.courses_slug?.title }} 
    //-       .op-50 {{ course?.position }}
</template>