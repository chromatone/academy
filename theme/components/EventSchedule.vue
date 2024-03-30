<script setup>
const props = defineProps({
  schedule: { type: Object, default: () => ({}) }
})
</script>

<template lang='pug'>
table.max-w-55ch(v-if="schedule")
  tr
    th.text-2xl(colspan="3") Schedule
  tr
    th Time
    th Activity
    th Duration

  tr(v-for="act in schedule", :key="act")
    td(width="60px") {{act?.time?.slice(0,-3)}}
    td(width="100%", :colspan="act?.duration? 1: 2" :class="{'font-bold':act?.time}") {{act?.activity}}
    td.opacity-60(v-if="act?.duration" width="60px") {{act.duration}}
</template>

<style lang="postcss" scoped>
table {
  @apply m-2
}

td, th {
  @apply p-2 text-left
}

tr:nth-child(2n) {
  @apply bg-dark-500 dark-bg-light-200 dark-bg-opacity-10 bg-opacity-10;
}
</style>