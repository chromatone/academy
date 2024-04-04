<script setup>
import { useClamp } from '@vueuse/math'
import { useDateFormat } from '@vueuse/core'

const route = useRoute()

const { data: p } = await useFetch('/api/get/project', { query: { slug: route.params?.slug } })


useHead({
  title: p.value?.title,
  titleTemplate: '%s project'
})

const from = useDateFormat(() => p.value?.start_date, 'DD MMM YYYY')
const to = p.value?.end_date ? useDateFormat(() => p.value?.end_date, 'DD MMM YYYY',) : 'Present'


const page = useClamp(1, 1, p.value?.events.length)

const perPage = ref(6)

const eventList = computed(() => [...p?.value.events]?.sort((a, b) => a.date > b.date ? -1 : 1).slice(0, page.value * perPage.value))
</script>

<template lang='pug'>
.relative.flex.flex-wrap.px-4.gap-8.items-start

  .max-w-55ch.flex.flex-col.gap-4(
    style="flex: 1 1 300px")

    NuxtLink.flex.flex-col.p-4.glass(
      :to="`/programs/${p?.program?.slug}`")
      .op-50.uppercase.text-sm  Program
      .text-2xl {{ p?.program?.title }}

    .glass.p-4.flex.flex-col.bg-light-300.dark-bg-dark-300
      .op-50.uppercase.text-sm Project
      .text-3xl {{ p?.title }}

    NuxtImg.w-full.rounded-xl.shadow-lg(
      v-if="p?.cover"
      :src="p?.cover"
      width="600")

    .glass.p-4.flex.flex-col.gap-3
      .text-lg.max-w-55ch {{ p?.description }}
      .text-lg {{ from }} - {{ to }}
      .flex.items-center.gap-2(v-if="p?.url")
        .i-la-link
        NuxtLink(:to="p.url" target="_blank") {{ p.url }}
      .flex.items-center.gap-2(v-if="p?.github")
        .i-la-github
        NuxtLink(:to="p.github" target="_blank") {{ p.github }}
    .glass.flex.flex-col.gap-3
      MDC.prose.px-4(:value="p?.content || ''" tag="article")

  .flex.flex-wrap.gap-4.glass.max-w-55ch.p-4.mb-4.mx-4(
    v-if="p?.objects?.length > 0"
    style="flex: 1 1 200px")
    .text-2xl.w-full Objects
    EventCard(
      style="flex: 1 1 200px"
      :event="event"  
      v-for="event in p?.objects")

  .flex.flex-wrap.gap-4.items-start(
    style="flex: 1 1 300px"
    v-if="p?.events?.length > 0")

    .text-3xl.px-4.w-full Events 
    transition-group(name="fade")
      EventCard(
        style="flex: 1 1 240px"
        :event="event"  
        :key="event"
        v-for="event in eventList")

      .w-full.text-center Showing {{ eventList?.length }} of {{ p?.events?.length }} events

    button.w-full.rounded-xl.text-xl.shadow.p-4.bg-purple(
      v-if="eventList?.length < p?.events?.length"
      @click="page++") Show more 

  .flex.flex-col.gap-4.max-w-55ch(
    style="flex: 1 1 300px"
    v-if="p?.partners?.length > 0")

    .text-3xl.w-full Partners
    .flex.flex-wrap.gap-4
      NuxtLink.text-xl.glass.p-4(
        v-for="partner in p?.partners"
        :to="partner.partners_id.url"
        target="_blank") {{ partner.partners_id.title }}
  
</template>