<script setup>
const user = useDirectusUser()

const programs = await usePublicItems('programs', {
  sort: ['sort'],
  fields: ['slug', 'color', 'projects', 'title', 'description', 'cover', 'courses']
})

const { academy } = await useMeta()

</script>

<template lang="pug">
.p-0.flex.flex-wrap
  .max-w-55ch.p-6.flex.flex-col.gap-8(style="flex: 1 1 300px")
    h1.text-4xl {{ academy?.title }}
    h2.text-lg {{ academy?.description }}
    .p-0.flex.flex-col.gap-4
      .text-2xl Membership Features
      ul
        li.list-circle.ml-4.py-1.text-lg(v-for="feature in academy?.features") {{ feature?.title }}
      //- button.p-4.text-2xl.bg-purple.rounded-lg.shadow-lg Buy Academy Membership
      NuxtLink.p-4.bg-purple-500.rounded-xl.shadow-lg.text-xl.text-center(to="membership/subscribe" v-if="!user?.email") Subscribe
      WaitList(v-if="!user?.email")

  .flex.flex-wrap.gap-8.p-6(style="flex: 1 1 600px")
    NuxtLink.w-full.text-4xl(to="/programs/") Programs 
    ProgramBlock.overflow-clip.rounded-xl(
      style="flex: 1 1 300px"
      v-for="p in programs"
      :p="p")
    
</template>
