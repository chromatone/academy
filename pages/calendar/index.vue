<script setup>
definePageMeta({ middleware: ["auth"] })
import { previousMonday, format, setDay, getWeek, isToday, isPast, isSameDay } from "date-fns";

const now = ref(new Date())

const weeks = Array(54).fill(null).map((_w, w) => Array(7).fill(null).map((_d, d) => new Date(now.value.getFullYear() - 1, 11, w * 7 + d + setDay(new Date(now.value.getFullYear(), 0, 1), 0).getDate())))

const { data: events } = await useFetch('/api/list/events')

const { data: news } = await useFetch('/api/list/news')

const { data: updates } = await useFetch('/api/list/updates')

</script>

<template lang='pug'>
.p-4.flex.flex-col.gap-2 
  .glass.p-4.flex.items-baseline.gap-2
    .text-3xl Calendar
    .text-2xl.flex-1.op-80 {{ now.getFullYear() }}
  .p-3 
  .grid.gap-2
    .grid.gap-2.sticky.top-16.items-center(
      style="grid-template-columns: 1em repeat(7,1fr);"
      )
      .p-2.text-xs.text-right W
      .p-2.bg-light-400.dark-bg-dark-400(v-for="first in weeks[0]") {{ format(first,'eee') }}
    .grid.gap-2.items-stretch(
      style="grid-template-columns: 1em repeat(7,1fr);"
      v-for="(week,w) in weeks")
      .p-2.op-30.text-right.text-xs {{ getWeek(week[0]) }}
      .p-1.rounded.shadow.flex.flex-col.gap-1(v-for="(day) in week" :style="{backgroundColor: `hsla(${day.getMonth()*30}deg,50%,50%,${isToday(day) ? 1 : isPast(day) ? .1 :.3})`}") 
        NuxtLink.p-1.text-sm(
          :to="`/calendar/${day.getFullYear()}/${day.getMonth()}/${day.getDate()}/`"
        ) {{ day.getDate() }}  {{ day.getDate() == 1 ? format(day, 'MMM') : '' }}
        NuxtLink.p-1.text-xs.border-1.shadow.block.rounded.bg-light-300.bg-op-90.dark-bg-dark-400.dark-bg-op-90(
          :to="`/events/${event?.slug}/`"
          v-for="event in events?.filter(d=>isSameDay(day,d?.date))") 
          .op-40 {{ event?.project.title }}
          p {{ event?.title }}
        NuxtLink.p-1.text-xs.rounded.bg-light-300.bg-op-50.dark-bg-dark-400.dark-bg-op-50.op-80(
          :to="`/news/${n?.slug}/`"
          v-for="n in news?.filter(n=>isSameDay(day,n?.date))") 
          .op-40 Academy 
          p {{ n?.title }}
        NuxtLink.p-1.text-xs.rounded.bg-light-300.bg-op-50.dark-bg-dark-400.dark-bg-op-50.op-80(
          :to="`/projects/${update?.project?.slug}/`"
          v-for="update in updates?.filter(update=>isSameDay(day,update?.date))") 
          .op-40 {{ update?.project?.title }}
          p {{ update?.title }}
</template>