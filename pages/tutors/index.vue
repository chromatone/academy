<script setup>
const tutors = await usePublicItems(
  'tutors',
  {
    fields: ['*', {
      user: ['first_name', 'last_name', 'avatar']
    }],
    sort: ['sort']
  }
)

</script>

<template lang='pug'>
.flex.flex-col.gap-4.p-4
  .text-2xl.w-full Tutors 
  NuxtLink.glass.p-4.max-w-55ch.flex.flex-wrap(
    v-for="tutor in tutors"
    :to="`/tutors/${tutor.id}`"
    )
    NuxtImg.rounded-full(
      width="200"
      :src="tutor?.user?.avatar"
      )
    .flex.flex-col.gap-2
      .text-lg {{ tutor?.user?.first_name }} {{ tutor?.user?.last_name }} 


</template>