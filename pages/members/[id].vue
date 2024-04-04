<script setup>
const route = useRoute()

const { getItemById } = useDirectusItems()

const { data: student, error } = await useAsyncData('student-' + route.params?.id, async () => await getItemById({
  collection: 'students',
  id: route.params?.id,
  params: {
    fields: ['*']
  }
}))

const { academy } = await useMeta()

</script>

<template lang='pug'>
.p-4.flex.flex-col.max-w-55ch.flex-1.gap-4
  NuxtLink.glass.p-4.flex-1(to="/members/")
    .text-2xl Members
  .glass.p-4.flex.flex-col.gap-4
    .rounded-full.overflow-clip.max-w-64.max-h-64
      NuxtImg(width="300" :src="student?.avatar || academy?.default_avatar")
    .text-2xl {{ student?.first_name }}
</template>