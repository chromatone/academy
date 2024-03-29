<script setup>
import { useClamp } from '@vueuse/math'


const events = await usePublicItems('events', { sort: ['date'] })

const page = useClamp(1, 1, events.value?.length)

const perPage = ref(6)

const eventList = computed(() => [...events.value]?.sort((a, b) => a.date > b.date ? -1 : 1).slice(0, page.value * perPage.value))


</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-6
  .text-2xl.p-4.w-full Events 
  transition-group(name="fade")
    EventCard(
      style="flex: 1 1 240px"
      :event="event"  
      :key="event"
      v-for="event in eventList")

    .w-full.text-center Showing {{ eventList?.length }} of {{ events?.length }} events

    button.w-full.rounded-xl.text-xl.shadow.p-4.bg-purple(
      v-if="eventList?.length < events?.length"
      @click="page++") Show more 
    
</template>