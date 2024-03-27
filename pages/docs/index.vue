<script setup>
const { getItems } = useDirectusItems()

const { data: docs, error } = await useAsyncData('docs', () => getItems({
  collection: 'academy_docs'
}))
</script>

<template lang='pug'>
.p-6.flex.flex-col.gap-4
  .text-4xl.mb-6 Documents

  NuxtLink.underline.underline-dotted.text-xl(
    v-for="doc in docs"
    :to='`/docs/${doc?.slug}`'
    ) {{ doc?.title }}
</template>