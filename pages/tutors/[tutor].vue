<script setup>
const route = useRoute()

const tutor = await usePublicItem('tutors', route.params?.tutor, {
  fields: ['*', 'programs.programs_id.title', 'programs.programs_id.slug'
  ]
})

useHead({
  title: tutor.value?.title,
  titleTemplate: '%s tutor'
})
</script>

<template lang='pug'>
.flex.flex-wrap.gap-8.mx-4.items-start

  .flex.flex-wrap.gap-4.items-start.max-w-55ch(style="flex: 1 1 200px")
    .glass.flex.flex-col.p-4.flex.flex-col.gap-4.w-full
      NuxtLink.text-lg(to="/tutors/") Tutor
      .text-4xl {{ tutor?.first_name }} {{ tutor?.last_name }}
      .text-lg {{ tutor?.title }}
    .glass.flex.flex-col.overflow-clip
      NuxtImg(:src="tutor?.photo")

  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 300px")
    .glass.p-4.flex.flex-wrap.gap-4.items-center
      .text-md.leading-loose {{ tutor?.description }}

    .glass.p-4.flex.flex-wrap.gap-4.items-center
      .text-xl.p-2 Programs
      NuxtLink.p-2.text-lg.bg-light-700.shadow.rounded-lg.dark-bg-dark-700.border-1.flex-1(
        :to="`/programs/${program?.programs_id?.slug}/`"
        v-for="program in tutor?.programs"
        ) {{ program?.programs_id?.title }}

</template>