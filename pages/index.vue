<script setup>
definePageMeta({ layout: 'home' })

import LiteYouTubeEmbed from 'vue-lite-youtube-embed'

const user = useDirectusUser()

const { academy } = await useMeta()

const { data: programs } = await useFetch('/api/list/programs')

const plans = await usePublicItems('plans', {
  sort: ['sort'],
  fields: ['*', 'benefits.benefits_id.title', 'benefits.benefits_id.description']
})

</script>

<template lang="pug">
.flex.flex-wrap.relative

  .flex.flex-wrap.items-end.bg-purple-200.bg-op-20.dark-bg-purple-400.dark-bg-op-20(style="flex: 1 1 100%")
    .flex.gap-2.p-6.items-center(style="flex: 1 1 300px")
      img.w-22(src="~/assets/smooth.svg")
      .flex.flex-col
        h1.font-bold.text-4xl Chromatone
        h2.text-4xl Academy

    .flex.flex-wrap.items-end.text-right.flex.flex-col.mb-4.mr-6.mt-6(style="flex: 1 1 200px")

      h3.text-2xl Visual Music Language 
      h4.text-lg Education and Research Center

  .flex.flex-wrap.gap-4.p-6(style="flex: 1 1 600px")
    NuxtLink.w-full.text-4xl(to="/programs/") Programs 
    ProgramBlock.overflow-clip.rounded-xl(
      style="flex: 1 1 300px"
      v-for="p in programs"
      :p="p")

  .flex.flex-col.p-4.flex-1.w-full(style="flex: 1 1 100%")
    PageCount

  .flex.flex-wrap.gap-4.p-4.items-start
    .glass.p-4(v-if="user?.member?.[0]")
      .flex.p-2.flex-col.gap-2 
        .flex-auto.w-full Welcome back, 
        .text-4xl {{ user?.first_name }} {{ user?.last_name }}!
        NuxtLink.op-50.hover-op-100.transition.text-2xl(to='/me/') Go to your profile
    .glass.p-4.gap-4.flex.flex-col
      .text-2xl Membership features
      ul.flex.flex-col.gap-1
        li.rounded.px-2.py-1.bg-purple-200.bg-op-20(
          style="flex: 1"
          v-for="feature in academy?.features") {{ feature?.title }}
      .flex.gap-2.items-center(v-if="!user?.email")
        NuxtLink.max-w-45ch.bg-purple-300.dark-bg-purple-600.p-4.rounded-xl.text-xl.flex-1(to="/membership/subscribe/") Subscribe now
        NuxtLink.bg-purple-300.bg-op-40.op-80.dark-bg-purple-600.dark-bg-op-40.p-4.rounded-xl.text-xl.box-border(to="/auth/login/") Login




  //- WaitList.fixed.top-20.right-4(v-if="!user?.email")
</template>

<style scoped lang="postcss"></style>