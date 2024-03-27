<script setup>
const route = useRoute()

const { getItemById } = useDirectusItems()

const { data: tutor, error } = await useAsyncData('totur-' + route.params?.tutor, async () => await getItemById({
  collection: 'tutors',
  id: route.params?.tutor,
  params: {
    fields: ['*', 'programs.programs_id.title', 'programs.programs_id.slug'
    ]
  }
}))

useHead({
  title: tutor.value?.title,
  titleTemplate: '%s tutor'
})
</script>

<template lang='pug'>
.flex.flex-col.gap-8

  .glass.mx-4.max-w-55ch.flex.flex-col

  .glass.mx-4.max-w-55ch.flex.flex-col
    NuxtImg(:src="tutor?.photo")
    .p-4.flex.flex-col.gap-4
      NuxtLink.text-lg(to="/tutors/") Tutor
      .text-2xl {{ tutor?.first_name }} {{ tutor?.last_name }}
      .text-lg {{ tutor?.title }}
      .text-md {{ tutor?.description }}
  .glass.mx-4.max-w-55ch.p-4.flex.flex-wrap.gap-4.items-center
    .text-xl.p-2 Programs
    NuxtLink.p-2.text-lg.bg-light-700.shadow.rounded-lg.dark-bg-dark-700.border-1.flex-1(
      :to="`/${program?.programs_id?.slug}/`"
      v-for="program in tutor?.programs"
    ) {{ program?.programs_id?.title }}

</template>