<script setup>
// definePageMeta({ middleware: ["auth"] })

const user = useDirectusUser()

const route = useRoute()

const showPrice = useShowPrice()

const { getItems } = useDirectusItems()

const { data: courses, error } = await useAsyncData('course-' + route.params?.course, async () => await getItems({
  collection: 'courses',
  params: {
    filter: {
      slug: {
        _eq: route.params?.course
      }
    },
    fields: ['*', 'craft.*', 'program.title', 'program.slug', 'program.color', 'modules.*'
    ]
  }
}))

const s = computed(() => courses.value?.[0])

useHead({
  title: s.value?.title,
  titleTemplate: '%s course'
})
</script>

<template lang='pug'>
.flex.flex-wrap.overflow-clip.items-start.p-4.gap-2

  .max-w-55ch.flex.flex-col.gap-4(style="flex: 1 1 300px")

    NuxtLink.flex.flex-col.glass.p-4(
      :to="`/programs/${s?.program?.slug}`") 
      .op-50.text-sm.uppercase Program
      .text-2xl {{ s?.program?.title }}

    .glass.p-4.flex.flex-col
      .op-50.text-sm.uppercase  Course
      .text-2xl {{ s?.title }}



    PageCover(:id="s?.cover")



    .glass.gap-4.flex.flex-col.p-4





      .text-lg {{ s?.description }}

    .glass.flex.flex-col.p-4
      .op-50.text-sm.uppercase Craft
      NuxtLink.text-xl(:to="`/crafts/${s?.craft?.slug}`") {{ s?.craft.title }}

  .max-w-55ch.gap-4.flex.flex-col(style="flex: 1 1 300px")
    .p-4.glass
      .text-2xl Modules
    NuxtLink.glass.p-2.flex.items-baseline.gap-1.hover-bg-light-900.dark-hover-bg-dark-400(
      v-for="(mod, m) in s?.modules?.sort((a, b) => a?.sort > b?.sort ? 1 : -1)"
      :to="user ? `/courses/${route.params?.course}/${mod?.slug}` : '/auth/login'"
      @click="!user ? showPrice = true : null"
      )
      .font-mono.text-lg.min-w-8.text-end {{ m + 1 }}.
      .flex.flex-col.gap-1
        .text-xl {{ mod.title }}
        .text-md {{ mod?.description }}
      .flex-1
      .op-70.mx-2 {{ mod?.units?.length }}
      .i-la-lock.min-w-8.op-80(
        v-if="!user"
        title="You need to log in in order to view these")
</template>