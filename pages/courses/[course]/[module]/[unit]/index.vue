<script setup>
import { formatTimeAgo } from '@vueuse/core'

definePageMeta({ middleware: ["auth", "course"] })


import LiteYouTubeEmbed from 'vue-lite-youtube-embed'

const route = useRoute()

const user = useDirectusUser();

const { getItemById, updateItem } = useDirectusItems()

const member = await getItemById({
  collection: 'members',
  id: user?.value?.member,
  params: {
    fields: ['student.id', 'student.units.*']
  }
})

const { getItems } = useDirectusItems()

const { token } = useDirectusToken()

const { data: units, error } = await useAsyncData('unit-' + route.params?.unit, async () => await getItems({
  collection: 'units',
  params: {
    filter: {
      slug: {
        _eq: route.params?.unit
      }
    },
    fields: ['*', 'module.title', 'module.slug', 'module.course.title', 'module.course.slug', 'module.course.program.title', 'module.course.program.slug']
  }
}))

const l = computed(() => units.value?.[0])

useHead({
  title: l.value?.title,
  titleTemplate: '%s unit'
})

const record = await getItems({
  collection: 'units_students',
  params: {
    filter: {
      units_id: {
        _eq: l.value?.id
      },
      students_id: {
        _eq: member?.student?.[0]?.id
      }
    }
  }
})

async function unitComplete() {

  if (!record?.[0]) return
  await updateItem({
    collection: 'units_students',
    id: record?.[0]?.id,
    item: {
      finish_date: new Date().toISOString()
    }
  })
  await navigateTo(`/courses/${route.params?.course}/${route?.params?.module}/`)
}

const body = {
  units_id: l.value?.id,
  students_id: member?.student?.[0]?.id,
  token: token.value
}

const { data: studentUnit } = await useFetch('/api/apply/unit', {
  method: 'POST',
  body
})


</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-4.items-start


  .max-w-55ch.gap-4.flex.flex-col(style="flex: 1 1 300px")

    .flex.flex-col.gap-2

      NuxtLink.glass.p-4.uppercase.flex.items-center(:to="`/programs/${l?.module?.course?.program?.slug}/`") 
        .p-0 {{ l?.module?.course?.program?.title }}
        .flex-1
        .p-0.op-60.text-sm Program

      NuxtLink.glass.p-4.uppercase.flex.items-center(:to="`/courses/${l?.module?.course?.slug}`") 
        .p-0 {{ l?.module?.course?.title }}
        .flex-1
        .p-0.op-60.text-sm Course

      NuxtLink.glass.p-4.uppercase.flex.items-center(:to="`/courses/${route.params?.course}/${route.params?.module}`")
        .p-0 {{ l?.module?.title }}
        .flex-1
        .p-0.op-60.text-sm Module

    .glass.gap-4.flex.flex-col.p-4
      .flex.items-center 
        .text-3xl {{ l?.title }}
        .flex-1
        .op-60.uppercase.text-sm {{ l?.type || 'Unit' }}
    .glass.gap-4.flex.flex-col.p-4(v-if="l?.description")
      .text-lg {{ l?.description }}

    PageCover(:id="l?.cover")

    .glass.p-4.font-mono.text-xs.flex.flex-col.gap-2 
      template(v-if="studentUnit")
        .op-60 FIRST OPEN: {{ formatTimeAgo(new Date(studentUnit?.start_date)) }}
        .op-60 LAST VISIT: {{ formatTimeAgo(new Date(studentUnit?.last_visit)) }}
        .op-60(v-if="studentUnit?.finish_date") FINISHED: {{ formatTimeAgo(new Date(studentUnit?.finish_date)) }}
      template(v-else)
        p Welcome! 

    button.button.w-full(@click="unitComplete()" v-if="!record?.[0]?.finish_date") Complete 

  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 300px")

    LiteYouTubeEmbed(
      title="Video" 
      :id="l?.youtube" 
      v-if="l?.youtube")

    NuxtLink.text-lg.glass.p-4.font-mono.text-sm.op-70.hover-op-100.transition(
      target="_blank"
      :to="l?.link" v-if="l?.link") {{ l?.link }}


    .glass.max-w-55ch.px-4(
      v-if="l?.content"
      style="flex: 1 1 300px")
      MDC.prose.text-lg(:value="l?.content || ''" tag="article")



  iframe.min-h-80vh.rounded-xl.w-full(:src="l?.link" v-if="l?.link")

 
</template>