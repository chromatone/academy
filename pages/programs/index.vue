<script setup>

const programs = usePublicItems('programs', {
  sort: ['sort'],
  fields: ['slug', 'color', 'projects', 'title', 'description', 'cover', 'courses']
})

const { academy } = await useMeta()

</script>

<template lang="pug">
.p-0.flex.flex-wrap.gap-8
  .text-4xl.p-4.w-full Programs
  .flex.flex-wrap.gap-8.p-6
    ProgramBlock(
      style="flex: 1 1 300px"
      v-for="p in programs"
      :p="p"
      )
    
</template>
