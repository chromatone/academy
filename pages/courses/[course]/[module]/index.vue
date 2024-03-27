<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'

definePageMeta({ middleware: ["auth"] })

const route = useRoute()

const { getItems } = useDirectusItems()

const { data: modules, error } = await useAsyncData('module-' + route.params?.module, async () => await getItems({
  collection: 'modules',
  params: {
    filter: {
      slug: {
        _eq: route.params?.module
      }
    },
    fields: ['*', 'units.*', 'course.*', 'course.program.title', 'course.program.slug'
    ]
  }
}))

const m = computed(() => modules.value?.[0])

useHead({
  title: m.value?.title,
  titleTemplate: '%s module'
})
</script>

<template lang='pug'>
.flex.flex-wrap.gap-4.p-4

  .flex.flex-col.gap-2.max-w-55ch(style="flex: 1 1 300px")


    .glass.p-4.gap-4.flex.flex-col
      NuxtLink.uppercase.text-sm.flex(:to="`/programs/${m?.course?.program?.slug}/`") 
        .p-0 {{ m?.course?.program?.title }}
        .flex-1
        .p-0.op-60 Program


    NuxtLink.gap-2.glass.p-4.text-sm.flex.flex-col(:to="`/courses/${m?.course?.slug}`") 
      .p-0.op-60.uppercase Course
      .p-0.text-2xl {{ m?.course?.title }}


    PageCover(:id="m?.cover")

    .glass.p-4.gap-2.flex.flex-col

      .p-0.uppercase.text-sm.op-60 Module
      .p-0.text-4xl {{ m?.title }}

      .text-lg {{ m?.description }}



  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 300px")

    .glass.max-w-55ch.px-4(v-if="m?.content")
      MDC.prose.text-lg(:value="m?.content || ''" tag="article")

    .glass.p-4.gap-4.flex.items-center.uppercase
      .w-full.text-sm Units
      .flex-1 
      .text-sm {{ m?.units?.length }}
      .i-la-angle-down

    .glass.p-4.gap-4.flex.flex-col(v-for="unit in m?.units")
      NuxtLink(
        :to="`/courses/${route.params?.course}/${route.params?.module}/${unit?.slug}`"
        )
        .flex.items-center.gap-2
          .text-xl.p-2 {{ unit?.title }}
          .flex-1 
          .text-sm.uppercase.op-60 Unit
        .text-md.p-2(v-if="unit?.description") {{ unit?.description }}
        .max-h-60.overflow-clip.flex.flex-col.items-center.relative.justify-center 
          NuxtImg.w-full(v-if="unit?.cover" :src="unit?.cover" width="400")
          .i-la-play-circle.text-6xl.absolute(v-if="unit?.type == 'youtube'")
        
</template>