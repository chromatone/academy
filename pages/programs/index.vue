<script setup>

const { data: programs } = await useFetch('/api/list/programs')

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
