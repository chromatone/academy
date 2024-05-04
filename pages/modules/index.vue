<script setup>
const route = useRoute()

const { data: modules } = await useFetch('/api/list/modules')

</script>

<template lang='pug'>
.flex.flex-wrap.gap-4.p-4
  .glass.p-4.flex.flex-col.gap-2 
    .text-2xl Modules
  NuxtLink.relative.glass.flex.items-start.gap-2.hover-bg-light-900.dark-hover-bg-dark-400(
    style="flex: 1 1 200px"
    v-for="(mod, m) in modules"
    :to="`/courses/${mod?.course?.slug}/${mod?.slug}`"
    )
    //- .absolute.-left-5.font-mono.text-lg.text-end {{ m + 1 }}
    //- NuxtImg.rounded-xl.self-start(:src="mod?.cover" v-if="mod?.cover" width="80")
    .flex.flex-col.gap-1.p-2
      .text-sm {{ mod?.course?.title }}
      .text-xl  {{ mod.title }}
      .text-md.max-h-30.overflow-clip {{ mod?.description }}

    .op-70.mx-4(v-if="mod?.units?.length > 0") {{ mod?.units?.length }}
</template>