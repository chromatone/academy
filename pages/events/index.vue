<script setup>
import { useClamp } from '@vueuse/math'


const events = await usePublicItems('events', { sort: ['date'] })

const page = useClamp(1, 1, events.value?.length)

const perPage = ref(6)

const eventList = computed(() => [...events.value]?.sort((a, b) => a.date > b.date ? -1 : 1).slice(0, page.value * perPage.value))


</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-6
  .flex.flex-col.gap-2
    .text-2xl Upcoming Events
  .text-2xl.w-full Past Events 
  transition-group(name="fade")
    EventCard(
      style="flex: 1 1 240px"
      :event="event"  
      :key="event"
      v-for="event in eventList")
  .flex.w-full.flex-col.gap-2(v-if="eventList?.length < events?.length")
    .w-full.text-center.op-80 Showing {{ eventList?.length }} of {{ events?.length }} events

    button.w-full.rounded-xl.text-xl.shadow.p-4.bg-purple(
      key="show-more"
      @click="page++") Show more 
    
</template>