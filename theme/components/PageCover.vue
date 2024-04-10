<script setup>
const props = defineProps({
  id: { type: String, default: '' }
})
</script>

<template lang='pug'>
NuxtImg.rounded-xl.overflow-clip.max-w-55ch.shadow-xl.top-0.w-full(
  title="Project cover"
  :src="id"
  v-if="id"
  format="webp"
  width="600"
  )
</template>
