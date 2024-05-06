<script setup>
import { format } from 'date-fns'

definePageMeta({ middleware: ["auth"] })
const route = useRoute()

const d = route.params

const date = new Date(d.year, d.month, d.day)
</script>

<template lang='pug'>

.p-4.flex.flex-wrap.gap-4
  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 200px")
    .glass.p-4.flex.flex-col.gap-2
      .text-6xl {{ format(date, 'd') }}
      NuxtLink.text-4xl(:to="`/calendar/${d.year}/${d.month}/`") {{ format(date, 'MMM') }}
      NuxtLink.text-4xl(:to="`/calendar/${d.year}/`")  {{ format(date, 'yyy') }}

  .flex.flex-col.max-w-55ch(style="flex: 1 1 300px")
    .glass.grid.grid-rows-24
      .p-1.text-sm.border-b-1.border-dark-300.border-op-20.dark-border-light-300.dark-border-op-20(v-for="(_,h) in 24" :key="h") 
        .op-80 {{ h }}
      //- .absolute.grid-row-start-7.bg-red.grid-row-end-18.h-full.left-6.max-w-30.p-2.rounded-lg Event
</template>