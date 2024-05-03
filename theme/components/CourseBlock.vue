<script setup>
const props = defineProps({
  p: { type: Object, default: () => { } },
  program: { type: String, default: '' },
})

</script>

<template lang="pug">
NuxtLink.p-0.relative.rounded-xl.pb-4(
  :to="`/courses/${p?.slug}/`"
  )
  .absolute.z-2.transition.duration-500.w-full.h-auto.op-80.hover-op-90.w-full.overflow-clip.rounded-xl.w-full
    NuxtImg.w-full(
      v-if="p?.cover"
      :src="p?.cover"
      width="300"
      :imgAttrs="{ class: '', width: '100%' }")
  .z-200.p-4.mx-2.mt-50.glass.flex.flex-col.gap-4.max-w-55ch.relative()
    .text-xs.-mb-4.uppercase.op-50 {{ p?.program.title || program }}
    .text-2xl {{ p?.title }}
    .text-md {{ p?.description }}

    .text-lg.px-2.bg-light-500.dark-bg-dark-500.filter.dark-brightness-62.dark-contrast-400.rounded.whitespace-nowrap.self-start(
      :style="{ backgroundColor: p?.color }"
      v-if="p?.projects?.length > 0"
      ) {{ p?.projects.length }} project{{ (p?.projects.length % 10 === 1 && p?.projects.length !== 11) ? '' : 's' }}
    slot
    .flex.flex-wrap.gap-2
      .px-2.bg-light-900.dark-bg-dark-800.rounded-xl.self-start(v-if="p?.modules?.length > 0") {{ p?.modules?.length }} modules
      .px-2.bg-light-900.dark-bg-dark-800.rounded-xl.self-start(v-if="p?.students?.length>0") {{ p?.students?.length }} student{{ p?.students?.length>1 ? 's': '' }}
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
