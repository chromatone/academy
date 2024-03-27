<script setup>
const { getItems } = useDirectusItems()

const { data: tutors } = await useAsyncData('tutors', async () => await getItems({
  collection: 'tutors',
  params: {
    sort: ['sort']
  }
}))
</script>

<template lang='pug'>
.flex.flex-col.gap-4.p-4
  .text-2xl.w-full Tutors 
  NuxtLink.glass.p-4.max-w-55ch(
    v-for="tutor in tutors"
      :to="`/tutors/${tutor.id}`"
    )
    .text-lg(
    ) {{ tutor?.first_name }} {{ tutor?.last_name }}
</template>