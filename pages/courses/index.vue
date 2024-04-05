<script setup>
const { data: courses } = await useFetch('/api/get/courses')
</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-8
  .text-4xl.p-4.w-full Courses
  CourseBlock(
    style="flex: 1 1 300px"
    v-for="course in courses"
    :p="course"
    )
</template>