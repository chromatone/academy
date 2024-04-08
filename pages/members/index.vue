<script setup>
const { getItems } = useDirectusItems()

const { data: students } = await useFetch('/api/list/students')

const { academy } = await useMeta()
</script>

<template lang='pug'>

.p-4.flex.flex-col.max-w-55ch.flex-1.gap-4
  .glass.p-4.flex-1
    .text-2xl Students
  .flex.flex-wrap.gap-4
    NuxtLink.glass.p-4.text-lg.flex.flex-col.gap-1(
      :to="`/members/${student?.id}`"
      v-for="student in students"
      :key="student"
      )
      .w-16.h-16.overflow-clip.rounded-full
        NuxtImg(:src="student?.avatar || academy?.default_avatar" width="100")
      .text-xl {{ student?.first_name }}
      .text-sm {{ student?.city }}
      .text-10px.uppercase.op-50 {{ student?.country }}
</template>