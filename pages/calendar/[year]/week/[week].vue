<script setup>
import { format, startOfWeek, setWeek, addDays, getMonth, getDate } from 'date-fns'
const route = useRoute()

const d = route.params

const date = new Date(d.year)

const start = startOfWeek(setWeek(date, d.week))
</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-4
  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 200px")
    .glass.p-4.flex.flex-col.gap-2
      .text-4xl Week {{ d.week }}
      NuxtLink.text-4xl(:to="`/calendar/${d.year}/`")  {{ format(date, 'yyy') }}
  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 200px")
    NuxtLink.glass.p-4.flex.flex-col.gap-4(
      :to="`/calendar/${d.year}/${getMonth(addDays(start,w))}/${getDate(addDays(start,w))}`"
      v-for="(_,w) in 7" :key="w"
      ) 
      .p-2() {{ format(addDays(start,w), 'd MMM, eee') }}
</template>