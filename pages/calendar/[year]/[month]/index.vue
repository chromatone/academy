<script setup>
import { format, getDaysInMonth, isWeekend } from 'date-fns'

definePageMeta({ middleware: ["auth"] })
const route = useRoute()

const d = route.params

const date = new Date(d.year, d.month)
</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-4
  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 200px")
    .glass.p-4.flex.flex-col.gap-2
      .text-4xl {{ format(date, 'MMM') }}
      NuxtLink.text-4xl(:to="`/calendar/${d.year}/`")  {{ format(date, 'yyy') }}

  .flex.flex-col.max-w-55ch(style="flex: 1 1 300px")
    .glass.grid.grid-rows-24
      .p-1.text-sm.border-b-1.border-dark-300.border-op-20.dark-border-light-300.dark-border-op-20(
        :class="{'bg-purple bg-op-10':isWeekend(new Date(d.year,d.month,day))}"
        v-for="day in getDaysInMonth(date)" :key="day") 
        NuxtLink.op-80(:to="`/calendar/${d.year}/${d.month}/${day}`") {{ day }}
</template>