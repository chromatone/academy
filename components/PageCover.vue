<script setup>
const props = defineProps({
  id: { type: String, default: '' }
})
</script>

<template lang='pug'>
NuxtPicture.rounded-xl.overflow-clip.max-w-55ch.shadow-xl(
  title="Project cover"
  :src="id"
  v-if="id"
  format="webp"
  :img-attrs="{class:'top-0 w-full '}"
  )
</template>
