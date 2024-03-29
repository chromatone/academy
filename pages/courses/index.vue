<script setup>
const courses = await usePublicItems('courses', {
  sort: ['sort'],
  fields: ['slug', 'color', 'projects', 'title', 'description', 'cover', 'courses']
})
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