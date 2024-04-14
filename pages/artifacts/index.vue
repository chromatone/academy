<script setup>
import { useClamp } from '@vueuse/math'


const events = await usePublicItems('artifacts')

const page = useClamp(1, 1, events.value?.length)

const perPage = ref(6)

const artList = computed(() => events.value?.slice(0, page.value * perPage.value))


</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-6
  .text-2xl.p-4.w-full Artifacts 
  transition-group(name="fade")
    ArtifactCard(
      :to="`/artifacts/${art.slug}/`"
      style="flex: 1 1 240px"
      :key="art"
      :artifact="art"
      v-for="art in artList")


    .w-full.text-center Showing {{ artList?.length }} of {{ events?.length }} artifacts

    button.w-full.rounded-xl.text-xl.shadow.p-4.bg-purple(
      v-if="artList?.length < events?.length"
      @click="page++") Show more 
    
</template>