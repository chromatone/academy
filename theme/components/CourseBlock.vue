<script setup>
const props = defineProps({
  p: { type: Object, default: () => { } },
  program: { type: String, default: '' },
})

</script>

<template lang="pug">
NuxtLink.p-0.relative.overflow-clip.rounded-xl(
  :to="`/courses/${p?.slug}/`"
  )
  .absolute.z-2.transition.duration-500.w-full.h-auto.op-80.hover-op-90
    NuxtPicture(
      v-if="p?.cover"
      :src="p?.cover"
      :imgAttrs="{class:'w-full overflow-clip rounded-xl', width:'100%'}")
  .z-200.p-4.m-4.mt-50.glass.flex.flex-col.gap-4.max-w-55ch.relative()

    .text-3xl {{ p?.title }}
    .text-md {{ p?.description }}

    .text-lg.px-2.bg-light-500.dark-bg-dark-500.filter.dark-brightness-62.dark-contrast-400.rounded.whitespace-nowrap.self-start(
      :style="{backgroundColor: p?.color}"
      v-if="p?.projects?.length>0"
      ) {{ p?.projects.length }} project{{ (p?.projects.length % 10 === 1 && p?.projects.length !== 11) ? '' : 's' }}
    slot
    //- .flex.flex-wrap.gap-4
    //-   NuxtLink.py-4.px-6.rounded-lg.shadow-lg.text-xl.self-start.filter.dark-brightness-62.dark-contrast-400.border-4.border-transparent(
    //-     :to='`/${p?.slug}`'
    //-     :style="{backgroundColor: p?.color}"
    //-     ) Explore
    //-   NuxtLink.py-4.px-6.rounded-lg.shadow-lg.text-xl.self-start.filter.dark-brightness-62.dark-contrast-400.border-4(
    //-     :to="`/${p?.slug}/apply`"
    //-     :style="{borderColor: p?.color}"
    //-     ) Apply
</template>
