<script setup>
import { format, eachWeekOfInterval, lastDayOfMonth, getWeek } from "date-fns";
definePageMeta({ middleware: ["auth"] })
const route = useRoute()

const d = route.params

const date = new Date(d?.year)
</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-4 
  .flex.flex-col.gap-4(style="flex: 1 1 200px")
    .glass.p-4.flex.flex-col.gap-2
      .text-4xl {{ d.year }}
  .flex.flex-col.gap-2(style="flex: 1 1 400px")
    .glass.p-4.flex.flex-col.gap-2(
      v-for="(_,m) in 12" :key="m") 
      NuxtLink.text-xl(
        :to="`/calendar/${d.year}/${m}`"
        ) {{ format(new Date(d.year,m), 'MMMM') }}
      .flex.gap-2
        NuxtLink.p-2.flex-1.bg-light-800.bg-op-30.rounded-xl.dark-bg-dark-900.dark-bg-op-30(
          :to="`/calendar/${d.year}/week/${getWeek(w)}`"
          v-for="w in eachWeekOfInterval({start:new Date(d.year,m), end: lastDayOfMonth(new Date(d.year,m)) })" :key="w") {{ getWeek(w) }}
</template>